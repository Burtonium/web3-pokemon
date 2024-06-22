import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import "react-tooltip/dist/react-tooltip.css";
import { AppWithProviders } from "~~/components/AppWithProviders";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Pokemon Web3",
    template: "%s | Pokemon Web3",
  },
  description: "An app for collecting Pokemon on the blockchain",
  openGraph: {
    title: {
      default: "The Pokemon Web3 App",
      template: "%s | Pokemon Web3",
    },
    description: "An app for collecting Pokemon on the blockchain",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Pokemon Web3",
      template: "%s | Pokemon Web3",
    },
    description: "An app for collecting Pokemon on the blockchain",
  },
};

const EthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <AppWithProviders>{children}</AppWithProviders>
      </body>
    </html>
  );
};

export default EthApp;
