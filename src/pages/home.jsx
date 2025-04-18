import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Research from "../components/Research.jsx";
import Tags from "../components/Tags.jsx";
import TagsMenu from "../components/TagsMenu.jsx";
import Recipe from "../components/Recipe.jsx";
import { recipes } from "../json/recipes.js";

function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [displayedRecipes, setDisplayedRecipes] = useState(recipes); // Nouveau state pour suivre les recettes affichées

  // Gérer la recherche dans la barre principale
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Fonction pour normaliser les textes (sans accents, en minuscules)
  const normalizeText = (text) => {
    if (!text) return ""; // Protéger contre les valeurs null ou undefined
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrer les recettes en fonction de tous les critères
  useEffect(() => {
    // Filtre principal avec le terme de recherche
    let results = recipes;

    if (searchTerm && searchTerm.length >= 3) {
      const normalizedSearchTerm = normalizeText(searchTerm);

      results = recipes.filter((recipe) => {
        // Rechercher dans le nom de la recette
        const nameMatch = normalizeText(recipe.name).includes(
          normalizedSearchTerm
        );

        // Rechercher dans la description
        const descriptionMatch = normalizeText(recipe.description).includes(
          normalizedSearchTerm
        );

        // Rechercher dans les ingrédients
        const ingredientsMatch = recipe.ingredients.some((item) =>
          normalizeText(item.ingredient).includes(normalizedSearchTerm)
        );

        // Rechercher dans l'appareil
        const applianceMatch =
          recipe.appliance &&
          normalizeText(recipe.appliance).includes(normalizedSearchTerm);

        // Rechercher dans les ustensiles
        const ustensilsMatch =
          recipe.ustensils &&
          recipe.ustensils.some((ustensil) =>
            normalizeText(ustensil).includes(normalizedSearchTerm)
          );

        return (
          nameMatch ||
          descriptionMatch ||
          ingredientsMatch ||
          applianceMatch ||
          ustensilsMatch
        );
      });
    }

    // Filtrer davantage par ingrédients sélectionnés
    if (selectedIngredients.length > 0) {
      results = results.filter((recipe) =>
        selectedIngredients.every((selectedIngredient) =>
          recipe.ingredients.some(
            (item) =>
              normalizeText(item.ingredient) ===
              normalizeText(selectedIngredient)
          )
        )
      );
    }

    // Filtrer par appareils sélectionnés
    if (selectedAppliances.length > 0) {
      results = results.filter((recipe) =>
        selectedAppliances.some(
          (appliance) =>
            normalizeText(recipe.appliance) === normalizeText(appliance)
        )
      );
    }

    // Filtrer par ustensiles sélectionnés
    if (selectedUstensils.length > 0) {
      results = results.filter((recipe) =>
        selectedUstensils.every((selectedUstensil) =>
          recipe.ustensils.some(
            (ustensil) =>
              normalizeText(ustensil) === normalizeText(selectedUstensil)
          )
        )
      );
    }

    // Débugger

    setFilteredRecipes(results);
  }, [searchTerm, selectedIngredients, selectedAppliances, selectedUstensils]);

  const handleIngredientSelect = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleApplianceSelect = (appliance) => {
    if (!selectedAppliances.includes(appliance)) {
      setSelectedAppliances([...selectedAppliances, appliance]);
    }
  };

  const handleUstensilSelect = (ustensil) => {
    if (!selectedUstensils.includes(ustensil)) {
      setSelectedUstensils([...selectedUstensils, ustensil]);
    }
  };

  const handleIngredientRemove = (ingredient) => {
    setSelectedIngredients(
      selectedIngredients.filter((item) => item !== ingredient)
    );
  };

  const handleApplianceRemove = (appliance) => {
    setSelectedAppliances(
      selectedAppliances.filter((item) => item !== appliance)
    );
  };

  const handleUstensilRemove = (ustensil) => {
    setSelectedUstensils(selectedUstensils.filter((item) => item !== ustensil));
  };

  return (
    <>
      <Header />
      <main id="main">
        <div className="container mt-4">
          <div className="mb-4 row">
            <Research onSearch={handleSearch} />
            <Tags
              selectedIngredients={selectedIngredients}
              onIngredientRemove={handleIngredientRemove}
              selectedAppliances={selectedAppliances}
              onApplianceRemove={handleApplianceRemove}
              selectedUstensils={selectedUstensils}
              onUstensilRemove={handleUstensilRemove}
            />
            <TagsMenu
              selectedIngredients={selectedIngredients}
              onIngredientSelect={handleIngredientSelect}
              selectedAppliances={selectedAppliances}
              onApplianceSelect={handleApplianceSelect}
              selectedUstensils={selectedUstensils}
              onUstensilSelect={handleUstensilSelect}
              displayedRecipes={displayedRecipes} // Passage des recettes affichées à TagsMenu
            />
            <Recipe
              recipes={filteredRecipes}
              onRecipesUpdated={setDisplayedRecipes} // Mise à jour des recettes affichées
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
