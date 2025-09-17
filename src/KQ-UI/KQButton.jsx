//* KQButton.jsx
import React, {useCallback} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../KQ-UI/';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {
  useColors,
  useFontStyles,
  useButtonStyles,
  useButtonSizes,
} from './KQUtilities';
import {useCoreInfo} from '../utilities/coreInfo';

const KQButton = ({
  children,
  onPress,
  style = {},
  textStyle = {},
  outerTextStyle = {},
  type = 'filled',
  size = 'small',
  color = 'primary',
  textSize = 'small',
  textColor = 'white',
  fontType = 'open-6',
  hapticFeedback = 'light',
  disabled = false,
  underline = false,
  underlineColor = null,
  underlineWidth = 1,
  ...props
}) => {
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();
  const buttonColor = useColors(disabled ? 'basic' : color);
  const buttonStyle = useButtonStyles(type, buttonColor);
  const buttonSize = useButtonSizes(size);

  const fontStyles = useFontStyles(
    fontType,
    textSize,
    type === 'filled' ? textColor : buttonColor,
  );

  const handlePress = useCallback(() => {
    Keyboard.dismiss();
    useHaptics(core?.userSettings?.hapticStrength || hapticFeedback);
    if (onPress) onPress();
  }, [core?.userSettings?.hapticStrength, hapticFeedback, onPress]);

  return (
    <TouchableOpacity
      style={[ButtonStyles.buttonOC, buttonStyle, buttonSize, style]}
      onPress={!disabled ? handlePress : null}
      disabled={disabled}
      {...props}>
      <View
        style={[
          outerTextStyle,
          {
            borderBottomWidth: underline ? underlineWidth : 0,
            borderColor: underlineColor || buttonColor,
          },
        ]}>
        <Text
          numberOfLines={1}
          style={[ButtonStyles.buttonText, fontStyles, textStyle]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ButtonStyles = StyleSheet.create({
  buttonOC: {
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default __DEV__ ? KQButton : React.memo(KQButton);
