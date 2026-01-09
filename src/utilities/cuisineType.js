//* cuisineType.js
export const displayCuisineTypes = [
  {index: 0, label: 'African', value: 'african'},
  {index: 1, label: 'American', value: 'american'},
  {index: 2, label: 'British', value: 'british'},
  {index: 3, label: 'Cajun', value: 'cajun'},
  {index: 4, label: 'Caribbean', value: 'caribbean'},
  {index: 5, label: 'Chinese', value: 'chinese'},
  {index: 6, label: 'Eastern European', value: 'eastern european'},
  {index: 7, label: 'European', value: 'european'},
  {index: 8, label: 'French', value: 'french'},
  {index: 9, label: 'German', value: 'german'},
  {index: 10, label: 'Greek', value: 'greek'},
  {index: 11, label: 'Indian', value: 'indian'},
  {index: 12, label: 'Irish', value: 'irish'},
  {index: 13, label: 'Italian', value: 'italian'},
  {index: 14, label: 'Japanese', value: 'japanese'},
  {index: 15, label: 'Jewish', value: 'jewish'},
  {index: 16, label: 'Korean', value: 'korean'},
  {index: 17, label: 'Latin American', value: 'latin american'},
  {index: 18, label: 'Mediterranean', value: 'mediterranean'},
  {index: 19, label: 'Mexican', value: 'mexican'},
  {index: 20, label: 'Middle Eastern', value: 'middle eastern'},
  {index: 21, label: 'Nordic', value: 'nordic'},
  {index: 22, label: 'Southern', value: 'southern'},
  {index: 23, label: 'Spanish', value: 'spanish'},
  {index: 24, label: 'Thai', value: 'thai'},
  {index: 25, label: 'Vietnamese', value: 'vietnamese'},
  {index: 26, label: 'Other', value: 'other'},
];

export const formatCuisineType = cuisine => {
  if (!cuisine) return 'All';

  const match = displayCuisineTypes.find(c => c.value === cuisine);
  if (match) return match.label;

  return toTitleCase(cuisine);
};

const toTitleCase = str =>
  str
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
