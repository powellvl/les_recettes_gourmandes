import React, { useState, useEffect, useRef } from "react";
import { recipes } from "../json/recipes.js";

function TagsMenu({
  selectedIngredients, // Ajout de la prop pour recevoir les ingrédients sélectionnés
  onIngredientSelect, // Ajout de la prop pour la fonction de sélection
  selectedAppliances = [], // Ajout de la prop pour recevoir les appareils sélectionnés
  onApplianceSelect, // Ajout de la prop pour la fonction de sélection
  selectedUstensils = [], // Prop pour recevoir les ustensiles sélectionnés
  onUstensilSelect, // Prop pour la fonction de sélection des ustensiles
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [searchAppliance, setSearchAppliance] = useState("");
  const [ustensils, setUstensils] = useState([]);
  const [searchUstensil, setSearchUstensil] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isApplianceDropdownOpen, setIsApplianceDropdownOpen] = useState(false);
  const [isUstensilDropdownOpen, setIsUstensilDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const applianceDropdownRef = useRef(null);
  const ustensilDropdownRef = useRef(null);

  // Fonction pour normaliser les noms d'ingrédients
  const normalizeIngredientName = (name) => {
    if (!name) return "";

    // Convertir en minuscules et supprimer les espaces en trop
    let normalized = name.trim().toLowerCase();

    // Mettre au singulier les pluriels courants
    normalized = normalized
      .replace(/bananes$/i, "banane")
      .replace(/pommes$/i, "pomme")
      .replace(/tomates$/i, "tomate")
      .replace(/fraises$/i, "fraise")
      .replace(/kiwis$/i, "kiwi")
      .replace(/oeufs$/i, "oeuf")
      .replace(/olives$/i, "olive")
      .replace(/poires$/i, "poire");

    // Normalisation des orthographes variables
    normalized = normalized
      .replace(/crème fraiche/i, "creme fraiche")
      .replace(/crême fraiche/i, "creme fraiche")
      .replace(/crème fraîche/i, "creme fraiche")
      .replace(/crême fraîche/i, "creme fraiche");

    // Normalisation des variantes d'ingrédients
    normalized = normalized
      .replace(/chocolat noir en p[ée]pites/i, "chocolat noir")
      .replace(/chocolat au lait/i, "chocolat");

    return normalized;
  };

  // Fonction pour normaliser les noms d'appareils
  const normalizeApplianceName = (name) => {
    if (!name) return "";

    // Convertir en minuscules et supprimer les espaces en trop
    let normalized = name.trim().toLowerCase();

    // Normalisation des orthographes variables
    normalized = normalized
      .replace(/cuiseur de riz/i, "cuiseur a riz")
      .replace(/poële/i, "poele")
      .replace(/poêle/i, "poele");

    return normalized;
  };

  // Fonction pour normaliser les noms d'ustensiles
  const normalizeUstensilName = (name) => {
    if (!name) return "";

    // Convertir en minuscules et supprimer les espaces en trop
    let normalized = name.trim().toLowerCase();

    // Normalisation des orthographes variables
    normalized = normalized
      .replace(/cuillère à soupe/i, "cuillere a soupe")
      .replace(/cuillère à Soupe/i, "cuillere a soupe")
      .replace(/presse citron/i, "presse-citron");

    return normalized;
  };

  // Standardiser le nom pour l'affichage (première lettre en majuscule)
  const standardizeDisplayName = (name) => {
    if (!name) return "";
    name = name.trim();
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Extraire les ingrédients uniques de toutes les recettes
  useEffect(() => {
    // Utiliser un objet pour éliminer les doublons même avec les différences de pluriel/singulier
    const uniqueIngredientsMap = {};
    const displayNames = {};

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        if (item.ingredient) {
          // Normaliser le nom de l'ingrédient
          const normalizedName = normalizeIngredientName(item.ingredient);

          // Conserver le premier nom d'affichage rencontré ou le plus court
          if (
            !displayNames[normalizedName] ||
            item.ingredient.length < displayNames[normalizedName].length
          ) {
            displayNames[normalizedName] = item.ingredient.trim();
            uniqueIngredientsMap[normalizedName] = standardizeDisplayName(
              item.ingredient
            );
          }
        }
      });
    });

    // Convertir l'objet en tableau et trier alphabétiquement
    const uniqueIngredientsList = Object.values(uniqueIngredientsMap).sort();
    setIngredients(uniqueIngredientsList);
  }, []);

  // Extraire les appareils uniques de toutes les recettes
  useEffect(() => {
    // Utiliser un objet pour éliminer les doublons
    const uniqueAppliancesMap = {};
    const displayNames = {};

    recipes.forEach((recipe) => {
      if (recipe.appliance) {
        // Normaliser le nom de l'appareil
        const normalizedName = normalizeApplianceName(recipe.appliance);

        // Conserver le premier nom d'affichage rencontré ou le plus court
        if (
          !displayNames[normalizedName] ||
          recipe.appliance.length < displayNames[normalizedName].length
        ) {
          displayNames[normalizedName] = recipe.appliance.trim();
          uniqueAppliancesMap[normalizedName] = standardizeDisplayName(
            recipe.appliance
          );
        }
      }
    });

    // Convertir l'objet en tableau et trier alphabétiquement
    const uniqueAppliancesList = Object.values(uniqueAppliancesMap).sort();
    setAppliances(uniqueAppliancesList);
  }, []);

  // Extraire les ustensiles uniques de toutes les recettes
  useEffect(() => {
    // Utiliser un objet pour éliminer les doublons
    const uniqueUstensilsMap = {};
    const displayNames = {};

    recipes.forEach((recipe) => {
      if (recipe.ustensils && Array.isArray(recipe.ustensils)) {
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil) {
            // Normaliser le nom de l'ustensile
            const normalizedName = normalizeUstensilName(ustensil);

            // Conserver le premier nom d'affichage rencontré ou le plus court
            if (
              !displayNames[normalizedName] ||
              ustensil.length < displayNames[normalizedName].length
            ) {
              displayNames[normalizedName] = ustensil.trim();
              uniqueUstensilsMap[normalizedName] =
                standardizeDisplayName(ustensil);
            }
          }
        });
      }
    });

    // Convertir l'objet en tableau et trier alphabétiquement
    const uniqueUstensilsList = Object.values(uniqueUstensilsMap).sort();
    setUstensils(uniqueUstensilsList);
  }, []);

  // Gérer l'ouverture et la fermeture du dropdown ingrédients
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  // Gérer l'ouverture et la fermeture du dropdown appareils
  const handleApplianceInputFocus = () => {
    setIsApplianceDropdownOpen(true);
  };

  // Gérer l'ouverture et la fermeture du dropdown ustensils
  const handleUstensilInputFocus = () => {
    setIsUstensilDropdownOpen(true);
  };

  // Fonction pour basculer l'état du dropdown lors du clic sur l'icône
  const handleIconClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Fonction pour basculer l'état du dropdown appareils lors du clic sur l'icône
  const handleApplianceIconClick = () => {
    setIsApplianceDropdownOpen((prev) => !prev);
  };

  // Fonction pour basculer l'état du dropdown ustensils lors du clic sur l'icône
  const handleUstensilIconClick = () => {
    setIsUstensilDropdownOpen((prev) => !prev);
  };

  // Fonction pour fermer les dropdowns en cliquant ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        applianceDropdownRef.current &&
        !applianceDropdownRef.current.contains(event.target)
      ) {
        setIsApplianceDropdownOpen(false);
      }
      if (
        ustensilDropdownRef.current &&
        !ustensilDropdownRef.current.contains(event.target)
      ) {
        setIsUstensilDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Gérer la sélection d'un ingrédient
  const handleIngredientSelect = (ingredient) => {
    // Vérifier que l'ingrédient n'est pas déjà sélectionné (vérification supplémentaire)
    if (!selectedIngredients.includes(ingredient)) {
      onIngredientSelect(ingredient);
    }
    setSearchTerm(""); // Réinitialiser le champ de recherche
    setIsDropdownOpen(false); // Fermer le dropdown après sélection
  };

  // Gérer la sélection d'un appareil
  const handleApplianceSelect = (appliance) => {
    // Vérifier que l'appareil n'est pas déjà sélectionné
    if (!selectedAppliances.includes(appliance)) {
      if (onApplianceSelect) {
        onApplianceSelect(appliance);
      }
    }
    setSearchAppliance(""); // Réinitialiser le champ de recherche
    setIsApplianceDropdownOpen(false); // Fermer le dropdown après sélection
  };

  // Gérer la sélection d'un ustensile
  const handleUstensilSelect = (ustensil) => {
    // Vérifier que l'ustensile n'est pas déjà sélectionné
    if (!selectedUstensils.includes(ustensil)) {
      if (onUstensilSelect) {
        onUstensilSelect(ustensil);
      }
    }
    setSearchUstensil(""); // Réinitialiser le champ de recherche
    setIsUstensilDropdownOpen(false); // Fermer le dropdown après sélection
  };

  // Filtrer les ingrédients en fonction du terme de recherche
  // et exclure ceux déjà sélectionnés
  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIngredients.includes(ingredient)
  );

  // Filtrer les appareils en fonction du terme de recherche
  // et exclure ceux déjà sélectionnés
  const filteredAppliances = appliances.filter(
    (appliance) =>
      appliance.toLowerCase().includes(searchAppliance.toLowerCase()) &&
      !selectedAppliances.includes(appliance)
  );

  // Filtrer les ustensiles en fonction du terme de recherche
  // et exclure ceux déjà sélectionnés
  const filteredUstensils = ustensils.filter(
    (ustensil) =>
      ustensil.toLowerCase().includes(searchUstensil.toLowerCase()) &&
      !selectedUstensils.includes(ustensil)
  );

  return (
    <div className="btn-group mb-4">
      <div className="dropdown mb-3 me-md-3" ref={dropdownRef}>
        <div
          className={`btn btn-primary btn-lg dropdown-toggle btn-ingredients btn-tag-open rounded-0 rounded-top ${
            isDropdownOpen ? "show" : ""
          }`}
          id="dropdownIngredients"
          aria-expanded={isDropdownOpen}
        >
          <div className="vertical-center">
            <span className="btn-tag-title hide">Ingrédients</span>
            <img
              src="./src/assets/dropdown.svg"
              alt=""
              className="ms-3 dropdown-arrow"
              aria-hidden="true"
              onClick={handleIconClick}
              style={{ cursor: "pointer" }}
            />
            <form
              id="form-ingredient"
              role="search"
              autoComplete="off"
              className=""
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="visually-hidden" htmlFor="search-ingredient">
                Ingredient Tag Search
              </label>

              <input
                id="search-ingredient"
                className="search-input col-12 rounded"
                type="text"
                placeholder="Ingrédient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleInputFocus}
              />
            </form>
          </div>
        </div>
        <div
          className={`dropdown-menu ingredients-dropdown rounded-0 rounded-bottom ${
            isDropdownOpen ? "show" : ""
          }`}
          aria-labelledby="dropdownIngredients"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: "0px",
            marginTop: "-15px",
            transform: "translate3d(0px, 80px, 0px)",
            display: isDropdownOpen ? "block" : "none",
          }}
          data-popper-placement="bottom-start"
        >
          <div className="dropdown-items-container">
            {filteredIngredients.map((ingredient, index) => (
              <button
                key={index}
                className="dropdown-item ingredient-item"
                type="button"
                onClick={() => handleIngredientSelect(ingredient)}
              >
                {ingredient}
              </button>
            ))}
            {filteredIngredients.length === 0 && searchTerm && (
              <div className="dropdown-item text-muted">
                Aucun ingrédient trouvé
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dropdown mb-3 me-md-3" ref={applianceDropdownRef}>
        <div
          className={`btn btn-success btn-lg dropdown-toggle btn-appliance btn-tag-open rounded-0 rounded-top ${
            isApplianceDropdownOpen ? "show" : ""
          }`}
          id="dropdownAppliances"
          aria-expanded={isApplianceDropdownOpen}
        >
          <div className="vertical-center">
            <span className="btn-tag-title hide">Appareil</span>
            <img
              src="src/assets/dropdown.svg"
              alt=""
              className="ms-3 dropdown-arrow"
              aria-hidden="true"
              onClick={handleApplianceIconClick}
              style={{ cursor: "pointer" }}
            />
            <form
              id="form-appliance"
              role="search"
              autoComplete="off"
              className=""
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="visually-hidden" htmlFor="search-appliance">
                Appliance Tag Search
              </label>
              <input
                id="search-appliance"
                className="search-input col-12 rounded"
                type="text"
                placeholder="Appareil"
                value={searchAppliance}
                onChange={(e) => setSearchAppliance(e.target.value)}
                onFocus={handleApplianceInputFocus}
              />
            </form>
          </div>
        </div>
        <div
          className={`dropdown-menu appliances-dropdown rounded-0 rounded-bottom ${
            isApplianceDropdownOpen ? "show" : ""
          }`}
          aria-labelledby="dropdownAppliances"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: "0px",
            marginTop: "-15px",
            transform: "translate3d(0px, 80px, 0px)",
            display: isApplianceDropdownOpen ? "block" : "none",
          }}
          data-popper-placement="bottom-start"
        >
          <div className="dropdown-items-container">
            {filteredAppliances.map((appliance, index) => (
              <button
                key={index}
                className="dropdown-item appliance-item"
                type="button"
                onClick={() => handleApplianceSelect(appliance)}
              >
                {appliance}
              </button>
            ))}
            {filteredAppliances.length === 0 && searchAppliance && (
              <div className="dropdown-item text-muted">
                Aucun appareil trouvé
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dropdown mb-3 me-md-3" ref={ustensilDropdownRef}>
        <div
          className={`btn btn-danger btn-lg dropdown-toggle btn-ustensils btn-tag-open rounded-0 rounded-top ${
            isUstensilDropdownOpen ? "show" : ""
          }`}
          id="dropdownUstensils"
          aria-expanded={isUstensilDropdownOpen}
        >
          <div className="vertical-center">
            <span className="btn-tag-title hide">Ustensiles</span>
            <img
              src="src/assets/dropdown.svg"
              alt=""
              className="ms-3 dropdown-arrow"
              aria-hidden="true"
              onClick={handleUstensilIconClick}
              style={{ cursor: "pointer" }}
            />
            <form
              id="form-ustensil"
              role="search"
              autoComplete="off"
              className=""
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="visually-hidden" htmlFor="search-ustensil">
                Ustensil Tag Search
              </label>
              <input
                id="search-ustensil"
                className="search-input col-12 rounded"
                type="text"
                placeholder="Ustensile"
                value={searchUstensil}
                onChange={(e) => setSearchUstensil(e.target.value)}
                onFocus={handleUstensilInputFocus}
              />
            </form>
          </div>
        </div>
        <div
          className={`dropdown-menu ustensils-dropdown rounded-0 rounded-bottom ${
            isUstensilDropdownOpen ? "show" : ""
          }`}
          aria-labelledby="dropdownUstensils"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: "0px",
            marginTop: "-15px",
            transform: "translate3d(0px, 80px, 0px)",
            display: isUstensilDropdownOpen ? "block" : "none",
          }}
          data-popper-placement="bottom-start"
        >
          <div className="dropdown-items-container">
            {filteredUstensils.map((ustensil, index) => (
              <button
                key={index}
                className="dropdown-item ustensil-item"
                type="button"
                onClick={() => handleUstensilSelect(ustensil)}
              >
                {ustensil}
              </button>
            ))}
            {filteredUstensils.length === 0 && searchUstensil && (
              <div className="dropdown-item text-muted">
                Aucun ustensile trouvé
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="selected-tags-container d-flex flex-wrap"></div>
    </div>
  );
}

export default TagsMenu;
