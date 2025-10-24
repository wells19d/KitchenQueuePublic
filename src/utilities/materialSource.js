//* materialSource.js

export const displaySourceType = [
  {key: 'source-header-private', label: 'Private', isHeader: true},
  {index: 0, key: 'personal', label: 'Personal (Your Creatation)'},
  {index: 1, key: 'family', label: 'Family (Handed Down)'},
  {index: 2, key: 'friend', label: 'Friend (Shared in Person)'},
  {key: 'source-header-online', label: 'Online', isHeader: true},
  {index: 3, key: 'app', label: 'Mobile / Web App (Ex: Tasty,  ChatGPT etc.)'},
  {index: 4, key: 'social', label: 'Social Media (TikTok, Facebook, etc.)'},
  {index: 5, key: 'website', label: 'Website or Blog'},
  {key: 'source-header-published', label: 'Published', isHeader: true},
  {index: 6, key: 'cookbook', label: 'Cookbook (Betty Crocker, etc.)'},
  {index: 7, key: 'magazine', label: 'Magazine or Article'},
  {index: 8, key: 'package', label: 'Product Label (Bag, Box, etc.)'},
  {index: 9, key: 'restaurant', label: 'Restaurant (Inspired by)'},
  {index: 10, key: 'tv', label: 'TV Show (Food Network, PBS, etc.)'},
  {
    index: 11,
    key: 'event',
    label: 'Event/Class (Cooking demo, etc.)',
  },
];

export const formatSource = source => {
  if (!source) return '';

  const match = displaySourceType.find(m => m.key === source);
  if (match) return match.label;

  return source
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
