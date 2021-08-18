import { React, useState, useEffect } from "react";
import { Route, Link, useParams } from "react-router-dom";

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

  P.getMoveByName(name)
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
    <Route path="/move/:name">
      <h3>{name.replace("-", " ")}</h3>
      <hr />
      {data.effect_entries.map((entry) => {
        if (entry.language.name === "en") {
          return <p>{entry.effect}</p>;
        }
      })}
      <table class="table table-hover">
        <tr>
          <th scope="row">Type</th>
          <td>{data.type.name}</td>
        </tr>
        <tr>
          <th scope="row">Accuracy</th>
          <td>{data.accuracy || "-"}</td>
        </tr>
        <tr>
          <th scope="row">Category</th>
          <td>{data.damage_class.name}</td>
        </tr>
        <tr>
          <th scope="row">Power</th>
          <td>{data.power || "-"}</td>
        </tr>
        <tr>
          <th scope="row">PP</th>
          <td>{data.pp}</td>
        </tr>
        <tr>
          <th scope="row">Target</th>
          <td>{data.target.name.replace("-", " ")}</td>
        </tr>
        <tr>
          <th scope="row">Priority</th>
          <td>{data.priority}</td>
        </tr>
      </table>
      <h5>learned by</h5>
      <hr />
      <div style={{textAlign: "center"}}>
        {data.learned_by_pokemon.map((pokemon) => {
          const { name, url } = pokemon;
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
