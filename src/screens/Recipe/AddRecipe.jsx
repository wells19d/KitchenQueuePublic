//* AddRecipe.jsx

import React, {useEffect, useMemo, useState} from 'react';
import {BottomSheet, Button, Input, Layout, Text, View} from '../../KQ-UI';
import {useCoreInfo} from '../../utilities/coreInfo';
import {displaySourceType} from '../../utilities/materialSource';
import {
  displayDropField,
  displayDropArray,
  capEachWord,
} from '../../utilities/helpers';
import {displayCuisineTypes} from '../../utilities/cuisineType';
import {displayDishTypes} from '../../utilities/dishType';
import {displayDietTypes} from '../../utilities/dietType';
import {displayMeasurements} from '../../utilities/measurements';
import {normalizeTitleForKeywords} from '../../utilities/normalizeTitle';
import UploadPicture from './UploadPicture';
import IngredientForm from './Forms/IngredientForm';
import InstructionForm from './Forms/InstructionForm';
import RecipeForm from './Forms/RecipeForm';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddRecipe = () => {
  const core = useCoreInfo();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {recipeToEdit, editingRecipe, fromCommunity} = route.params || {};
  console.log('recipeToEdit', recipeToEdit);
  console.log('editingRecipe', editingRecipe);
  console.log('fromCommunity', fromCommunity);

  const [validation1, setValidation1] = useState(false);
  const [validation2, setValidation2] = useState(false);
  const [validation3, setValidation3] = useState(false);
  const [validation4, setValidation4] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const [recipeName, setRecipeName] = useState(null);
  const [sourceMaterial, setSourceMaterial] = useState(
    displayDropField(displaySourceType) ?? null,
  );
  const [source, setSource] = useState(null);
  const [sourceURL, setSourceURL] = useState(null);
  const [cuisineType, setCuisineType] = useState(
    displayDropArray(displayCuisineTypes) ?? null,
  );
  const [dishType, setDishType] = useState(
    displayDropArray(displayDishTypes) ?? null,
  );
  const [dietType, setDietType] = useState(
    displayDropArray(displayDietTypes) ?? null,
  );
  const [servings, setServings] = useState(null);
  const [prepTime, setPrepTime] = useState(null);
  const [cookTime, setCookTime] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [aboutRecipe, setAboutRecipe] = useState(null);

  const [finalImage, setFinalImage] = useState(null);

  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const [canPressIngredients, setCanPressIngredients] = useState(true);
  const [canPressInstructions, setCanPressInstructions] = useState(true);

  const [showUploadPicture, setShowUploadPicture] = useState(false);
  const [showAboutRecipe, setShowAboutRecipe] = useState(false);

  const [canPressUploadPicture, setCanPressUploadPicture] = useState(true);
  const [canPressAboutRecipe, setCanPressAboutRecipe] = useState(true);

  const [tempIngAmount, setTempIngAmount] = useState(null);
  const [tempIngMeasurement, setTempIngMeasurement] = useState(
    displayDropField(displayMeasurements) ?? null,
  );
  const [tempIngName, setTempIngName] = useState(null);
  const [tempNote, setTempNote] = useState(null);

  const [sourceType, setSourceType] = useState(null);

  const [keywords, setKeywords] = useState(null);
  const [pictureName, setPictureName] = useState(null);

  useEffect(() => {
    if (!sourceMaterial) {
      setSource(null);
      setSourceType(null);
      return;
    }

    const key = sourceMaterial?.key;

    if (key === 'personal') {
      setSource('personal');
      setSourceType('personal');
      return;
    }

    if (['friend', 'family'].includes(key)) {
      // keep existing source if editing, otherwise clear
      setSource(prev => (editingRecipe && prev ? prev : null));
      setSourceType('private');
      return;
    }

    if (['social', 'website', 'app'].includes(key)) {
      setSource(prev => (editingRecipe && prev ? prev : null));
      setSourceType('online');
      return;
    }

    if (
      ['cookbook', 'restaurant', 'tv', 'magazine', 'package', 'event'].includes(
        key,
      )
    ) {
      setSource(prev => (editingRecipe && prev ? prev : null));
      setSourceType('published');
      return;
    }

    setSourceType(null);
  }, [sourceMaterial, editingRecipe]);

  useMemo(() => {
    const normalized = normalizeTitleForKeywords(recipeName);
    setKeywords(normalized);

    const slug = normalized.slice(1).join('-');
    const prefix = core?.profileID || core?.userID;

    setPictureName(`${prefix}-${slug}`);
  }, [recipeName]);

  const recipeObject = {
    title: recipeName?.toLowerCase().trim() ?? null,
    sourceMaterial: sourceMaterial?.key ?? null,
    source: source?.toLowerCase().trim() ?? null,
    sourceURL: sourceURL?.trim().toLowerCase().replace(/\s+/g, '') ?? null,
    credit: core?.onlineName,
    authorOnlineName: core?.onlineName,
    authorFirstName: core?.firstName,
    authorLastName: core?.lastName,
    authorID: core?.userID,
    accountID: core?.accountID,
    adminEdit: true,
    userEdit: true,
    cuisines: cuisineType?.map(c => c.value),
    dishTypes: dishType?.map(c => c.value),
    diets: dietType?.map(c => c.value),
    displayAuthorName: false, // later addition - for shared recipes
    publicAuthor: false, // later addition - for shared recipes
    recipeShared: false, // later addition - for shared recipes
    sharedStatus: null, // later addition - for shared recipes // for admin approvals
    servings: servings ? Number(servings) : null,
    prepTime: prepTime ? Number(prepTime) : null,
    cookTime: cookTime ? Number(cookTime) : null,
    readyIn: prepTime && cookTime ? Number(prepTime) + Number(cookTime) : null,
    ingredients: ingredients,
    instructions: instructions,
    image: finalImage?.name ?? null,
    imageUri: finalImage
      ? `https://firebasestorage.googleapis.com/v0/b/kitchen-queue-fe2fe.firebasestorage.app/o/recipes%2F${finalImage?.name}?alt=media`
      : null,
    imageDate: finalImage?.imageDate ?? null,
    pictureApproved: true,
    ingredientList:
      ingredients?.map(ing => ing.name?.toLowerCase().trim() ?? null) ?? null,
    isArchived: false,
    keywords: keywords ?? null,
    aboutRecipe: aboutRecipe?.trim() ?? null,
    seasonal: null, // later addition
    occasions: null, // later addition
    healthScore: null, // later addition
    ratingScore: null, // later addition
  };

  const isValidText = value =>
    typeof value === 'string' && value.trim().length >= 2;

  useEffect(() => {
    const nameValid = isValidText(recipeName);
    const materialValid = sourceMaterial !== null;

    const sourceRequired = sourceType !== 'personal';
    const sourceValid = !sourceRequired || isValidText(source);

    const urlRequired = sourceType === 'online';
    const urlValid = !urlRequired || isValidText(sourceURL);

    const ingredientValid = ingredients?.length > 0;
    const instructionValid = instructions?.length > 0;

    // For debugging purposes
    // if (recipeName === null) console.log('Recipe Name is null');
    // if (!isValidText(recipeName)) console.log('Recipe Name is invalid');
    // if (!materialValid) console.log('Source Material is null');
    // if (!sourceValid) console.log('Source is invalid');
    // if (!urlValid) console.log('Source URL is invalid');
    // if (!ingredientValid) console.log('Ingredients are empty');
    // if (!instructionValid) console.log('Instructions are empty');

    // Show red error on name only
    setValidation1(
      recipeName === '' ||
        (typeof recipeName === 'string' && recipeName.trim() === ''),
    );

    // Disable save unless all are valid
    const allValid =
      nameValid &&
      materialValid &&
      sourceValid &&
      urlValid &&
      ingredientValid &&
      instructionValid;
    setCanSave(allValid);
  }, [
    recipeName,
    sourceMaterial,
    source,
    sourceURL,
    sourceType,
    ingredients,
    instructions,
  ]);

  const displaySourceExample = useMemo(() => {
    if (sourceMaterial?.key === 'friend') return 'Ex: Jane Doe';
    if (sourceMaterial?.key === 'family') return 'Ex: Grandma Jane';
    if (sourceMaterial?.key === 'social') return 'Ex: Facebook';
    if (sourceMaterial?.key === 'website') return 'Ex: Pinch of Yum';
    if (sourceMaterial?.key === 'app') return 'Ex: ChatGPT';
    if (sourceMaterial?.key === 'cookbook') return 'Ex: Better Homes Cook Book';
    if (sourceMaterial?.key === 'restaurant') return 'Ex: Olive Garden';
    if (sourceMaterial?.key === 'tv') return 'Ex: Iron Chef';
    if (sourceMaterial?.key === 'magazine') return 'Ex: Food Network Magazine';
    if (sourceMaterial?.key === 'package') return 'Ex: Nestle Toll House';
    if (sourceMaterial?.key === 'event') return 'Ex: Square One';
    return null;
  }, [sourceMaterial]);

  useMemo(() => {
    if (editingRecipe) {
      setRecipeName(capEachWord(recipeToEdit?.title));
      setSourceMaterial(
        displaySourceType.find(
          item => item.key === recipeToEdit?.sourceMaterial,
        ) || null,
      );
      setSource(capEachWord(recipeToEdit?.source));
      setSourceURL(recipeToEdit?.sourceURL || null);
      setCuisineType(
        displayCuisineTypes.filter(c =>
          recipeToEdit?.cuisines?.includes(c.value),
        ) || null,
      );
      setDishType(
        displayDishTypes.filter(d =>
          recipeToEdit?.dishTypes?.includes(d.value),
        ) || null,
      );
      setDietType(
        displayDietTypes.filter(d => recipeToEdit?.diets?.includes(d.value)) ||
          null,
      );
      setServings(recipeToEdit?.servings?.toString() || null);
      setPrepTime(recipeToEdit?.prepTime?.toString() || null);
      setCookTime(recipeToEdit?.cookTime?.toString() || null);
      setIngredients(recipeToEdit?.ingredients || []);
      setInstructions(recipeToEdit?.instructions || []);
      setAboutRecipe(recipeToEdit?.aboutRecipe || null);
      setFinalImage(
        recipeToEdit?.image
          ? {
              imageUri: recipeToEdit?.imageUri,
              uri: recipeToEdit?.imageUri,
              imageDate: recipeToEdit?.imageDate,
            }
          : null,
      );
    }
  }, [recipeToEdit, editingRecipe]);

  const imageChanged = useMemo(() => {
    return Boolean(
      finalImage?.imageDate && finalImage.imageDate !== recipeToEdit?.imageDate,
    );
  }, [finalImage?.imageDate, recipeToEdit?.imageDate]);

  const handleCloseIngredients = () => {
    setCanPressIngredients(false);
    setShowIngredients(false);
    setTempIngAmount(null);
    setTempIngMeasurement(null);
    setTempIngName(null);
    setTimeout(() => {
      setCanPressIngredients(true);
    }, 2000);
  };

  const handleCloseInstructions = () => {
    setCanPressInstructions(false);
    setShowInstructions(false);
    setTimeout(() => {
      setCanPressInstructions(true);
    }, 2000);
  };

  const handleCloseUploadPicture = () => {
    setCanPressUploadPicture(false);
    setShowUploadPicture(false);
    setTimeout(() => {
      setCanPressUploadPicture(true);
    }, 2000);
  };

  const handleCloseAboutRecipe = () => {
    setCanPressAboutRecipe(false);
    setShowAboutRecipe(false);
    setTimeout(() => {
      setCanPressAboutRecipe(true);
    }, 2000);
  };

  const resetForm = () => {
    setRecipeName(null);
    setSourceMaterial(displayDropField(displaySourceType));
    setSource(null);
    setSourceURL(null);
    setCuisineType(displayDropArray(displayCuisineTypes));
    setDishType(displayDropArray(displayDishTypes));
    setDietType(displayDropArray(displayDietTypes));
    setServings(null);
    setPrepTime(null);
    setCookTime(null);
    setIngredients([]);
    setInstructions([]);
    setAboutRecipe(null);
    setFinalImage(null);
    setTempIngAmount(null);
    setTempIngMeasurement(displayDropField(displayMeasurements));
    setTempIngName(null);
    setTempNote(null);

    setShowInstructions(false);
    setShowIngredients(false);
    setShowUploadPicture(false);
    setShowAboutRecipe(false);
    setCanPressIngredients(true);
    setCanPressInstructions(true);
    setCanPressUploadPicture(true);
    setCanPressAboutRecipe(true);
    setRecipeName(null);
    setValidation1(false);
    setValidation2(false);
    setValidation3(false);
    setValidation4(false);
  };

  const handleSaveRecipe = () => {
    if (!canSave) return;

    if (editingRecipe) {
      const editedRecipeSafe = {
        ...recipeToEdit,
        ...recipeObject,
        ...(imageChanged
          ? {}
          : {
              image: recipeToEdit?.image ?? null,
              imageUri: recipeToEdit?.imageUri ?? null,
              imageDate: recipeToEdit?.imageDate ?? null,
            }),
      };

      !fromCommunity &&
        dispatch({
          type: 'UPDATE_ITEM_IN_RECIPE_BOX',
          payload: {
            recipeBoxID: core?.recipeBoxID,
            editedRecipe: editedRecipeSafe,
            finalImage,
            profileID: core?.userID,
            pictureWasChanged: imageChanged,
            oldImageName: recipeToEdit?.image,
          },
        });

      fromCommunity &&
        dispatch({
          type: 'UPDATE_TO_COMMUNITY_RECIPES',
          payload: {
            editedRecipe: editedRecipeSafe,
            finalImage,
            profileID: core?.userID,
            pictureWasChanged: imageChanged,
            oldImageName: recipeToEdit?.image,
          },
        });

      resetForm();
      navigation.goBack();
    } else {
      dispatch({
        type: 'ADD_ITEM_TO_RECIPE_BOX',
        payload: {
          recipeBoxID: core?.recipeBoxID,
          newRecipe: recipeObject,
          finalImage,
          profileID: core?.userID,
        },
      });
      resetForm();
    }
  };

  return (
    <Layout
      headerTitle={editingRecipe ? 'Edit Recipe' : 'Add Recipe'}
      LeftButton="Back"
      RightButton={canSave ? 'Save' : ''}
      LeftAction={null}
      RightAction={handleSaveRecipe}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}
      innerViewStyles={{paddingHorizontal: 5}}
      mode={
        showIngredients ||
        showInstructions ||
        showAboutRecipe ||
        showUploadPicture
          ? 'static'
          : 'keyboard-scroll'
      }
      hideBar>
      <RecipeForm
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        validation1={validation1}
        sourceMaterial={sourceMaterial}
        setSourceMaterial={setSourceMaterial}
        displaySourceType={displaySourceType}
        validation2={validation2}
        sourceType={sourceType}
        validation3={validation3}
        validation4={validation4}
        displaySourceExample={displaySourceExample}
        source={source}
        setSource={setSource}
        sourceURL={sourceURL}
        setSourceURL={setSourceURL}
        cuisineType={cuisineType}
        setCuisineType={setCuisineType}
        displayCuisineTypes={displayCuisineTypes}
        dishType={dishType}
        setDishType={setDishType}
        displayDishTypes={displayDishTypes}
        dietType={dietType}
        setDietType={setDietType}
        displayDietTypes={displayDietTypes}
        servings={servings}
        setServings={setServings}
        prepTime={prepTime}
        setPrepTime={setPrepTime}
        cookTime={cookTime}
        setCookTime={setCookTime}
      />
      <View row>
        <View flex mt20>
          <Button
            textSize="small"
            size="medium"
            disabled={!canPressAboutRecipe}
            onPress={() => {
              setShowAboutRecipe(true);
            }}>
            Add Description
          </Button>
        </View>
        <View flex mt20>
          <Button
            textSize="small"
            size="medium"
            disabled={
              !canPressUploadPicture || recipeName === null || recipeName === ''
            }
            onPress={() => {
              setShowUploadPicture(true);
            }}>
            Upload Picture
          </Button>
        </View>
      </View>
      <View row>
        <View flex mt5>
          <Button
            textSize="small"
            size="medium"
            disabled={!canPressIngredients}
            onPress={() => {
              setShowIngredients(true);
            }}>
            Add Ingredients
            {ingredients?.length > 0 && ` (${ingredients?.length})`}
          </Button>
        </View>
        <View flex mt5>
          <Button
            textSize="small"
            size="medium"
            disabled={!canPressInstructions}
            onPress={() => {
              setShowInstructions(true);
            }}>
            Add Instructions
            {instructions?.length > 0 && ` (${instructions?.length})`}
          </Button>
        </View>
      </View>

      <View style={{height: 100}} />

      <BottomSheet
        visible={showIngredients}
        onClose={handleCloseIngredients}
        snapPoints={[0.01, 0.95]}
        innerStyles={{margin: 0}}>
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
          tempIngAmount={tempIngAmount}
          setTempIngAmount={setTempIngAmount}
          tempIngMeasurement={tempIngMeasurement}
          setTempIngMeasurement={setTempIngMeasurement}
          tempIngName={tempIngName}
          setTempIngName={setTempIngName}
          handleCloseIngredients={handleCloseIngredients}
          tempNote={tempNote}
          setTempNote={setTempNote}
        />
      </BottomSheet>

      <BottomSheet
        visible={showInstructions}
        onClose={handleCloseInstructions}
        snapPoints={[0.01, 0.95]}
        innerStyles={{margin: 0}}>
        <InstructionForm
          instructions={instructions}
          setInstructions={setInstructions}
          handleCloseInstructions={handleCloseInstructions}
        />
      </BottomSheet>

      <BottomSheet
        visible={showAboutRecipe}
        onClose={handleCloseAboutRecipe}
        snapPoints={[0.01, 0.95]}>
        <Input
          label="Recipe Description"
          caption="Optional: Info about this recipe"
          placeholder="Ex: This is a warm and hearty dish that..."
          value={aboutRecipe}
          onChangeText={setAboutRecipe}
          capitalize
          capitalMode="sentences"
          multiline
          multiHeight="large"
          counter
          maxCount={300}
          textInputStyles={{height: 140}}
        />

        <View row>
          <View flex />
          <View>
            <Button onPress={handleCloseAboutRecipe}>Finished</Button>
          </View>
        </View>
        <View mt25 ph15>
          <Text centered size="xSmall" italic kqColor="dark70">
            Note: Description will not be shown in Recipe Box Recipe View. It
            will appear when/if recipe is shared publicly.
          </Text>
        </View>
      </BottomSheet>
      <BottomSheet
        visible={showUploadPicture}
        onClose={handleCloseUploadPicture}
        snapPoints={[0.01, 0.95]}>
        <UploadPicture
          pictureName={pictureName}
          handleCloseUploadPicture={handleCloseUploadPicture}
          finalImage={finalImage}
          setFinalImage={setFinalImage}
        />
      </BottomSheet>
    </Layout>
  );
};

export default AddRecipe;
