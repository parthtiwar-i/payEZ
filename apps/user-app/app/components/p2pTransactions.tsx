import React from "react";
export type transactions = {
  id: number;
  amount: number;
  startTime: Date;
  fromUserId: number;
  toUserId: number;
};

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    sentTransaction: transactions[];
    receivedTransactions: transactions[];
  };
}) => {
  const allTransactions = [
    ...transactions.sentTransaction.map((t) => ({ ...t, type: "sent" })),
    ...transactions.receivedTransactions.map((t) => ({
      ...t,
      type: "received",
    })),
  ].sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

  return (
    <div className="neon-border p-6 rounded-lg backdrop-blur-md bg-white/5 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white/60 border-b border-white/10">
              <th className="text-left pb-3">Date</th>
              <th className="text-left pb-3">From</th>
              <th className="text-right pb-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions?.map((transaction, i) => (
              <tr key={i} className="border-b border-white/5 text-white">
                <td className="py-4">{transaction.startTime.toDateString()}</td>
                <td className="py-4">{transaction.fromUserId}</td>
                <td
                  className={`py-4 text-right ${transaction.type === "received" ? "text-green-400" : "text-red-400"}`}
                >
                  ${Math.abs(transaction.amount / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-4 text-center">
        <button className="text-white/60 hover:text-white text-sm font-medium">
          View All Transactions →
        </button>
      </div> */}
    </div>
  );
};
