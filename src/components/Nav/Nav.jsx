import React from "react";
import "./Nav.css";
import logo from '../../assets/logo.svg'

export const Nav = ({ onSearchBarClick }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={ logo } alt="windbnb" />
      </div>

      <ul className="search-bar" onClick={onSearchBarClick}>
        <li className="search-item">Helsinki, Finland</li>
        <li className="search-item">Add guests</li>
        <li className="search-item"><i className="fa-solid fa-magnifying-glass"></i></li>
      </ul>
    </nav>
  );
};
