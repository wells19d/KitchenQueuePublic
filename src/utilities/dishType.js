export const displayDishTypes = [
  {index: 0, label: 'Breakfast', value: 'breakfast'},
  {index: 1, label: 'Brunch', value: 'brunch'},
  {index: 2, label: 'Lunch', value: 'lunch'},
  {index: 3, label: 'Supper', value: 'supper'},
  {index: 4, label: 'Dinner', value: 'dinner'},
  {index: 5, label: 'Snack', value: 'snack'},
  {index: 6, label: 'Dessert', value: 'dessert'},
  {index: 7, label: 'Breads / Baking', value: 'bread-baking'},
  {index: 8, label: 'Sauces', value: 'sauces'},
  {index: 9, label: 'Rubs', value: 'rubs'},
  {index: 10, label: 'Dips', value: 'dips'},
];

export const formatDishType = dish => {
  if (!dish) return 'All';

  const match = displayDishTypes.find(d => d.value === dish);
  if (match) return match.label;

  return toTitleCase(dish);
};

const toTitleCase = str =>
  str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
