/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to={"/"}><img className="navbar-toggler pokeball" src="/pokeball.png" alt=""/>
        </Link><button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="menu">
            <li>
              <Link to={"/"}><img src="/pokeball.png" alt="" /></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/move"}>
                Moves
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/ability"}>
                Abilities
              </Link>
            </li>
            <li>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2 search"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>
            </li>
            <li>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  let searchInput;
  useEffect(() => {
    searchInput = document.querySelector(".search");
    searchInput.addEventListener("input", () => {
      setQuery(searchInput.value.replace(" ", "-"));
    });
  }, []);

  return query;
};

export { Navbar, SearchPanel };
