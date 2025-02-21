import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * A simple color mapping by primary type. Add or modify as needed.
 * If a Pokémon has multiple types, we use the first type for the card’s color.
 */
const typeColorMap = {
  normal: "bg-gray-400",
  fire: "bg-red-400",
  water: "bg-blue-400",
  grass: "bg-green-400",
  electric: "bg-yellow-400",
  ice: "bg-cyan-400",
  fighting: "bg-red-500",
  poison: "bg-purple-400",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-400",
  bug: "bg-green-600",
  rock: "bg-yellow-600",
  ghost: "bg-purple-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-200",
};

export default function SimplePokedex() {
  // The entire list of Pokémon details:
  const [allPokemon, setAllPokemon] = useState([]);

  // Display list after filtering (by name/ID) if user types in search:
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the first 151 Pokémon on component mount
  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  // Get an array of the first 151 Pokémon plus their details
  const fetchInitialPokemon = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data.");
      }
      const data = await response.json();

      // data.results is an array of { name, url }.
      // For each item, fetch additional details (ID, types, sprites, etc.).
      const details = await Promise.all(
        data.results.map(async (pokemon: { url: string | URL | Request }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setAllPokemon(details);
      setFilteredPokemon(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter logic when user types something.
  // We’ll search for name or numeric ID.
  const handleSearchChange = (e: { target: { value: string } }) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      // If empty, show all
      setFilteredPokemon(allPokemon);
    } else {
      const filtered = allPokemon.filter((p) => {
        return p.name.includes(term) || p.id.toString().includes(term);
      });
      setFilteredPokemon(filtered);
    }
  };

  // Currently does nothing, but you could trigger external fetch here.
  const handleSearchClick = () => {
    // We are already filtering onChange
  };

  // A helper to choose background color based on the first type.
  const getTypeColor = (pokemon: never) => {
    if (!pokemon.types || pokemon.types.length === 0) {
      return "bg-gray-300";
    }
    const primaryType = pokemon.types[0].type.name;
    return typeColorMap[primaryType] || "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header and search bar */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64"
          />
          <Button onClick={handleSearchClick}>Search</Button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center mb-4 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {/* Loading state */}
      {isLoading && <div className="text-center">Loading Pokémon...</div>}

      {/* Pokémon Grid */}
      {!isLoading && (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredPokemon.map((p) => {
              const bgColor = getTypeColor(p);
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`relative rounded-xl p-4 text-white shadow-md ${bgColor} h-[180px] overflow-hidden flex flex-col`}
                >
                  {/* Pokémon number in top-right corner */}
                  <div className="absolute top-2 right-2 text-sm opacity-70">
                    #{p.id.toString().padStart(3, "0")}
                  </div>

                  {/* Pokémon name */}
                  <h2 className="font-bold text-xl mb-1 capitalize">
                    {p.name}
                  </h2>

                  {/* Pokémon types */}
                  <div className="flex gap-1 mb-2">
                    {p.types.map(
                      (t: {
                        type: {
                          name:
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.Key
                            | null
                            | undefined;
                        };
                      }) => (
                        <span
                          key={t.type.name}
                          className="bg-white/20 rounded-full px-2 py-1 text-xs capitalize"
                        >
                          {t.type.name}
                        </span>
                      )
                    )}
                  </div>

                  {/* Pokémon sprite: placed at the bottom-right */}
                  <img
                    src={
                      p.sprites?.other?.["official-artwork"]?.front_default ||
                      p.sprites?.front_default
                    }
                    alt={p.name}
                    className="w-20 h-20 absolute bottom-2 right-2"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
