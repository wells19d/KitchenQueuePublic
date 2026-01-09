// helpers.js
import moment from 'moment';
import {displayMeasurements, formatMeasurement} from './measurements';
import pluralize from 'pluralize';

export const tempImageString = 'KitchenQueueTempRecipe.jpg';

//*helpers.js
export function displayDropField(value, mapData = []) {
  if (!value || typeof value !== 'string') return null;

  const lowerVal = value.trim().toLowerCase();
  const found = mapData.find(item => item.key === lowerVal);
  if (found) return found;

  const cleaned = lowerVal.replace(/\s+/g, '-');
  const label = cleaned
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    index: -1,
    key: cleaned,
    label,
  };
}

export function displayDropArray(valueArray, mapData = []) {
  if (!Array.isArray(valueArray)) return [];

  return valueArray
    .map(value => {
      if (!value || typeof value !== 'string') return null;

      const lowerVal = value.trim().toLowerCase();
      const found = mapData.find(item => item.key === lowerVal);
      if (found) return found;

      const cleaned = lowerVal.replace(/\s+/g, '-');
      const label = cleaned
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        index: -1,
        key: cleaned,
        value: cleaned,
        label,
      };
    })
    .filter(Boolean);
}

export const setNumericValue = setter => value => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  setter(cleaned);
};

export const titleCase = str => {
  if (!str) return ''; // Handle null or undefined inputs gracefully

  return str
    .toLowerCase() // Convert the entire string to lowercase first
    .split(' ') // Split the string into words
    .map(word => {
      // Capitalize the first letter and preserve the rest
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' '); // Rejoin the words into a single string
};

export const capFirst = str => {
  if (!str) return ''; // Handle null or undefined inputs gracefully

  const lowerCaseStr = str.toLowerCase(); // Convert entire string to lowercase
  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
};

export const capEachWord = str => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const limitToThreeDecimals = value => {
  if (!value) return '';
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return num.toFixed(3).replace(/\.?0+$/, ''); // trims trailing zeros
};

export const endWithPeriod = str => {
  if (typeof str !== 'string') return '';
  return str.trim().endsWith('.') ? str.trim() : str.trim() + '.';
};

export const compareByDate = (date1, date2) => {
  if (!date1 || !date2) return false;

  return date1 === date2;
};

export const formatMeasurementWithPlural = (
  packageSize,
  unit,
  itemName,
  remainingAmount,
) => {
  if (packageSize == null || unit == null) return '';

  const pkg = Number(packageSize);
  const rem = remainingAmount != null ? Number(remainingAmount) : null;

  // SHOPPING LIST — no remaining amount
  if (rem === null || isNaN(rem)) {
    if (unit === 'each') {
      const singular = pluralize.singular(itemName || '').trim();
      const plural = pluralize.plural(singular);
      return pkg === 1 ? `${pkg} ${singular}` : `${pkg} ${plural}`;
    }

    const match = displayMeasurements.find(m => m.key === unit);
    const label = match ? match.label : unit;
    const pluralLabel = pkg === 1 ? label : pluralize(label);

    return `${pkg} ${pluralLabel}`;
  }

  // CUPBOARD / GROUPED — has remaining amount
  if (unit === 'each') {
    const singular = pluralize.singular(itemName || '').trim();
    const plural = pluralize.plural(singular);
    const label = pkg === 1 ? singular : plural;

    return `${rem} of ${pkg} ${label}`;
  }

  const match = displayMeasurements.find(m => m.key === unit);
  const label = match ? match.label : unit;
  const pluralLabel = pkg === 1 ? label : pluralize(label);

  return `${rem} of ${pkg} ${pluralLabel}`;
};

export const formatParagraph = (str = '') => {
  if (typeof str !== 'string') return '';

  // Step 1: normalize spacing + lowercase everything
  let text = str.trim().toLowerCase();

  // Step 2: split into sentences using punctuation marks
  const sentences = text
    .split(/([.!?])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Step 3: rebuild sentences with capitalization
  let formatted = '';
  for (let i = 0; i < sentences.length; i++) {
    let part = sentences[i];
    if (/[.!?]/.test(part)) {
      // if it's just punctuation, append directly
      formatted += part + ' ';
    } else {
      // capitalize first letter of sentence text
      formatted += part.charAt(0).toUpperCase() + part.slice(1);
    }
  }

  // Step 4: trim trailing spaces
  formatted = formatted.trim();

  // Step 5: enforce final punctuation
  if (!/[.!?]$/.test(formatted)) {
    formatted += '.';
  }

  return formatted;
};

const UNIT_DISPLAY = {
  oz: 'Ounce',
  g: 'Gram',
  ml: 'mMilliliter',
  kg: 'Kilogram',
  mg: 'Milligram',
  l: 'Liter',
  tsp: 'Teaspoon',
  tbsp: 'Tablespoon',
  'fl oz': 'Fluid Ounce',
};

export const formatMeasurementWithPluralRec = (packageSize, unit, itemName) => {
  if (packageSize !== undefined && unit !== undefined) {
    // special-case "each"
    if (unit === 'each') {
      const name = packageSize > 1 ? pluralize(itemName) : itemName;
      return `${packageSize} ${capEachWord(name)}`;
    }

    // 🔑 check mapping first
    if (UNIT_DISPLAY[unit]) {
      const base = UNIT_DISPLAY[unit];
      const label = packageSize > 1 ? pluralize(base) : base;
      return `${packageSize} ${label} ${capEachWord(itemName)}`;
    }

    // fallback to displayMeasurements
    const match = displayMeasurements.find(m => m.key === unit);
    if (match) {
      const label = packageSize > 1 ? pluralize(match.label) : match.label;
      return `${packageSize} ${label} ${capEachWord(itemName)}`;
    }

    // ultimate fallback
    const formatted = formatMeasurement(unit);
    const label = packageSize > 1 ? pluralize(formatted) : formatted;
    return `${packageSize} ${label} ${capEachWord(itemName)}`;
  }

  return '';
};

const UNIT_REPLACEMENT = {
  oz: 'ounce',
  g: 'gram',
  ml: 'milliliter',
  kg: 'kilogram',
  mg: 'milligram',
  l: 'liter',
  tsp: 'teaspoon',
  tbsp: 'tablespoon',
  'fl oz': 'fluid ounce',
};

export const unitReplacement = unit => {
  if (!unit || typeof unit !== 'string') return unit ?? null;

  const key = unit.toLowerCase().trim();
  if (!key) return unit; // empty string, just return original

  return UNIT_REPLACEMENT[key] || unit;
};

export const getIndicator = ing => {
  const {matchType, hasEnough, convertible, inCart, inList, isOptional} = ing;

  const enough = hasEnough || convertible;

  // 🔵 OPTIONAL
  if (isOptional) {
    if (inCart) {
      return {color: 'dark70', status: 'inCart'};
    }
    if (inList) {
      return {color: 'dark70', status: 'inList'};
    }
    if (enough) {
      return {color: 'success70', status: 'match'};
    }
    return {color: 'info', status: 'optional'};
  }

  // 🟢 GREEN — required + enough OR convertibly enough
  if (enough) {
    return {color: 'success70', status: 'match'};
  }

  // 🟡 YELLOW — exists but not enough / not convertible
  if (matchType === 'partialMatch') {
    if (inCart) {
      return {color: 'dark70', status: 'inCart'};
    }
    if (inList) {
      return {color: 'dark70', status: 'inList'};
    }
    return {color: 'warning', status: 'notEnough'};
  }

  // 🔴 RED — name not found
  if (matchType === 'noMatch') {
    if (inCart) {
      return {color: 'dark70', status: 'inCart'};
    }
    if (inList) {
      return {color: 'dark70', status: 'inList'};
    }
    return {color: 'danger', status: 'noMatch'};
  }

  return {color: 'danger', status: 'unknown'};
};

export const itemOrderFormat = data => {
  const order = [
    'itemName',
    'brandName',
    'description',
    'quantity',
    'packageSize',
    'remainingAmount',
    'measurement',
    'category',
    'notes',
    'status',
    'ean',
    'upc',
    'foodID',
    'foodURL',
    'images',
    'itemId',
    'itemDate',
    'createdBy',
    'createdDate',
    'lastUpdatedBy',
    'lastUpdatedDate',
  ];

  const result = {};

  for (const key of order) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result[key] = data[key];
    }
  }

  return result;
};

export const itemStoredOrder = data => {
  const order = [
    'itemName',
    'brandName',
    'description',
    'quantity',
    'packageSize',
    'remainingAmount',
    'measurement',
    'category',
    'notes',
    'status',
    'ean',
    'upc',
    'foodID',
    'foodURL',
    'images',
    'itemId',
    'itemDate',
    'createdBy',
    'createdDate',
    'lastUpdatedBy',
    'lastUpdatedDate',
  ];

  const orderObject = obj => {
    const ordered = {};
    order.forEach(key => {
      if (obj?.[key] !== undefined) {
        ordered[key] = obj[key];
      }
    });
    return ordered;
  };

  if (Array.isArray(data)) {
    return data.map(orderObject);
  }

  return orderObject(data);
};

// Logger function to handle console output with color coding and time stamps
// Use this function as a normal kqconsole.log using kqconsole.log('message', data);
// Be sure to import it from the helpers file to use this functionality

const makeLogger =
  type =>
  (...args) => {
    if (!__DEV__) return;

    const time = moment().format('HH:mm:ss:SSS');
    const color =
      {
        log: '#63b76C',
        warn: '#E6B800',
        error: '#D32F2F',
        debug: '#009DC4', // Alias for log
      }[type] || '#63b76C';

    const [first, ...rest] = args;
    const prefix = `%c[${time}]`;
    const style = `color: ${color};`;

    if (type === 'table') {
      const dataArgs = typeof first === 'object' && first?.title ? rest : args;

      const validTables = dataArgs.filter(
        item =>
          (Array.isArray(item) && item.length && typeof item[0] === 'object') ||
          (typeof item === 'object' && !Array.isArray(item) && item !== null),
      );

      if (!validTables.length) {
        kqconsole.log(prefix, style, 'Table (invalid data):', ...dataArgs);
      } else {
        validTables.forEach((item, index) => {
          const label = validTables.length > 1 ? `Table ${index + 1}` : 'Table';
          kqconsole.log(prefix, style, `${label}:`);
          console.table(item);
        });
      }

      return;
    } else {
      console[type](prefix, style, `${capEachWord(type)}:`, first, ...rest);
    }
  };

export const kqconsole = (...args) => makeLogger('log')(...args);

kqconsole.log = makeLogger('log');
kqconsole.warn = makeLogger('warn');
kqconsole.error = makeLogger('error');
kqconsole.table = makeLogger('table');
