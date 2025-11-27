//* KQInput.jsx
import React, {use, useMemo} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {Text} from '../KQ-UI/';
import {useColors, useFontSizes, useFontStyles} from './KQUtilities';

const KQInput = ({
  label = '',
  labelStyles = {},
  required = false,
  validation = false,
  validationMessage = '',
  value = '',
  onChangeText = () => {},
  capitalize = false,
  capitalMode = 'none', // 'none' | 'sentences' | 'words' | 'characters' |
  multiline = false,
  multiHeight = 'medium',
  scrollEnabled = true,
  caption = '',
  accessoryRight = null,
  counter = false,
  maxCount = 1000,
  containerStyles = {},
  textInputStyles = {},
  wrapperStyles = {},
  textSize = 'small',
  labelTextSize = 'xSmall',
  ...props
}) => {
  const fontStyles = useFontStyles('open-6', 'small', 'black');
  const showCount = value?.length || 0;

  const multiMode = useMemo(() => {
    if (!multiline) return {};

    const heightMap = {
      small: {minHeight: 20, maxHeight: 40},
      medium: {minHeight: 20, maxHeight: 75},
      large: {minHeight: 20, maxHeight: 150},
      xLarge: {minHeight: 20, maxHeight: 250},
      full: {minHeight: 20},
    };

    return {...(heightMap[multiHeight] || heightMap.medium)};
  }, [multiline, multiHeight]);

  const capMode = useMemo(
    () => (multiline ? 'sentences' : capitalize ? capitalMode : 'none'),
    [capitalize, capitalMode, multiline],
  );

  const InputInfoContainer = ({children}) => {
    if (caption || counter || validationMessage) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 2,
            marginTop: 2,
          }}>
          {children}
        </View>
      );
    }
    return null;
  };

  const handleTextChange = text => {
    if (text.length > maxCount) {
      text = text.substring(0, maxCount); // Trim excess characters
    }
    onChangeText(text); // Update state
  };

  return (
    <View style={[styles.inputContainer, {...containerStyles}]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            size={labelTextSize || 'xSmall'}
            font="open-6"
            style={[styles.label(validation, props.disabled), labelStyles]}>
            {label} {required && '*'}
          </Text>
        </View>
      )}
      <View style={[styles.inputWrapper, {...wrapperStyles}]}>
        <View style={[styles.textInputContainer, {...textInputStyles}]}>
          {props.disabled ? (
            <Text
              style={[fontStyles, {padding: 0, color: useColors('dark50')}]}>
              {value}
            </Text>
          ) : (
            <TextInput
              value={value}
              onChangeText={handleTextChange}
              autoCapitalize={capMode}
              multiline={multiline}
              allowFontScaling={false}
              style={[
                fontStyles,
                multiMode,
                {padding: 0},
                {...textInputStyles},
              ]}
              fontSize={useFontSizes()[textSize]}
              // fontSize={useFontSizes(textSize).fontSize}
              onSubmitEditing={Keyboard.dismiss}
              placeholderTextColor={useColors('dark60')}
              {...props}
            />
          )}
        </View>
        {accessoryRight && (
          <View style={styles.accessoriesContainer}>
            {typeof accessoryRight === 'function'
              ? accessoryRight()
              : accessoryRight}
          </View>
        )}
      </View>
      <InputInfoContainer>
        {caption && (
          <View style={{flex: 1}}>
            <Text
              size="xSmall"
              kqColor="dark90"
              font="open-5"
              numberOfLines={1}>
              ({caption})
            </Text>
          </View>
        )}
        {validation && (
          <View style={{flex: 1}}>
            <Text
              size="xSmall"
              kqColor="danger"
              font="open-5"
              numberOfLines={1}>
              ({validationMessage})
            </Text>
          </View>
        )}
        {counter && (
          <View style={{flex: caption ? 0 : 1, alignItems: 'flex-end'}}>
            <Text
              size="xSmall"
              kqColor={showCount >= maxCount ? 'danger' : 'dark90'}
              font="open-5"
              numberOfLines={1}
              style={{color: useColors('dark60')}}>
              ({showCount} / {maxCount})
            </Text>
          </View>
        )}
      </InputInfoContainer>
    </View>
  );
};

const styles = {
  inputContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 2,
  },
  labelContainer: {position: 'relative', left: 0},
  label: (validation, disabled) => ({
    color: validation ? '#DA2C43' : disabled ? '#373d4390' : '#373d43',
  }),
  inputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
  },
  textInputContainer: {
    flex: 1,
    // height: 40,
    paddingHorizontal: 1,
    paddingVertical: 3,
  },
  accessoriesContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default __DEV__ ? KQInput : React.memo(KQInput);
