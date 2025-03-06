"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const getP2PTransactions = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { message: "Unauthorized" };
    }
    const transactions = await db.user.findFirst({
      where: {
        id: Number(session.user.id),
      },
      include: {
        receivedTransactions: true,
        sentTransaction: true,
      },
    });
    if (!transactions) {
      return { message: "Cannot find the transactions history" };
    }
    return transactions;
  } catch (error) {
    return { message: "Server error" };
  }
};
