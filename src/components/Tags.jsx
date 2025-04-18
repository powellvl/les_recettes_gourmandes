import React from "react";

function Tags({
  selectedIngredients = [],
  onIngredientRemove = () => {},
  selectedAppliances = [],
  onApplianceRemove = () =>
    console.warn("onApplianceRemove function not provided"),
  selectedUstensils = [],
  onUstensilRemove = () =>
    console.warn("onUstensilRemove function not provided"),
}) {
  // Gestionnaire simplifié pour la suppression d'appareils
  const safeApplianceRemove = (appliance) => {
    onApplianceRemove(appliance);
  };

  // Gestionnaire simplifié pour la suppression d'ustensiles
  const safeUstensilRemove = (ustensil) => {
    onUstensilRemove(ustensil);
  };

  return (
    <div id="tags-container" className="mb-2 d-flex flex-wrap">
      {selectedIngredients &&
        selectedIngredients.map((ingredient, index) => (
          <div
            key={index}
            id={`tag-${ingredient.toLowerCase().replace(/\s+/g, "-")}`}
            className="tags badge bg-primary ps-3 pe-2 py-2 me-3 mb-2 rounded"
          >
            <span>{ingredient}</span>
            <button
              type="button"
              className="tag-close-btn align-middle ms-1"
              onClick={() => onIngredientRemove(ingredient)}
              aria-label={`Supprimer ${ingredient}`}
            >
              <img
                src="src/assets/tag-close.svg"
                alt="close"
                aria-hidden="true"
              />
            </button>
          </div>
        ))}
      {selectedAppliances &&
        selectedAppliances.map((appliance, index) => (
          <div
            key={index}
            id={`tag-${appliance.toLowerCase().replace(/\s+/g, "-")}`}
            className="tags badge bg-success ps-3 pe-2 py-2 me-3 mb-2 rounded"
          >
            <span>{appliance}</span>
            <button
              type="button"
              className="tag-close-btn align-middle ms-1"
              onClick={() => safeApplianceRemove(appliance)}
              aria-label={`Supprimer ${appliance}`}
            >
              <img
                src="src/assets/tag-close.svg"
                alt="close"
                aria-hidden="true"
              />
            </button>
          </div>
        ))}
      {selectedUstensils &&
        selectedUstensils.map((ustensil, index) => (
          <div
            key={index}
            id={`tag-${ustensil.toLowerCase().replace(/\s+/g, "-")}`}
            className="tags badge bg-danger ps-3 pe-2 py-2 me-3 mb-2 rounded"
          >
            <span>{ustensil}</span>
            <button
              type="button"
              className="tag-close-btn align-middle ms-1"
              onClick={() => safeUstensilRemove(ustensil)}
              aria-label={`Supprimer ${ustensil}`}
            >
              <img
                src="src/assets/tag-close.svg"
                alt="close"
                aria-hidden="true"
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default Tags;
