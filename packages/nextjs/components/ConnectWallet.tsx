"use client";

import Disconnect from "./Disconnect";
import WalletOptions from "./WalletOptions";
import { useAccount } from "wagmi";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Disconnect />;
  return <WalletOptions />;
};

export default ConnectWallet;
