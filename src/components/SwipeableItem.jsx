//* SwipeableItem.jsx
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useRef} from 'react';
import FlashCell from './FlashCell';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {ListStyles} from '../styles/Styles';
import {Animated, TouchableOpacity, View} from 'react-native';
import {Text} from '../KQ-UI';
import {Icons} from './IconListRouter';
import {useColors} from '../KQ-UI/KQUtilities';

const SwipeableItem = props => {
  const {
    list,
    core,
    showItemInfo,
    setSelectedItem,
    setShowItemInfo,
    leftButtons = [],
    rightButtons = [],
    favoritesView = false,
    groupedView = false,
    noQuantity = false,
  } = props;

  const swipeableRefs = useRef(new Map());
  const currentlyOpenRef = useRef(null);
  const useHaptics = setHapticFeedback();

  const closeSwipeable = itemId => {
    const swipeableRef = swipeableRefs.current.get(itemId);
    if (swipeableRef) {
      swipeableRef.close();
    }
  };

  const handleSwipeableOpen = itemId => {
    if (currentlyOpenRef.current && currentlyOpenRef.current !== itemId) {
      closeSwipeable(currentlyOpenRef.current);
    }
    currentlyOpenRef.current = itemId;
  };

  useEffect(() => {
    if (showItemInfo && currentlyOpenRef.current) {
      const ref = swipeableRefs.current.get(currentlyOpenRef.current);
      if (ref) {
        ref.close();
        currentlyOpenRef.current = null;
      }
    }
  }, [showItemInfo]);

  useEffect(() => {
    return () => {
      swipeableRefs.current.clear();
      currentlyOpenRef.current = null;
    };
  }, []);

  const closeAllSwipeables = () => {
    swipeableRefs.current.forEach(ref => {
      if (ref && typeof ref.close === 'function') {
        ref.close();
      }
    });
    currentlyOpenRef.current = null;
  };

  const renderRightActions = itemId => {
    if (rightButtons.length === 0) return null;

    return (
      <View style={ListStyles.rightActionsContainer}>
        {rightButtons.map((button, index) => (
          <Animated.View
            key={index}
            style={[ListStyles.rightActionButton, button.style]}>
            <TouchableOpacity
              onPress={() => {
                button.action(itemId);
                closeSwipeable(itemId);
                useHaptics(core?.userSettings?.hapticStrength || 'light');
              }}>
              <View style={ListStyles.buttonContainer}>
                {button.text1 && (
                  <Text size="xSmall" font="open-7" kqColor="white">
                    {button.text1}
                  </Text>
                )}
                {button.text2 && (
                  <Text size="xSmall" font="open-7" kqColor="white">
                    {button.text2}
                  </Text>
                )}
                {button.starIcon === true && (
                  <Icons.Favorite size={30} color={useColors('white')} />
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  const renderSwipeableItem = useCallback(
    ({item}) => (
      <Swipeable
        ref={ref => swipeableRefs.current.set(item.itemId, ref)}
        onSwipeableOpen={() => handleSwipeableOpen(item.itemId)}
        renderRightActions={() => renderRightActions(item.itemId)}
        rightThreshold={100}
        friction={1}
        overshootFriction={8}>
        <FlashCell
          item={item}
          core={core}
          setSelectedItem={setSelectedItem}
          setShowItemInfo={setShowItemInfo}
          showItemInfo={showItemInfo}
          closeAllSwipeables={closeAllSwipeables}
          favoritesView={favoritesView}
          groupedView={groupedView}
          noQuantity={noQuantity}
        />
      </Swipeable>
    ),
    [setSelectedItem, setShowItemInfo],
  );

  return (
    <FlashList
      data={list}
      renderItem={renderSwipeableItem}
      keyExtractor={item => item.itemId}
      estimatedItemSize={70}
    />
  );
};

export default SwipeableItem;
