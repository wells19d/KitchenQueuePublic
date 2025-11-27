//* FlashCell.jsx
import React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from '../KQ-UI';
import {
  displayMeasurements,
  formatMeasurement,
} from '../utilities/measurements';
import pluralize from 'pluralize';
import {Icons} from './IconListRouter';
import {useColors} from '../KQ-UI/KQUtilities';
import {formatMeasurementWithPlural} from '../utilities/helpers';

const FlashCell = props => {
  const {
    item,
    core,
    setShowItemInfo,
    setSelectedItem,
    favoritesView,
    groupedView,
    noQuantity,
  } = props;

  const defaultFlashCellOrder = [
    {index: 0, key: 'brandName', label: 'Brand Name'},
    {index: 1, key: 'description', label: 'Description'},
    {index: 2, key: 'itemName', label: 'Item Name'},
  ];

  const renderDisplayText = item => {
    const flashCellOrder =
      core?.userSettings?.flashCellOrder || defaultFlashCellOrder;
    const displayText = flashCellOrder
      .map(field => item[field.key])
      .filter(Boolean)
      .join(' ');

    return displayText || item.itemName;
  };

  const displayRemaining = (packageSize, remainingAmount) => {
    let percent = (remainingAmount / packageSize) * 100;
    return ` (${percent.toFixed(0)}% left)`;
  };

  const LeftDataDisplay = () => {
    if (noQuantity && !favoritesView && !groupedView) return null;

    if (favoritesView && !groupedView) {
      return (
        <View style={styles.favWrapper}>
          <View style={styles.favContainer}>
            <Icons.Favorite size={30} color={useColors('gold')} />
          </View>
        </View>
      );
    }

    if (!favoritesView && (groupedView || !noQuantity)) {
      return (
        <View style={styles.dataWrapper}>
          <View style={styles.qtyContainer}>
            <View style={styles.qtyTop}>
              <Text size="tiny">Qty</Text>
            </View>
            <View style={styles.qtyBottom}>
              <Text size="medium" numberOfLines={1}>
                {item.quantity || item.count}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  const InfoDisplay = () => {
    return (
      <View style={styles.display}>
        <Text numberOfLines={1} size="small" font="open-7">
          {renderDisplayText(item)}
        </Text>
        <Text size="xSmall" numberOfLines={1}>
          {formatMeasurementWithPlural(
            item.packageSize,
            item.measurement,
            item.itemName,
            item?.remainingAmount,
          )}
          {item?.remainingAmount &&
            displayRemaining(item.packageSize, item.remainingAmount)}
        </Text>
      </View>
    );
  };

  const SlideDisplay = () => {
    if (groupedView) {
      return null;
    }
    return (
      <View style={styles.slideWrapper}>
        <View style={styles.slideLeft}>
          <Icons.ChevronLeft color="#373d4390" />
        </View>
        <View style={styles.slideRight}>
          <Icons.ChevronLeft color="#373d4390" />
        </View>
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => {
        setSelectedItem(item);
        setShowItemInfo(true);
      }}>
      <View style={styles.cellContainer}>
        <LeftDataDisplay />
        <InfoDisplay />
        <SlideDisplay />
      </View>
    </Pressable>
  );
};

const styles = {
  cellContainer: {
    borderBottomWidth: 1,
    borderColor: '#373d4380',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    height: 65,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dataWrapper: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favWrapper: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favContainer: {
    // borderWidth: 2,
    // borderColor: '#373d4380',
    // borderRadius: 50,
    // elevation: 4,
    // shadowColor: '#373d4380',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyContainer: {
    width: 50,
    height: 50,
    borderWidth: 1.25,
    borderColor: '#373d4380',
    borderRadius: 8,
    flexDirection: 'column',
    elevation: 4,
    shadowColor: '#373d4380',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    backgroundColor: '#fff',
  },
  qtyTop: {
    alignItems: 'center',
    paddingTop: 2,
  },
  qtyBottom: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 1,
  },
  display: {flex: 1, justifyContent: 'center', marginLeft: 5},
  slideWrapper: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  slideLeft: {position: 'absolute', left: 6},
  slideRight: {position: 'absolute', left: 12},
};

export default __DEV__ ? FlashCell : React.memo(FlashCell);
