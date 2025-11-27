//* SelectedRecipes.jsx

import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Modal, Text, Image, View} from '../../KQ-UI';
import {useColors} from '../../KQ-UI/KQUtilities';
import {
  capEachWord,
  endWithPeriod,
  formatParagraph,
} from '../../utilities/helpers';
import {SelectedRecipeStyles} from '../../styles/Styles';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import {useProfile} from '../../hooks/useHooks';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import KQTempRecipe from '../../svg/KitchenQueueTempRecipe';
import HeaderButtons from './HeaderButtons';
import IngredientList from './IngredientList';

const SelectedRecipe = ({
  selectedRecipe,
  visible,
  useOneColumn,
  recipeBoxView,
  onClose,
}) => {
  const useHaptics = setHapticFeedback();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const coreInfo = useCoreInfo();
  const profile = useProfile();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAboutRecipe, setShowAboutRecipe] = useState(false);
  const [showWDIH, setShowWDIH] = useState(false);

  const WDIHToggle = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setShowWDIH(!showWDIH);
  };

  const SectionHead = ({title, value, style}) => {
    if (value) {
      return (
        <View style={[SelectedRecipeStyles.sectionWrapper, {...style}]}>
          <View style={SelectedRecipeStyles.sectionEnd} />
          <View style={SelectedRecipeStyles.sectionTitle}>
            <Text size="xSmall" numberOfLines={1} font="open-7">
              {title}:
            </Text>
          </View>
          <View style={SelectedRecipeStyles.sectionEnd} />
        </View>
      );
    }
    return null;
  };

  const handleAddBM = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    if (isProcessing) return;
    setIsProcessing(true);

    onClose();
    dispatch({
      type: 'BOOKMARK_TO_RECIPE_BOX',
      payload: {
        recipeBoxID: coreInfo?.recipeBoxID,
        selectedRecipe: selectedRecipe,
        profileID: coreInfo?.userID,
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
        recipeBoxID: coreInfo?.recipeBoxID,
        selectedRecipe: selectedRecipe,
        profileID: coreInfo?.userID,
        owner: selectedRecipe?.accountID === coreInfo?.accountID,
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
          destructiveButtonIndex: 2, // Delete in red
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) handleEditRec?.(selectedRecipe);
          if (buttonIndex === 2) handleDeleteRec?.(selectedRecipe);
        },
      );
    } else {
      Alert.alert(
        'More Options',
        'Choose an option below:',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Edit', onPress: () => handleEditRec?.(selectedRecipe)},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => handleDeleteRec?.(selectedRecipe),
          },
        ],
        {cancelable: true},
      );
    }
  };

  // Edit Recipe - navigate to EditRecipe screen
  const handleEditRec = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    onClose();
    navigation.navigate('EditRecipe', {
      recipeToEdit: selectedRecipe,
      editingRecipe: true,
      fromCommunity: recipeBoxView ? false : true,
    });
  };

  // Delete Recipe - confirm and dispatch
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
                  recipeBoxID: coreInfo?.recipeBoxID,
                  selectedRecipe: selectedRecipe,
                  profileID: coreInfo?.userID,
                  owner: selectedRecipe?.accountID === coreInfo?.accountID,
                },
              });
            } else {
              // we need to change this. We would want to archive.
              dispatch({
                type: 'DELETE_FROM_COMMUNITY_RECIPES',
                payload: {
                  recipeBoxID: coreInfo?.recipeBoxID,
                  selectedRecipe: selectedRecipe,
                  profileID: coreInfo?.userID,
                  owner: selectedRecipe?.accountID === coreInfo?.accountID,
                },
              });
            }
          },
        },
      ],
    );
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
                recipeBoxID: coreInfo?.recipeBoxID,
                selectedRecipe: sharedRecipe,
                recipeID: sharedRecipe.id,
              },
            });
          },
        },
      ],
    );
  };

  // This is a future feature. Right now we don't have anything in place for admins to get messages.
  const handleRequestEditDelete = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    // this requests admin to edit/delete the recipe
  };

  return (
    <Modal
      visible={visible}
      title={capEachWord(selectedRecipe?.title)}
      headerFont="open-6"
      headerSize="small"
      height="99.5%"
      width="96%"
      hideClose
      headerColor="orange"
      onClose={onClose}>
      <View style={{borderBottomWidth: 1, borderColor: useColors('dark10')}}>
        {selectedRecipe?.imageUri ? (
          <Image
            image={selectedRecipe?.imageUri}
            style={SelectedRecipeStyles.imageSelectedStyles}
          />
        ) : (
          <View style={[SelectedRecipeStyles.imageSelectedStyles]}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                pointerEvents: 'none',
                transform: [{rotate: '-35deg'}],
              }}>
              <Text kqColor="dark90" size="small" font="open-7">
                Temp Image
              </Text>
            </View>
            <KQTempRecipe
              width={'100%'}
              height={200}
              color={useColors('dark30')}
              backgroundColor={useColors('white')}
            />
          </View>
        )}
      </View>

      {/* {renderButtons} */}
      <HeaderButtons
        selectedRecipe={selectedRecipe}
        recipeBoxView={recipeBoxView}
        handleAddBM={handleAddBM}
        handleRemoveBM={handleRemoveBM}
        handleShowOptions={handleShowOptions}
        handleShareRec={handleShareRec}
        handleRequestEditDelete={handleRequestEditDelete}
        onClose={onClose}
      />

      <View style={SelectedRecipeStyles.selectedViewWrapper} ph5>
        {/* {!recipeBoxView && (
          <Text size="tiny" centered font="open-7" kqColor="dark90">
            {providedBy}
          </Text>
        )} */}
        {showWDIH && (
          <View centerVH pt10 pb15>
            <TouchableOpacity
              style={{borderBottomWidth: 1, borderColor: '#0000ff'}}
              onPress={WDIHToggle}>
              <Text
                italic
                size="small"
                font="open-7"
                kqColor="rgb(56, 71, 234)">
                Back to Recipe
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView>
          {!showWDIH &&
            !recipeBoxView &&
            selectedRecipe?.publicAuthor &&
            selectedRecipe?.aboutRecipe && (
              <>
                <View style={SelectedRecipeStyles.aboutRecipe}>
                  <Text size="xSmall" font="open-7">
                    About this Recipe:
                  </Text>
                  <Text
                    size="tiny"
                    font="open-6"
                    numberOfLines={showAboutRecipe ? 10 : 1}>
                    {endWithPeriod(selectedRecipe?.aboutRecipe)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={SelectedRecipeStyles.aboutRecipeButton}
                  onPress={() => setShowAboutRecipe(!showAboutRecipe)}>
                  <Text size="tiny" font="open-5" kqColor="rgb(56, 71, 234)">
                    {showAboutRecipe ? 'Show Less' : 'Show More'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

          {!showWDIH && (
            <SectionHead
              title="Ingredients"
              value={selectedRecipe?.ingredients?.length > 0}
              style={{
                marginTop: recipeBoxView
                  ? 10
                  : selectedRecipe?.publicAuthor
                  ? 5
                  : 10,
              }}
            />
          )}
          <View style={SelectedRecipeStyles.ingWrapper}>
            <IngredientList
              selectedRecipe={selectedRecipe}
              showWDIH={showWDIH}
              setShowWDIH={setShowWDIH}
              WDIHToggle={WDIHToggle}
            />
          </View>
          {!showWDIH && (
            <SectionHead
              title="Instructions"
              value={selectedRecipe?.instructions?.length > 0}
            />
          )}
          {!showWDIH && (
            <View m={5} mb={10}>
              {Array.isArray(selectedRecipe?.instructions) &&
                selectedRecipe.instructions.length > 0 &&
                selectedRecipe.instructions.map((group, gIndex) => (
                  <View key={`group-${gIndex}`} mb={25}>
                    {group.name ? (
                      <View pl={10} pb={2}>
                        <Text size="small" font="open-7">
                          {capEachWord(group.name)}
                        </Text>
                      </View>
                    ) : null}
                    {group.steps.map((ins, sIndex) => (
                      <View
                        key={`${gIndex}-${sIndex}`}
                        style={SelectedRecipeStyles.stepWrapper}>
                        <View style={SelectedRecipeStyles.stepNumber}>
                          <Text size="xSmall" font="open-7">
                            Step {ins.step + 1}:
                          </Text>
                        </View>
                        <View style={SelectedRecipeStyles.stepText}>
                          <Text size="xSmall">
                            {formatParagraph(ins.action)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default __DEV__ ? SelectedRecipe : React.memo(SelectedRecipe);
