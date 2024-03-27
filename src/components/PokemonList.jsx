import Pokemon from "./Pokemon";

const PokemonListContainer = ({pokemons}) => {

    const pokemonComponents = pokemons.map(pokemon=>{
        return <Pokemon key={pokemon.id} pokemon={pokemon} />

    })
    return (  
        <>
            <h2>Hello from Pokemon List Container!</h2>
            {pokemonComponents}
        </>
    );
}
 
export default PokemonListContainer;