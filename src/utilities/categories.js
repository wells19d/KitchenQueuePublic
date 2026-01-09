//* categories.js

export const displayCategories = [
  {index: 0, key: 'custom', label: 'Custom (Enter Your Own)', bg: '#29856c'},
  {index: 1, key: 'na', label: 'No Category', bg: '#29856c'},
  {index: 2, key: 'meats-seafood', label: 'Meat & Seafood', bg: '#8B0000'},
  {index: 3, key: 'dairy', label: 'Dairy & Eggs', bg: '#437aa8'},
  {index: 4, key: 'produce', label: 'Produce', bg: '#2E8B57'},
  {index: 5, key: 'frozen', label: 'Frozen Goods', bg: '#437aa8'},
  {index: 6, key: 'baked', label: 'Baked Goods', bg: '#a27444'},
  {index: 7, key: 'dry-pasta', label: 'Dry Goods & Pasta', bg: '#a27444'},
  {index: 8, key: 'condiments', label: 'Condiments & Sauces', bg: '#A0522D'},
  {index: 9, key: 'canned', label: 'Canned Goods', bg: '#687887'},
  {index: 10, key: 'spices', label: 'Oils, Vinegars & Spices', bg: '#cf6c2a'},
  {index: 11, key: 'baking', label: 'Baking Ingredients', bg: '#a27444'},
  {index: 12, key: 'cereals', label: 'Breakfast & Cereal', bg: '#946e47'},
  {index: 13, key: 'snacks', label: 'Snacks & Candy', bg: '#be506c'},
  {index: 14, key: 'beverages', label: 'Beverages', bg: '#437aa8'},
  {index: 15, key: 'other', label: 'Other', bg: '#29856c'},
];

export const formatCategories = category => {
  if (!category) return '';

  // Check if category exists in displayCategories
  const match = displayCategories.find(c => c.key === category);
  if (match) return match.label;

  // Fallback: Format the raw string (for custom inputs)
  return category
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const categoryColors = category => {
  const found = displayCategories.find(cat => cat.key === category);

  if (category === undefined || category === null) {
    return '#29856c';
  } else if (found) {
    return found.bg;
  } else {
    return '#29856c';
  }
};
