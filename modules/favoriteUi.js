import { getPokemonDescription } from "./network.js";
import { addFavorite, removeFavorite, getFavorites } from "./storage.js";

const pokemonList = document.querySelector("#pokemon-list");
const listContainer = document.querySelector("#list-container");
const sortBtn = document.querySelector("#azBtn");

let offset = 0;
const limit = 2;

const favoritePokemon = async (data) => {
  if (!data || data.length === 0) {
    console.warn("No favorite Pokémon found.");
    
    listContainer.innerHTML = `
      <div class="flex justify-center items-center h-[12rem]">
        <p class="text-red-500 text-[1rem]">No favorite Pokémon found.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = "";
  const slicedData = data.slice(0, offset + limit);
  
  for (const element of slicedData) {
    const description = await getPokemonDescription(element.id);

    const list = document.createElement("div");
    list.className =
      "w-[90%] min-h-[12rem] flex justify-start items-center gap-4 bg-white border-[1px] border-red-300 rounded-md pl-[1rem] shadow-md relative cursor-pointer grayscale hover:grayscale-0 transition ease-in-out duration-300 hover:scale-105";
    list.innerHTML = `
      <div class="w-[10rem] h-[8rem] flex justify-center items-center">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png" 
             alt="${element.name}" class="w-[10rem] h-[10rem]">
      </div>
      <div class="flex flex-col justify-center items-start">
        <p class="text-[1rem] text-red-500 font-medium">${element.name.toUpperCase()}</p>
        <p class="text-[.7rem]">Height: ${element.height}</p>
        <p class="text-[.7rem]">Weight: ${element.weight}</p>
        <p class="text-[.7rem]">Type: ${element.type}</p>
        <p class="text-[.7rem] italic text-red-500">${description}</p>
      </div>
    `;

    listContainer.appendChild(list);

    const favoriteBtn = document.createElement("img");
    favoriteBtn.src = "../src/assets/images/pokeballs/pokeball-full.png";
    favoriteBtn.alt = "Favorite";
    favoriteBtn.className =
      "w-[1.2rem] h-[1.2rem] absolute top-4 right-4 cursor-pointer";
    list.appendChild(favoriteBtn);

    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeFavorite(element.id);
      offset = limit; 
      favoritePokemon(getFavorites()); 
    });
  }

  loadMoreBtn.style.display = data.length > offset + limit ? "block" : "none";
};

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More";
loadMoreBtn.className =
  "bg-transparent hover:bg-red-700 text-red-700 text-[.7rem] hover:text-white border border-red-700 px-4 py-[.3rem] mt-4 rounded-full font-semibold cursor-pointer transition-all duration-300 hover:text-red-700 hover:border-transparent";
loadMoreBtn.style.display = "none"; 
pokemonList.appendChild(loadMoreBtn);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  favoritePokemon(getFavorites()); 
});

sortBtn.addEventListener("click", () => {
  const data = getFavorites();
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); 
  listContainer.innerHTML = ""; 
  favoritePokemon(sortedData); 
});

favoritePokemon(getFavorites());