"use client";
import { Select } from "@repo/ui/select";
import { DollarSign } from "lucide-react";
import React, { useState } from "react";
import { initiateOnRampTransaction } from "../lib/actions/createOnRampActions";
import { redirect } from "next/navigation";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoneyCard = () => {
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]);
  const [amount, setAmount] = useState(0);

  const addMoney = async () => {
    if (provider?.name) {
      await initiateOnRampTransaction(provider.name, amount);
    }
    window.location.href = provider?.redirectUrl || "";
  };
  return (
    <div className=" p-6 rounded-lg backdrop-blur-md bg-white/5">
      <h2 className="text-2xl font-semibold mb-6 text-white">Add Money</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-white/80"
          >
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              id="amount"
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
              className="block w-full pl-10 py-3 bg-black/20 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="account-type"
            className="block text-sm font-medium text-white/80"
          >
            Account Type
          </label>
          <Select
            onSelect={(value) => {
              setProvider(SUPPORTED_BANKS.find((x) => x.name === value));
            }}
            options={SUPPORTED_BANKS.map((bank) => ({
              key: bank.redirectUrl,
              value: bank.name,
            }))}
          />
        </div>

        <button
          onClick={() => {
            addMoney();
          }}
          className="w-full py-3 px-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-md text-white font-medium hover:opacity-90 transition-opacity"
        >
          Transfer Funds
        </button>
      </div>
    </div>
  );
};
