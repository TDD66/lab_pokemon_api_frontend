import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";

const PokemonContainer = () => {

    const [pokemons, setPokemons] = useState([]);
    const [myPokemons, setMyPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const fetchPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const pokemonData = await response.json();

        const pokemonRequests = pokemonData.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            return pokemonResponse.json();
        });

        Promise.all(pokemonRequests)
        .then((results) => {
            setPokemons(results);
        });
    }

    useEffect(() => {
        fetchPokemons();
    }, []);


    const handleCapture = (pokemon) => {
        if(pokemons.includes(pokemon) || filteredPokemons.includes(pokemon)){
            capturePokemon(pokemon);
        } else {
            releasePokemon(pokemon);
        };
    };
        
    const capturePokemon = (wildPokemon) => {
           
        if(filteredPokemons){
            removePokemonFromFilteredList(wildPokemon);
        }
        if(pokemons){
            removePokemonFromMainList(wildPokemon);
        }

        setMyPokemons([...myPokemons, wildPokemon]);
    }


    const releasePokemon = (pokemonToRelease) =>{
        removePokemonFromMyTeam(pokemonToRelease);
        if(filteredPokemons.length != 0){
            setFilteredPokemons([...filteredPokemons, pokemonToRelease]);
        };
        setPokemons([...pokemons, pokemonToRelease]);
    };


    const removePokemonFromMainList = (pokemonToRemove) => {
        const pokemonIndex = pokemons.indexOf(pokemonToRemove);
        pokemons.splice(pokemonIndex, 1);
        setPokemons([...pokemons]);
    }

    const removePokemonFromMyTeam = (pokemonToRemove) => {
        const pokemonIndex = myPokemons.indexOf(pokemonToRemove);
        myPokemons.splice(pokemonIndex, 1);
        setMyPokemons([...myPokemons]);
    }

    const removePokemonFromFilteredList = (pokemonToRemove) => {
        if(filteredPokemons){
            const pokemonIndex = filteredPokemons.indexOf(pokemonToRemove);
            filteredPokemons.splice(pokemonIndex, 1);
            setFilteredPokemons([...filteredPokemons]);
        };
    }

    return (  
        <>
            <h1>Hello from Pokemon Container!</h1>
            <div className="all-pokemons">
            <PokemonList pokemons={pokemons} title="All Pokemons" handleCapture={handleCapture} buttonLabel="Capture"/>
            </div>
            
            <div className="my-pokemons">
                <PokemonList pokemons={myPokemons} title="My Team" handleCapture={handleCapture} buttonLabel="Release"/>
            </div>
        </>
    );
}
 
export default PokemonContainer;