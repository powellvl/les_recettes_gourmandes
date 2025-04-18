import React, { useState } from "react";
import Header from "./components/Header";
import Research from "./components/Research";
import Tags from "./components/Tags";
import TagsMenu from "./components/TagsMenu";
import Recipe from "./components/Recipe";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [selectedUstensils, setSelectedUstensils] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleIngredientSearch = (term) => {
    setSearchTerm(term);
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
            <Research />
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
              onIngredientRemove={handleIngredientRemove}
              selectedAppliances={selectedAppliances}
              onApplianceSelect={handleApplianceSelect}
              onApplianceRemove={handleIngredientRemove}
              selectedUstensils={selectedUstensils}
              onUstensilSelect={handleUstensilSelect}
              onUstensilRemove={handleIngredientRemove}
              searchTerm={searchTerm}
            />
            <Recipe />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
