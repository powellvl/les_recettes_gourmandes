import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { recipes } from "../json/recipes.js";
import Header from "../components/Header.jsx";

function Dish() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un court délai de chargement pour une meilleure UX
    const timer = setTimeout(() => {
      // Trouver la recette correspondante dans le fichier local
      const foundRecipe = recipes.find((r) => r.id === parseInt(recipeId));
      setRecipe(foundRecipe);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container mt-4 mb-4">
        <h1>{recipe.name}</h1>

        <div className="row mt-4">
          <div className="col-md-8">
            <div>
              <img src="src/assets/pexels-photo-2097090.jpeg" alt="dish" />
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{recipe.description}</p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Ingrédients</h5>
                <ul className="list-group list-group-flush">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item.ingredient}
                      {item.quantity && ` - ${item.quantity}`}
                      {item.unit && ` ${item.unit}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Informations</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-clock me-2"></i>
                    Temps de préparation: {recipe.time} minutes
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-people me-2"></i>
                    Pour {recipe.servings}{" "}
                    {recipe.servings > 1 ? "personnes" : "personne"}
                  </li>
                  {recipe.appliance && (
                    <li className="list-group-item">
                      <i className="bi bi-tools me-2"></i>
                      Appareil: {recipe.appliance}
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {recipe.ustensils && recipe.ustensils.length > 0 && (
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="card-title">Ustensiles</h5>
                  <ul className="list-group list-group-flush">
                    {recipe.ustensils.map((item, index) => (
                      <li key={index} className="list-group-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={() => window.history.back()}
        >
          Retour aux recettes
        </button>
      </div>
    </>
  );
}

export default Dish;
