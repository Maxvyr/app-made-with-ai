import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  const fetchPokemonDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading Pokemon details...</div>;
  }

  if (!pokemon) {
    return <div className="text-center mt-8">Pokemon not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/">
        <Button className="mb-4">Back to Pokedex</Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-48 h-48 mx-auto md:mx-0" />
            <div className="mt-4 md:mt-0 md:ml-8">
              <p>
                <strong>Height:</strong> {pokemon.height / 10} m
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight / 10} kg
              </p>
              <p>
                <strong>Types:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
              </p>
              <p>
                <strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </p>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Base Stats:</h3>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mt-2">
                    <strong>{stat.stat.name}:</strong> {stat.base_stat}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetail;
