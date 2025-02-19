document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.getElementById("pokemonList");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const span = document.getElementsByClassName("close")[0];

  // Close modal function
  const closeModal = () => {
    modal.style.display = "none";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = closeModal;

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  const loadPokemon = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await response.json();
      const pokemonElement = document.createElement("div");
      pokemonElement.className = "pokemon-card";
      pokemonElement.innerHTML = `
              <h3>${pokemon.name}</h3>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          `;
      pokemonElement.onclick = () => showDetails(pokemon);
      pokemonList.appendChild(pokemonElement);
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    }
  };

  const showDetails = (pokemon) => {
    modalContent.innerHTML = `
          <h2>${pokemon.name}</h2>
          <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
          <p>Height: ${pokemon.height}</p>
          <p>Weight: ${pokemon.weight}</p>
      `;
    modal.style.display = "block";
  };

  // Load the first 151 Pokémon
  for (let i = 1; i <= 151; i++) {
    loadPokemon(i);
  }
});
