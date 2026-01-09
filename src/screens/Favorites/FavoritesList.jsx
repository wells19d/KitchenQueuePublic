//* FavoritesList.jsx
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomSheet, Layout, Text} from '../../KQ-UI';
import {useFavorites} from '../../hooks/useHooks';
import {View} from 'react-native';
import {ListStyles} from '../../styles/Styles';
import SwipeableItem from '../../components/SwipeableItem';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';
import SelectedItemInfo from '../../components/SelectedItemInfo';
import {itemStoredOrder} from '../../utilities/helpers';

const FavoritesList = () => {
  const favorites = useFavorites();
  const navigation = useNavigation();
  const core = useCoreInfo();
  const dispatch = useDispatch();

  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [favorites?.items]),
  );

  const favoritesList = favorites?.items ?? [];
  console.log('favoritesList', itemStoredOrder(favoritesList));

  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (showItemInfo === false) {
      setSelectedItem(null);
    }
  }, [showItemInfo]);

  const handleUpdateItem = itemId => {
    navigation.navigate('FavoriteItems', {
      title: 'Update Item',
      itemId,
      navigateBackTo: 'FavoritesList',
      statusTo: 'shopping-list',
    });
  };

  const handleDeleteItem = useCallback(
    itemId => {
      if (core.profileID) {
        const item = favoritesList.find(item => item.itemId === itemId);
        if (item) {
          dispatch({
            type: 'DELETE_ITEM_FROM_FAVORITES',
            payload: {
              favoriteItemsID: core.favoriteItemsID,
              itemId: item.itemId,
              itemName: item.itemName,
              profileID: core.profileID,
            },
          });
        }
      }
    },
    [dispatch, core.profileID, favoritesList],
  );

  const SelectedItem = () => (
    <BottomSheet
      visible={showItemInfo}
      onClose={() => setShowItemInfo(false)}
      snapPoints={[0.01, 0.9]}>
      <SelectedItemInfo
        selectedItem={selectedItem}
        setShowItemInfo={setShowItemInfo}
        navigate={{
          to: 'FavoriteItems',
          backTo: 'FavoritesList',
        }}
        addToList
      />
    </BottomSheet>
  );

  return (
    <Layout
      headerTitle="Favorites"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      {favoritesList.length === 0 ? (
        <View
          style={[
            ListStyles.viewContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text>Favorites List is Empty</Text>
        </View>
      ) : (
        <View style={ListStyles.viewContainer}>
          <SwipeableItem
            key={refreshFlag}
            list={favoritesList}
            core={core}
            showItemInfo={showItemInfo}
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            favoritesView
            rightButtons={[
              {
                action: itemId => handleUpdateItem(itemId),
                text1: 'Update',
                text2: 'Item',
                style: ListStyles.updateButton,
              },
              {
                action: itemId => handleDeleteItem(itemId),
                text1: 'Delete',
                style: ListStyles.deleteButton,
              },
            ]}
            leftButtons={[]}
          />
          <SelectedItem />
        </View>
      )}
    </Layout>
  );
};

export default FavoritesList;
