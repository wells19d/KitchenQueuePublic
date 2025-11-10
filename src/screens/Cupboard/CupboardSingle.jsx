//* CupboardSingle.jsx
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomSheet, Layout, Text} from '../../KQ-UI';
import {useCupboard} from '../../hooks/useHooks';
import {useDispatch} from 'react-redux';
import {ListStyles} from '../../styles/Styles';
import {View} from 'react-native';
import SwipeableItem from '../../components/SwipeableItem';
import {useCoreInfo} from '../../utilities/coreInfo';
import SelectedItemInfo from '../../components/SelectedItemInfo';

const CupboardSingle = () => {
  const core = useCoreInfo();
  const cupboard = useCupboard();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [cupboard?.items]),
  );

  const cupboardList = Array.isArray(cupboard?.items) ? cupboard?.items : [];

  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (showItemInfo === false) {
      setSelectedItem(null);
    }
  }, [showItemInfo]);

  const handleUpdateItem = itemId => {
    navigation.navigate('CupboardItems', {
      title: 'Update Item',
      itemId,
      navigateBackTo: 'CupboardList-Single',
    });
  };

  const handleDeleteItem = useCallback(
    itemId => {
      if (core.profileID) {
        const item = cupboardList?.find(item => item?.itemId === itemId);
        if (item) {
          dispatch({
            type: 'DELETE_ITEM_FROM_CUPBOARD',
            payload: {
              cupboardID: core.cupboardID,
              itemId: item.itemId,
              itemName: item.itemName,
              profileID: core.profileID,
            },
          });
        }
      }
    },
    [dispatch, core, cupboardList],
  );

  const SelectedItem = () => (
    <BottomSheet
      visible={showItemInfo}
      onClose={() => setShowItemInfo(false)}
      snapPoints={[0.01, 0.9]}>
      <SelectedItemInfo
        cupboardView
        selectedItem={selectedItem}
        setShowItemInfo={setShowItemInfo}
        navigate={{to: 'CupboardItems', backTo: 'CupboardList-Single'}}
      />
    </BottomSheet>
  );

  return (
    <Layout
      headerTitle="Cupboards"
      LeftButton={cupboardList.length === 0 ? null : 'Split'}
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      {cupboardList.length === 0 ? (
        <View
          style={[
            ListStyles.viewContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text>Cupboards are Empty</Text>
        </View>
      ) : (
        <View style={ListStyles.viewContainer}>
          <SwipeableItem
            key={refreshFlag}
            core={core}
            list={cupboardList}
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            noQuantity
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
          />
          <SelectedItem />
        </View>
      )}
    </Layout>
  );
};

export default CupboardSingle;
