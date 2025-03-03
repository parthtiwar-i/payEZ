import React from "react";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <div className="neon-border p-6 rounded-lg backdrop-blur-md bg-white/5">
      <h2 className="text-2xl font-semibold mb-6 text-white">Balance</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-white/60 text-sm mb-1">Unlocked</p>
          <p className="text-white text-xl font-semibold">${amount / 100}</p>
        </div>
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-white/60 text-sm mb-1">Locked</p>
          <p className="text-white text-xl font-semibold">${locked / 100}</p>
        </div>
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-white/60 text-sm mb-1">Total Balance</p>
          <p className="text-white text-xl font-semibold">
            ${(amount + locked) / 100}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full bg-black/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full"
            style={{
              width: `${(locked / 100 / ((locked + amount) / 100)) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white/60 text-xs">Available</span>
          <span className="text-white/60 text-xs">
            {((locked / 100 / ((locked + amount) / 100)) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* <div className="mt-6">
        <button className="w-full py-3 px-4 bg-black/30 border border-white/10 rounded-md text-white font-medium hover:bg-black/40 transition-colors">
          View Detailed Statement
        </button>
      </div> */}
    </div>
  );
};
