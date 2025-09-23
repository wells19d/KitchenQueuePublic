//* KQMultiDropdown.jsx

import React, {useState, useMemo} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Modal, Text, ScrollView, Input} from '../KQ-UI/';
import {Icons} from '../components/IconListRouter';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {useCoreInfo} from '../utilities/coreInfo';

const KQMultiDropdown = ({
  label = '',
  customLabel = '',
  labelStyles = {},
  required = false,
  validation = false,
  validationMessage = '',
  value = [],
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
  const [showDropModal, setShowDropModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customValue, setCustomValue] = useState('');

  const handleOnPress = () => {
    Keyboard.dismiss();
    useHaptics(core?.userSettings?.hapticStrength || hapticFeedback);
    const initial = Array.isArray(value) ? value.filter(v => !v.isHeader) : [];
    setSelectedItems(initial);
    setShowDropModal(true);
    onPress();
  };

  const renderStyles = useMemo(() => {
    if (isIOS && (value === null || value.length === 0)) {
      return {
        color: '#373d4360',
        padding: 0,
      };
    }
    if (!isIOS && (value === null || value.length === 0)) {
      return {
        color: '#373d4360',
        padding: 0,
        opacity: 0.8,
      };
    }
  }, [value, placeholder]);

  const handleCancel = () => {
    setShowDropModal(false);
    setSelectedItems([]);
    setCustomValue('');
  };

  const handleSave = () => {
    const filtered = selectedItems.filter(
      i =>
        (!i?.isHeader && i?.key !== 'custom') ||
        (!!customValue.trim() && i?.key === 'custom'),
    );

    const final = filtered.map(item => {
      if (item.key === 'custom') {
        const cleaned = customValue.trim();
        return {
          index: -1,
          key: cleaned.toLowerCase().replace(/\s+/g, '-'),
          label: cleaned,
          value: cleaned.toLowerCase().replace(/\s+/g, '-'),
        };
      }
      return item;
    });

    setValue(final);
    setShowDropModal(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
    setValue([]);
    setCustomValue('');
  };

  const toggleSelection = item => {
    if (item?.isHeader) return;

    const exists = selectedItems.some(i => i.label === item.label);
    if (exists) {
      setSelectedItems(prev => prev.filter(i => i.label !== item.label));
    } else {
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const isItemSelected = item => {
    if (!item || item.isHeader) return false;
    return selectedItems.some(i => i.label === item.label);
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
          onPress={handleOnPress}
          style={styles.textInputContainer(isIOS, onRow)}>
          <Text style={renderStyles} numberOfLines={1}>
            {Array.isArray(value) && value.length > 0
              ? value.map(v => v.label).join(', ')
              : placeholder}
          </Text>
        </TouchableOpacity>

        {value?.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.textInputAccessory(isIOS, onRow)}>
            <Icons.Close />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleOnPress}
          style={styles.textInputAccessory(isIOS, onRow)}>
          <Icons.ChevronDown />
        </TouchableOpacity>
      </View>

      {caption && (
        <View style={styles.captionContainer}>
          <Text size="xSmall" kqColor="dark90" font="open-5" numberOfLines={1}>
            ({caption})
          </Text>
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
              onPress={handleSave}>
              <View style={styles.headerButtonTextRight}>
                <Text>Select</Text>
              </View>
              <View style={styles.headerButtonIconRight}>
                <Icons.Check size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View
              style={{flex: 1, borderTopWidth: 1.5, borderColor: '#c4c4c4'}}>
              {mapData?.map((item, index) => {
                const isCustomField = item.key === 'custom';
                const isHeader = item.isHeader;
                const selected = isItemSelected(item);

                if (isHeader) {
                  return (
                    <View
                      key={`header-${index}`}
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

                if (isCustomField) {
                  return (
                    <View
                      key={`custom-${index}`}
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#373d4380',
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
                            const cleanedKey = text
                              .trim()
                              .toLowerCase()
                              .replace(/\s+/g, '-');
                            const customItem = {
                              index: -1,
                              key: 'custom',
                              label: text,
                              value: cleanedKey,
                            };
                            const exists = selectedItems.some(
                              i => i.key === 'custom',
                            );
                            if (!exists) {
                              setSelectedItems(prev => [...prev, customItem]);
                            } else {
                              setSelectedItems(prev =>
                                prev.map(i =>
                                  i.key === 'custom' ? customItem : i,
                                ),
                              );
                            }
                          }}
                          placeholder="Type here..."
                          containerStyles={{marginTop: 5}}
                          wrapperStyles={{borderBottomWidth: 0}}
                        />
                      </KeyboardAvoidingView>
                    </View>
                  );
                }

                return (
                  <TouchableOpacity
                    key={`item-${item.key || index}`}
                    style={{
                      height: 48,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingHorizontal: 5,
                      borderBottomWidth: 1,
                      borderColor: '#373d4380',
                    }}
                    onPress={() => toggleSelection(item)}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text
                          size={selected ? 'small' : 'xSmall'}
                          font={selected ? 'open-7' : 'open-5'}>
                          {item.label}
                        </Text>
                      </View>
                      {selected && (
                        <View>
                          <Icons.Check color={'#63B76C'} size={20} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  dropContainer: {
    // borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 2,
  },
  labelContainer: {position: 'relative', left: 0},
  label: (validation, disabled) => ({
    color: validation ? '#fE4949' : disabled ? '#373d4390' : '#373d43',
  }),
  dropWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    paddingTop: 2,
    paddingBottom: 4,
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
    top: isIOS ? 3 : onRow ? 10 : 3,
  }),
  textInputAccessory: (isIOS, onRow) => ({
    paddingHorizontal: 2,
    position: 'relative',
    top: isIOS ? 6 : onRow ? 13 : 6,
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
export default __DEV__ ? KQMultiDropdown : React.memo(KQMultiDropdown);
