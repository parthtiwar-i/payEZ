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
  // chekc if user have enough balance
  const userBalance = await db.balance.findUnique({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  if (Number(userBalance?.amount) < amount) {
    return { message: "Unable to transfer! Not enough money" };
  }

  //if enough balance then start transaction first defuct from user and then add to the client (receving user)
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: Number(session?.user?.id),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      }),
      db.balance.update({
        where: {
          userId: recievingUser?.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      }),
    ]);

    return {
      message: `Successfully transfered ${amount} to ${recievingUser.name}`,
    };
  } catch (error) {
    console.log(error);
    return { message: "Server Error!" };
  }
};
