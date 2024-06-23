"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Header } from "~~/components/Header";
import { ProgressBar } from "~~/components/ProgressBar";
import { BalancesProvider } from "~~/providers/BalancesProvider";
import wagmiConfig from "~~/wagmiConfig";

const Web3PokemonApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
      <Toaster />
    </>
  );
};

const queryClient = new QueryClient();

export const AppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BalancesProvider>
          <ProgressBar />
          <Web3PokemonApp>{children}</Web3PokemonApp>
        </BalancesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
