import PokemonNFT from "@web3-pokemon/hardhat/deployments/sepolia/PokemonNFT.json";
import { useWriteContract } from "wagmi";

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
