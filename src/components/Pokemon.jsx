const Pokemon = ({pokemon}) => {

    const types = pokemon.types.map(type => {
        return <li key={type.slot}>{type.type.name}</li>
    });

    return (  
        <>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt="" />
            <p>Height: {pokemon.height*10}cm</p>
            <p>Weight: {pokemon.weight/10}kg</p>
            <p>Base Experience: {pokemon.base_experience}</p>
            <ul>{types}</ul>
        </>
    );
}
 
export default Pokemon;