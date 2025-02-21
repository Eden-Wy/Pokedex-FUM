import { pokeAPI } from "../modules/network.js";
import { addFavorite, removeFavorite, getFavorites } from "./storage.js";

const pokemonList = document.querySelector("#pokemon-list");
const listContainer = document.querySelector("#list-container");
const body = document.querySelector("body");
const searchInput = document.querySelector("#search-input");
const loadMoreBtn = document.createElement("button");

let offset = 0;
const limit = 12;

export const pokeData = async () => {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const jsonData = await data.json();
    if (!jsonData || !jsonData.results || jsonData.results.length === 0) {
      throw new Error("Data not found");
    }

    const favorites = getFavorites();
    const checkFavorite = (pokemonId) => favorites.some((fav) => fav.id === pokemonId);

    jsonData.results.forEach(async (element) => {
      try {
        const result = await fetch(element.url);
        if (!result.ok) {
          throw new Error("No Network Response");
        }
        const pokemon = await result.json();
        console.log(pokemon);

        const pokemonId = element.url.split("/").filter(Boolean).pop();
        const isFavorite = checkFavorite(pokemonId);

        const cardigan = document.createElement("div");
        cardigan.className =
          "w-[12rem] h-[15rem] flex flex-col justify-between items-center bg-white border-[1px] border-slate-300 rounded-md shadow-md pb-[.7rem] relative cursor-pointer grayscale hover:grayscale-0 transition ease-in-out duration-300 hover:scale-105";
        cardigan.innerHTML = `
          <div class="w-full h-[8rem] flex justify-center items-center">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" 
             alt="${pokemon.name}" class="w-full h-[100%] bg-gray-200">
          </div>
          <p class="text-[1rem] font-medium">${pokemon.name.toUpperCase()}</p>
          <p class="text-[.7rem]">Height: ${pokemon.height}</p>
          <p class="text-[.7rem]">Weight: ${pokemon.weight}</p>
          <p class="text-[.7rem]">Type: ${pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
        `;
        listContainer.appendChild(cardigan);

        const favoriteBtn = document.createElement("img");
        favoriteBtn.src = isFavorite
          ? "../src/assets/images/pokeballs/pokeball-full.png"
          : "../src/assets/images/pokeballs/pokeball-empty.png";
        favoriteBtn.alt = "Favorite";
        favoriteBtn.className =
          "w-[1.2rem] h-[1.2rem] absolute top-2 right-2 cursor-pointer";
        cardigan.appendChild(favoriteBtn);

        favoriteBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          const id = pokemonId;
          const name = pokemon.name;
          const type = pokemon.types.map((t) => t.type.name).join(", ");
          const height = pokemon.height;
          const weight = pokemon.weight;

          if (favoriteBtn.src.includes("pokeball-empty.png")) {
            favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-full.png";
            addFavorite(id, name, type, height, weight);
            cardigan.classList.remove("grayscale");
          } else {
            favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-empty.png";
            removeFavorite(id);
            cardigan.classList.add("grayscale");
          }
        });

        cardigan.addEventListener("click", () => {
          const modal = document.createElement("div");
          modal.className =
            "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center";
          const modalContent = document.createElement("div");
          modalContent.className =
            "w-[35rem] h-[20rem] bg-white border-[1px] border-red-600 rounded-md shadow-md flex justify-center items-center p-2 relative";

          const modalContentLeft = document.createElement("div");
          modalContentLeft.className = "w-[40%] h-full flex items-center";
          modalContent.appendChild(modalContentLeft);

          const modalContentRight = document.createElement("div");
          modalContentRight.className =
            "w-[60%] h-full flex flex-col justify-center items-center gap-[2rem]";
          modalContent.appendChild(modalContentRight);

          const modalContentRightTop = document.createElement("div");
          modalContentRightTop.className =
            "w-full flex justify-start items-center pl-7";
          modalContentRight.appendChild(modalContentRightTop);

          const modalContentRightBottom = document.createElement("div");
          modalContentRightBottom.className =
            "w-full flex flex-col justify-center items-start gap-1 pl-7";
          modalContentRight.appendChild(modalContentRightBottom);

          const modalImage = document.createElement("img");
          modalImage.src = pokemon.sprites.front_default;
          modalImage.alt = pokemon.name;
          modalImage.className = "w-[100%] h-[100%]  bg-gray-200";
          modalContentLeft.appendChild(modalImage);

          const modalName = document.createElement("p");
          modalName.className = "text-[2rem] font-medium text-red-600";
          modalName.textContent = pokemon.name.toUpperCase();
          modalContentRightTop.appendChild(modalName);

          const modalBaseExperience = document.createElement("p");
          modalBaseExperience.className = "text-[.7rem] capitalize";
          modalBaseExperience.innerHTML = `<span class="text-red-500 mr-1">Base Experience</span>: ${pokemon.base_experience}`;
          modalContentRightBottom.appendChild(modalBaseExperience);

          const modalHeight = document.createElement("p");
          modalHeight.className = "text-[.7rem] capitalize";
          modalHeight.innerHTML = `<span class="text-red-500 mr-1">Height</span>: ${pokemon.height}`;
          modalContentRightBottom.appendChild(modalHeight);

          const modalWeight = document.createElement("p");
          modalWeight.className = "text-[.7rem] capitalize";
          modalWeight.innerHTML = `<span class="text-red-500 mr-1">Weight</span>: ${pokemon.weight}`;
          modalContentRightBottom.appendChild(modalWeight);

          const modalType = document.createElement("p");
          modalType.className = "text-[.7rem] capitalize";
          modalType.innerHTML = `<span class="text-red-500 mr-1">Type</span>: ${pokemon.types
            .map((type) => type.type.name)
            .join(", ")}`;
          modalContentRightBottom.appendChild(modalType);

          const modalGender = document.createElement("p");
          modalGender.className = "text-[.7rem] capitalize";
          modalGender.innerHTML = `<span class="text-red-500 mr-1">Gender</span>: ${pokemon.forms
            .map((form) => form.name)
            .join(", ")}`;
          modalContentRightBottom.appendChild(modalGender);

          const modalClose = document.createElement("button");
          modalClose.className =
            "w-[1.5rem] h-[1.5rem] text-[.8rem] absolute top-3 right-6 cursor-pointer";
          modalClose.textContent = "Close";
          modalClose.addEventListener("click", () => {
            modal.remove();
          });
          modalContent.appendChild(modalClose);

          modal.appendChild(modalContent);
          body.appendChild(modal);
        });

        const searchPokemon = () => {
          searchInput.addEventListener("input", () => {
            const searchValue = searchInput.value.toLowerCase();
            const allPokemon = document.querySelectorAll("div");

            allPokemon.forEach((pokemon) => {
              const nameElement = pokemon.querySelector("p");
              if (!nameElement) return;

              const name = nameElement.textContent.toLowerCase();

              if (name.includes(searchValue)) {
                pokemon.style.display = "flex";
              } else {
                pokemon.style.display = "none";
              }
            });
          });
        };

        searchPokemon();

        const sortBtn = document.querySelector("#azBtn");

        sortBtn.addEventListener("click", () => {
          const allPokemon = Array.from(listContainer.children);

          allPokemon.sort((a, b) => {
            const nameA = a.querySelector("p").textContent.toLowerCase();
            const nameB = b.querySelector("p").textContent.toLowerCase();
            return nameA.localeCompare(nameB);
          });

          listContainer.innerHTML = "";
          allPokemon.forEach((pokemon) => {
            listContainer.appendChild(pokemon);
          });
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    });
  } catch (error) {
    console.error("Error in pokeData:", error);
  }
};

loadMoreBtn.textContent = "Load More";
loadMoreBtn.className = "bg-transparent hover:bg-red-700 text-red-700 text-[.7rem] hover:text-white border border-red-700 px-4 py-[.3rem] mt-4 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:text-red-700 hover:border-transparent";
loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  pokeData();
});
pokemonList.appendChild(loadMoreBtn);

pokeData();
