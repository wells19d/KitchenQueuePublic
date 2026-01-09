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

    const volumeUnits = [
      'gallon',
      'quart',
      'pint',
      'cup',
      'fluidounce',
      'tablespoon',
      'teaspoon',
    ];
    const weightUnits = ['ounce', 'pound', 'gram', 'kilogram'];

    return selectedRecipe.ingredients.map(ing => {
      const ingSingular = pluralize.singular(ing.name.toLowerCase());

      const isOptional =
        typeof ing.note === 'string' &&
        ing.note.toLowerCase().includes('optional');

      const match = groupedList.find(g => {
        const itemName = pluralize.singular(g.itemName.toLowerCase());
        const ingName = ingSingular;
        const firstWord = ingName.split(' ')[0];

        return (
          itemName === ingName ||
          itemName.includes(ingName) ||
          itemName.includes(firstWord)
        );
      });

      const inCart = shoppingList.some(i => {
        if (i.status !== 'shopping-cart') return false;

        const itemName = pluralize.singular(i.itemName.toLowerCase());
        const firstWord = ingSingular.split(' ')[0];

        return (
          itemName === ingSingular ||
          itemName.includes(ingSingular) ||
          itemName.includes(firstWord)
        );
      });

      const inList = shoppingList.some(i => {
        if (i.status !== 'shopping-list') return false;

        const itemName = pluralize.singular(i.itemName.toLowerCase());
        const firstWord = ingSingular.split(' ')[0];

        return (
          itemName === ingSingular ||
          itemName.includes(ingSingular) ||
          itemName.includes(firstWord)
        );
      });

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
