import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PokemonDetail from "./PokemonDetail";

const PokedexList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pokemonPerPage = 20;

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();
      const pokemonWithDetails = await Promise.all(
        data.results.map(async (p, index) => {
          const id = index + 1;
          return {
            ...p,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        })
      );
      setPokemon(pokemonWithDetails);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center mt-8">Loading Pokedex...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokedex</h1>
      <Input type="text" placeholder="Search Pokemon" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPokemon.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={p.image} alt={p.name} className="mx-auto w-24 h-24" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2">
          Previous
        </Button>
        <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPokemon >= filteredPokemon.length}>
          Next
        </Button>
      </div>
    </div>
  );
};

const Pokedex = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default Pokedex;
