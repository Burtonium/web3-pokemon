"use client";

import { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import useBalances from "~~/hooks/useBalances";
import { getParsedError } from "~~/utils/scaffold-eth";

const PokemonNFT: FC = () => {
  const [mintingError, setMintingError] = useState<string>();
  const [mintingSuccess, setMintingSuccess] = useState<string>();
  const balances = useBalances();
  const account = useAccount();

  useEffect(() => {
    setMintingError(undefined);
    setMintingSuccess(undefined);
  }, [account.address]);

  const request = useScaffoldContractWrite({
    contractName: "PokemonNFT",
    functionName: "requestPokemon",
    onMutate: () => {
      setMintingError(undefined);
      setMintingSuccess(undefined);
    },
    onSuccess: () => {
      setMintingSuccess("Transaction sent successfully!");
      setTimeout(() => {
        setMintingSuccess(undefined);
      }, 5000);
    },
    onError: error => {
      setMintingError(getParsedError(error));
    },
    onSettled: async () => {
      await balances.refetch();
    },
    args: [],
  });

  return balances.isLoading ? (
    "Loading collection..."
  ) : (
    <>
      {balances.isError ? <p>Error loading NFTs</p> : null}
      {balances.isSuccess && (
        <>
          <div className="text-center mb-5">
            <button onClick={() => request.write()} className="btn btn-primary">
              {request.isLoading ? "Minting" : "Mint NFT"}
            </button>
            <p className="text-center text-error">{mintingError}</p>
            <p className="text-center text-success">{mintingSuccess}</p>
          </div>
          <div>{(!balances.data || balances.data.length === 0) && <p>No NFTs found</p>}</div>
          {balances.data && balances.data.length > 0 && (
            <>
              <div className="grid lg:grid-cols-3 gap-5">
                {balances.data.map(nft => (
                  <div className="bg-slate-200 rounded-lg p-5" key={nft.id}>
                    <div className="flex flex-wrap items-center gap-3">
                      <img alt="Resource image" className="aspect-[4/3]" src={nft.httpsImage} />
                      <h2 className="text-3xl font-bold">{nft.name}</h2>
                    </div>
                    <p className="italic">{nft.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PokemonNFT;
