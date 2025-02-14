const pokemonAPI = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export default pokemonAPI;
