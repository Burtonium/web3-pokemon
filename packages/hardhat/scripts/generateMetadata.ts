import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";

const overrides: Record<string, string> = {
  "nidoran-f": "nidoran%E2%99%80",
  "nidoran-m": "nidoran%E2%99%82",
  "mr-mime": "mr._mime",
};

function getDescriptionFromResponse(responseData: string): string {
  // Use a HTML parsing library like cheerio to extract the description from the response data
  // Example code using cheerio:
  const $ = cheerio.load(responseData);
  const descriptionElement = $(".mw-parser-output p").first();
  const description = descriptionElement.text();
  return description;
}

async function main() {
  try {
    fs.mkdirSync("../nextjs/nft/metadata", { recursive: true });
    const files = fs.readdirSync("../nextjs/nft/metadata");
    let lastWrittenIndex = 0;
    for (const file of files) {
      const index = parseInt(file);
      if (!isNaN(index) && index > lastWrittenIndex) {
        lastWrittenIndex = index;
      }
    }
    const startIndex = lastWrittenIndex;
    console.log(`Starting index: ${startIndex}`);
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemonList = response.data.results;

    for (const pokemon of pokemonList.slice(startIndex)) {
      const pokemonData = await axios.get(pokemon.url);
      const name = overrides[pokemonData.data.name] || pokemonData.data.name;
      const descriptionResponse = await axios.get(`https://bulbapedia.bulbagarden.net/wiki/${name}`);
      const description = getDescriptionFromResponse(descriptionResponse.data);

      const metadata = {
        name: pokemonData.data.name,
        description,
        image: pokemonData.data.sprites.front_default,
        attributes: [
          ...pokemonData.data.types.map((type: any) => ({
            trait_type: "Type",
            value: type.type.name,
          })),
          {
            trait_type: "Weight",
            value: pokemonData.data.weight,
          },
          {
            trait_type: "Height",
            value: pokemonData.data.height,
          },
        ],
      };

      const fileName = `../nextjs/nft/metadata/${pokemonData.data.id}`;
      fs.writeFileSync(fileName, JSON.stringify(metadata, null, 2));
      console.log(`Generated metadata file for ${pokemonData.data.name}`);
    }

    console.log("All metadata files generated successfully!");
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}
(async () => {
  await main();
})();
