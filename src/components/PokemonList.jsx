import Pokemon from "./Pokemon";
import "./PokemonList.css";

const PokemonListContainer = ({pokemons, title, handleCapture, buttonLabel}) => {

    const pokemonComponents = pokemons.map(pokemon=>{
        return <Pokemon key={pokemon.id} pokemon={pokemon} handleCapture={handleCapture} buttonLabel={buttonLabel}/>

    })
    return (  
        <>
            <h2>{title}</h2>
            <div className="list">
            {pokemonComponents}
        </div>
    </>
    );
}
 
export default PokemonListContainer;