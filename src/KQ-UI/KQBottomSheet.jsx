//* KQBottomSheet.jsx
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

const KQBottomSheet = ({
  visible,
  onClose,
  children,
  snapPoints = [0.01, 0.9],
  innerStyles = {},
}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isFullyVisible, setIsFullyVisible] = useState(visible);
  const [heightMulti, setHeightMulti] = useState(0.8);

  useEffect(() => {
    if (visible) {
      setIsFullyVisible(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: height * (1 - snapPoints[1]),
          speed: 7,
          bounciness: 3,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: height,
          speed: 5,
          bounciness: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          setIsFullyVisible(false);
        }, 500);
      });
    }
  }, [visible]);

  if (!isFullyVisible) return null;

  const handleGesture = event => {
    const {translationY} = event.nativeEvent;

    if (translationY >= 0) {
      translateY.setValue(height * (1 - snapPoints[1]) + translationY);
    }
  };

  const handleStateChange = event => {
    const {translationY, velocityY} = event.nativeEvent;

    if (event.nativeEvent.state === State.END) {
      if (translationY > height * 0.5 || velocityY > 1.5) {
        Animated.timing(translateY, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }).start(() => onClose());
      } else {
        Animated.spring(translateY, {
          toValue: height * (1 - snapPoints[1]),
          speed: 7,
          bounciness: 3,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      accessible={false}>
      <Animated.View style={[styles.overlay, {opacity}]}>
        <Animated.View
          style={[
            styles.sheet,
            {transform: [{translateY}]},
            {height: height * heightMulti},
          ]}>
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleStateChange}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          </PanGestureHandler>
          <View style={[styles.viewableArea, innerStyles]}>{children}</View>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    width: '100%',
    height: height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },
  viewableArea: {
    flex: 1,
    marginHorizontal: 5,
    // borderWidth: 1,
    marginBottom: 55,
  },
});

export default __DEV__ ? KQBottomSheet : React.memo(KQBottomSheet);
