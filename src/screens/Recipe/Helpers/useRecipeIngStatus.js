//* useRecipeIngStatus.js

import {useMemo} from 'react';
import {useCupboard, useShoppingCart} from '../../../hooks/useHooks';
import pluralize from 'pluralize';
import {groupedData, matchConversion} from '../../../utilities/conversions';

export function useRecipeIngStatus(selectedRecipe) {
  const cupboard = useCupboard();
  const shopping = useShoppingCart();

  const cupboardList = Array.isArray(cupboard?.items) ? cupboard.items : [];
  const shoppingList = Array.isArray(shopping?.items) ? shopping.items : [];

  const groupedList = useMemo(() => groupedData(cupboardList), [cupboardList]);

  const ingredientStatus = useMemo(() => {
    if (!selectedRecipe?.ingredients) return [];

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

    const volumeUnits = ['teaspoon', 'tablespoon', 'cup', 'fluidounce'];
    const weightUnits = ['ounce', 'pound', 'gram', 'kilogram'];

    return selectedRecipe.ingredients.map(ing => {
      const ingSingular = pluralize.singular(ing.name.toLowerCase());

      const isOptional =
        typeof ing.note === 'string' &&
        ing.note.toLowerCase().includes('optional');

      const match = groupedList.find(
        g => pluralize.singular(g.itemName.toLowerCase()) === ingSingular,
      );

      const inCart = shoppingCartNames.has(ingSingular);
      const inList = shoppingListNames.has(ingSingular);

      // 🔴 NAME NOT FOUND
      if (!match) {
        return {
          ...ing,
          matchType: 'noMatch',
          hasEnough: false,
          inCart,
          inList,
          isOptional,
        };
      }

      // STRICT ENOUGH CHECK
      const hasEnough = matchConversion(
        match.measurement,
        match.remainingAmount,
        ing.unit,
        ing.amount,
      );

      // 🟢 KITCHEN-CONVERTIBLE (pepper, garlic, spices)
      const convertible =
        match.measurement !== ing.unit &&
        ((volumeUnits.includes(ing.unit) &&
          weightUnits.includes(match.measurement)) ||
          (weightUnits.includes(ing.unit) &&
            volumeUnits.includes(match.measurement)));

      return {
        ...ing,
        matchType: hasEnough || convertible ? 'exactMatch' : 'partialMatch',
        hasEnough: hasEnough || convertible,
        inCart,
        inList,
        isOptional,
      };
    });
  }, [selectedRecipe, groupedList, shoppingList]);

  return ingredientStatus;
}
