import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/PokemonInfo.css';

function PokemonInfo() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error(`Error fetching Pokémon: ${response.statusText}`);
                }
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        }

        fetchPokemon();
    });

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-info">
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        </div>
    );
}

export default PokemonInfo;