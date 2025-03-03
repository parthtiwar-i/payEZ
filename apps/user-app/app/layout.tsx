import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { NavBar } from "./components/navBar";
import { Sidebar } from "./components/sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayEZ payment bank  ",
  description: "Pay your friends easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${inter.className} bg-gradient-to-br from-slate-900 to-gray-900`}
        >
          <NavBar />
          <Sidebar>{children}</Sidebar>
        </body>
      </Providers>
    </html>
  );
}
