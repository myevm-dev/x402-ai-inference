import { Toaster } from "sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { SearchBar } from "../components/SearchBar";

import { ThirdwebProvider } from "thirdweb/react";
import { SignInButton } from "../components/sign-in-button";

export const metadata: Metadata = {
  title: ".",
  description: "AI inference powered by x402 micropayments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      >
        <body>
          {/* Header */}
          <div className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-zinc-950 border-b border-green-500/60">
            <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
              {/* Logo + Title */}
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/syncfoliologo.png"
                  alt="SyncFolio Logo"
                  width={40}
                  height={40}
                  priority
                />
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  .
                </h3>
              </Link>


              {/* Wallet */}
              <div className="flex items-center gap-4">
                <SignInButton />
              </div>
            </div>
          </div>

          <div className="fixed inset-x-0 top-[73px] z-40">
            <SearchBar />
          </div>

          {/* Toasts */}
          <Toaster position="top-center" />

          {/* Page Content */}
          <main className="pt-36">{children}</main>

        </body>
      </html>
    </ThirdwebProvider>
  );
}
