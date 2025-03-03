"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
export const initiateOnRampTransaction = async (
  provider: string,
  amount: number
) => {
  //in real world it comes form the bank server after we send a order req to the bank that we are sending a user for a payment
  const token = (Math.random() * 1000).toString();
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  await db.onRampTransaction.create({
    data: {
      amount,
      provider,
      startTime: new Date(),
      status: "Processing",
      token,
      userId: Number(session?.user?.id),
    },
  });
  return { message: "Done" };
};
