//* KQDropdown.jsx

import React, {useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Modal, Text, ScrollView, Input} from '../KQ-UI/';
import {Icons} from '../components/IconListRouter';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {useCoreInfo} from '../utilities/coreInfo';
import {useDeviceInfo} from '../hooks/useHooks';
import {useColors} from './KQUtilities';

const KQDropdown = ({
  label = '',
  customLabel = '',
  labelStyles = {},
  required = false,
  validation = false,
  validationMessage = '',
  value = null,
  setValue = () => {},
  placeholder = '',
  onPress = () => {},
  caption,
  hapticFeedback = 'light',
  mapData,
  onRow = false,
  ...props
}) => {
  const isIOS = Platform.OS === 'ios';
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();
  const devices = useDeviceInfo();
  const [showDropModal, setShowDropModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customValue, setCustomValue] = useState('');

  const handleOnPress = () => {
    Keyboard.dismiss();
    useHaptics(core?.userSettings?.hapticStrength || hapticFeedback);
    setSelectedItem(value);
    setShowDropModal(true);
    onPress();
  };

  const renderStyles = useMemo(() => {
    if (isIOS && value === null) {
      return {
        color: '#373d4360',
        padding: 0,
      };
    }
    if (!isIOS && value === null) {
      return {
        color: '#373d4360',
        padding: 0,
        opacity: 0.8,
      };
    }
  }, [value, placeholder]);

  const handleCancel = () => {
    setShowDropModal(false);
    setSelectedItem(null);
    setCustomValue('');
  };

  const handleSave = item => {
    setShowDropModal(false);

    if (item?.key === 'custom') {
      const cleaned = customValue.trim();
      const newItem = {
        index: -1,
        key: cleaned.toLowerCase().replace(/\s+/g, '-'),
        label: cleaned,
      };
      setValue(newItem);
    } else {
      setValue(item);
    }
  };

  const handleClear = () => {
    setSelectedItem(null);
    setValue(null);
    setCustomValue('');
  };

  return (
    <View style={styles.dropContainer}>
      {label && (
        <View style={styles.labelContainer}>
          <Text
            size="xSmall"
            font="open-6"
            style={[styles.label(validation, props.disabled), labelStyles]}>
            {label} {required && '*'}
          </Text>
        </View>
      )}
      <View style={styles.dropWrapper}>
        <TouchableOpacity
          disabled={props.disabled}
          onPress={handleOnPress}
          style={styles.textInputContainer(isIOS, onRow)}>
          <Text
            style={renderStyles}
            numberOfLines={1}
            kqColor={props.disabled ? 'dark50' : 'black'}>
            {value?.label || placeholder}
          </Text>
        </TouchableOpacity>

        {value && (
          <TouchableOpacity
            disabled={props.disabled}
            onPress={handleClear}
            style={styles.textInputAccessory(isIOS, onRow)}>
            <Icons.Close
              color={props.disabled ? useColors('dark50') : useColors('black')}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          disabled={props.disabled}
          onPress={handleOnPress}
          style={styles.textInputAccessory(isIOS, onRow)}>
          <Icons.ChevronDown
            color={props.disabled ? useColors('dark50') : useColors('black')}
          />
        </TouchableOpacity>
      </View>
      {caption && (
        <View style={styles.captionContainer}>
          <View style={{flex: 1}}>
            <Text
              size="xSmall"
              kqColor={props.disabled ? 'dark50' : 'dark90'}
              font="open-5"
              numberOfLines={1}>
              ({caption})
            </Text>
          </View>
        </View>
      )}
      <Modal
        visible={showDropModal}
        fullScreen
        hideHeader
        onClose={() => setShowDropModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.headerButtonContainer}
              onPress={handleCancel}>
              <View style={styles.headerButtonIconLeft}>
                <View style={{position: 'relative', left: 4}}>
                  <Icons.Back />
                </View>
              </View>
              <View style={styles.headerButtonTextLeft}>
                <Text>Cancel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButtonContainer}
              onPress={() => handleSave(selectedItem)}>
              <View style={styles.headerButtonTextRight}>
                <Text>Select</Text>
              </View>
              <View style={styles.headerButtonIconRight}>
                <Icons.Check size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <ScrollView>
              <View
                style={{flex: 1, borderTopWidth: 1.5, borderColor: '#c4c4c4'}}>
                {mapData?.map((item, index) => {
                  if (item.isHeader) {
                    return (
                      <View
                        key={index}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderBottomWidth: 1,
                          borderColor: '#373d4380',
                          backgroundColor: '#f2f2f2',
                        }}>
                        <Text
                          size="xSmall"
                          font="open-5"
                          kqColor="dark90"
                          centered>
                          {item.label}
                        </Text>
                      </View>
                    );
                  }

                  const isCustomField = item.key === 'custom';

                  return (
                    <View
                      key={index}
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#373d4380',
                      }}>
                      {isCustomField ? (
                        <View
                          style={{
                            paddingHorizontal: 5,
                            paddingVertical: 8,
                          }}>
                          {customLabel && (
                            <Text size="xSmall" font="open-5">
                              {customLabel}
                            </Text>
                          )}
                          <KeyboardAvoidingView>
                            <Input
                              value={customValue}
                              onChangeText={text => {
                                setCustomValue(text);
                                setSelectedItem({
                                  index: 0,
                                  key: 'custom',
                                  label: 'Custom (Enter Your Own)',
                                });
                              }}
                              placeholder="Type here..."
                              containerStyles={{
                                marginHorizontal: 0,
                                marginVertical: 0,
                                paddingHorizontal: 0,
                                marginTop: 5,
                              }}
                              wrapperStyles={{borderBottomWidth: 0}}
                            />
                          </KeyboardAvoidingView>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={{
                            height: 48,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            paddingHorizontal: 5,
                          }}
                          onPress={() => {
                            setSelectedItem(item);
                            handleSave(item);
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                              <Text
                                size={
                                  selectedItem?.index === item.index
                                    ? 'small'
                                    : 'xSmall'
                                }
                                font={
                                  selectedItem?.index === item.index
                                    ? 'open-7'
                                    : 'open-5'
                                }>
                                {item.label}
                              </Text>
                            </View>
                            {selectedItem?.index === item.index && (
                              <View>
                                <Icons.Check color={'#63B76C'} size={20} />
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  dropContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 2,
  },
  labelContainer: {position: 'relative', left: 0},
  label: (validation, disabled) => ({
    color: validation ? '#DA2C43' : disabled ? '#373d4390' : '#373d43',
  }),
  dropWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    // paddingTop: 2,
    paddingBottom: 0,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    marginTop: 2,
  },
  textInputContainer: (isIOS, onRow) => ({
    flex: 1,
    height: isIOS ? 28 : onRow ? 34 : 28,
    paddingHorizontal: 1,
    paddingVertical: 3,
    position: 'relative',
    top: isIOS ? 0 : onRow ? 7 : 0,
  }),
  textInputAccessory: (isIOS, onRow) => ({
    paddingHorizontal: 2,
    position: 'relative',
    top: isIOS ? 4 : onRow ? 11 : 4,
  }),
  modalContainer: {flex: 1, flexDirection: 'column'},
  headerContainer: {
    height: 50,
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  headerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  headerButtonIconRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  headerButtonIconLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonTextLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  headerButtonTextRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginRight: 5,
  },
};

export default __DEV__ ? KQDropdown : React.memo(KQDropdown);
