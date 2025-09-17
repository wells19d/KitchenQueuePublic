//* SelectedRecips.jsx

import React, {useMemo, useState} from 'react';
import {
  ActionSheetIOS,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Modal, Text, Image, View} from '../../KQ-UI';
import {Icons} from '../../components/IconListRouter';
import {useColors} from '../../KQ-UI/KQUtilities';
import {
  capEachWord,
  endWithPeriod,
  formatParagraph,
} from '../../utilities/helpers';
import {toFraction} from '../../utilities/fractionUnit';
import {formatPluralUnit} from '../../utilities/formatPluralUnit';
import {SelectedRecipeStyles} from '../../styles/Styles';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import {useProfile, useRecipeBox} from '../../hooks/useHooks';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import KQTempRecipe from '../../svg/KitchenQueueTempRecipe';

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
  // console.log('coreInfo:', coreInfo);

  const profile = useProfile();
  // console.log('profile:', profile);
  const recipeBox = useRecipeBox();
  const recipesListIDs = recipeBox?.items?.map(rec => rec?.id) || [];
  const [isProcessing, setIsProcessing] = useState(false);

  const isBookmarked = useMemo(() => {
    return recipesListIDs.includes(selectedRecipe?.id);
  }, [recipesListIDs, selectedRecipe]);

  const [showAboutRecipe, setShowAboutRecipe] = useState(false);

  // const providedBy = useMemo(() => {
  //   if (selectedRecipe?.publicAuthor) {
  //     if (selectedRecipe?.displayAuthorName) {
  //       return `KQ Recipe provided by ${selectedRecipe.authorFirstName} ${selectedRecipe.authorLastName}`;
  //     } else {
  //       return `KQ Recipe provided by ${selectedRecipe.authorOnlineName}`;
  //     }
  //   } else if (selectedRecipe?.source === 'Epicurious') {
  //     return `KQ Recipe provided by Kitchen Queue`;
  //   } else {
  //     return `KQ Recipe provided by a Private User`;
  //   }
  // }, [selectedRecipe]);

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

  const handleRequestEditDelete = () => {};

  const handleEditRec = () => {
    onClose();
    navigation.navigate('AddRecipe', {
      recipeToEdit: selectedRecipe,
      editingRecipe: true,
      fromCommunity: recipeBoxView ? false : true,
    });
  };

  const handleShareRec = () => {
    // console.log('Share recipe', selectedRecipe?.title);
  };

  const handleDeleteRec = () => {
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

  const handleAddBM = () => {
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

  const handleAdminEditRecipe = () => {};
  const handleAdminDeleteRecipe = () => {};

  const renderButtons = useMemo(() => {
    const admin = coreInfo?.admin;
    const btAccount = selectedRecipe?.accountID === coreInfo?.accountID; // belongs to account
    const btAuthor = selectedRecipe?.authorID === coreInfo?.userID; // belongs to author
    const bookmarked = isBookmarked;

    if (selectedRecipe === null) return null;

    // 1. Recipe Box View
    if (recipeBoxView) {
      if (btAccount) {
        // Account owns this recipe → edit/delete/share
        return (
          <>
            <TouchableOpacity
              style={SelectedRecipeStyles.selectedTRButton}
              onPress={handleShowOptions}>
              <Icons.Options size={25} color={useColors('white')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={SelectedRecipeStyles.selectedBRButton}
              onPress={handleShareRec}>
              <View style={{position: 'relative', top: -2}}>
                <Icons.Share size={25} color={useColors('white')} />
              </View>
            </TouchableOpacity>
          </>
        );
      } else {
        // Not account owner → just bookmark toggle
        return (
          <TouchableOpacity
            style={SelectedRecipeStyles.selectedTRButton}
            onPress={bookmarked ? handleRemoveBM : handleAddBM}>
            {bookmarked ? (
              <Icons.BookmarkMinus size={25} color={useColors('white')} />
            ) : (
              <Icons.BookmarkPlus size={25} color={useColors('white')} />
            )}
          </TouchableOpacity>
        );
      }
    }

    // 2. Community / Search View
    if (!recipeBoxView) {
      if (btAuthor) {
        // Author of recipe → request edit/delete
        return (
          <>
            <TouchableOpacity
              style={SelectedRecipeStyles.selectedBRButton}
              onPress={handleRequestEditDelete}>
              <Icons.Account size={25} color={useColors('white')} />
            </TouchableOpacity>
            {admin && (
              <TouchableOpacity
                style={SelectedRecipeStyles.selectedBLButton}
                onPress={handleShowOptions}>
                <Icons.AdminEdit size={25} color={useColors('white')} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={SelectedRecipeStyles.selectedTRButton}
              onPress={bookmarked ? handleRemoveBM : handleAddBM}>
              {bookmarked ? (
                <Icons.BookmarkMinus size={25} color={useColors('white')} />
              ) : (
                <Icons.BookmarkPlus size={25} color={useColors('white')} />
              )}
            </TouchableOpacity>
          </>
        );
      } else {
        // Not author → just bookmark toggle
        return (
          <>
            <TouchableOpacity
              style={SelectedRecipeStyles.selectedTRButton}
              onPress={bookmarked ? handleRemoveBM : handleAddBM}>
              {bookmarked ? (
                <Icons.BookmarkMinus size={25} color={useColors('white')} />
              ) : (
                <Icons.BookmarkPlus size={25} color={useColors('white')} />
              )}
            </TouchableOpacity>
            {admin && (
              <TouchableOpacity
                style={SelectedRecipeStyles.selectedBLButton}
                onPress={handleShowOptions}>
                <Icons.AdminEdit size={25} color={useColors('white')} />
              </TouchableOpacity>
            )}
          </>
        );
      }
    }

    return null;
  }, [coreInfo, selectedRecipe, isBookmarked, recipeBoxView]);

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

      <TouchableOpacity
        style={SelectedRecipeStyles.selectedCloseButton}
        onPress={onClose}>
        <Icons.Close size={25} color={useColors('white')} />
      </TouchableOpacity>

      {renderButtons}

      <View style={SelectedRecipeStyles.selectedViewWrapper} ph5>
        {/* {!recipeBoxView && (
          <Text size="tiny" centered font="open-7" kqColor="dark90">
            {providedBy}
          </Text>
        )} */}
        <ScrollView>
          {!recipeBoxView &&
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
          <View style={SelectedRecipeStyles.ingWrapper}>
            {selectedRecipe?.ingredients?.map((ing, index) => (
              <View
                key={index}
                style={
                  useOneColumn
                    ? SelectedRecipeStyles.ingColOne
                    : SelectedRecipeStyles.ingColTwo
                }>
                <View row>
                  <View style={SelectedRecipeStyles.ingDot}>
                    <Icons.Dot size={4} />
                  </View>
                  <View flex>
                    <Text size="xSmall" font="open-7" numberOfLines={3}>
                      {(() => {
                        if (ing.amount != null) {
                          const pluralUnit = formatPluralUnit(
                            ing.amount,
                            ing.unit,
                          );
                          return `${toFraction(ing.amount)}${
                            pluralUnit ? ` ${pluralUnit}` : ''
                          } `;
                        }
                        return '';
                      })()}
                      {capEachWord(ing.name)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <SectionHead
            title="Instructions"
            value={selectedRecipe?.instructions?.length > 0}
          />
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
                        <Text size="xSmall">{formatParagraph(ins.action)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default __DEV__ ? SelectedRecipe : React.memo(SelectedRecipe);
