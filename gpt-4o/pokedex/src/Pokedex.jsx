import { useEffect, useState } from "react";
import "./App.css";

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Generation 1 Pokemon (Bulbasaur to Mew)
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => console.error("Error fetching Pokemon list:", error));
  }, []);

  // Fetch individual Pokemon details
  const fetchPokemonDetails = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
        setShowModal(true);
      })
      .catch((error) => console.error("Error fetching Pokemon details:", error));
  };

  return (
    <div className="pokedex-app">
      <h1>Gen 1 Pokedex</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-item" onClick={() => fetchPokemonDetails(pokemon.url)}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <div className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
          </div>
        ))}
      </div>

      {showModal && selectedPokemon && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <h3>Abilities:</h3>
            <ul>
              {selectedPokemon.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
