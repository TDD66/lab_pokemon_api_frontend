const Pokemon = ({pokemon, handleCapture, buttonLabel}) => {

    const types = pokemon.types.map(type => {
        return <li key={type.slot}>{type.type.name.toUpperCase()}</li>
    });

    const handleClick = () => {
        handleCapture(pokemon);
    }
    const capitalizedName =    pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    return (  
        <>
            <h3>{capitalizedName}</h3>
            <img src={pokemon.sprites.front_default} alt="" />
            <ul>{types}</ul>
            <p>Height: {pokemon.height*10}cm</p>
            <p>Weight: {pokemon.weight/10}kg</p>
            <p>Base Experience: {pokemon.base_experience}</p>
            <button onClick={handleClick}>{buttonLabel}</button>
        </>
    );
}
 
export default Pokemon;