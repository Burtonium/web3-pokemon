import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export default createPublicClient({
  chain: sepolia,
  transport: http(),
});
