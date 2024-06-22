import { useMemo } from "react";
import { useScaffoldContractRead } from "./";
import { useAccount } from "wagmi";

const TOTAL_TOKENS = 151;
const TOKEN_IDS = Array.from({ length: TOTAL_TOKENS }, (_, index) => index);

const useBalances = () => {
  const account = useAccount();
  const addresses = useMemo(() => Array.from({ length: TOKEN_IDS.length }, () => account.address), [account.address]);
  const balances = useScaffoldContractRead({
    contractName: "PokemonNFT",
    functionName: "balanceOfBatch",
    args: [addresses, TOKEN_IDS],
  });

  const ownedTokens = useMemo<[number, number][] | undefined>(
    () =>
      balances.data &&
      balances.data.reduce(
        (acc: [number, number][], balance: bigint, tokenId: number) =>
          balance > 0 ? [...acc, [tokenId, Number(balance)]] : acc,
        [] as [number, number][],
      ),
    [balances.data],
  );

  return {
    ...balances,
    data: ownedTokens,
  };
};

export default useBalances;
