import React from "react";

function Recipe({ recipes = [] }) {
  return (
    <div
      id="recipes-list"
      className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
    >
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div className="col" id={recipe.id} key={recipe.id}>
            <a href={`./recipe/${recipe.id}`}>
              <div className="card h-100">
                <div className="card-img-top">
                  <img
                    className="dish"
                    src="src/assets/pexels-photo-2097090.jpeg"
                    alt="food"
                  />
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <h2 className="card-title col-8 card-name">
                      {recipe.name}
                    </h2>
                    <div className="card-title col-4 text-end card-time-container">
                      <img
                        className="me-1 card-time-watch"
                        alt=""
                        src="src/assets/watch-time.svg"
                      />
                      <span className="card-time">{recipe.time} min</span>
                    </div>
                  </div>
                  <div className="row">
                    <ul className="card-text col-6 list-unstyled card-ingredients-list">
                      {recipe.ingredients.map((item, index) => (
                        <li className="card-ingredients-list-item" key={index}>
                          <span className="card-ingredients-list-item-ingredient">
                            {item.ingredient}
                          </span>
                          <span className="card-ingredients-list-item-quantity">
                            {item.quantity ? ` ${item.quantity}` : ""}
                          </span>
                          <span className="card-ingredients-list-item-unit">
                            {item.unit ? ` ${item.unit}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="card-text col-6 card-description">
                      {recipe.description.length > 200
                        ? `${recipe.description.substring(0, 197)}...`
                        : recipe.description}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))
      ) : (
        <div className="col-12 text-center my-5">
          <h3>Aucune recette ne correspond à votre recherche</h3>
          <p>Essayez d'autres critères de recherche</p>
        </div>
      )}
    </div>
  );
}

export default Recipe;
