// transformNutritionFacts.js
import {formatNutrient} from './nutrients';

/* -------------------------------------------
 * Unit normalization → displayMeasurements keys
 * ------------------------------------------- */
const UNIT_ALIASES = {
  // volume
  fluidounce: [
    'fl oz',
    'fl. oz',
    'fl-oz',
    'floz',
    'fluid oz',
    'fluid ounce',
    'fluidounces',
  ],
  milliliter: ['ml', 'milliliter', 'milliliters', 'millilitre', 'millilitres'],
  liter: ['l', 'lt', 'liter', 'liters', 'litre', 'litres'],
  cup: ['cup', 'cups'],
  pint: ['pint', 'pints', 'pt'],
  quart: ['quart', 'quarts', 'qt'],
  gallon: ['gallon', 'gallons', 'gal'],
  tablespoon: ['tbsp', 'tbs', 'tablespoon', 'tablespoons'],
  teaspoon: ['tsp', 'teaspoon', 'teaspoons'],

  // weight
  ounce: ['oz', 'ounce', 'ounces'],
  gram: ['g', 'gr', 'gram', 'grams'],
  kilogram: ['kg', 'kilogram', 'kilograms'],
  pound: ['lb', 'lbs', 'pound', 'pounds'],

  // count / package / forms
  each: ['ea', 'each', 'ct', 'count', 'single', 'unit'],
  pack: ['pack', 'pk'],
  package: ['package', 'pkg'],
  bag: ['bag', 'bags'],
  bottle: ['bottle', 'bottles'],
  box: ['box', 'boxes'],
  jar: ['jar', 'jars'],
  can: ['can', 'cans'],
  bar: ['bar', 'bars'],
};

const ALIAS_TO_KEY = (() => {
  const map = new Map();
  for (const [key, aliases] of Object.entries(UNIT_ALIASES)) {
    aliases.forEach(a => map.set(a.toLowerCase(), key));
  }
  return map;
})();

const normalizeUnit = rawUnit => {
  if (!rawUnit) return null;
  const cleaned = String(rawUnit)
    .trim()
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ');
  return ALIAS_TO_KEY.get(cleaned) || cleaned;
};

/* -------------------------------------------
 * Size parsing
 * ------------------------------------------- */
function parseSizeFromText(text = '') {
  if (!text || typeof text !== 'string') return null;
  const t = text.trim();

  const fracMatch = t.match(
    /(?:1\/2|½)\s*(gallon|gal|quart|qt|pint|pt|cup|fl\s?oz|fluid\s?ounce|liter|litre|l)/i,
  );
  if (fracMatch)
    return {packageSize: '0.5', measurement: normalizeUnit(fracMatch[1])};

  if (/\bdozen\b/i.test(t)) return {packageSize: '12', measurement: 'each'};
  if (/\bsingle\b/i.test(t)) return {packageSize: '1', measurement: 'each'};

  const countMatch = t.match(/\b(\d+(?:\.\d+)?)\s*(ct|count|each|pack|pk)\b/i);
  if (countMatch)
    return {
      packageSize: String(countMatch[1]),
      measurement: normalizeUnit(countMatch[2]),
    };

  const numUnitMatch = t.match(
    /\b(\d+(?:\.\d+)?)\s*(?:-| )?(fl\s?oz|fluid\s?ounce|oz|ounce|ounces|lb|lbs|pound|g|gr|gram|grams|kg|kilogram|ml|milliliter|millilitre|l|liter|litre|pint|pt|quart|qt|gallon|gal|cup|tbsp|tbs|tablespoon|tsp|teaspoon)\b/i,
  );
  if (numUnitMatch)
    return {
      packageSize: String(numUnitMatch[1]),
      measurement: normalizeUnit(numUnitMatch[2]),
    };

  const unitOnlyMatch = t.match(
    /\b(fl\s?oz|fluid\s?ounce|oz|ounce|ounces|lb|lbs|pound|g|gr|gram|grams|kg|kilogram|ml|milliliter|millilitre|l|liter|litre|pint|pt|quart|qt|gallon|gal|cup|tbsp|tbs|tablespoon|tsp|teaspoon|ct|count|each|pack|pk|bottle|jar|can|box|bag|bar)\b/i,
  );
  if (unitOnlyMatch)
    return {packageSize: '1', measurement: normalizeUnit(unitOnlyMatch[1])};

  return null;
}

const defaultEach = () => ({packageSize: '1', measurement: 'each'});

/* -------------------------------------------
 * Always-required nutrients (FDA)
 * ------------------------------------------- */
const REQUIRED_NUTRIENTS = [
  'calories',
  'fat',
  'saturated_fat',
  'trans_fat',
  'cholesterol',
  'sodium',
  'carbohydrate',
  'fiber',
  'sugar',
  'added_sugars',
  'protein',
  'vitamin_d',
  'calcium',
  'iron',
  'potassium',
];

/* -------------------------------------------
 * Main transform
 * ------------------------------------------- */
export const transformNutritionFacts = (merged = {}) => {
  if (!merged || typeof merged !== 'object') return null;

  const fat = merged?.fatsecret?.food || {};
  const spider = merged?.barcodeSpider || {};

  const foodID = fat.food_id || null;
  const itemName = fat.food_name || spider?.item_attributes?.title || null;
  const brandName = fat.brand_name || spider?.item_attributes?.brand || null;
  const upc = spider?.item_attributes?.upc || null;
  const ean = spider?.item_attributes?.ean || null;
  const foodURL = fat.food_url || null;
  const storeURL = spider?.Stores?.[0]?.link || null;

  // --- Package size ---
  let sizeResult = null;
  if (Array.isArray(spider?.Stores)) {
    for (const s of spider.Stores) {
      sizeResult = parseSizeFromText(s?.title);
      if (sizeResult) break;
    }
  }
  if (!sizeResult)
    sizeResult = parseSizeFromText(spider?.item_attributes?.title);
  if (!sizeResult) sizeResult = parseSizeFromText(fat?.food_name);
  if (!sizeResult) sizeResult = defaultEach();

  const packageSize = sizeResult.packageSize;
  const measurement = sizeResult.measurement;

  // --- Images ---
  const images = [];
  if (Array.isArray(spider?.Stores)) {
    spider.Stores.forEach(store => {
      if (store.image && !images.includes(store.image))
        images.push(store.image);
    });
  }
  if (
    spider?.item_attributes?.image &&
    !images.includes(spider.item_attributes.image)
  ) {
    images.push(spider.item_attributes.image);
  }

  // --- Serving (first) from FatSecret ---
  const serving =
    fat?.servings?.serving && Array.isArray(fat.servings.serving)
      ? fat.servings.serving[0]
      : fat?.servings?.serving || null;

  // --- Nutrients ---
  const nutrientKeys = [
    'calories',
    'carbohydrate',
    'protein',
    'fat',
    'saturated_fat',
    'polyunsaturated_fat',
    'monounsaturated_fat',
    'trans_fat',
    'cholesterol',
    'sodium',
    'potassium',
    'fiber',
    'sugar',
    'added_sugars',
    'vitamin_a',
    'vitamin_c',
    'vitamin_d',
    'calcium',
    'iron',
  ];

  const perServing = {};

  if (serving) {
    nutrientKeys.forEach(key => {
      const raw = serving[key];
      const val = parseFloat(raw);
      if (!isNaN(val) && val !== null && val !== undefined) {
        const {label, unit} = formatNutrient(key);
        perServing[key] = {key, label, unit, value: val};
      }
    });
  }

  // Fill missing required nutrients with zeros
  REQUIRED_NUTRIENTS.forEach(key => {
    if (!perServing[key]) {
      const {label, unit} = formatNutrient(key);
      perServing[key] = {key, label, unit, value: 0};
    }
  });

  // --- Calculate serving size info ---
  let servingSize = null;
  let perContainer = {};

  if (serving) {
    const metricAmount = parseFloat(serving.metric_serving_amount || 0);
    const metricUnit = serving.metric_serving_unit?.toLowerCase() || '';
    const description = serving.serving_description || '';
    let perContainerCount = null;

    const pkgQty = parseFloat(packageSize || 0);

    if (pkgQty && metricAmount > 0) {
      const metricBase = metricUnit.includes('oz') ? 'ounce' : metricUnit;
      const measureBase = measurement.includes('oz') ? 'ounce' : measurement;

      // ✅ Fix for Red Bull (same unit = 1 per container)
      if (metricBase === measureBase) {
        perContainerCount = 1;
      } else {
        let pkgInGrams = null;
        if (measurement === 'ounce') pkgInGrams = pkgQty * 28.35;
        else if (measurement === 'fluidounce') pkgInGrams = pkgQty * 29.57;
        else if (measurement === 'gram') pkgInGrams = pkgQty;
        else if (measurement === 'milliliter') pkgInGrams = pkgQty;

        if (pkgInGrams && metricAmount > 0) {
          perContainerCount = parseFloat(
            (pkgInGrams / metricAmount).toFixed(1),
          );
        }
      }
    }

    servingSize = {
      description: description.trim(),
      metric: `${metricAmount}${metricUnit ? ' ' + metricUnit : ''}`,
      perContainer: perContainerCount || null,
    };

    // --- Calculate perContainer values ---
    if (perContainerCount && perContainerCount > 0) {
      Object.keys(perServing).forEach(key => {
        const nutrient = perServing[key];
        perContainer[key] = {
          ...nutrient,
          value: parseFloat((nutrient.value * perContainerCount).toFixed(1)),
        };
      });
    } else {
      perContainer = {...perServing};
    }
  }

  return {
    foodID,
    ean,
    upc,
    itemName,
    brandName,
    packageSize,
    measurement,
    images,
    nutrients: {
      perServing,
      perContainer,
    },
    foodURL,
    servingSize,
    storeURL,
  };
};
