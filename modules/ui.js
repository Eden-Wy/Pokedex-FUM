import pokemonAPI from "./network.js";

const cards = document.querySelector(".cards");

let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
if (!Array.isArray(favorite)) {
  localStorage.setItem("favorite", JSON.stringify([]));
  favorite = [];
}

const pokemonData = async () => {
  const data = await pokemonAPI();
  console.log(data);
  if (!data || data.length === 0) {
    throw new Error("No data found");
  }

  data.forEach(async (element) => {
    const res = await fetch(element.url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const pokemon = await res.json();

    const card = document.createElement("div");
    card.className =
      "w-[200px] min-h-[200px] bg-gray-200 rounded-lg shadow-md flex flex-col items-center justify-center py-4";

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <h2>${pokemon.name}</h2>
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Experience: ${pokemon.base_experience}</p>
    `;

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
  });
};

pokemonData();

export default pokemonData;
