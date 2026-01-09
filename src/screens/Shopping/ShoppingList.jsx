//* ShoppingList.jsx
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomSheet, Layout, Text} from '../../KQ-UI';
import {useShoppingCart} from '../../hooks/useHooks';
import {View} from 'react-native';
import {ListStyles} from '../../styles/Styles';
import SwipeableItem from '../../components/SwipeableItem';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';
import SelectedItemInfo from '../../components/SelectedItemInfo';
import {itemStoredOrder} from '../../utilities/helpers';

const ShoppingList = () => {
  const shopping = useShoppingCart();
  const navigation = useNavigation();
  const core = useCoreInfo();
  const dispatch = useDispatch();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [shopping?.items]),
  );

  const shoppingList = Array.isArray(shopping?.items)
    ? shopping.items.filter(item => item.status === 'shopping-list')
    : [];

  // console.log('shoppingList', itemStoredOrder(shoppingList));

  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (showItemInfo === false) {
      setSelectedItem(null);
    }
  }, [showItemInfo]);

  const handleAddToCart = itemId => {
    const latestItem = shopping?.items?.find(i => i.itemId === itemId);
    const fallbackItem = selectedItem?.itemId === itemId ? selectedItem : null;
    const item = latestItem || fallbackItem;

    if (item && core.profileID) {
      const updatedItem = {
        ...item,
        status: 'shopping-cart',
        lastUpdated: new Date().toISOString(),
        lastUpdatedBy: core.profileID,
      };

      dispatch({
        type: 'UPDATE_ITEM_IN_SHOP_CART',
        payload: {
          shoppingCartID: core.shoppingCartID,
          updatedItem,
          profileID: core.profileID,
          updateType: 'toCart',
        },
      });
    }
  };

  const handleUpdateItem = itemId => {
    navigation.navigate('ShoppingItems', {
      title: 'Update Item',
      itemId,
      navigateBackTo: 'ShoppingList',
      statusTo: 'shopping-list',
    });
  };

  const handleDeleteItem = useCallback(
    itemId => {
      if (core.profileID) {
        const item = shoppingList.find(item => item.itemId === itemId);
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
    [dispatch, core.profileID, shoppingList],
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
          to: 'ShoppingItems',
          backTo: 'ShoppingList',
          statusTo: 'shopping-list',
        }}
      />
    </BottomSheet>
  );

  return (
    <Layout
      headerTitle="Shopping List"
      LeftButton=""
      RightButton="To-Cart"
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      {shoppingList.length === 0 ? (
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
            list={shoppingList}
            key={refreshFlag}
            core={core}
            showItemInfo={showItemInfo}
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            rightButtons={[
              {
                action: itemId => handleAddToCart(itemId),
                text1: 'Add',
                text2: 'to Cart',
                style: ListStyles.addButton,
              },
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
          />
          <SelectedItem />
        </View>
      )}
    </Layout>
  );
};

export default ShoppingList;
