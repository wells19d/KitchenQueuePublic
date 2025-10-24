//* KQCamera.jsx
import React, {useRef} from 'react';
import {View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Icons} from '../components/IconListRouter';
import {useDeviceInfo} from '../hooks/useHooks';

const KQCamera = props => {
  const {torchEnabled = false, onReadCode = () => {}, cameraStyles} = props;

  const deviceInfo = useDeviceInfo();
  const cameraRef = useRef(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const iconSize = deviceInfo?.dimensions?.width * 0.4;
  const marginWidth = deviceInfo?.dimensions?.width * 0.225;

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-8', 'ean-13', 'upc-a', 'upc-e'],
    onCodeScanned: onReadCode,
  });

  if (!device) return <View style={{flex: 1, backgroundColor: 'black'}} />;

  return (
    <View style={KQStyles.cameraContainer}>
      <View style={KQStyles.scanFrame}>
        <View style={KQStyles.barcode(marginWidth)}>
          <Icons.Barcode color={'#ffffff40'} size={iconSize} />
        </View>
      </View>
      <View style={{height: '100%', width: '100%'}}>
        <Camera
          ref={cameraRef}
          style={[KQStyles.camera, cameraStyles]}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          torch={torchEnabled ? 'on' : 'off'}
          laserColor="red"
          autoFocus="on"
          frameColor="white"
          zoom={1.5}
          enableZoomGesture={false}
          {...props}
        />
      </View>
    </View>
  );
};

export default __DEV__ ? KQCamera : React.memo(KQCamera);

const KQStyles = {
  cameraContainer: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    zIndex: 9999,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ffffff70',
    borderRadius: 20,
  },
  barcode: marginWidth => ({
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: marginWidth,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  }),
  camera: {
    flex: 1,
    zIndex: 1,
  },
};
