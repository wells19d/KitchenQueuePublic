//*setHapticFeedback.jsx
import HapticFeedback from 'react-native-haptic-feedback';

export const setHapticFeedback = () => {
  const triggerHaptic = props => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    switch (props) {
      case 'off':
        break;
      case 'light':
        HapticFeedback.trigger('impactLight', options);
        break;
      case 'medium':
        HapticFeedback.trigger('impactMedium', options);
        break;
      case 'heavy':
        HapticFeedback.trigger('impactHeavy', options);
        break;
      case 'success':
        HapticFeedback.trigger('notificationSuccess', options);
        break;
      case 'warning':
        HapticFeedback.trigger('notificationWarning', options);
        break;
      case 'error':
        HapticFeedback.trigger('notificationError', options);
        break;
      default:
        HapticFeedback.trigger('impactLight', options);
        break;
    }
  };

  return triggerHaptic;
};
