// useRecipeFunction.js
import {useDispatch} from 'react-redux';
import {setHapticFeedback} from '../../../hooks/setHapticFeedback';
import {useNavigation} from '@react-navigation/native';
import {useCoreInfo} from '../../../utilities/coreInfo';
import {useProfile} from '../../../hooks/useHooks';
import {useState} from 'react';
import {ActionSheetIOS, Alert, Platform} from 'react-native';

const useRecipeFunction = ({selectedRecipe, recipeBoxView, onClose}) => {
  const useHaptics = setHapticFeedback();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const core = useCoreInfo();
  const profile = useProfile();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddBM = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    if (isProcessing) return;
    setIsProcessing(true);

    onClose();
    dispatch({
      type: 'BOOKMARK_TO_RECIPE_BOX',
      payload: {
        recipeBoxID: core?.recipeBoxID,
        selectedRecipe: selectedRecipe,
        profileID: core?.userID,
      },
    });
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleRemoveBM = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    if (isProcessing) return;
    setIsProcessing(true);
    onClose();
    dispatch({
      type: 'DELETE_ITEM_FROM_RECIPE_BOX',
      payload: {
        recipeBoxID: core?.recipeBoxID,
        selectedRecipe: selectedRecipe,
        profileID: core?.userID,
        owner: selectedRecipe?.accountID === core?.accountID,
      },
    });
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleShowOptions = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Edit', 'Delete'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) handleEditRec();
          if (buttonIndex === 2) handleDeleteRec();
        },
      );
    } else {
      Alert.alert(
        'More Options',
        'Choose an option below:',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Edit', onPress: handleEditRec},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: handleDeleteRec,
          },
        ],
        {cancelable: true},
      );
    }
  };

  const handleDeleteRec = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onClose();
            if (recipeBoxView) {
              dispatch({
                type: 'DELETE_ITEM_FROM_RECIPE_BOX',
                payload: {
                  recipeBoxID: core?.recipeBoxID,
                  selectedRecipe: selectedRecipe,
                  profileID: core?.userID,
                  owner: selectedRecipe?.accountID === core?.accountID,
                },
              });
            } else {
              // we need to change this. We would want to archive.
              dispatch({
                type: 'DELETE_FROM_COMMUNITY_RECIPES',
                payload: {
                  recipeBoxID: core?.recipeBoxID,
                  selectedRecipe: selectedRecipe,
                  profileID: core?.userID,
                  owner: selectedRecipe?.accountID === core?.accountID,
                },
              });
            }
          },
        },
      ],
    );
  };

  const handleEditRec = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    onClose();
    navigation.navigate('EditRecipe', {
      recipeToEdit: selectedRecipe,
      editingRecipe: true,
      fromCommunity: recipeBoxView ? false : true,
    });
  };

  const handleShareRec = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    Alert.alert(
      'Share Recipe',
      // `You’re about to share this recipe with the community. Once shared, it becomes part of the community and can no longer be edited by you. If you need to change or remove it later, you can submit a review request to the admin team. Would you like to continue?`,
      `You’re about to share this recipe with the community. Once shared, it becomes part of the community and can no longer be edited. Would you like to continue?`,
      [
        {text: 'Cancel', style: 'destructive'},
        {
          text: 'Share',
          onPress: () => {
            const sharedRecipe = {
              ...selectedRecipe,
              recipeShared: true,
              sharedStatus: 'approved',
              userEdit: false,
            };

            dispatch({
              type: 'SHARE_TO_COMMUNITY_RECIPES',
              payload: {
                recipeBoxID: core?.recipeBoxID,
                selectedRecipe: sharedRecipe,
                recipeID: sharedRecipe.id,
              },
            });
          },
        },
      ],
    );
  };

  const handleRequestEditDelete = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    // this requests admin to edit/delete the recipe
  };

  const handleMakeRecipe = (items, ingredients, recipe, onClose) => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    console.log('button fired');
    console.log('Cupboards:', items);
    console.log('Recipe Ingredients:', ingredients);
    console.log('Selected Recipe:', recipe);
  };

  return {
    handleAddBM,
    handleRemoveBM,
    handleShowOptions,
    handleEditRec,
    handleDeleteRec,
    handleShareRec,
    handleRequestEditDelete,
    handleMakeRecipe,
  };
};

export default useRecipeFunction;
