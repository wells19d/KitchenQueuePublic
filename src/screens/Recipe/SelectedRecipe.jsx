//* SelectedRecipes.jsx

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal, Text, Image, View, Button} from '../../KQ-UI';
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
import KQTempRecipe from '../../svg/KitchenQueueTempRecipe';
import HeaderButtons from './HeaderButtons';
import IngredientList from './IngredientList';
import {useRecipeIngStatus} from './Helpers/useRecipeIngStatus';
import {Icons} from '../../components/IconListRouter';
import MakeRecipe from './MakeRecipe';

const SelectedRecipe = ({selectedRecipe, visible, recipeBoxView, onClose}) => {
  const useHaptics = setHapticFeedback();
  const dispatch = useDispatch();
  const core = useCoreInfo();
  const profile = useProfile();
  const [showAboutRecipe, setShowAboutRecipe] = useState(false);
  const [showWDIH, setShowWDIH] = useState(false);
  const useColor = useColors;
  const recipeIngredients = useRecipeIngStatus(selectedRecipe);
  // console.log('selectedRecipe:', selectedRecipe);
  // console.log('Recipe Ingredients with Status:', recipeIngredients);

  const [recentlyAdded, setRecentlyAdded] = useState({});
  const [recentlyAddedAll, setRecentlyAddedAll] = useState(false);

  const WDIHToggle = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setShowWDIH(!showWDIH);
  };

  useEffect(() => {
    if (onClose) {
      return () => {
        setRecentlyAdded({});
        setRecentlyAddedAll(false);
      };
    }
  }, [onClose]);

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

  const AddAllItems = () => {
    let itemsToAdd = [];
    let itemsToUpdate = [];

    recipeIngredients.forEach(ing => {
      if (!ing.inCart && !ing.inList) {
        itemsToAdd.push(ing);
      } else if (ing.inCart || ing.inList) {
        itemsToUpdate.push(ing);
      }
    });

    dispatch({
      type: 'ADD_ALL_ITEMS_TO_SHOP_CART',
      payload: {
        itemsToAdd,
        itemsToUpdate,
        shoppingCartID: core.shoppingCartID,
        profileID: core.profileID,
      },
    });

    const all = {};
    recipeIngredients.forEach(ing => {
      all[ing.name] = true;
    });

    setRecentlyAdded(all);
    setRecentlyAddedAll(true);
  };

  const success = useColor('success');
  const style = [
    {borderWidth: 1.25},
    recentlyAddedAll && {borderWidth: 2, borderColor: success},
  ];

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
        onClose={onClose}
      />

      <View style={SelectedRecipeStyles.selectedViewWrapper} ph5>
        <View row>
          {showWDIH ? (
            <>
              <View flex pv={5}>
                <Button color="orange" onPress={WDIHToggle} textSize="xSmall">
                  Back to Recipe
                </Button>
              </View>

              <View flex pv={5}>
                <Button
                  type="outline"
                  color={recentlyAddedAll ? 'Success' : 'Dark'}
                  disabled={recentlyAddedAll}
                  disabledColor="Success"
                  onPress={AddAllItems}
                  style={style}>
                  <View row pr={5} centerVH>
                    {recentlyAddedAll ? (
                      <Icons.Check color={success} size={15} />
                    ) : (
                      <Icons.Plus size={15} />
                    )}
                    <Text size="xSmall">
                      {recentlyAddedAll ? ' Added All' : ' Add All Ingredients'}
                    </Text>
                  </View>
                </Button>
              </View>
            </>
          ) : (
            <MakeRecipe
              recipeIngredients={recipeIngredients}
              selectedRecipe={selectedRecipe}
              onClose={onClose}
            />
          )}
        </View>

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
              showWDIH={showWDIH}
              WDIHToggle={WDIHToggle}
              recentlyAdded={recentlyAdded}
              setRecentlyAdded={setRecentlyAdded}
              setRecentlyAddedAll={setRecentlyAddedAll}
              recipeIngredients={recipeIngredients}
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
