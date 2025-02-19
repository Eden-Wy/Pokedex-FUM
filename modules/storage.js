export const addFavorite = (id, name, type, height, weight) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((pokemon) => pokemon.id === id)) {
    favorites.push({ id, name, type, height, weight });
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};


export const removeFavorite = (id) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
