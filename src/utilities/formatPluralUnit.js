//* formatPluralUnit.js
import pluralize from 'pluralize';
import {shortenUnit} from './shortenUnit';

// units we do NOT pluralize even when quantity > 1
const noPluralUnits = [
  'oz',
  'g',
  'ml',
  'kg',
  'mg',
  'l',
  'tsp',
  'tbsp',
  'fl oz',
];

export const formatPluralUnit = (amount, unit) => {
  if (!unit || typeof unit !== 'string') return '';

  const shortUnit = shortenUnit(unit); // display version
  if (!shortUnit || typeof shortUnit !== 'string') return '';

  const normalized = shortUnit.toLowerCase().trim();

  // If unit is intentionally removed (like 'each'), just return ''
  if (!normalized) return '';

  if (amount > 1 && !noPluralUnits.includes(normalized)) {
    return pluralize(shortUnit);
  }

  return shortUnit;
};
