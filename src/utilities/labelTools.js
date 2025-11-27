//* labelTools.js
export const servPerContainer = info => {
  if (!info || info === 1) return null;

  const n = info;
  const base = Math.floor(n);
  const decimal = n - base;

  let rounded;

  if (decimal < 0.125) rounded = base;
  else if (decimal < 0.375) rounded = base + 0.25;
  else if (decimal < 0.625) rounded = base + 0.5;
  else if (decimal < 0.875) rounded = base + 0.75;
  else rounded = base + 1;

  const display = parseFloat(rounded.toFixed(2));
  const isWhole = Number.isInteger(n);

  if (isWhole) {
    return `Servings per container: ${display}`;
  } else {
    return `About ${display} servings per container`;
  }
};

export const nutritionFCCPDisplay = [
  // --- Section 1: Fat ---
  {key: 'fat', label: 'Total Fat', type: 'main', showPercent: true},
  {
    key: 'saturated_fat',
    label: 'Saturated Fat',
    type: 'minor',
    showPercent: true,
  },
  {key: 'trans_fat', label: 'Trans Fat', type: 'minor', showPercent: false},

  // --- Section 2: Cholesterol / Sodium ---
  {key: 'cholesterol', label: 'Cholesterol', type: 'main', showPercent: true},
  {key: 'sodium', label: 'Sodium', type: 'main', showPercent: true},

  // --- Section 3: Carbs ---
  {
    key: 'carbohydrate',
    label: 'Total Carbohydrate',
    type: 'main',
    showPercent: true,
  },
  {key: 'fiber', label: 'Dietary Fiber', type: 'minor', showPercent: true},
  {key: 'sugar', label: 'Total Sugars', type: 'minor', showPercent: false},
  {
    key: 'added_sugars',
    label: 'Includes Added Sugars',
    type: 'sub',
    showPercent: true,
  },

  // --- Section 4: Protein ---
  {key: 'protein', label: 'Protein', type: 'main', showPercent: true},
];

export const nutritionVitDisplay = [
  // --- Section 5: Vitamins ---
  {key: 'vitamin_d', label: 'Vitamin D', type: 'vitamin', showPercent: true},
  {key: 'calcium', label: 'Calcium', type: 'vitamin', showPercent: true},
  {key: 'iron', label: 'Iron', type: 'vitamin', showPercent: true},
  {key: 'potassium', label: 'Potassium', type: 'vitamin', showPercent: true},
];

// labelTools.js

// --- Reference Daily Values (FDA 2024) ---
const DAILY_VALUES = {
  fat: 78, // g
  saturated_fat: 20, // g
  cholesterol: 300, // mg
  sodium: 2300, // mg
  carbohydrate: 275, // g
  fiber: 28, // g
  added_sugars: 50, // g
  protein: 50, // g
  vitamin_d: 20, // mcg
  calcium: 1300, // mg
  iron: 18, // mg
  potassium: 4700, // mg
};

// --- % Daily Value Calculator ---
export const calculatePercentDV = (key, value) => {
  // if there’s no matching DV or no value, return 0
  const dailyValue = DAILY_VALUES[key];
  if (!dailyValue || value === undefined || value === null) return 0;

  // basic math: (nutrient / daily value) * 100
  const percent = (value / dailyValue) * 100;

  // FDA convention: round to nearest whole number
  return Math.round(percent);
};
