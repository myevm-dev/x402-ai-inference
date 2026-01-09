"use client";

import dynamic from "next/dynamic";
import type { ConnectButtonProps } from "thirdweb/react";

import { client } from "../lib/thirdweb.client";
import { paymentChain, paymentToken } from "../lib/constants";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "email", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
];

export const connectOptions: ConnectButtonProps = {
  client,
  wallets,
  chain: paymentChain,
  connectButton: {
    label: "Sign in",
  },
  supportedTokens: {
    [paymentChain.id]: [paymentToken],
  },
  detailsButton: {
    displayBalanceToken: {
      [paymentChain.id]: paymentToken.address,
    },
  },
};

// Important: render the actual thirdweb component only on the client
const ConnectButtonNoSSR = dynamic(
  () => import("thirdweb/react").then((m) => m.ConnectButton),
  { ssr: false }
);

export function SignInButton() {
  return <ConnectButtonNoSSR {...connectOptions} />;
}
