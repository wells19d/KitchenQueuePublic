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
import {groupedData} from '../../utilities/conversions';

const CupboardGroup = () => {
  const core = useCoreInfo();
  const cupboard = useCupboard();
  const [refreshFlag, setRefreshFlag] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag(prev => !prev);
    }, [cupboard?.items]),
  );

  const cupboardItems = Array.isArray(cupboard?.items) ? cupboard?.items : [];

  const groupedList = useMemo(() => {
    return groupedData(cupboardItems);
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
      {groupedList?.length === 0 ? (
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
