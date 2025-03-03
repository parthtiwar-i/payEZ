import React from "react";
import type { OnRampStatus } from "@repo/db/client";

// export enum OnRampStatus {
//   Success = "Success",
//   Failure = "Failure",
//   Processing = "Processing",
// }

export const OnRampTransaction = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: OnRampStatus;
    provider: string;
  }[];
}) => {
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
              <th className="text-left pb-3">Provider</th>
              <th className="text-left pb-3">Status</th>
              <th className="text-right pb-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={i} className="border-b border-white/5 text-white">
                <td className="py-4">{transaction.time.toDateString()}</td>
                <td className="py-4">{transaction.provider}</td>
                <td className="py-4">{transaction.status}</td>
                <td
                  className={`py-4 text-right text-green-400`}
                  //${transaction.type === "credit" ? "text-green-400" : "text-red-400"}
                >
                  {/* {transaction.type === "credit" ? "+" : "-"} */}$
                  {Math.abs(transaction.amount / 100).toFixed(2)}
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
