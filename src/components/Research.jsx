import React, { useState } from "react";
import Search from "../assets/search.svg";

function Research({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Gestion de la recherche lorsque l'utilisateur tape
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Transmettre la valeur de recherche au composant parent
    if (onSearch) {
      onSearch(value);
    }
  };

  // Empêcher le comportement par défaut du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mb-4 row">
      <div className="search position-relative">
        <form id="form" role="search" autoComplete="off">
          <label className="visually-hidden" htmlFor="search">
            Main search
          </label>
          <input
            id="search"
            className="search-input col-12 rounded"
            type="text"
            placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search-img position-absolute top-50 translate-middle">
            <img className="search-logo" alt="" src={Search} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Research;
