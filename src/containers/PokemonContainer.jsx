import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import PokemonSearchForm from "../components/PokemonSearchForm";
import "./PokemonContainer.css";

const PokemonContainer = () => {

    const [pokemons, setPokemons] = useState([]);
    const [myPokemons, setMyPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const fetchPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
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
            if(myPokemons.length >= 6){
                return alert("Your team is full!!!");
            }
            capturePokemon(pokemon);
        } else {
            releasePokemon(pokemon);
        };
    };
        
    const capturePokemon = (wildPokemon) => {
           
        if(filteredPokemons){
            removePokemonFromFilteredList(wildPokemon);
            removePokemonFromMainList(wildPokemon);
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

    const filterPokemon = async(searchTerm) => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + searchTerm);
        const filteredJsonData = await response.json();
        setFilteredPokemons([filteredJsonData]);
    }

    const whichList = () => {
        if(filteredPokemons != 0){
            return <PokemonList pokemons={filteredPokemons} title="(Filtered) Wild Pokemon" handleCapture={handleCapture} buttonLabel="Capture"/>
           
        } else { 
            return  <PokemonList pokemons={pokemons} title="Wild Pokemon" handleCapture={handleCapture} buttonLabel="Capture"/>
        }
    }

    return (  
        <>
            <h1>Gen 1 Pokemon!</h1>
            <PokemonSearchForm setFilteredPokemons={setFilteredPokemons} filterPokemon={filterPokemon}/>
            <main>
            <div className="pokemon-lists">
                <div className="all-pokemon">
                    {whichList()}
                </div>
                <div className="my-pokemon">
                    <PokemonList pokemons={myPokemons} title="My Team" handleCapture={handleCapture} buttonLabel="Release"/>
                </div>
            </div>
            </main>
        </>
    );
}
 
export default PokemonContainer;