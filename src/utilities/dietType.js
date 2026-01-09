//* dietType.js
export const displayDietTypes = [
  {value: 'diet-header-general', label: 'General Diets', isHeader: true},
  {index: 0, value: 'low-carb', label: 'Low Carb'},
  {index: 1, value: 'low-fat', label: 'Low Fat'},
  {index: 2, value: 'high-protein', label: 'High Protein'},
  {index: 3, value: 'low-sugar', label: 'Low Sugar'},

  {
    value: 'diet-header-lifestyle',
    label: 'Lifestyle & Philosophical',
    isHeader: true,
  },
  {index: 4, value: 'vegetarian', label: 'Vegetarian'},
  {index: 5, value: 'lacto-vegetarian', label: 'Lacto-Vegetarian'},
  {index: 6, value: 'ovo-vegetarian', label: 'Ovo-Vegetarian'},
  {index: 7, value: 'vegan', label: 'Vegan'},
  {index: 8, value: 'pescetarian', label: 'Pescetarian'},
  {index: 9, value: 'flexitarian', label: 'Flexitarian'},
  {index: 10, value: 'raw', label: 'Raw'},
  {index: 11, value: 'whole30', label: 'Whole30'},

  {
    value: 'diet-header-medical',
    label: 'Medical / Allergen Related',
    isHeader: true,
  },
  {index: 12, value: 'gluten-free', label: 'Gluten Free'},
  {index: 13, value: 'dairy-free', label: 'Dairy Free'},
  {index: 14, value: 'nut-free', label: 'Nut Free'},
  {index: 15, value: 'soy-free', label: 'Soy Free'},
  {index: 16, value: 'egg-free', label: 'Egg Free'},
  {index: 17, value: 'low-sodium', label: 'Low Sodium'},
  {index: 18, value: 'low-fodmap', label: 'Low FODMAP'},

  {value: 'diet-header-weight', label: 'Weight & Metabolic', isHeader: true},
  {index: 19, value: 'ketogenic', label: 'Ketogenic (Keto)'},
  {index: 20, value: 'paleo', label: 'Paleo'},
  {index: 21, value: 'atkins', label: 'Atkins'},
  {index: 22, value: 'mediterranean', label: 'Mediterranean'},
  {index: 23, value: 'dash', label: 'DASH'},
  {index: 24, value: 'diabetic', label: 'Diabetic Friendly'},

  {
    value: 'diet-header-cultural',
    label: 'Cultural / Religious',
    isHeader: true,
  },
  {index: 25, value: 'halal', label: 'Halal'},
  {index: 26, value: 'kosher', label: 'Kosher'},
];

export const formatDietType = diet => {
  if (!diet) return 'All';

  const match = displayDietTypes.find(d => d.value === diet);
  if (match) return match.label;

  return toTitleCase(diet);
};

const toTitleCase = str =>
  str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
