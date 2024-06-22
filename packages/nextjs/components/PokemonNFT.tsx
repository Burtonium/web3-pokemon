"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks";
import useBalances from "~~/hooks/useBalances";
import useTokensMetadata from "~~/hooks/useTokensMetadata";
import { getParsedError } from "~~/utils";

const PokemonNFT: FC = () => {
  const [mintingError, setMintingError] = useState<string>();
  const [mintingSuccess, setMintingSuccess] = useState<string>();
  const balances = useBalances();
  const tokenIds = useMemo(
    () => (balances.data ? balances.data.map((balance: [number, number]) => balance[0]) : []),
    [balances.data],
  );
  const metadatas = useTokensMetadata(tokenIds);
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
              {request.isLoading ? "Minting" : "Mint Pokemon NFT"}
            </button>
            <p className="text-center text-error">{mintingError}</p>
            <p className="text-center text-success">{mintingSuccess}</p>
          </div>
          <div>{(!balances.data || balances.data.length === 0) && <p>No NFTs found</p>}</div>
          {balances.data && balances.data.length > 0 && metadatas && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {balances.data.map(balance => {
                const nft = metadatas?.find(meta => meta.id === balance[0]);
                return (
                  nft && (
                    <React.Fragment key={nft.id}>
                      <div data-tooltip-id={`nft-${nft.id}`} className="bg-slate-200 rounded-lg p-5 relative">
                        <div className="flex items-center gap-3">
                          <img alt="Resource image" className="bg-slate-100 rounded-lg" src={nft.httpsImage} />
                          <div className="px-4">
                            <h2 className="text-3xl font-bold capitalize">{nft.name}</h2>
                            <h3 className="text-2xl font-bold">Owned: {balance[1]}</h3>
                          </div>
                        </div>
                      </div>
                      <Tooltip className="z-10" id={`nft-${nft.id}`} place="top">
                        {nft.description}
                      </Tooltip>
                    </React.Fragment>
                  )
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PokemonNFT;
