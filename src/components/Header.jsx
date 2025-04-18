import React from "react";
import Logo from "../assets/logo.svg";

function Header() {
  return (
    <div>
      <header className="container mt-4 mb-4">
        <a href="./">
          <div className="site-logo-container text-center">
            <img className="site-logo" alt="Site logo" src={Logo} />
          </div>
          <h1 className="text-center site-title">Les Grands Plats</h1>
        </a>
      </header>
    </div>
  );
}

export default Header;
