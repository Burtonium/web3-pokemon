"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import PokemonNFT from "~~/components/PokemonNFT";

const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">{address ? <PokemonNFT /> : <p>Please connect your wallet.</p>}</div>
      </div>
    </>
  );
};

export default Home;
