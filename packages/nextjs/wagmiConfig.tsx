import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";

const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: "Pokemon Web3",
        url: process.env.NEXT_PUBLIC_VERCEL_URL,
        base64Icon: "",
      },
    }),
  ],
  transports: {
    [sepolia.id]: http("https://1rpc.io/sepolia"),
  },
});

export default config;
