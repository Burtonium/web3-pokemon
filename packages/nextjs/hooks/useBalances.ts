import { useMemo } from "react";
import { useScaffoldContractRead } from "./scaffold-eth";
import useTokensMetadata from "./useTokensMetadata";
import { useAccount } from "wagmi";
import { NFTMetadata } from "~~/utils/parseNFTMetadata";

type NFTMetadataWithId = NFTMetadata & { id: number };

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

  const metadatas = useTokensMetadata(ownedTokens?.map(([tokenId]) => tokenId));

  const tokens = useMemo<undefined | NFTMetadataWithId[]>(
    () =>
      metadatas &&
      balances.data &&
      balances.data.map((tokenId: bigint) => ({
        ...metadatas[parseInt(tokenId.toString())],
        id: parseInt(tokenId.toString()),
      })),
    [balances.data, metadatas],
  );

  return {
    ...balances,
    data: tokens,
  };
};

export default useBalances;
