//* KQModal.jsx
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  Modal,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import {Icons} from '../components/IconListRouter';
import {Text} from '../KQ-UI';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useColors} from './KQUtilities';
import {useCoreInfo} from '../utilities/coreInfo';
import NavigationMode from 'react-native-navigation-mode';

const KQModal = ({
  visible,
  title = '',
  children,
  height = '90%',
  width = '90%',
  headerFont = 'open-6',
  headerSize = 'small',
  headerTextColor = 'white',
  headerColor = 'primary',
  buttonColor = 'primary',
  hideHeader = false,
  hideTitle = false,
  hideClose = false,
  fullScreen = false,
  hapticFeedback = 'light',
  barStyle = 'default',
  onClose,
}) => {
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();
  const insets = useSafeAreaInsets();
  const isClosingRef = useRef(false);
  const [mode, setMode] = useState(null);

  const handleClose = (event = null) => {
    const isBackdropTap = event?.target === event?.currentTarget;
    const isManualCall = !event;

    if ((isBackdropTap || isManualCall) && !isClosingRef.current) {
      isClosingRef.current = true;

      useHaptics(core?.userSettings?.hapticStrength || hapticFeedback);
      Keyboard.dismiss();

      setTimeout(() => {
        onClose?.();
        isClosingRef.current = false;
      }, 100);
    }
  };

  useEffect(() => {
    let isMounted = true;

    NavigationMode.getNavigationMode()
      .then(result => {
        if (isMounted) {
          setMode(result);
        }
      })
      .catch(err => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const hasButtons = mode?.type !== 'gesture';

  const setBarStyle = useMemo(() => {
    if (barStyle === 'light') {
      return 'light-content';
    }
    if (barStyle === 'dark') {
      return 'dark-content';
    }
    if (barStyle === 'default') {
      if (fullScreen) {
        return 'dark-content';
      } else {
        return 'light-content';
      }
    }
  }, [barStyle, fullScreen]);

  const Header = () => {
    if (hideHeader) {
      return null;
    }
    return (
      <View style={[styles.headerWrapper(fullScreen, headerColor)]}>
        <View style={styles.headerContainer(hideClose)}>
          {!hideTitle && (
            <Text
              kqColor={useColors(headerTextColor)}
              font={headerFont}
              size={headerSize}
              numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
        {!hideClose && (
          <TouchableOpacity
            style={styles.closeButton(buttonColor)}
            onPress={() => handleClose()}>
            <Icons.Close size={25} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const [screenSize, setScreenSize] = useState({
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      });
    };

    const subscription = Dimensions.addEventListener(
      'change',
      updateScreenSize,
    );

    return () => subscription?.remove();
  }, []);

  const prsHeight = Math.min(Math.max(parseFloat(height), 55), 100);
  const prsWidth = Math.min(Math.max(parseFloat(width), 55), 100);

  const topHeight = fullScreen
    ? 0
    : insets.top + (screenSize.height - (screenSize.height * prsHeight) / 100);

  const btmHeight = fullScreen
    ? 0
    : insets.bottom +
      (screenSize.height - (screenSize.height * prsHeight) / 100);

  const midHeight = screenSize.height - topHeight - btmHeight;

  const midLeftWidth = fullScreen
    ? 0
    : insets.left + (screenSize.width - (screenSize.width * prsWidth) / 100);
  const midRightWidth = fullScreen
    ? 0
    : insets.right + (screenSize.width - (screenSize.width * prsWidth) / 100);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={handleClose}>
      <StatusBar
        barStyle={setBarStyle}
        backgroundColor={'rgba(0,0,0,0.5)'}
        translucent
      />
      <View style={styles.wrapper}>
        <Pressable
          style={styles.pressTop(topHeight, screenSize)}
          onPress={handleClose}
        />
        <View style={styles.container}>
          <Pressable
            style={styles.pressLeft(midLeftWidth, midHeight)}
            onPress={handleClose}
          />
          <View
            style={styles.subContainer(
              fullScreen,
              midHeight,
              hasButtons,
              insets,
            )}>
            <Header />
            {children}
          </View>
          <Pressable
            style={styles.pressRight(midRightWidth, midHeight)}
            onPress={handleClose}
          />
        </View>
        <Pressable
          style={styles.pressBtm(btmHeight, screenSize)}
          onPress={handleClose}
        />
      </View>
    </Modal>
  );
};

export default __DEV__ ? KQModal : React.memo(KQModal);

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pressTop: (topHeight, screenSize) => ({
    height: topHeight,
    width: screenSize.width,
    backgroundColor: 'transparent',
  }),
  pressBtm: (btmHeight, screenSize) => ({
    height: btmHeight,
    width: screenSize.width,
    backgroundColor: 'transparent',
  }),
  pressLeft: (midLeftWidth, midHeight) => ({
    width: midLeftWidth,
    height: midHeight,
    backgroundColor: 'transparent',
  }),
  pressRight: (midRightWidth, midHeight) => ({
    width: midRightWidth,
    height: midHeight,
    backgroundColor: 'transparent',
  }),
  container: {flex: 1, flexDirection: 'row'},
  subContainer: (fullScreen, midHeight, hasButtons, insets) => ({
    flex: 1,
    height: midHeight
      ? hasButtons
        ? midHeight + insets.top
        : midHeight
      : '100%',
    // height: midHeight,
    borderColor: '#29856c',
    backgroundColor: '#fff',
    paddingTop: fullScreen ? insets.top : 0,
    paddingBottom: fullScreen ? insets.bottom : 0,
    borderRadius: fullScreen ? 0 : 15,
    shadowColor: fullScreen ? '' : 'black',
    shadowOffset: fullScreen ? {} : {width: 3, height: 4},
    shadowOpacity: fullScreen ? 0 : 0.5,
    elevation: fullScreen ? 0 : 7,
  }),

  headerWrapper: (fullScreen, headerColor) => ({
    flexDirection: 'row',
    backgroundColor: useColors(headerColor),
    borderTopRightRadius: fullScreen ? 0 : 15,
    borderTopLeftRadius: fullScreen ? 0 : 15,
  }),
  headerContainer: hideClose => ({
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hideClose ? 10 : 40,
  }),
  closeButton: buttonColor => ({
    position: 'absolute',
    zIndex: 999,
    top: 1,
    right: 2,
    borderWidth: 1.5,
    backgroundColor: useColors(buttonColor || 'primary'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: 28,
    height: 28,
    borderRadius: 8,
    borderColor: 'white',
  }),
};
