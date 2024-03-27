import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";

const PokemonContainer = () => {

    const [pokemons, setPokemons] = useState([]);

    const fetchPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const pokemonData = await response.json();

        const pokemonRequests = pokemonData.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            return pokemonResponse.json();
        });

        Promise.all(pokemonRequests)
        .then((results) => {
            setPokemons(results)
        });
    }

    useEffect(() => {
        fetchPokemons();
    }, [])

    return (  
        <>
            <h1>Hello from Pokemon Container!</h1>
            <PokemonList pokemons={pokemons}/>
        </>
    );
}
 
export default PokemonContainer;