// MakeRecipe.jsx

import {useCupboard} from '../../hooks/useHooks';
import {Button, View} from '../../KQ-UI';
import useRecipeFunction from './Helpers/useRecipeFunction';

const MakeRecipe = ({recipeIngredients, selectedRecipe, onClose}) => {
  const {handleMakeRecipe} = useRecipeFunction({selectedRecipe, onClose});
  const cupboard = useCupboard();

  const cupboardItems = Array.isArray(cupboard?.items) ? cupboard?.items : [];

  return (
    <View flex pt={5} mb={-5}>
      <Button
        textSize="xSmall"
        onPress={() =>
          handleMakeRecipe(
            cupboardItems,
            recipeIngredients,
            selectedRecipe,
            onClose,
          )
        }>
        Make This Recipe
      </Button>
    </View>
  );
};

export default MakeRecipe;
