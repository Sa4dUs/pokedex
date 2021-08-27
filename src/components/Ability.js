import { React, useState } from "react";
import { Route, useParams } from "react-router-dom";

// components
import Loading from "./Loading";
import { PokemonCard } from "./PokemonList";

// pokedex initialization
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

const Ability = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  const [data, setData] = useState({});

  P.getAbilityByName(name)
    .then((response) => {
      setData(response);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("There was an ERROR: ", error);
    });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Route path="/ability/:name">
      <h3>{name.replace("-", " ")}</h3>
      <hr />
      {data.effect_entries.map((entry) => {
        if (entry.language.name === "en") {
          return <p>{entry.effect}</p>;
        }
      })}
      <h4>Pokemon with {name.replace("-", " ")}</h4>
      <hr />
      <div style={{textAlign: "center"}}>
        {data.pokemon.map((pokemon) => {
          const { name, url } = pokemon.pokemon;
          let message = "";
          let id = url.match(/\/\d+\//);
          id = id[0].substring(1, id[0].length - 1);
          return (
            <PokemonCard key={id - 1} id={id} name={name} img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} message={message} />
          );
        })}
      </div>
    </Route>
  );
};

export default Ability;
