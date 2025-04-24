import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/PokemonList.css';

function PokemonList() {
    const [pokemon, setPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const limit = 20;

    useEffect(() => {
        fetchAndDisplayPokemon();
    }, [offset]);


    async function fetchPokemonList(limit = 20, offset = 0) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            if (!response.ok) {
                throw new Error(`Error fetching Pokémon: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch Pokémon list:", error);
            throw error;
        }
    }

    async function fetchAndDisplayPokemon() {
        setLoading(true);
        try {
            const data = await fetchPokemonList(limit, offset);
            const pokemonDetails = await Promise.all(
                data.results.map(async (poke) => {
                    const response = await fetch(poke.url);
                    const details = await response.json();
                    return {
                        name: details.name,
                        sprites: details.sprites.front_default,
                        types: details.types.map((type) => type.type.name)
                    };
                })
            );
            setPokemon(pokemonDetails);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        } finally {
            setLoading(false);
        }
    }

    function handleNext() {
        setOffset((prevOffset) => prevOffset + limit);
    }

    function handlePrevious() {
        setOffset((prevOffset) => Math.max(0, prevOffset - limit));
    }

    return (
        <div>
            <h1>Pokemon List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="pokemon-list">
                    {pokemon.map((poke, index) => (
                        <Link to={`/pokemon/${poke.name}`} key={index} className="pokemon-card">
                            <img src={poke.sprites} alt={poke.name} />
                            <h3>{poke.name}</h3>
                            <p>{poke.types.join(', ')}</p>
                        </Link>
                    ))}
                </div>
            )}
            <div>
                <button onClick={handlePrevious} disabled={offset === 0}>
                    Previous
                </button>
                <button onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;