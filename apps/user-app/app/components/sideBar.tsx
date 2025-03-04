"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { SidebarItem } from "./sideBarItems";
import { HomeIcon, TransactionsIcon, TransferIcon } from "./icons";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="flex">
      <div
        className={`fixed h-full z-40 w-64  backdrop-blur-md shadow-lg border border-purple-500/30 ${ isOpen ? "sidebar-open" : "sidebar-closed"} sidebar-open`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            {/* <h2 className="text-white text-xl font-medium">Navigation</h2> */}
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-white" />
              </button>
            )}
          </div>
          <div className="flex-grow">
            <SidebarItem
              href="dashboard"
              title="Dashboard"
              icon={<HomeIcon />}
            />
            <SidebarItem
              href="transaction"
              title="Transaction"
              icon={<TransactionsIcon />}
            />
            <SidebarItem
              href="transfer"
              title="Transfer"
              icon={<TransferIcon />}
            />
            <SidebarItem
              href="p2p-transfer"
              title="P2P Transfer"
              icon={<TransferIcon />}
            />
          </div>
        </div>
      </div>

      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-16 left-4 z-30 p-2 neon-box rounded-full animate-pulse-neon"
          aria-label="Open sidebar"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      )}

      <div className={`px-10 w-full transition-all duration-300`}>
        {/* Main content would go here */}
        {children}
      </div>
    </div>
  );
};
