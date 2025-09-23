//* ShoppingCart.jsx
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomSheet, Layout, Text} from '../../KQ-UI';
import {useAccount, useShoppingCart} from '../../hooks/useHooks';
import {Alert, View} from 'react-native';
import {ListStyles} from '../../styles/Styles';
import SwipeableItem from '../../components/SwipeableItem';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';
import SelectedItemInfo from '../../components/SelectedItemInfo';

const ShoppingCart = () => {
  const core = useCoreInfo();
  const account = useAccount();
  const shopping = useShoppingCart();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [shopping?.items]),
  );

  const shoppingCart = Array.isArray(shopping?.items)
    ? shopping.items.filter(item => item.status === 'shopping-cart')
    : [];

  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (showItemInfo === false) {
      setSelectedItem(null);
    }
  }, [showItemInfo]);

  const handleReturnToList = useCallback(
    itemId => {
      const item =
        selectedItem?.itemId === itemId
          ? selectedItem
          : shoppingCart.find(item => item.itemId === itemId);

      if (item && core.profileID) {
        const updatedItem = {
          ...item,
          status: 'shopping-list',
          lastUpdated: new Date().toISOString(),
          lastUpdatedBy: core.profileID,
        };
        dispatch({
          type: 'UPDATE_ITEM_IN_SHOP_CART',
          payload: {
            shoppingCartID: core.shoppingCartID,
            updatedItem,
            profileID: core.profileID,
            updateType: 'toList',
          },
        });
      }
    },
    [dispatch, core, shoppingCart],
  );

  const handleUpdateItem = itemId => {
    navigation.navigate('ShoppingItems', {
      title: 'Update Item',
      itemId,
      navigateBackTo: 'ShoppingCart',
      statusTo: 'shopping-cart',
    });
  };

  const handleDeleteItem = useCallback(
    itemId => {
      if (core.profileID) {
        const item = shoppingCart.find(item => item.itemId === itemId);
        if (item) {
          dispatch({
            type: 'DELETE_ITEM_FROM_SHOP_CART',
            payload: {
              shoppingCartID: core.shoppingCartID,
              itemId: item.itemId,
              itemName: item.itemName,
              profileID: core.profileID,
            },
          });
        }
      }
    },
    [dispatch, core, shoppingCart],
  );

  const handleAddToFavorites = itemId => {
    const latestItem = shopping?.items?.find(i => i.itemId === itemId);

    const newItem = {
      itemName: latestItem?.itemName || '',
      brandName: latestItem?.brandName || '',
      description: latestItem?.description || '',
      packageSize: Number(latestItem?.packageSize),
      measurement: latestItem?.measurement || '',
      category: latestItem?.category || '',
      notes: latestItem?.notes || '',
    };

    dispatch({
      type: 'ADD_ITEM_TO_FAVORITES',
      payload: {
        favoriteItemsID: core.favoriteItemsID,
        newItem: newItem,
        profileID: core.profileID,
      },
    });
  };

  const AddToCupboard = () => {
    if (shoppingCart?.length > 0) {
      Alert.alert(
        'Confirm Checkout',
        'Are you ready to move your shopping cart items to your cupboard?',
        [
          {
            text: 'Cancel',
            style: 'destructive',
          },
          {
            text: 'Confirm',
            onPress: () => {
              dispatch({
                type: 'BATCH_TO_CUPBOARD',
                payload: {
                  cupboardID: core?.cupboardID,
                  items: shoppingCart,
                  profileID: core?.profileID,
                },
              });

              navigation.navigate('CupboardList-Single');
            },
          },
        ],
      );
    }
  };

  const SelectedItem = () => (
    <BottomSheet
      visible={showItemInfo}
      onClose={() => setShowItemInfo(false)}
      snapPoints={[0.01, 0.9]}>
      <SelectedItemInfo
        selectedItem={selectedItem}
        setShowItemInfo={setShowItemInfo}
        navigate={{to: 'ShoppingItems', backTo: 'ShoppingCart'}}
      />
    </BottomSheet>
  );

  return (
    <Layout
      headerTitle="Shopping Cart"
      LeftButton="To-List"
      RightButton="Checkout"
      LeftAction={null}
      RightAction={AddToCupboard}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      {shoppingCart.length === 0 ? (
        <View
          style={[
            ListStyles.viewContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text>Shopping List is Empty</Text>
        </View>
      ) : (
        <View style={ListStyles.viewContainer}>
          <SwipeableItem
            key={refreshFlag}
            list={shoppingCart}
            core={core}
            showItemInfo={showItemInfo}
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            rightButtons={[
              {
                action: itemId => handleReturnToList(itemId),
                text1: 'Return',
                text2: 'to List',
                style: ListStyles.addButton,
              },
              {
                action: itemId => handleUpdateItem(itemId),
                navigateBackTo: 'InCart',
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
            leftButtons={[
              {
                action: itemId => handleAddToFavorites(itemId),
                starIcon: true,
                style: ListStyles.favButton,
              },
            ]}
          />
          <SelectedItem />
        </View>
      )}
    </Layout>
  );
};

export default ShoppingCart;
