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