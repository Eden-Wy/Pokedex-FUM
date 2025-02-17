import { pokeAPI } from "./network.js";
export const pokeData = async () => {
  const data = await pokeAPI();
  console.log(data);
  if (!data || data.length === 0) {
    throw new Error("Data not found");
  }
  data.forEach(async (element) => {
    try {
      const result = await fetch(element.url);
      if (!result.ok) {
        throw new Error("No Network Response");
      }
      const pokemon = await result.json();
      const cardigan = document.createElement("div");
      cardigan.className = "w-[100px] bg-red-500";
      cardigan.innerHTML = `
                <p>${pokemon.name}</p>
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
                <p>Type: ${pokemon.types
                  .map((typeInfo) => typeInfo.type.name)
                  .join(", ")}</p>
                <div><img src="${pokemon.sprites.front_default}" alt="${
        pokemon.name
      }"></div>
            `;
      document.getElementById("cards").appendChild(cardigan);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  });
};
pokeData();