import { useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  sprites: { front_default: string };
}

interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
}

const Pokedex = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      const promises = data.results.map(async (pokemon: { url: string }) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      });
      const pokemons = await Promise.all(promises);
      setPokemons(pokemons);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const handleSelectPokemon = async (id: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data: PokemonDetails = await response.json();
    setSelectedPokemon(data);
  };

  const handleCloseDialog = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pokedex</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
              onClick={() => handleSelectPokemon(pokemon.id)}
            >
              <h2 className="text-lg font-bold text-gray-900">
                {pokemon.name}
              </h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p className="text-gray-600">
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
      {selectedPokemon && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleCloseDialog}
        >
          <div
            className="bg-white rounded-lg shadow-md p-4 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900">
              {selectedPokemon.name}
            </h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <p className="text-gray-600">
              {selectedPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p className="text-gray-600">
              Height: {selectedPokemon.height} | Weight:{" "}
              {selectedPokemon.weight}
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-4">Stats</h3>
            <ul>
              {selectedPokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
