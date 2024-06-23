import { FC } from "react";
import PokemonCard from "./PokemonCard";
import fs from "fs";
import path from "path";
import parseNFTMetadata from "~~/utils/parseNFTMetadata";

const metadataDir = path.join(process.cwd(), "/nft/metadata");

const fetchPokemonMetadatas = async (filter = "") => {
  const metadataFiles = fs.readdirSync(metadataDir);
  const metadatas = await Promise.all(
    metadataFiles.map(async filename => ({
      id: parseInt(filename),
      ...parseNFTMetadata(fs.readFileSync(path.join(metadataDir, filename), "utf-8")),
    })),
  );

  return metadatas
    .sort((a, b) => a.id - b.id)
    .filter(
      metadata =>
        metadata.name.toLowerCase().includes(filter.toLowerCase()) ||
        metadata.types.some(type => type.toLowerCase().includes(filter.toLowerCase())),
    );
};

const PokemonNFTs: FC<{ filter?: string }> = async ({ filter }) => {
  const metadatas = await fetchPokemonMetadatas(filter);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
      {metadatas.map(metadata => (
        <PokemonCard key={metadata.id} id={metadata.id} metadata={metadata} />
      ))}
    </div>
  );
};

export default PokemonNFTs;
