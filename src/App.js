import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import {PokemonList} from "./components/PokemonList";
import Pokemon from "./components/Pokemon"
import MoveList from "./components/MoveList";
import Move from "./components/Move";
import AbilityList from "./components/AbilityList";
import Ability from "./components/Ability";

import {Navbar} from "./components/Navbar";
import BackToTopButton from "./components/BackToTopButton";
import ReturnToPokedex from "./components/ReturnToPokedex";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route path="/pokemon/:name" component={Pokemon} />
          <Route exact path="/move" component={MoveList} />
          <Route path="/move/:name" component={Move} />
          <Route exact path="/ability" component={AbilityList} />
          <Route path="/ability/:name" component={Ability} />
        </Switch>
        <ReturnToPokedex />
      </div>
      <BackToTopButton />
    </Router>
  );
}

export default App;
