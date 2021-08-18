import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import Loading from "./Loading";
import { SearchPanel } from "./Navbar";

// pokedex initialization
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

let limit = 20;
let first = true;

const AbilityList = () => {
  // variable declaration
  const [scroll, setScroll] = useState(0);
  const [abilities, setAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let count = 0;

  const query = SearchPanel();

  // hooks
  useEffect(() => {
    if (limit <= 896) {
      limit += 2;
    }
    getAbilities(limit);
  }, [scroll]);

  useEffect(() => {
    if (first === true && query !== "") {
      console.log("Redering abilities");
      limit = 898;
      getAbilities(limit);
      first = false;
    }
    count = 0;
  }, [query]);

  const getAbilities = (limit) => {
    console.log("Getting abilities...", limit);
    P.resource([`/api/v2/ability?offset=0&limit=${limit}`])
      .then((response) => {
        setAbilities(response[0].results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("There was an ERROR: ", err);
      });
  };

  const failedSearch = () => {
    if (count === 0 && first === false) {
      let message =
        "It seems that the ability you are looking for doesn't exist";
      return <AbilityCard key={0} id={0} name={"missigno"} message={message} />;
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
      {abilities.map((ability) => {
        const abilityId = abilities.indexOf(ability);
        const { name, url } = ability;
        let message = "";
        let id = url.match(/\/\d+\//);
        id = id[0].substring(1, id[0].length - 1);
        if (name.includes(query)) {
          count += 1;
          return (
            <AbilityCard
              key={abilityId}
              id={id}
              name={name}
              message={message}
            />
          );
        }
      })}
      {failedSearch()}
    </div>
  );
};

const AbilityCard = (props) => {
  const { id, name, message } = props;
  return (
    <div
      className="card border-secondary mb-3 secondary-card"
      style={{
        width: "25%",
        height: "20vh",
        display: "inline-block",
        margin: "1em",
        boxSizing: "border-box",
      }}
    >
      <h3 className="move-title" >
        {name.replace("-", " ")}
      </h3>
      <div className="info">
        <div className="info-pokemon">
          <div style={{padding: "1em"}}></div>
          {message || (
            <Link to={`/ability/${name}`}>
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

export default AbilityList;
