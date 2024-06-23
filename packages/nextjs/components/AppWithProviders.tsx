import { Toaster } from "react-hot-toast";
import { Header } from "~~/components/Header";
import { ProgressBar } from "~~/components/ProgressBar";

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

export const AppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar />
      <Web3PokemonApp>{children}</Web3PokemonApp>
    </>
  );
};
