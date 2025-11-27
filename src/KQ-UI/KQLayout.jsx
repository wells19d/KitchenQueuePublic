//* KQLayout.jsx
import React, {useMemo} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import NavHeader from '../components/NavHeader';
import KQScrollView from './KQScrollView';
import {useColors} from './KQUtilities';
import {Text, View} from '../KQ-UI';

const KQLayout = ({
  children,
  mode = '',
  bgColor = '#ffffff',
  headerTitle = '',
  headerColor = '#29856c',
  textColor = '#ffffff',
  LeftButton = '',
  RightButton = '',
  LeftAction = null,
  RightAction = null,
  sheetOpen = false,
  useHeader = true,
  innerViewStyles = {},
  outerViewStyles = {},
  noBar = false,
  hideBar = false,
  loading = false,
  loadingHeight = 100,
  loadingWidth = '50%',
  loadingText = '',
}) => {
  const baseStyle = {
    flex: 1,
    backgroundColor: bgColor,
    paddingBottom: 25,
  };

  // Render Loading Overlay
  const loadingOverlay = useMemo(() => {
    if (!loading) return null;
    return (
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={overlayStyles.wrapper}>
          <View
            p20
            style={overlayStyles.container(loadingHeight, loadingWidth)}>
            <ActivityIndicator size="large" color="#29856c" />
            <View mt5>
              <Text>{loadingText || `Loading`}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }, [loading, loadingHeight, loadingWidth, loadingText]);

  const renderHeader = () =>
    useHeader && (
      <NavHeader
        title={headerTitle}
        headerColor={headerColor}
        textColor={textColor}
        LeftButton={LeftButton}
        RightButton={RightButton}
        LeftAction={LeftAction}
        RightAction={RightAction}
        sheetOpen={sheetOpen}
      />
    );

  switch (mode) {
    case 'keyboard-scroll':
      return (
        <View style={[baseStyle, outerViewStyles]}>
          {loadingOverlay}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{flex: 1}}>
              {renderHeader()}
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                <KQScrollView
                  noBar={noBar}
                  hideBar={hideBar}
                  onScrollBeginDrag={Keyboard.dismiss}
                  contentContainerStyle={{flexGrow: 1}}
                  keyboardShouldPersistTaps="handled">
                  <View style={[{flex: 1}, innerViewStyles]}>{children}</View>
                </KQScrollView>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );

    case 'keyboard-static':
      return (
        <View style={[baseStyle, outerViewStyles]}>
          {loadingOverlay}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={{flex: 1}}>
              {renderHeader()}
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                <View style={[{flex: 1}, innerViewStyles]}>{children}</View>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );

    case 'scroll-only':
      return (
        <View style={[baseStyle, outerViewStyles]}>
          {loadingOverlay}
          {renderHeader()}
          <KQScrollView noBar={noBar} hideBar={hideBar}>
            <View style={[{flex: 1}, innerViewStyles]}>{children}</View>
          </KQScrollView>
        </View>
      );

    default:
      return (
        <View style={[baseStyle, outerViewStyles]}>
          {loadingOverlay}
          {renderHeader()}
          <View style={[{flex: 1}, innerViewStyles]}>{children}</View>
        </View>
      );
  }
};

const overlayStyles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  container: (loadingWidth, loadingHeight) => ({
    minWidth: loadingWidth,
    minHeight: loadingHeight,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: useColors('dark50'),
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
};

export default KQLayout;
