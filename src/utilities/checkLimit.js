import Toast from 'react-native-toast-message';

/**
 * Checks if the current count has reached the max allowed limit.
 * If the limit is exceeded, shows a friendly upgrade suggestion toast and returns false.
 *
 * @param {Object} params
 * @param {number} params.current - Current number of items
 * @param {number} params.max - Maximum allowed items
 * @param {string} params.label - Label for UI display ("Favorites", "Shopping Items", etc)
 * @returns {boolean} - false if over limit, true otherwise
 */
export const checkLimit = ({current, incoming = 0, max, label}) => {
  if (current >= max) {
    Toast.show({
      type: 'info',
      text1: `${label} Limit Reached`,
      text2: `You’ve reached your limit of ${max} ${label.toLowerCase()}. Please upgrade your subscription or remove some items to continue.`,
      visibilityTime: 5000,
    });
    return false;
  }

  if (current + incoming > max) {
    Toast.show({
      type: 'info',
      text1: `This will Exceed ${label} Limits`,
      text2: `This action would exceed your limit of ${max} ${label.toLowerCase()}. Please upgrade your subscription or remove some items to continue.`,
      visibilityTime: 8000,
    });
    return false;
  }

  return true;
};

export const dailyCheckLimit = ({current, max, label}) => {
  if (current >= max) {
    Toast.show({
      type: 'info',
      text1: `Daily ${label} Search Reached`,
      text2: `You’ve reached your limit of ${max} daily ${label.toLowerCase()} searches. Please upgrade your subscription or wait until it resets tomorrow.`,
      visibilityTime: 8000,
    });
    return false;
  }

  return true;
};
