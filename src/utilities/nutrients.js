//* nutrients.js

export const displayNutrients = [
  {index: 0, key: 'calories', label: 'Calories', unit: 'kcal'},
  {index: 1, key: 'carbohydrate', label: 'Total Carbohydrates', unit: 'g'},
  {index: 2, key: 'protein', label: 'Protein', unit: 'g'},
  {index: 3, key: 'fat', label: 'Total Fat', unit: 'g'},
  {index: 4, key: 'saturated_fat', label: 'Saturated Fat', unit: 'g'},
  {
    index: 5,
    key: 'polyunsaturated_fat',
    label: 'Polyunsaturated Fat',
    unit: 'g',
  },
  {
    index: 6,
    key: 'monounsaturated_fat',
    label: 'Monounsaturated Fat',
    unit: 'g',
  },
  {index: 7, key: 'trans_fat', label: 'Trans Fat', unit: 'g'},
  {index: 8, key: 'cholesterol', label: 'Cholesterol', unit: 'mg'},
  {index: 9, key: 'sodium', label: 'Sodium', unit: 'mg'},
  {index: 10, key: 'potassium', label: 'Potassium', unit: 'mg'},
  {index: 11, key: 'fiber', label: 'Fiber', unit: 'g'},
  {index: 12, key: 'sugar', label: 'Total Sugars', unit: 'g'},
  {index: 13, key: 'added_sugars', label: 'Added Sugars', unit: 'g'},
  {index: 14, key: 'vitamin_a', label: 'Vitamin A', unit: 'mcg'},
  {index: 15, key: 'vitamin_c', label: 'Vitamin C', unit: 'mg'},
  {index: 16, key: 'vitamin_d', label: 'Vitamin D', unit: 'mcg'},
  {index: 17, key: 'calcium', label: 'Calcium', unit: 'mg'},
  {index: 18, key: 'iron', label: 'Iron', unit: 'mg'},
];

export const formatNutrient = nutrient => {
  const found = displayNutrients.find(n => n.key === nutrient);
  if (found) {
    return {label: found.label, unit: found.unit};
  }
  return {label: nutrient, unit: ''}; // Default if not found
};
