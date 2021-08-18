import { React, useState } from "react";
import { Route, Link, useParams } from "react-router-dom";

// components
import Loading from "./Loading";

// pokedex initialization
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
const Pokemon = () => {
  var totalStat = 0;

  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  const [data, setData] = useState({});

  let moves = [];

  P.getPokemonByName(name)
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

  const getMoves = async () => {
    // {name: _, version: {method:_,level: _}}
    data.moves.forEach((move) => {
      let rb, y, gs, c, rs, e, frlg, dp, p, hgss, bw, bw2, xy, oras, sm, usum;
      move.version_group_details.forEach((version) => {
        switch (version.version_group.name) {
          case "red-blue":
            if (version.level_learned_at === 0) {
              rb = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            rb = version.level_learned_at;
            break;
          case "yellow":
            if (version.level_learned_at === 0) {
              y = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            y = version.level_learned_at;
            break;
          case "gold-silver":
            if (version.level_learned_at === 0) {
              gs = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            gs = version.level_learned_at;
            break;
          case "crystal":
            if (version.level_learned_at === 0) {
              c = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            c = version.level_learned_at;
            break;
          case "ruby-sapphire":
            if (version.level_learned_at === 0) {
              rs = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            rs = version.level_learned_at;
            break;
          case "emerald":
            if (version.level_learned_at === 0) {
              e = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            e = version.level_learned_at;
            break;
          case "firered-leafgreen":
            if (version.level_learned_at === 0) {
              frlg = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            frlg = version.level_learned_at;
            break;
          case "diamond-pearl":
            if (version.level_learned_at === 0) {
              dp = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            dp = version.level_learned_at;
            break;
          case "platinum":
            if (version.level_learned_at === 0) {
              p = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            p = version.level_learned_at;
            break;
          case "heartgold-soulsilver":
            if (version.level_learned_at === 0) {
              hgss = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            hgss = version.level_learned_at;
            break;
          case "black-white":
            if (version.level_learned_at === 0) {
              bw = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            bw = version.level_learned_at;
            break;
          case "black-2-white-2":
            if (version.level_learned_at === 0) {
              bw2 = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            bw2 = version.level_learned_at;
            break;
          case "x-y":
            if (version.level_learned_at === 0) {
              xy = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            xy = version.level_learned_at;
            break;
          case "omega-ruby-alpha-sapphire":
            if (version.level_learned_at === 0) {
              oras = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            oras = version.level_learned_at;
            break;
          case "sun-moon":
            if (version.level_learned_at === 0) {
              sm = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            sm = version.level_learned_at;
            break;
          case "ultra-sun-ultra-moon":
            if (version.level_learned_at === 0) {
              usum = version.move_learn_method.name.replace("machine", "MT/MO");
              break;
            }
            usum = version.level_learned_at;
            break;
          default:
            break;
        }
      });
      moves.push({
        name: move.move.name,
        rb: rb,
        y: y,
        gs: gs,
        c: c,
        rs: rs,
        e: e,
        frlg: frlg,
        dp: dp,
        p: p,
        hgss: hgss,
        bw: bw,
        bw2: bw2,
        xy: xy,
        oras: oras,
        sm: sm,
        usum: usum,
      });
    });
  };
  getMoves();
  return (
    <Route path="/pokemon/:name">
      <div className="pokemon-header">
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="pokemon-sprite"
        />
        <h3 className="pokemon-name">{data.name}</h3>
        <div className="type-container">
          {data.types.map((type) => {
            let typeName = `${type.type.name}`;
            return (
              <img
                src={`/assets/types/${typeName}.png`}
                className="type"
                alt={typeName}
              />
            );
          })}
        </div>
      </div>
      <div className="pokemon-container">
        <h4 className="title">abilities</h4>
        <ul className="list-group">
          {data.abilities.map((ability) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-center item">
                <Link to={`/ability/${ability.ability.name}`}>
                  {ability.ability.name.replace("-", " ")}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pokemon-container">
        <h4 className="title">stats</h4>
        {data.stats.map((stat) => {
          totalStat += stat.base_stat;
          let statName;
          switch (stat.stat.name) {
            case "hp":
              statName = "HP";
              break;
            case "attack":
              statName = "Atk";
              break;
            case "defense":
              statName = "Def";
              break;
            case "special-attack":
              statName = "SpA";
              break;
            case "special-defense":
              statName = "SpD";
              break;
            case "speed":
              statName = "Spe";
              break;
            default:
              break;
          }
          return (
            <div className="stat">
              {statName}
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  aria-valuenow={stat.base_stat}
                  aria-valuemin="0"
                  aria-valuemax="255"
                ></div>
              </div>
              {stat.base_stat}
            </div>
          );
        })}
        <div className="stat">
          Total
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(totalStat / 720) * 100}%` }}
              aria-valuenow={totalStat}
              aria-valuemin="0"
              aria-valuemax="720"
            ></div>
          </div>
          {totalStat}
        </div>Ñ
      </div>
      <h4 className="title">movements</h4>
      <div className="movements">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Moves</th>
              <th scope="col">R/B</th>
              <th scope="col">Y</th>
              <th scope="col">G/S</th>
              <th scope="col">C</th>
              <th scope="col">R/S</th>
              <th scope="col">E</th>
              <th scope="col">FR/LG</th>
              <th scope="col">D/P</th>
              <th scope="col">P</th>
              <th scope="col">HG/SS</th>
              <th scope="col">B/W</th>
              <th scope="col">B2/W2</th>
              <th scope="col">X/Y</th>
              <th scope="col">OR/AS</th>
              <th scope="col">S/M</th>
              <th scope="col">US/UM</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move) => {
              return (
                <tr className="table-dark">
                  <th scope="row" className="move-name">
                    <Link to={`/move/${move.name}`}>
                      {move.name.replace("-", " ")}
                    </Link>
                  </th>

                  <th scope="row" className="item">
                    {move.rb}
                  </th>
                  <th scope="row" className="item">
                    {move.y}
                  </th>
                  <th scope="row" className="item">
                    {move.gs}
                  </th>
                  <th scope="row" className="item">
                    {move.c}
                  </th>
                  <th scope="row" className="item">
                    {move.rs}
                  </th>
                  <th scope="row" className="item">
                    {move.e}
                  </th>
                  <th scope="row" className="item">
                    {move.frlg}
                  </th>
                  <th scope="row" className="item">
                    {move.dp}
                  </th>
                  <th scope="row" className="item">
                    {move.p}
                  </th>
                  <th scope="row" className="item">
                    {move.hgss}
                  </th>
                  <th scope="row" className="item">
                    {move.bw}
                  </th>
                  <th scope="row" className="item">
                    {move.bw2}
                  </th>
                  <th scope="row" className="item">
                    {move.xy}
                  </th>
                  <th scope="row" className="item">
                    {move.oras}
                  </th>
                  <th scope="row" className="item">
                    {move.sm}
                  </th>
                  <th scope="row" className="item">
                    {move.usum}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Route>
  );
};

export default Pokemon;
