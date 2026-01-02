//* IngredientList.jsx

import React from 'react';
import {useShoppingCart} from '../../hooks/useHooks';
import {Button, Text, View} from '../../KQ-UI';
import {useColors} from '../../KQ-UI/KQUtilities';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useDispatch} from 'react-redux';
import pluralize from 'pluralize';
import {capEachWord, getIndicator, titleCase} from '../../utilities/helpers';
import {formatPluralUnit} from '../../utilities/formatPluralUnit';
import {toFraction} from '../../utilities/fractionUnit';
import {Icons} from '../../components/IconListRouter';
import {renderIcon, renderSubInfo} from './Helpers/listHelpers';

const IngredientList = ({
  showWDIH,
  WDIHToggle,
  recentlyAdded,
  setRecentlyAdded,
  setRecentlyAddedAll,
  recipeIngredients,
}) => {
  const dispatch = useDispatch();
  const core = useCoreInfo();
  const shopping = useShoppingCart();
  const useColor = useColors;

  const shoppingList = Array.isArray(shopping?.items) ? shopping.items : [];

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

    setRecentlyAdded(prev => {
      const updated = {...prev, [ing.name]: true};
      const allAdded = recipeIngredients.every(ing => updated[ing.name]);
      if (allAdded) setRecentlyAddedAll(true);
      return updated;
    });
  };

  const ItemAdd = ({ing}) => {
    const isAdded = !!recentlyAdded[ing.name];
    const success = useColor('success');

    const style = [
      {borderWidth: 1.25},
      isAdded && {borderWidth: 2, borderColor: success},
    ];

    return (
      <View centerVH pr5 pl10>
        <Button
          type="outline"
          color={isAdded ? 'Success' : 'Dark'}
          disabled={isAdded}
          disabledColor="Success"
          onPress={() => AddItem(ing)}
          style={style}>
          <View row centerVH pr={5}>
            {isAdded ? (
              <Icons.Check color={success} size={15} />
            ) : (
              <Icons.Plus />
            )}
            <Text size="xSmall">{isAdded ? ' Added' : 'Add'}</Text>
          </View>
        </Button>
      </View>
    );
  };

  if (showWDIH) {
    return (
      <View flex>
        <View flex borderTopWidth={0.25} pb={15}>
          {recipeIngredients?.map((ing, i) => {
            const indicator = getIndicator(ing);
            const amt = ing.amount ? toFraction(ing.amount) : '';
            const unit = formatPluralUnit(ing.amount, ing.unit);
            return (
              <View key={i} row borderBottomWidth={0.25} style={{height: 60}}>
                <View centerVH>{renderIcon(indicator)}</View>
                <View flex centerV>
                  <Text size="small" font="open-7" numberOfLines={3}>
                    {amt && unit ? `${amt} ${unit} ` : amt ? `${amt} ` : ''}
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
      </View>
    );
  }

  return (
    <View flex>
      <View flex ph5>
        {recipeIngredients?.map((ing, i) => (
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
        <Button
          type="outline"
          style={{borderWidth: 1.5}}
          onPress={WDIHToggle}
          textSize="xSmall">
          What Ingredients Do I Have / Need?
        </Button>
      </View>
    </View>
  );
};

export default IngredientList;
