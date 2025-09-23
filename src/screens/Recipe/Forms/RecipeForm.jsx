//* RecipeForm.jsx
import React from 'react';
import {Dropdown, Input, MultiDropdown, View} from '../../../KQ-UI';

const RecipeForm = props => {
  const {
    recipeName,
    setRecipeName,
    validation1,
    sourceMaterial,
    setSourceMaterial,
    displaySourceType,
    validation2,
    sourceType,
    validation3,
    validation4,
    displaySourceExample,
    source,
    setSource,
    sourceURL,
    setSourceURL,
    cuisineType,
    setCuisineType,
    displayCuisineTypes,
    dishType,
    setDishType,
    displayDishTypes,
    dietType,
    setDietType,
    displayDietTypes,
    servings,
    setServings,
    prepTime,
    setPrepTime,
    cookTime,
    setCookTime,
  } = props;

  return (
    <>
      <Input
        required
        label="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
        validation={validation1}
        validationMessage="Recipe Name is required"
        capitalize
        capitalMode="words"
      />
      <Dropdown
        required
        label="Source Material"
        placeholder="Select a Material Type"
        value={sourceMaterial}
        setValue={setSourceMaterial}
        caption={'Where the recipe is from'}
        mapData={displaySourceType}
        validation={validation2}
        validationMessage="Source Material is required"
      />
      {sourceType !== 'personal' && sourceType !== null && (
        <Input
          required
          label="Source Name"
          placeholder={displaySourceExample}
          value={source}
          onChangeText={setSource}
          validation={sourceType !== 'personal' ? validation3 : null}
          validationMessage="Source Name is required"
          capitalize
          capitalMode="words"
          caption={
            sourceType === 'private' && 'Not Displayed Publicly. Reference Only'
          }
        />
      )}
      {sourceType === 'online' && sourceType !== null && (
        <Input
          required={sourceType === 'online'}
          label="Source URL"
          placeholder="https://www.example.com"
          value={sourceURL}
          onChangeText={setSourceURL}
          validation={sourceType === 'online' ? validation4 : null}
          validationMessage="Source URL is required"
          capitalize
          capitalMode="none"
        />
      )}

      <MultiDropdown
        // required
        label="Cuisine Type"
        placeholder="Select a Cuisine Type"
        caption="Ex: Italian, Mexican, etc."
        value={cuisineType}
        setValue={setCuisineType}
        mapData={displayCuisineTypes}
      />
      <MultiDropdown
        // required
        label="Dish Type"
        placeholder="Select a Dish Type"
        value={dishType}
        setValue={setDishType}
        mapData={displayDishTypes}
      />
      <MultiDropdown
        // required
        label="Diet Type"
        placeholder="Select a Diet Type"
        value={dietType}
        setValue={setDietType}
        mapData={displayDietTypes}
      />
      <View row>
        <View flex>
          <Input
            label="Servings"
            caption="Ex: 4 serv."
            value={servings}
            onChangeText={setServings}
            keyboardType="numeric"
          />
        </View>
        <View flex>
          <Input
            label="Prep Time"
            caption="Ex: 15 Min"
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
          />
        </View>
        <View flex>
          <Input
            label="Cook Time"
            caption="Ex: 15 Min"
            value={cookTime}
            onChangeText={setCookTime}
            keyboardType="numeric"
          />
        </View>
      </View>
    </>
  );
};
export default RecipeForm;
