const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const suggestionsList = document.getElementById('search-suggestions');
const pokemonList = document.getElementById('pokemon-list');

let pokemonData = [];

// Fetch Pokémon data from the PokeAPI
async function fetchPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    pokemonData = data.results.map(pokemon => pokemon.name);
}

// Display suggestions based on input
function displaySuggestions(value) {
    suggestionsList.innerHTML = '';
    const filteredPokemon = pokemonData.filter(pokemon => pokemon.toLowerCase().includes(value.toLowerCase()));
    
    filteredPokemon.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon;
        li.onclick = () => searchPokemon(pokemon);
        suggestionsList.appendChild(li);
    });
}

// Search for the Pokémon and display it
function searchPokemon(pokemon) {
    suggestionsList.innerHTML = '';
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            pokemonList.innerHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <p>Height: ${data.height}</p>
                <p>Weight: ${data.weight}</p>
            `;
        });
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value) {
        displaySuggestions(value);
    } else {
        suggestionsList.innerHTML = '';
    }
});

searchButton.addEventListener('click', () => {
    const value = searchInput.value.toLowerCase();
    if (pokemonData.includes(value)) {
        searchPokemon(value);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const value = searchInput.value.toLowerCase();
        if (pokemonData.includes(value)) {
            searchPokemon(value);
        }
    }
});

// Initialize the app
fetchPokemonData();