import React, { PropsWithChildren, createContext, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { abi, address as contractAddress } from "~~/nft/PokemonNFT.json";

const tokenIds = Array.from({ length: 151 }, (_, i) => i);

interface BalancesContextProps {
  balances?: number[];
}

export const BalancesContext = createContext<BalancesContextProps>({});

export const BalancesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const args = useMemo(() => [Array.from({ length: 151 }, () => address), tokenIds], [address]);
  const result = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: "balanceOfBatch",
    args,
  });

  const balances = useMemo(
    () => (result.data as bigint[] | undefined)?.map(balance => parseInt(balance.toString(), 10)),
    [result.data],
  );

  return <BalancesContext.Provider value={{ balances }}>{children}</BalancesContext.Provider>;
};
