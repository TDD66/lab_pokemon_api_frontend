import { useState } from "react";

const PokemonSearchForm = ({setFilteredPokemons, filterPokemon}) => {

        //UseStates
        const [searchTerm,setSearchTerm] = useState("")


        //Function that filters country by the search term
        const submitSearch = (e) => {
            e.preventDefault();
            if(searchTerm && searchTerm !==' '){
                filterPokemon(searchTerm);
            }
            setFilteredPokemons([]);
        }

    return ( 
    <>
            <form onSubmit={submitSearch}>
            <input 
            type="text"
            name="pokemonName"
            placeholder="Search Pokemon!!"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
             />
             <input type="submit" name="getPokemon" />
        </form>
    </> );
}
 
export default PokemonSearchForm;