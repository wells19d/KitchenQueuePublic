//* KQCamera.jsx
import React, {useMemo, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {View, Button, Input, Modal} from '../KQ-UI';
import {Icons} from '../components/IconListRouter';
import {useDeviceInfo} from '../hooks/useHooks';

const KQCamera = props => {
  const {
    torchEnabled = false,
    onReadCode = () => {},
    onManualEntry,
    cameraStyles,
  } = props;

  const deviceInfo = useDeviceInfo();
  const deviceHeight = deviceInfo?.dimensions?.height;
  const isTablet = deviceInfo?.system?.device === 'Tablet';
  const isPortrait = deviceInfo?.view === 'Portrait';

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

  const [launchModal, setLaunchModal] = useState(false);
  const [upc, setUpc] = useState('');

  const heightMode = useMemo(() => {
    if (isTablet && isPortrait) {
      return '57.5%';
    } else if (isTablet && !isPortrait) {
      return '60%';
    } else {
      return '63%';
    }
  }, [deviceInfo]);

  return (
    <View style={device ? KQStyles.cameraContainer : KQStyles.noContainer}>
      {device && (
        <View style={KQStyles.scanFrame}>
          <View style={KQStyles.barcode(marginWidth)}>
            <Icons.Barcode color={'#ffffff40'} size={iconSize} />
          </View>
        </View>
      )}
      {!launchModal && (
        <View
          style={{
            flex: !device ? 1 : 0,
            justifyContent: !device ? 'center' : 'flex-end',
            alignItems: 'center',
            zIndex: 10000,
            position: !device ? 'relative' : 'absolute',
            // marginTop: !device ? 0 : -55,
            bottom: !device ? 0 : deviceHeight / 7,
          }}>
          <Button
            type="filled"
            size="medium"
            color="primary"
            textSize="medium"
            fontType="open-6"
            textColor="white"
            disabled={false}
            onPress={() => {
              setLaunchModal(true);
            }}>
            Enter UPC Manually
          </Button>
        </View>
      )}
      <Modal
        visible={launchModal}
        title="Enter UPC Barcode"
        headerFont="open-6"
        headerSize="small"
        height={heightMode}
        width="90%"
        hideClose
        onClose={() => setLaunchModal(false)}>
        <Input
          label="UPC / Barcode"
          value={upc}
          onChangeText={setUpc}
          capitalize={false}
          capitalMode="words"
          keyboardType="number-pad"
        />
        <View p5>
          <Button
            type="filled"
            size="small"
            color="primary"
            textSize="medium"
            fontType="open-6"
            textColor="white"
            disabled={false}
            onPress={() => {
              if (upc?.trim()?.length > 0) {
                if (onManualEntry) {
                  onManualEntry(upc.trim());
                } else {
                  onReadCode([{type: 'manual', value: upc.trim()}]);
                }
                setLaunchModal(false);
                setUpc('');
              }
            }}>
            Submit
          </Button>
        </View>
      </Modal>
      {device && (
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
      )}
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
  noContainer: {flex: 1, backgroundColor: 'black'},
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
