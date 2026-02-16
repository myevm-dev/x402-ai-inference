"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import type { ConnectEmbedProps } from "thirdweb/react";
import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";

import { client } from "../lib/thirdweb.client";
import { paymentChain } from "../lib/constants";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const ConnectEmbedNoSSR = dynamic(
  () => import("thirdweb/react").then((m) => m.ConnectEmbed),
  { ssr: false }
);

const wallets = [
  inAppWallet({
    auth: { options: ["google", "email", "passkey"] },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
];

// NOTE: ConnectEmbedProps on your version does NOT support `supportedTokens`
export const connectEmbedOptions: ConnectEmbedProps = {
  client,
  wallets,
  chain: paymentChain,
};

export const connectOptions = connectEmbedOptions;

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function SignInButton() {
  const account = useActiveAccount();
  const wallet = useActiveWallet(); // <-- wallet object
  const { disconnect } = useDisconnect();

  const [open, setOpen] = useState(false);

  const address = account?.address;

  return (
    <div className="flex items-center gap-2">
      {!address ? (
        <>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
            onClick={() => setOpen(true)}
          >
            Sign in
          </button>

          {open && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
              onClick={() => setOpen(false)}
            >
              <div
                className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-950 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Connect wallet
                  </div>
                  <button
                    type="button"
                    className="text-sm px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <ConnectEmbedNoSSR {...connectEmbedOptions} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-sm text-zinc-700 dark:text-zinc-200">
            {shortAddr(address)}
          </div>

          <div
            role="button"
            tabIndex={0}
            className="text-xs px-2 py-1 rounded-md cursor-pointer select-none hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={async () => {
              await navigator.clipboard.writeText(address);
              toast.success("Address copied");
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter" || e.key === " ") {
                await navigator.clipboard.writeText(address);
                toast.success("Address copied");
              }
            }}
          >
            Copy
          </div>

          <button
            type="button"
            className="text-xs px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => {
              if (wallet) disconnect(wallet);
            }}
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
}
