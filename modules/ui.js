import { pokemonAPI } from "./network.js";

const cards = document.querySelector(".cards");
const main = document.querySelector("main");

let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
if (!Array.isArray(favorite)) {
  localStorage.setItem("favorite", JSON.stringify([]));
  favorite = [];
}

let data = [];
let visibleItems = 10;

export const fetchPokemonData = async () => {
  const apiData = await pokemonAPI();
  if (!apiData || apiData.length === 0) {
    throw new Error("No data found");
  }
  data = apiData;
  displayPokemonData();
  createLoadMoreButton();
};

export const displayPokemonData = async () => {
  const pokemonToShow = data.slice(0, visibleItems);

  cards.innerHTML = "";

  for (const element of pokemonToShow) {
    const res = await fetch(element.url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const pokemon = await res.json();

    const card = document.createElement("div");
    card.className =
      "w-[200px] min-h-[200px] bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center py-4 cursor-pointer";

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <h2>${pokemon.name}</h2>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Experience: ${pokemon.base_experience}</p>
    `;

    card.addEventListener("click", () => {
      const pokemonModal = document.createElement("div");
      pokemonModal.className =
        "modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10";
      pokemonModal.innerHTML = `
        <div class="modal-content w-[60%] h-[60%] bg-white p-4 rounded-lg shadow-lg relative flex items-center">   
          <img class="flex-1" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
          <div class="flex-1 p-4">
            <h2>${pokemon.name}</h2>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Experience: ${pokemon.base_experience}</p>
          </div>
        </div>
      `;
      const modalContent = pokemonModal.querySelector(".modal-content");
      const closeBtn = document.createElement("span");
      closeBtn.className =
        "close-button text-2xl text-right cursor-pointer absolute top-2 right-2";
      closeBtn.textContent = "×";
      closeBtn.addEventListener("click", () => {
        main.removeChild(pokemonModal);
      });
      modalContent.appendChild(closeBtn);
      main.appendChild(pokemonModal);
    });

    const favoriteButton = document.createElement("button");
    favoriteButton.className =
      "bg-blue-500 hover:bg-blue-700 text-[.5rem] text-white font-bold py-1 px-2 rounded mt-2";
    favoriteButton.textContent = "Favorite";

    const updateButtonState = () => {
      const isFavorite = favorite.some((item) => item.id === pokemon.id);
      if (isFavorite) {
        favoriteButton.textContent = "Favorited";
        favoriteButton.className =
          "bg-gray-500 text-[.5rem] text-white font-bold py-1 px-2 rounded mt-2";
      } else {
        favoriteButton.textContent = "Favorite";
        favoriteButton.className =
          "bg-blue-500 hover:bg-blue-700 text-[.5rem] text-white font-bold py-1 px-2 rounded mt-2";
      }
    };

    updateButtonState();

    favoriteButton.addEventListener("click", () => {
      const isFavorite = favorite.some((item) => item.id === pokemon.id);

      if (!isFavorite) {
        favorite.push(pokemon);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        alert("Added to favorite");
      } else {
        favorite = favorite.filter((item) => item.id !== pokemon.id);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        alert("Removed from favorite");
      }

      updateButtonState();
    });

    card.appendChild(favoriteButton);
    cards.appendChild(card);
  }
};

const createLoadMoreButton = () => {
  const container = document.createElement("div");
  container.className = "flex justify-center items-center flex-col gap-1 mt-4";
  const loadMoreButton = document.createElement("button");
  loadMoreButton.id = "loadMoreButton";
  loadMoreButton.className =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  loadMoreButton.textContent = "Load More";
  const numberOfItems = document.createElement("p");
  numberOfItems.className = "text-[.6rem]";
  numberOfItems.textContent = `Showing ${visibleItems} of ${data.length}`;

  loadMoreButton.addEventListener("click", () => {
    visibleItems += 5;
    numberOfItems.textContent = `Showing ${visibleItems} of ${data.length}`;
    displayPokemonData();
    updateLoadMoreButton();
  });

  container.appendChild(numberOfItems);
  container.appendChild(loadMoreButton);
  main.appendChild(container);
};

const updateLoadMoreButton = () => {
  const loadMoreButton = document.getElementById("loadMoreButton");
  if (visibleItems >= data.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
};

fetchPokemonData();
