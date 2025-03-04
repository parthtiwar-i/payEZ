import express, { Request, Response } from "express";
import db from "@repo/db/client";
import { z } from "zod";
const app = express();

app.use(express.json());

const bodySchema = z.object({
  token: z.string().min(1, "Token is required"),
  userId: z.number().positive("User ID must be positive"),
  amount: z.number(),
});

app.post("/hdfcWebhook", async (req: Request, res: Response): Promise<void> => {
  try {
    const { success } = bodySchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        message: "Validation failed",
      });
    }
    const paymentInformation = req.body;
    // Update balance in db, add txn
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({ message: "Captured" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while processing webhook" });
  }
});

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
