const refreshButton = document.getElementById('refresh-button');
const searchInput = document.getElementById('search-input');
const pokemonListElement = document.getElementById('pokemon-list');
const paginationElement = document.getElementById('pagination');

let currentPage = 1;
const pageSize = 20;
let totalPageCount = 1;

async function getRandomPokemonData(page) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
  const data = await response.json();

  const pokemonDataPromises = data.results.map(async result => {
    const pokemonResponse = await fetch(result.url);
    return pokemonResponse.json();
  });

  const
