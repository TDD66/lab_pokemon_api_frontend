import { useEffect, useState } from "react";

const Pokemon = ({pokemon, handleCapture, buttonLabel}) => {

    const [baseStat, setBaseStat] = useState(pokemon.stats[0].base_stat);
    const [statCounter, setStatCounter] = useState(0);

    const types = pokemon.types.map(type => {
        return <li key={type.slot}>{type.type.name.toUpperCase()}</li>
    });

    const handleClick = () => {
        handleCapture(pokemon);
    }

    const handleUpgrade = () => {
        if(statCounter + 1 === pokemon.stats.length){
            return alert("All upgrades done!!!");
        }
        setStatCounter(statCounter + 1);
    }

    useEffect(() => {
        setBaseStat(pokemon.stats[statCounter].base_stat);
    }, [statCounter])

    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1);
    return (  
        <>
            <h3>{capitalizedName}</h3>
            <img src={pokemon.sprites.front_default} alt="" />
            <ul>{types}</ul>
            <p>Height: {pokemon.height*10}cm</p>
            <p>Weight: {pokemon.weight/10}kg</p>
            <p>Base Stat: {baseStat}</p>
            <button onClick={handleClick}>{buttonLabel}</button>
            <button onClick={handleUpgrade}>Upgrade</button>
        </>
    );
}
 
export default Pokemon;