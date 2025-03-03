import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here
  //TODO: Add webhook secret check here to check if this come form original BANK
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  // Update balance in db, add txn
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            // You can also get this from your DB
            increment: Number(paymentInformation.amount),
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

    res.status(200).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
