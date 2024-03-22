import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Topics from "./componets/Topics";
import Article from "./componets/Article";
import Err from "./componets/Err";
import { ErrProvider } from "./contexts/ErrContext";
import { ActiveUserProvider } from "./contexts/ActiveUser";
import LoginUser from "./componets/LoginUser";

function App() {
  return (
    <>
      <ErrProvider>
        <ActiveUserProvider>
          <header id="header">
            <h1>Nc News</h1>
            <nav className="links">
              <ul>
                <li>
                  <a href="#">All articles</a>
                </li>
                <li>
                  <a href="#">Football</a>
                </li>
                <li>
                  <a href="#">Coding</a>
                </li>
                <li>
                  <a href="#">Cooking</a>
                </li>
              </ul>
            </nav>
            <nav className="mains">
              <ul>
                <li className="search">
                  <a className="fa-search" href="#search">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      color={"grey"}
                      fontSize={"1.8em"}
                    />
                  </a>
                </li>
                <li className="menu">
                  <a className="fa-bars" href="#menu">
                    <FontAwesomeIcon
                      icon={faBars}
                      color={"grey"}
                      fontSize={"1.8em"}
                    />
                  </a>
                </li>
              </ul>
            </nav>
            {/* <LoginUser />*/}
          </header>
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/err" element={<Err />} />
          </Routes>
        </ActiveUserProvider>
      </ErrProvider>
    </>
  );
}

export default App;
