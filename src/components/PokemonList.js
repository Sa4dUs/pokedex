import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import Loading from "./Loading";
import { SearchPanel } from "./Navbar";

// pokedex initialization
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

let limit = 20;
let first = true;

const PokemonList = () => {
  // variable declaration
  const [scroll, setScroll] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let count = 0;

  const query = SearchPanel();

  // hooks
  useEffect(() => {
    if (limit <= 1116) {
      limit += 2;
    }
    getPokemons(limit);
  }, [scroll]);

  useEffect(() => {
    if (first === true && query !== "") {
      console.log("Redering pokemons");
      limit = 1118;
      getPokemons(limit);
      first = false;
    }
    count = 0;
  }, [query]);

  const getPokemons = (limit) => {
    console.log("Getting pokemons...", limit);
    P.resource([`/api/v2/pokemon?offset=0&limit=${limit}`])
      .then((response) => {
        setPokemons(response[0].results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("There was an ERROR: ", err);
      });
  };

  const failedSearch = () => {
    if (count === 0 && first === false) {
      let message =
        "It seems that the Pokemon you are looking for doesn't exist";
      return (
        <PokemonCard
          key={0}
          id={0}
          img={`https://www.latercera.com/resizer/CBmGvvFEACkiaL4Diatt7wyUqlM=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png`}
          name={"missigno"}
          message={message}
        />
      );
    }
  };

  window.addEventListener("scroll", () => {
    if (
      window.scrollY >=
      document.body.clientHeight - window.innerHeight - 1000
    ) {
      setScroll(window.scrollY);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container" style={{ textAlign: "center" }}>
      {pokemons.map((pokemon) => {
        const pokeId = pokemons.indexOf(pokemon);
        const { name, url } = pokemon;
        let message = "";
        let id = url.match(/\/\d+\//);
        id = id[0].substring(1, id[0].length - 1);
        if (name.includes(query)) {
          count += 1;
          return (
            <PokemonCard
              key={pokeId}
              id={id}
              name={name}
              img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              message={message}
            />
          );
        }
      })}
      {failedSearch()}
    </div>
  );
};

const PokemonCard = (props) => {
  const { id, name, img, message } = props;
  return (
    <div
      className="card border-secondary mb-3"
      style={{
        width: "25%",
        height: "20vh",
        display: "inline-block",
        margin: "1em",
        boxSizing: "border-box",
      }}
    >
      <img className="pokemon-artwork" src={img} alt={name} />
      <div className="info">
        <div className="info-pokemon">
          <span className="pokemon-tagname">
            <small className="text-muted" style={{ color: "#565656" }}>
              #{id.toString().padStart(3, "0")}{" "}
            </small>
            <h6 style={{ display: "inline", color: "#FFFFFF", opacity: "1" }}>
              {name}
            </h6>
          </span>
          {message || (
            <Link to={`/pokemon/${name}`}>
              <button className="btn btn-info" style={{ width: "100%" }}>
                More info
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export { PokemonList, PokemonCard };
