//* nutrients.js

export const displayNutrients = [
  {index: 0, key: 'CA', label: 'Calcium', unit: 'mg'},
  {index: 1, key: 'CHOCDF', label: 'Total Carbohydrates', unit: 'g'},
  {index: 2, key: 'CHOCDF.net', label: 'Net Carbohydrates', unit: 'g'},
  {index: 3, key: 'CHOLE', label: 'Cholesterol', unit: 'mg'},
  {index: 4, key: 'ENERC_KCAL', label: 'Calories', unit: null},
  {index: 5, key: 'FAMS', label: 'Monounsaturated Fat', unit: 'g'},
  {index: 6, key: 'FAPU', label: 'Polyunsaturated Fat', unit: 'g'},
  {index: 7, key: 'FASAT', label: 'Saturated Fat', unit: 'g'},
  {index: 8, key: 'FATRN', label: 'Trans Fat', unit: 'g'},
  {index: 9, key: 'FAT', label: 'Total Fat', unit: 'g'},
  {index: 10, key: 'FE', label: 'Iron', unit: 'mg'},
  {index: 11, key: 'FIBTG', label: 'Dietary Fiber', unit: 'g'},
  {index: 12, key: 'FOLAC', label: 'Folic Acid', unit: 'µg'},
  {index: 13, key: 'FOLDFE', label: 'Folate (DFE)', unit: 'µg'},
  {index: 14, key: 'FOLFD', label: 'Folate (Food)', unit: 'µg'},
  {index: 15, key: 'K', label: 'Potassium', unit: 'mg'},
  {index: 16, key: 'MG', label: 'Magnesium', unit: 'mg'},
  {index: 17, key: 'NA', label: 'Sodium', unit: 'mg'},
  {index: 18, key: 'NIA', label: 'Niacin', unit: 'mg'},
  {index: 19, key: 'P', label: 'Phosphorus', unit: 'mg'},
  {index: 20, key: 'PROCNT', label: 'Protein', unit: 'g'},
  {index: 21, key: 'RIBF', label: 'Riboflavin', unit: 'mg'},
  {index: 22, key: 'SUGAR', label: 'Total Sugars', unit: 'g'},
  {index: 23, key: 'SUGAR.added', label: 'Added Sugars', unit: 'g'},
  {index: 24, key: 'Sugar.alcohol', label: 'Sugar Alcohols', unit: 'g'},
  {index: 25, key: 'THIA', label: 'Thiamin', unit: 'mg'},
  {index: 26, key: 'TOCPHA', label: 'Vitamin E', unit: 'mg'},
  {index: 27, key: 'VITA_RAE', label: 'Vitamin A', unit: 'µg'},
  {index: 28, key: 'VITB12', label: 'Vitamin B12', unit: 'µg'},
  {index: 29, key: 'VITB6A', label: 'Vitamin B6', unit: 'mg'},
  {index: 30, key: 'VITC', label: 'Vitamin C', unit: 'mg'},
  {index: 31, key: 'VITD', label: 'Vitamin D', unit: 'µg'},
  {index: 32, key: 'VITK1', label: 'Vitamin K', unit: 'µg'},
  {index: 33, key: 'WATER', label: 'Water', unit: 'g'},
  {index: 34, key: 'ZN', label: 'Zinc', unit: 'mg'},
];

// export const displayNutrients = [
//   {index: 0, key: 'calories', label: 'Calories', unit: 'kcal'},
//   {index: 1, key: 'fat', label: 'Total Fat', unit: 'g'},
//   {index: 2, key: 'saturated_fat', label: 'Saturated Fat', unit: 'g'},
//   {
//     index: 3,
//     key: 'polyunsaturated_fat',
//     label: 'Polyunsaturated Fat',
//     unit: 'g',
//   },
//   {
//     index: 4,
//     key: 'monounsaturated_fat',
//     label: 'Monounsaturated Fat',
//     unit: 'g',
//   },
//   {index: 5, key: 'trans_fat', label: 'Trans Fat', unit: 'g'},
//   {index: 6, key: 'cholesterol', label: 'Cholesterol', unit: 'mg'},
//   {index: 7, key: 'sodium', label: 'Sodium', unit: 'mg'},
//   {index: 8, key: 'potassium', label: 'Potassium', unit: 'mg'},
//   {index: 9, key: 'carbohydrate', label: 'Total Carbohydrates', unit: 'g'},
//   {index: 10, key: 'fiber', label: 'Dietary Fiber', unit: 'g'},
//   {index: 11, key: 'sugar', label: 'Total Sugars', unit: 'g'},
//   {index: 12, key: 'added_sugars', label: 'Added Sugars', unit: 'g'},
//   {index: 13, key: 'protein', label: 'Protein', unit: 'g'},
//   {index: 14, key: 'vitamin_d', label: 'Vitamin D', unit: 'µg'},
//   {index: 15, key: 'vitamin_a', label: 'Vitamin A', unit: 'µg'},
//   {index: 16, key: 'vitamin_c', label: 'Vitamin C', unit: 'mg'},
//   {index: 17, key: 'calcium', label: 'Calcium', unit: 'mg'},
//   {index: 18, key: 'iron', label: 'Iron', unit: 'mg'},
// ];

export const formatNutrient = nutrient => {
  const found = displayNutrients.find(n => n.key === nutrient);
  if (found) {
    return {label: found.label, unit: found.unit};
  }
  return {label: nutrient, unit: ''}; // Default if not found
};
