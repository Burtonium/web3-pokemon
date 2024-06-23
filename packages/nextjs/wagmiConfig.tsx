import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://1rpc.io/sepolia"),
  },
});

export default config;
