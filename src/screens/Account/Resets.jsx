//* Resets.jsx
import React from 'react';
import {View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {ScreenStyles} from '../../styles/Styles';
import {Layout, ScrollView, Text} from '../../KQ-UI';
import TellMeButton from '../../components/TellMeButton';
import {useCoreInfo} from '../../utilities/coreInfo';

const Resets = () => {
  const core = useCoreInfo();
  const dispatch = useDispatch();

  const resetCupboard = () => {
    if (core?.role === 'owner') {
      Alert.alert(
        'Reset Cupboard',
        'Are you sure you want to reset your cupboard? This is a destructive action and cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            style: 'destructive',
            onPress: () => {
              dispatch({
                type: 'RESET_CUPBOARD',
                payload: {
                  cupboardID: core?.cupboardID,
                  profileID: core?.profileID,
                },
              });
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Reset Cupboard',
        'You do not have permission to reset the cupboard. Only the account owner can do this.',
        [
          {
            text: 'Close',
            style: 'cancel',
          },
        ],
      );
    }
  };
  const resetShoppingList = () => {
    Alert.alert(
      'Reset Shopping List',
      'Are you sure you want to reset your shopping list? This is a destructive action and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'RESET_SHOP_CART',
              payload: {
                shoppingCartID: core?.shoppingCartID,
                profileID: core?.profileID,
              },
            });
          },
        },
      ],
    );
  };

  const resetFavorites = () => {
    Alert.alert(
      'Reset Favorites List',
      'Are you sure you want to reset your favorites list? This is a destructive action and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            dispatch({
              type: 'RESET_FAVORITES',
              payload: {
                favoriteItemsID: core?.favoriteItemsID,
                profileID: core?.profileID,
              },
            });
          },
        },
      ],
    );
  };

  return (
    <Layout
      headerTitle="Resets"
      LeftButton="Back"
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}>
      <View style={[ScreenStyles.viewContainer, {flex: 1}]}>
        <View style={ScreenStyles.viewInnerTopContainer}>
          <Text size="small" font="open-7" centered>
            Tell me about...
          </Text>
        </View>
        <ScrollView contentContainerStyle={ScreenStyles.scrollContainer}>
          <TellMeButton
            profile={core?.userSettings?.hapticStrength}
            action={resetFavorites}
            tt1="Reset My Favorites"
            tt2="Clears all items from my favorites."
          />

          <TellMeButton
            profile={core?.userSettings?.hapticStrength}
            action={resetShoppingList}
            tt1="Reset My Shopping List"
            tt2="Clears all items from my shopping list."
          />
          <TellMeButton
            profile={core?.userSettings?.hapticStrength}
            action={resetCupboard}
            tt1="Reset My Cupboard"
            tt2="Clears all items from my cupboard."
          />
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Resets;
