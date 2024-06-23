import { Suspense } from "react";
import type { NextPage } from "next";
import PokemonNFTs from "~~/components/PokemonNFTs";
import SearchBar from "~~/components/SearchBar";

const Home: NextPage<{ searchParams: { q?: string } }> = ({ searchParams }) => {
  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-20">
        <div className="container lg:px-10 md:px-6 px-4">
          <SearchBar />
          <div className="my-10">
            <Suspense fallback="Loading collection...">
              <PokemonNFTs filter={searchParams.q} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
