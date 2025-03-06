import { AddMoneyCard } from "../../components/addMoneyCard";
import { BalanceCard } from "../../components/balanceCard";
import { OnRampTransaction } from "../../components/onRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

const getBalance = async () => {
  try {
    const session = await getServerSession(authOptions);

    const balance = await db.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return balance;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getOnRampTransaction = async () => {
  try {
    const session = await getServerSession(authOptions);
    const transactions = await db.onRampTransaction.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    return transactions.map((transaction) => ({
      time: transaction.startTime,
      amount: transaction.amount,
      provider: transaction.provider,
      status: transaction.status,
    }));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function () {
  //get balance and onRampTransaction for db
  const [balance, transactions] = await Promise.all([
    await getBalance(),
    await getOnRampTransaction(),
  ]);
  //in case of error due to anything like DB is down or prisma not defined we use a fallback UI data or redirect user to not-found page of next js or build your own

  return (
    <div className="pl-0 md:pl-64 transition-all duration-300 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
          Transfer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Add Money Card */}
          <AddMoneyCard />

          {/* Balance Card */}
          <BalanceCard
            amount={balance?.amount || 0}
            locked={balance?.locked || 0}
          />
        </div>

        {/* Recent Transactions Card */}
        <OnRampTransaction transactions={transactions || []} />
      </div>
    </div>
  );
}
