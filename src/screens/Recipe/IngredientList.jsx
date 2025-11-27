//* IngredientList.jsx

import React, {useState, useMemo} from 'react';
import {useCupboard, useShoppingCart} from '../../hooks/useHooks';
import {Text, View} from '../../KQ-UI';
import {useColors} from '../../KQ-UI/KQUtilities';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useDispatch} from 'react-redux';
import pluralize from 'pluralize';
import {groupedData, matchConversion} from '../../utilities/conversions';
import {capEachWord, getIndicator, titleCase} from '../../utilities/helpers';
import {formatPluralUnit} from '../../utilities/formatPluralUnit';
import {toFraction} from '../../utilities/fractionUnit';
import {Icons} from '../../components/IconListRouter';
import {TouchableOpacity, StyleSheet} from 'react-native';

const IngredientList = ({selectedRecipe, showWDIH, WDIHToggle}) => {
  const dispatch = useDispatch();
  const core = useCoreInfo();
  const cupboard = useCupboard();
  const shopping = useShoppingCart();
  const useColor = useColors;

  const [recentlyAdded, setRecentlyAdded] = useState({});

  const cupboardList = Array.isArray(cupboard?.items) ? cupboard.items : [];
  const shoppingList = Array.isArray(shopping?.items) ? shopping.items : [];

  const groupedList = useMemo(() => groupedData(cupboardList), [cupboardList]);

  const enhancedIngredients = useMemo(() => {
    const cupboardNames = new Set(
      groupedList.map(i => pluralize.singular(i.itemName.toLowerCase())),
    );

    const shoppingCartNames = new Set(
      shoppingList
        .filter(i => i.status === 'shopping-cart')
        .map(i => pluralize.singular(i.itemName.toLowerCase())),
    );

    const shoppingListNames = new Set(
      shoppingList
        .filter(i => i.status === 'shopping-list')
        .map(i => pluralize.singular(i.itemName.toLowerCase())),
    );

    return selectedRecipe?.ingredients?.map(ing => {
      const ingSingular = pluralize.singular(ing.name.toLowerCase());
      const isOptional =
        typeof ing.note === 'string' &&
        ing.note.toLowerCase().includes('optional');

      let matchType = cupboardNames.has(ingSingular)
        ? 'exactMatch'
        : 'partialMatch';

      if (!cupboardNames.has(ingSingular)) matchType = 'noMatch';

      const match = groupedList.find(
        g => pluralize.singular(g.itemName.toLowerCase()) === ingSingular,
      );

      if (!match) {
        return {
          ...ing,
          matchType: 'noMatch',
          hasEnough: false,
          inCart: shoppingCartNames.has(ingSingular),
          inList: shoppingListNames.has(ingSingular),
          isOptional,
        };
      }

      const enough = matchConversion(
        match.measurement,
        match.remainingAmount,
        ing.unit,
        ing.amount,
      );

      return {
        ...ing,
        matchType: enough ? 'exactMatch' : 'partialMatch',
        hasEnough: enough,
        inCart: shoppingCartNames.has(ingSingular),
        inList: shoppingListNames.has(ingSingular),
        isOptional,
      };
    });
  }, [selectedRecipe, groupedList, shoppingList]);

  const getIconBorder = color => ({
    borderWidth: 3,
    borderRadius: 50,
    width: 35,
    height: 35,
    borderColor: useColor(color),
  });

  const getNoBorder = () => ({
    width: 35,
    height: 35,
  });

  const renderIcon = indicator => {
    const c = useColor(indicator.color);

    switch (indicator.status) {
      case 'match':
        return (
          <View style={getIconBorder(indicator.color)} centerVH mh10>
            <Icons.Check color={c} size={16} />
          </View>
        );

      case 'notEnough':
        return (
          <View style={getIconBorder(indicator.color)} centerVH mh10>
            <View style={{top: -1}}>
              <Icons.Warning color={c} size={20} />
            </View>
          </View>
        );

      case 'inCart':
        return (
          <View style={getIconBorder(indicator.color)} centerVH mh10>
            <View style={{left: -1}}>
              <Icons.InCart color={c} size={21} />
            </View>
          </View>
        );

      case 'inList':
        return (
          <View style={getIconBorder(indicator.color)} centerVH mh10>
            <View style={{left: -1}}>
              <Icons.Receipt color={c} size={21} />
            </View>
          </View>
        );

      case 'optional':
        return (
          <View style={getIconBorder(indicator.color)} centerVH mh10>
            <View style={{top: -1}}>
              <Icons.WarningOutline color={c} size={22} />
            </View>
          </View>
        );

      case 'noMatch':
        return (
          <View style={getNoBorder()} centerVH mh10>
            <Icons.XCircleOutline color={c} size={35} />
          </View>
        );
    }
  };

  const renderSubInfo = (indicator, ing) => {
    switch (indicator.status) {
      case 'match':
        return `You have enough ${capEachWord(ing.name)}`;
      case 'notEnough':
        return `You need more ${capEachWord(ing.name)}`;
      case 'inCart':
        return `${capEachWord(ing.name)} is in your shopping cart`;
      case 'inList':
        return `${capEachWord(ing.name)} is in your shopping list`;
      case 'optional':
        return `${capEachWord(ing.name)} is optional`;
      case 'noMatch':
        return `You don’t have any ${capEachWord(ing.name)}`;
    }
  };

  const AddItem = ing => {
    const ingSingular = pluralize.singular(ing.name.toLowerCase());

    const existing = shoppingList.find(item => {
      const itemSing = pluralize.singular(item.itemName.toLowerCase());
      return (
        item.status === 'shopping-list' &&
        itemSing === ingSingular &&
        item.measurement === ing.unit &&
        Number(item.packageSize) === Number(ing.amount)
      );
    });

    if (existing) {
      const updatedItem = {
        ...existing,
        quantity: Number(existing.quantity) + 1,
      };

      dispatch({
        type: 'UPDATE_ITEM_IN_SHOP_CART',
        payload: {
          shoppingCartID: core.shoppingCartID,
          updatedItem,
          updateType: 'updateList',
          profileID: core.profileID,
        },
      });
    } else {
      const newItem = {
        itemName: titleCase(ing.name),
        brandName: '',
        description: '',
        packageSize: ing.amount,
        quantity: 1,
        measurement: ing.unit,
        category: 'na',
        notes: '',
        status: 'shopping-list',
      };

      dispatch({
        type: 'ADD_ITEM_TO_SHOP_CART',
        payload: {
          shoppingCartID: core.shoppingCartID,
          newItem,
          profileID: core.profileID,
        },
      });
    }

    setRecentlyAdded(prev => ({...prev, [ing.name]: true}));
    setTimeout(() => {
      setRecentlyAdded(prev => {
        const copy = {...prev};
        delete copy[ing.name];
        return copy;
      });
    }, 2500);
  };

  const ItemAdd = ({ing}) => {
    const isAdded = !!recentlyAdded[ing.name];
    const success = useColor('success');

    const style = [
      styles.addButton,
      isAdded && {borderWidth: 3, borderColor: success},
    ];

    return (
      <View centerVH pr5 pl10>
        <TouchableOpacity
          disabled={isAdded}
          onPress={() => AddItem(ing)}
          style={style}>
          <View row centerVH pr={5}>
            {isAdded ? (
              <Icons.Check color={success} size={16} />
            ) : (
              <Icons.Plus />
            )}
            <Text>{isAdded ? ' Added' : 'Add'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (showWDIH) {
    return (
      <View flex borderTopWidth={1}>
        {enhancedIngredients?.map((ing, i) => {
          const indicator = getIndicator(ing);
          return (
            <View key={i} row borderBottomWidth={1} style={{height: 60}}>
              <View centerVH>{renderIcon(indicator)}</View>

              <View flex centerV>
                <Text size="small" font="open-7" numberOfLines={3}>
                  {ing.amount
                    ? `${toFraction(ing.amount)} ${formatPluralUnit(
                        ing.amount,
                        ing.unit,
                      )} `
                    : ''}
                  {capEachWord(ing.name)}
                </Text>

                <Text size="tiny" italic>
                  {renderSubInfo(indicator, ing)}
                </Text>
              </View>

              <ItemAdd ing={ing} />
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View flex>
      <View flex ph5>
        {enhancedIngredients?.map((ing, i) => (
          <View key={i} row centerVH pv={2}>
            <View ml10 mr5>
              <Icons.Dot size={7} />
            </View>

            <View ml5 flex>
              <Text size="xSmall" font="open-7" numberOfLines={3}>
                {ing.amount
                  ? `${toFraction(ing.amount)} ${
                      formatPluralUnit(ing.amount, ing.unit) || ''
                    } `
                  : ''}
                {capEachWord(ing.name)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View centerVH mt10 mb5>
        <TouchableOpacity
          style={{borderBottomWidth: 1, borderColor: '#0000ff'}}
          onPress={WDIHToggle}>
          <Text italic size="xSmall" font="open-7" kqColor="rgb(56, 71, 234)">
            What Ingredients Do I Have / Need?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default __DEV__ ? IngredientList : React.memo(IngredientList);

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1.5,
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
