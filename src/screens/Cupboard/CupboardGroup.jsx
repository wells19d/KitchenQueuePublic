//* CupboardGroup.jsx
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {BottomSheet, Layout, Text} from '../../KQ-UI';
import {useCupboard} from '../../hooks/useHooks';
import {ListStyles} from '../../styles/Styles';
import {View} from 'react-native';
import SwipeableItem from '../../components/SwipeableItem';
import SelectedItemInfo from '../../components/SelectedItemInfo';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useFocusEffect} from '@react-navigation/native';

const CupboardGroup = () => {
  const core = useCoreInfo();
  const cupboard = useCupboard();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [cupboard?.items]),
  );
  const cupboardItems = cupboard?.items ?? [];

  const groupedList = useMemo(() => {
    const map = new Map();

    for (const item of cupboardItems) {
      const {
        itemName,
        brandName,
        category,
        description,
        measurement,
        packageSize,
        remainingAmount,
      } = item;

      const key = `${itemName}__${category || ''}__${measurement || ''}`;

      if (map.has(key)) {
        const group = map.get(key);
        group.count++;
        group.items.push(item);

        group.brandName = group.brandName === brandName ? brandName : undefined;
        group.description =
          group.description === description ? description : undefined;

        group.packageSize += Number(packageSize || 0);
        group.remainingAmount += Number(remainingAmount || 0);
      } else {
        map.set(key, {
          itemName,
          itemId: item.itemId,
          count: 1,
          brandName,
          category,
          description,
          measurement,
          packageSize: Number(packageSize || 0),
          remainingAmount: Number(remainingAmount || 0),
          items: [item],
        });
      }
    }

    return Array.from(map.values());
  }, [cupboardItems]);

  const [showItemInfo, setShowItemInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (showItemInfo === false) {
      setSelectedItem(null);
    }
  }, [showItemInfo]);

  const SelectedItem = () => (
    <BottomSheet
      visible={showItemInfo}
      onClose={() => setShowItemInfo(false)}
      snapPoints={[0.01, 0.9]}>
      <SelectedItemInfo
        cupboardView
        groupedView
        selectedItem={selectedItem}
        setShowItemInfo={setShowItemInfo}
      />
    </BottomSheet>
  );

  return (
    <Layout
      headerTitle="Cupboards"
      LeftButton="Merge"
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}>
      {groupedList.length === 0 ? (
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
            list={groupedList}
            setShowItemInfo={setShowItemInfo}
            setSelectedItem={setSelectedItem}
            leftButtons={[]}
            rightButton={[]}
            groupedView
          />
          <SelectedItem />
        </View>
      )}
    </Layout>
  );
};

export default CupboardGroup;
