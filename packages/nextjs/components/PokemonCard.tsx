"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import useBalances from "~~/hooks/useBalances";
import useMintNFT from "~~/hooks/useMintNFT";
import { NFTMetadata } from "~~/utils/parseNFTMetadata";

type Props = {
  id: number;
  metadata: NFTMetadata;
  owned?: number;
};

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
};

const PokemonCard: React.FC<Props> = ({ metadata, id }) => {
  const [disabled, setDisabled] = React.useState(false);
  const balances = useBalances();
  const { isConnected } = useAccount();
  const dialogId = `pokemon-modal-${id}`;
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const mintNFT = useMintNFT();

  // useEffect only happens when the component mounts, which we need here
  useEffect(() => {
    setDisabled(mintNFT.isPending || !isConnected);
  }, [isConnected, mintNFT.isPending]);

  const owned = useMemo(() => balances?.at(id) ?? 0, [balances, id]);

  return (
    <>
      <dialog ref={dialogRef} id={dialogId} className="modal">
        <div className="modal-box bg-dark-4">
          <h3 className="font-bold text-light capitalize text-3xl">{metadata.name}</h3>
          <p className="py-4 text-light">{metadata.description}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="card bg-dark-3 shadow-xl relative">
        {owned > 0 && (
          <div className="absolute top-2 right-2">
            <span className="badge bg-primary">Owned: {owned}</span>
          </div>
        )}
        <figure className="bg-dark-2/75">
          <Image width={280} height={200} src={metadata.image} alt="Shoes" />
        </figure>
        <div className="card-body justify-center">
          <h2 className="card-title capitalize text-3xl text-light">{metadata.name}</h2>
          <div className="flex gap-2">
            {metadata.types.map(type => (
              <span key={type} className={`badge border-none text-white ${typeColors[type]}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="card-actions mt-4 justify-center">
            <button onClick={() => mintNFT.write(id)} disabled={disabled} className="btn btn-primary">
              {mintNFT.isPending ? "Collecting" : "Collect"}
            </button>
          </div>
        </div>
        <div className="card-footer flex pb-6 justify-center">
          <button onClick={() => dialogRef.current?.showModal()} className=" text-primary">
            Details →
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
