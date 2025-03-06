"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const p2pTransfer = async (amount: number, phoneNumber: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return { message: "Unauthorized" };
  }

  //first check if the phone number exist
  const recievingUser = await db.user.findFirst({
    where: {
      number: phoneNumber,
    },
  });

  if (!recievingUser) {
    return { message: "Unable to transfer! User does not exist" };
  }

  //if enough balance then start transaction first defuct from user and then add to the client (receving user)
  try {
    await db.$transaction(async (prisma) => {
      // Check sender's balance first
      const senderBalance = await prisma.balance.findUnique({
        where: { userId: Number(session?.user?.id) },
      });

      if (!senderBalance || senderBalance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      // Update sender's balance
      await prisma.balance.update({
        where: { userId: Number(session?.user?.id) },
        data: { amount: { decrement: amount } },
      });

      // Update receiver's balance
      await prisma.balance.update({
        where: { userId: recievingUser.id },
        data: { amount: { increment: amount } },
      });

      // Record the P2P transaction
      await prisma.p2PTransactions.create({
        data: {
          amount,
          startTime: new Date(),
          fromUserId: Number(session?.user?.id),
          toUserId: recievingUser.id,
        },
      });
    });

    return {
      message: `Successfully transfered ${amount} to ${recievingUser.name}`,
    };
  } catch (error:any) {
    console.error(error);
    console.log(error);
    return { message: `Server Error! ${error?.Error}` };
  }
};
