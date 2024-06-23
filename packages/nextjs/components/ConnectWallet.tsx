"use client";

import Disconnect from "./Disconnect";
import WalletOptions from "./WalletOptions";
import { useAccount } from "wagmi";

const ConnectWallet = () => {
  const { isConnected, address } = useAccount();
  return isConnected && !!address ? <Disconnect /> : <WalletOptions />;
};

export default ConnectWallet;
