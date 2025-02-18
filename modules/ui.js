import { pokeAPI } from "../modules/network.js";
import { addFavorite, removeFavorite } from "./storage.js";

const listContainer = document.querySelector("#list-container");
const body = document.querySelector("body");

export const pokeData = async () => {
  try {
    const data = await pokeAPI();
    console.log(data);
    if (!data || !data.results || data.results.length === 0) {
      throw new Error("Data not found");
    }
    data.results.forEach(async (element) => {
      try {
        const result = await fetch(element.url);
        if (!result.ok) {
          throw new Error("No Network Response");
        }
        const pokemon = await result.json();
        const cardigan = document.createElement("div");
        cardigan.className =
          "w-[12rem] h-[15rem] flex flex-col justify-between items-center bg-white border-[1px] border-slate-300 rounded-md shadow-md pb-[.7rem] relative cursor-pointer";
        cardigan.innerHTML = `
        <div class="w-full h-[8rem] flex justify-center items-center">
          <img src="${pokemon.sprites.front_default}" alt="${
          pokemon.name
        }" class="w-full h-[100%] bg-gray-200">
        </div>
          <p class="text-[1rem] font-medium">${pokemon.name.toUpperCase()}</p>
          <p class="text-[.7rem]">Height: ${pokemon.height}</p>
          <p class="text-[.7rem]">Weight: ${pokemon.weight}</p>
          <p class="text-[.7rem]">Type: ${pokemon.types
            .map((typeInfo) => typeInfo.type.name)
            .join(", ")}</p>
        `;
        listContainer.appendChild(cardigan);
        cardigan.addEventListener("click", () => {
          const modal = document.createElement("div");
          modal.className =
            "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center";
          const modalContent = document.createElement("div");
          modalContent.className =
            "w-[30rem] h-[40rem] bg-white border-[1px] border-slate-300 rounded-md shadow-md flex flex-col justify-between items-center p-4";
          modal.appendChild(modalContent);
          body.appendChild(modal);
        });

        const favoriteBtn = document.createElement("img");
        favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-1.png";
        favoriteBtn.alt = "Favorite";
        favoriteBtn.className =
          "w-[1.5rem] h-[1.5rem] absolute top-2 right-2 cursor-pointer";
        cardigan.appendChild(favoriteBtn);
        favoriteBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          
          if (favoriteBtn.src.includes("pokeball-1.png")) {
            favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-2.png";
            addFavorite(id,name,type,height,weight);
          } else {
            favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-1.png";
            removeFavorite(id);
          }
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    });
  } catch (error) {
    console.error("Error in pokeData:", error);
  }
};
pokeData();
