const FAVORITES_KEY = "pokemonFavorites";

export const addFavorite = (id, name, type, height, weight) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const favoritePokemon = { id, name, type, height, weight };

  if (!favorites.some((pokemon) => pokemon.id === id)) {
    favorites.push(favoritePokemon);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

export const isFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  return favorites.some((pokemon) => pokemon.id === id);
};

export const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_KEY);
};

export const getFavorite = (id) => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  return favorites.find((pokemon) => pokemon.id === id);
};
