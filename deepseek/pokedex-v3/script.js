document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.getElementById("pokemon-list");
  const dialog = document.getElementById("pokemon-dialog");
  const dialogContent = dialog.querySelector(".dialog-content");
  const closeBtn = dialog.querySelector(".close");
  const dialogName = dialog.querySelector("#dialog-name");
  const dialogImage = dialog.querySelector("#dialog-image");
  const dialogType = dialog.querySelector("#dialog-type");
  const dialogHeight = dialog.querySelector("#dialog-height");
  const dialogWeight = dialog.querySelector("#dialog-weight");

  // Fetch the first 151 Pokémon
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");
        pokemonCard.innerHTML = `
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[6]
                  }.png" alt="${pokemon.name}">
                  <p>${pokemon.name}</p>
              `;
        pokemonCard.addEventListener("click", () => showPokemonDetails(pokemon.url));
        pokemonList.appendChild(pokemonCard);
      });
    });

  // Function to show Pokémon details in a dialog
  function showPokemonDetails(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dialogName.textContent = data.name;
        dialogImage.src = data.sprites.front_default;
        dialogType.textContent = data.types.map((type) => type.type.name).join(", ");
        dialogHeight.textContent = data.height;
        dialogWeight.textContent = data.weight;
        dialog.style.display = "flex";
      });
  }

  // Close the dialog
  closeBtn.addEventListener("click", () => {
    dialog.style.display = "none";
  });
});
