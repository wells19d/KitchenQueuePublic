//* RecipeSearch.jsx
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, Input, Layout, Text} from '../../KQ-UI';
import {
  useDeviceInfo,
  useRecipeDataLoading,
  useRecipesData,
} from '../../hooks/useHooks';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useColors} from '../../KQ-UI/KQUtilities';

import {Icons} from '../../components/IconListRouter';
import FastImage from 'react-native-fast-image';
import SelectedRecipe from './SelectedRecipe';
import {RecipeSearchStyles} from '../../styles/Styles';
import {useCoreInfo} from '../../utilities/coreInfo';
import {dailyCheckLimit} from '../../utilities/checkLimit';
import {capEachWord} from '../../utilities/helpers';

const RecipeSearch = () => {
  const dispatch = useDispatch();
  const core = useCoreInfo();
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

  const recipesFound = useRecipesData();
  const recipeLoading = useRecipeDataLoading();

  const [storedData, setStoredData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchCreated, setSearchCreated] = useState(true);
  const [showRecipeInfo, setShowRecipeInfo] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (recipesFound?.length === 0) {
      setSearchCreated(false); //
    }

    if (
      recipesFound &&
      Array.isArray(recipesFound) &&
      recipesFound.length > 0
    ) {
      const sorted = [...recipesFound].sort(
        (a, b) => (b.ratingScore ?? 0) - (a.ratingScore ?? 0),
      );
      setStoredData(sorted);
    }
  }, [recipesFound]);

  const lastSearch = useRef('');
  const counterRef = useRef(core?.dailyRecipeCounter || 0);

  useEffect(() => {
    if (core?.dailyRecipeCounter !== undefined) {
      counterRef.current = core.dailyRecipeCounter;
    }
  }, [core?.dailyRecipeCounter]);

  const handleSearch = useCallback(() => {
    const term = searchName.trim();
    if (
      !term ||
      term.length < 2 ||
      term.toLowerCase() === lastSearch.current.toLowerCase()
    )
      return;

    lastSearch.current = term.toLowerCase();

    if (counterRef.current < core?.maxRecipeSearchLimit) {
      dispatch({
        type: 'FETCH_COMMUNITY_RECIPES',
        payload: {
          keywords: term,
          allowance: core?.dailyRecipeCounter,
          profileID: core?.profileID,
          accountID: core?.accountID,
        },
      });
    } else {
      dailyCheckLimit({
        current: counterRef.current,
        max: core?.maxRecipeSearchLimit,
        label: 'Recipe',
      });
    }

    setSearchCreated(true);
  }, [searchName, dispatch]);

  useEffect(() => {
    if (storedData.length) {
      FastImage.preload(
        storedData.map(r => ({
          uri: `https://firebasestorage.googleapis.com/v0/b/kitchen-queue-fe2fe.firebasestorage.app/o/recipes%2F${encodeURIComponent(
            r.image,
          )}?alt=media`,
        })),
      );
    }
  }, [storedData]);

  useEffect(() => {
    return () => {
      setStoredData([]);
      lastSearch.current = '';
      setSearchCreated(false);
    };
  }, []);

  const handleClear = () => {
    FastImage.clearMemoryCache();
    FastImage.clearDiskCache();
    setSearchName('');
    setSearchCreated(false);
    setStoredData([]);
    lastSearch.current = '';
    dispatch({type: 'RESET_COMMUNITY_RECIPES'});
  };

  const handleSelectedRecipe = item => {
    setShowRecipeInfo(true);
    setSelectedRecipe(item);
  };

  const handleCloseSelectedRecipe = () => {
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
  // --- End

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

  const RecipesFound = useMemo(() => {
    if (searchCreated && !recipeLoading) {
      if (storedData?.length > 0) {
        return (
          <Text centered size="tiny" kqColor="dark70">
            Recipes Found: {storedData?.length || 0}
          </Text>
        );
      } else {
        return (
          <Text centered size="tiny" kqColor="dark70">
            No Recipes Found
          </Text>
        );
      }
    } else {
      return null;
    }
  }, [storedData, searchCreated, recipeLoading]);

  return (
    <Layout
      headerTitle="Recipe Search"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 5}}
      innerViewStyles={{}}>
      <View style={RecipeSearchStyles.innerLayoutWrapper}>
        <View style={{flex: 1}}>
          <View style={RecipeSearchStyles.inputWrapper}>
            <View style={{flex: 1}}>
              <Input
                placeholder="Search Recipes"
                value={searchName}
                onChangeText={setSearchName}
                capitalize
                capitalMode="words"
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                wrapperStyles={RecipeSearchStyles.wrapperStyles}
                accessoryRight={() => (
                  <TouchableOpacity
                    onPress={handleSearch}
                    style={RecipeSearchStyles.iconStyles}>
                    <Icons.Search size={25} color={useColors('dark50')} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View>
              <View style={RecipeSearchStyles.clearButtonWrapper}>
                <TouchableOpacity
                  disabled={storedData?.length <= 0}
                  style={RecipeSearchStyles.clearButton}
                  onPress={() => handleClear()}>
                  <Icons.XCircle
                    size={30}
                    color={
                      storedData?.length <= 0
                        ? useColors('dark30')
                        : useColors('orange')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginBottom: 10,
              borderColor: useColors('dark30'),
            }}>
            {RecipesFound}
          </View>
          <View style={{flex: 1}}>
            {recipeLoading ? (
              <View style={RecipeSearchStyles.loadingWrapper}>
                <View style={RecipeSearchStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#29856c" />
                </View>
                <View style={RecipeSearchStyles.loadingText}>
                  <Text size="small">Searching...</Text>
                </View>
              </View>
            ) : (
              <FlashList
                data={storedData}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  item?.id ? item.id.toString() : `id-${index}`
                }
                estimatedItemSize={300}
                extraData={renderItem}
                numColumns={columnRows}
              />
            )}
          </View>
        </View>
      </View>
      <SelectedRecipe
        visible={showRecipeInfo}
        selectedRecipe={selectedRecipe}
        useOneColumn={useOneColumn}
        onClose={() => handleCloseSelectedRecipe()}
      />
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

export default RecipeSearch;
