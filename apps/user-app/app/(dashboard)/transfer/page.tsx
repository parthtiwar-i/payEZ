import { AddMoneyCard } from "../../components/addMoneyCard";
import { BalanceCard } from "../../components/balanceCard";
import { OnRampTransaction } from "../../components/onRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db, { OnRampStatus } from "@repo/db/client";

// Sample data for recent transactions
const recentTransactions = [
  {
    time: new Date("2024-01-15T10:30:00"),
    amount: 50000,
    status: OnRampStatus.Success,
    provider: "HDFC Bank",
  },
  {
    time: new Date("2024-01-14T15:45:00"),
    amount: 100000,
    status: OnRampStatus.Processing,
    provider: "Axis Bank",
  },
  {
    time: new Date("2024-01-13T09:15:00"),
    amount: 25000,
    status: OnRampStatus.Failure,
    provider: "HDFC Bank",
  },
];

const getBalance = async () => {
  const session = await getServerSession(authOptions);

  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return balance;
};

const getOnRampTransaction = async () => {
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
};

export default async function () {
  //get balance and onRampTransaction for db
  const balance = await getBalance();
  const transactions = await getOnRampTransaction();

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
        <OnRampTransaction transactions={transactions} />
      </div>
    </div>
  );
}
