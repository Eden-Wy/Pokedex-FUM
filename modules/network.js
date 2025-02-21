export const pokeAPI = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=40";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

// pokeAPI()

export const getPokemonDescription = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await response.json();

    const flavorTextEntry = data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );

    return flavorTextEntry ? flavorTextEntry.flavor_text.replace(/[\n\f]/g, " ") : "No description available.";
  } catch (error) {
    console.error("Error fetching Pokémon description:", error);
    return "Description not found.";
  }
};