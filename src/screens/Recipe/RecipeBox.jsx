//* RecipeBox.jsx

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Image, Layout, Text, View} from '../../KQ-UI';
import {ListStyles, RecipeSearchStyles} from '../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {useDeviceInfo, useProfile, useRecipeBox} from '../../hooks/useHooks';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icons} from '../../components/IconListRouter';
import {useColors} from '../../KQ-UI/KQUtilities';
import {capEachWord, tempImageString} from '../../utilities/helpers';
import SelectedRecipe from './SelectedRecipe';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import KQTempRecipe from '../../svg/KitchenQueueTempRecipe';
// import {deletePicture} from '../../utilities/checkImage';

const RecipeBox = () => {
  const navigation = useNavigation();
  const recipeBox = useRecipeBox();
  const useHaptics = setHapticFeedback();
  const profile = useProfile();
  const recipesList = recipeBox?.items || [];
  const deviceInfo = useDeviceInfo();
  const {view: deviceView, system} = deviceInfo || {};
  const deviceType = system?.device;

  const columnRows = useMemo(() => {
    if (deviceType !== 'Tablet') return 2;

    switch (deviceView) {
      case 'Portrait':
        return 3;
      case 'Landscape':
        return 4;
      default:
        return 2;
    }
  }, [deviceInfo]);

  const handleCreateRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  const [showRecipeInfo, setShowRecipeInfo] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectedRecipe = item => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setShowRecipeInfo(true);
    setSelectedRecipe(item);
  };

  const handleCloseSelectedRecipe = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setShowRecipeInfo(false);
    setSelectedRecipe(null);
  };

  const [useOneColumn, setUseOneColumn] = useState(false);

  useEffect(() => {
    const hasLongIngredient = selectedRecipe?.ingredients?.some(
      ing => ing?.name?.length > 15,
    );
    setUseOneColumn(hasLongIngredient);
  }, [selectedRecipe]);

  // const deleteFileName = 'uqHTLaneuvSdmAKw8sY20Okfugm2'; // Example filename

  const renderItem = useCallback(({item, index}) => {
    const isLeft = index % 2 === 0;
    return (
      <TouchableOpacity
        onPress={() => handleSelectedRecipe(item)}
        style={styles.itemWrapper(isLeft)}>
        {item.imageUri ? (
          <Image
            key={`${item.id}-${item.imageDate || item.lastUpdated}`}
            image={item.imageUri || tempImageString}
            style={styles.imageListStyles}
          />
        ) : (
          <View style={[styles.imageListStyles, {borderWidth: 1.5}]}>
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

            {/* SVG background */}
            <KQTempRecipe
              width="100%"
              height="100%"
              color={useColors('dark30')}
              backgroundColor={useColors('white')}
            />
          </View>
        )}

        <View style={RecipeSearchStyles.listWrapper}>
          <View style={RecipeSearchStyles.listTitle}>
            <Text size="xSmall" numberOfLines={2}>
              {capEachWord(item?.title || '')}
            </Text>
          </View>
          <View style={RecipeSearchStyles.listSubTitleContainer}>
            <View style={RecipeSearchStyles.listReadyIn}>
              <Text size="tiny" font="open-4" kqColor="dark90">
                {item?.readyIn ? `${item.readyIn} min` : ''}
              </Text>
            </View>
            {/* <View style={RecipeSearchStyles.listScoreContainer}>
              <View style={RecipeSearchStyles.listScoreLeft}>
                <Text size="tiny" font="open-4" kqColor="dark90">
                  {item?.ratingScore || ''}
                </Text>
              </View>

              <View style={RecipeSearchStyles.listScoreRight}>
                {!!item?.ratingScore && (
                  <Icons.Star size={12} color={useColors('dark90')} />
                )}
              </View>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Layout
      headerTitle="Recipe Box"
      LeftButton=""
      RightButton="Add"
      LeftAction={null}
      RightAction={handleCreateRecipe}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      <View style={[RecipeSearchStyles.innerLayoutWrapper, {paddingTop: 10}]}>
        {recipesList?.length > 0 ? (
          <View flex>
            <FlashList
              data={recipesList}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                item?.id ? item.id.toString() : `id-${index}`
              }
              estimatedItemSize={300}
              extraData={recipesList}
              numColumns={columnRows}
            />
          </View>
        ) : (
          <View
            style={[
              ListStyles.viewContainer,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text>Recipe Box is Empty</Text>
          </View>
        )}
      </View>
      <SelectedRecipe
        visible={showRecipeInfo}
        selectedRecipe={selectedRecipe}
        recipesList={recipesList}
        useOneColumn={useOneColumn}
        onClose={() => handleCloseSelectedRecipe()}
        recipeBoxView
      />
      {/* {__DEV__ && (
        <Button
          onPress={() => {
            deletePicture(deleteFileName);
          }}>
          Dev cleanup
        </Button>
      )} */}
    </Layout>
  );
};

const styles = {
  itemWrapper: isLeft => ({
    flex: 1,
    marginLeft: isLeft ? 8 : 5,
    marginRight: isLeft ? 5 : 8,
    marginBottom: 20,
  }),
  imageListStyles: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: useColors('dark10'),
    height: 200,
    width: '100%',
    backgroundColor: useColors('white'),
  },
};

export default RecipeBox;
