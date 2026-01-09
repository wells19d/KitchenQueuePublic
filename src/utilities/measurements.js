//* measurements.js

export const displayMeasurements = [
  {key: 'volume-header', label: 'Default', isHeader: true},
  {index: 0, key: 'custom', label: 'Custom (Enter Your Own)'},
  {index: 1, key: 'each', label: 'Single (Each)'},
  {key: 'volume-header', label: '─ Volume ─', isHeader: true},

  {index: 2, key: 'cup', label: 'Cup'},
  {index: 3, key: 'fluidounce', label: 'Fluid Ounce'},
  {index: 4, key: 'gallon', label: 'Gallon'},
  {index: 5, key: 'liter', label: 'Liter'},
  {index: 6, key: 'milliliter', label: 'Milliliter'},
  {index: 7, key: 'pint', label: 'Pint'},
  {index: 8, key: 'quart', label: 'Quart'},
  {index: 9, key: 'tablespoon', label: 'Tablespoon'},
  {index: 10, key: 'teaspoon', label: 'Teaspoon'},
  {key: 'weight-header', label: '─ Weight ─', isHeader: true},
  {index: 11, key: 'gram', label: 'Gram'},
  {index: 12, key: 'kilogram', label: 'Kilogram'},
  {index: 13, key: 'ounce', label: 'Ounce'},
  {index: 14, key: 'pound', label: 'Pound'},
  {key: 'single-header', label: '─ Single Unit ─', isHeader: true},
  {index: 15, key: 'bunch', label: 'Bunch'},
  {index: 16, key: 'clove', label: 'Clove'},
  {index: 17, key: 'dozen', label: 'Dozen'},
  {index: 18, key: 'head', label: 'Head'},
  {index: 19, key: 'piece', label: 'Piece'},
  {index: 20, key: 'serving', label: 'Serving'},
  {index: 21, key: 'stalk', label: 'Stalk'},
  {key: 'package-header', label: '─ Package / Form ─', isHeader: true},
  {index: 22, key: 'bag', label: 'Bag'},
  {index: 23, key: 'bar', label: 'Bar'},
  {index: 24, key: 'bottle', label: 'Bottle'},
  {index: 25, key: 'box', label: 'Box'},
  {index: 26, key: 'can', label: 'Can'},
  {index: 27, key: 'carton', label: 'Carton'},
  {index: 28, key: 'jar', label: 'Jar'},
  {index: 29, key: 'pack', label: 'Pack'},
  {index: 30, key: 'package', label: 'Package'},
  {index: 31, key: 'roll', label: 'Roll'},
  {index: 32, key: 'slice', label: 'Slice'},
  {index: 33, key: 'stick', label: 'Stick'},
  {index: 34, key: 'tube', label: 'Tube'},
];

export const formatMeasurement = measurement => {
  if (!measurement) return '';

  // Check if measurement exists in displayMeasurements
  const match = displayMeasurements.find(m => m.key === measurement);
  if (match) return match.label;

  // Fallback: Format the raw string (for custom inputs)
  return measurement
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
