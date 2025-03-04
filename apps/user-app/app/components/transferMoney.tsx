"use client";
import { DollarSign, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export const TransferMoney = () => {
  //always better to do with a form but for now
  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const addMoney = async () => {
    //Transfer to given phone number if exist
    const result = await p2pTransfer(amount * 100, phoneNumber);
    console.log(result.message);
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
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-white/80"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneCall className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                id="phone-number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className="block w-full pl-10 py-3 bg-black/20 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
                placeholder="9898989898"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            addMoney();
          }}
          className="w-full py-3 px-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-md text-white font-medium hover:opacity-90 transition-opacity"
        >
          Transfer Money
        </button>
      </div>
    </div>
  );
};
