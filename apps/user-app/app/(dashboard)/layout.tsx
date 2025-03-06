import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.id) {
    redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
