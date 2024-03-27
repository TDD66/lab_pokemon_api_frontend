import Pokemon from "./Pokemon";

const PokemonListContainer = ({pokemons, title, handleCapture, buttonLabel}) => {

    const pokemonComponents = pokemons.map(pokemon=>{
        return <Pokemon key={pokemon.id} pokemon={pokemon} handleCapture={handleCapture} buttonLabel={buttonLabel}/>

    })
    return (  
        <>
            <h2>{title}</h2>
            {pokemonComponents}
        </>
    );
}
 
export default PokemonListContainer;