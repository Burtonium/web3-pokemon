import { useWriteContract } from "wagmi";
import PokemonNFT from "~~/nft/PokemonNFT.json";

const useMintNFT = () => {
  const { writeContract: write, isError, isSuccess, isPending } = useWriteContract();

  return {
    isError,
    isSuccess,
    isPending,
    write: (id: number) => {
      return write({
        address: PokemonNFT.address as `0x${string}`,
        abi: PokemonNFT.abi,
        functionName: "mint",
        args: [id],
      });
    },
  };
};

export default useMintNFT;
