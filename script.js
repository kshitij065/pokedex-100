const pokemonListElement = document.getElementById('pokemon-list');

async function getPokemonData() {
  for (let i = 1; i <= 100; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemonData = await response.json();

    const pokemon = {
      name: pokemonData.name,
      image: pokemonData.sprites.other['official-artwork'].front_default,
      type: pokemonData.types.map(type => type.type.name),
      description: ''
    };

    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    const descriptionObject = speciesData.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    pokemon.description = descriptionObject.flavor_text;

    renderPokemon(pokemon);
  }
}

function renderPokemon(pokemon) {
  const pokemonElement = document.createElement('li');
  pokemonElement.innerHTML = `
    <img src="${pokemon.image}" alt="${pokemon.name}">
    <h2>${pokemon.name}</h2>
    <p>Type: ${pokemon.type.join(', ')}</p>
    <p>${pokemon.description}</p>
  `;
  pokemonListElement.appendChild(pokemonElement);
}

getPokemonData();
