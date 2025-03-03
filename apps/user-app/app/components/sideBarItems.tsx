"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";
interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  title,
  icon,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <button
      onClick={() => {
        router.push(href);
      }}
      className={`flex items-center gap-3 px-3 py-2 rounded-md neon-item mb-2 ${
        isActive ? "active" : ""
      }`}
    >
      <div className="text-white">{icon}</div>
      <span className="text-white font-medium">{title}</span>
    </button>
  );
};
