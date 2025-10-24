//* UploadPicture.jsx

import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from '../../KQ-UI';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import {useDeviceInfo, useProfile} from '../../hooks/useHooks';
import {useColors, useFontSizes} from '../../KQ-UI/KQUtilities';
import {Icons} from '../../components/IconListRouter';
import {capFirst} from '../../utilities/helpers';
import Toast from 'react-native-toast-message';
import {useTakePhoto} from './ImageFunctions/takePhoto';
import {useCropPhoto} from './ImageFunctions/cropPhoto';
import {UploadPictureStyles} from '../../styles/Styles';
import {useSelectPhoto} from './ImageFunctions/selectPhoto';

const UploadPicture = props => {
  const profile = useProfile();
  const useHaptics = setHapticFeedback();
  const deviceInfo = useDeviceInfo();
  const buttonWidth = deviceInfo?.dimensions?.width / 6;

  const {
    handleCloseUploadPicture,
    cameraStyles,
    pictureName,
    finalImage,
    setFinalImage,
  } = props;

  const {
    cameraRef,
    takePhoto,
    photoData,
    photoError,
    flashOption,
    setFlashOption,
  } = useTakePhoto();

  const {selectedData, selectedError, pickImageFromGallery} = useSelectPhoto();
  const {croppedData, cropError, cropPhoto, cropView} = useCropPhoto();
  const [cameraActive, setCameraActive] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [screenView, setScreenView] = useState('action');
  const [isCropping, setIsCropping] = useState(false);

  const toastProps = {
    fontSize1: useFontSizes('small')?.fontSize,
    fontSize2: useFontSizes('xSmall')?.fontSize,
  };

  const toggleFlash = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setFlashOption(prev => {
      if (prev === 'off') return 'on';
      if (prev === 'on') return 'auto';
      return 'off';
    });
  };

  useEffect(() => {
    return () => {
      setCameraActive(false);
    };
  }, []);

  useEffect(() => {
    if (screenView === 'crop' && tempImage?.uri && !isCropping && !cropView) {
      setIsCropping(true);
      cropPhoto(tempImage, pictureName);
    }
    if (croppedData) {
      setFinalImage(croppedData);
      setScreenView('final');
      setIsCropping(false);
    }
    if (cropError) {
      handleCloseUploadPicture();
      setScreenView('action');
      setIsCropping(false);

      Toast.show({
        type: cropError?.type || 'error',
        text1: cropError?.text1 || 'Crop Error',
        text2:
          cropError?.text2 || 'An error occurred while cropping the image.',
        props: toastProps,
      });
    }
  }, [
    screenView,
    tempImage?.uri,
    isCropping,
    cropView,
    croppedData,
    cropError,
  ]);

  const flashColor = useMemo(() => {
    if (flashOption === 'on') return 'success';
    if (flashOption === 'off') return 'danger';
    return 'info';
  }, [flashOption]);

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  useEffect(() => {
    const imageSource = photoData || selectedData;
    const errorSource = photoError || selectedError;

    if (imageSource) {
      setTempImage(imageSource);
      setScreenView('crop');
    }

    if (errorSource) {
      handleCloseUploadPicture();
      setScreenView('action');
      setTempImage(null);
      setFinalImage(null);
      Toast.show({
        type: errorSource.type || 'error',
        text1: errorSource.text1,
        text2: errorSource.text2,
        props: toastProps,
      });
    }
  }, [photoData, photoError, selectedData, selectedError]);

  const handleOnPress = pressType => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    if (pressType === 'cameraUpload') {
      setCameraActive(true);
      setScreenView(pressType);
    }
    if (pressType === 'storageUpload') {
      pickImageFromGallery(pictureName);
      setScreenView('crop');
    }
    if (pressType === 'takePhoto') {
      takePhoto(flashOption);
    }
    if (pressType === 'cancelPhoto') {
      setCameraActive(false);
      setScreenView('action');
      setTempImage(null);
    }
    if (pressType === 'finalize') {
      if (!pictureName) {
        Toast.show({
          type: 'error',
          text1: 'Missing name',
          text2: 'Add a recipe name first.',
          props: toastProps,
        });
        return;
      }
      handleCloseUploadPicture();
    }
  };

  const UploadActionButton = ({action, icon, label}) => (
    <TouchableOpacity
      style={UploadPictureStyles.button}
      onPress={() => handleOnPress(action)}>
      <View column flex>
        <View flex={1.25} pb={2.5} centerH bottomAlign>
          {icon}
        </View>
        <View flex pt={2.5} centerH>
          <Text centered size="small">
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (screenView === 'action') {
    return (
      <View ph5 flex>
        <View mt5 mb15>
          <Text centered>Choose an Action</Text>
        </View>
        <View row>
          <View flex>
            <UploadActionButton
              action="storageUpload"
              icon={<Icons.Upload size={30} color={useColors('dark70')} />}
              label="Upload Image"
            />
          </View>
          <View flex>
            <UploadActionButton
              action="cameraUpload"
              icon={<Icons.Camera size={30} color={useColors('dark70')} />}
              label="Take Photo"
            />
          </View>
        </View>
        {finalImage && (
          <View flex mt25>
            <Text centered size="small" italic>
              Image Found: Preview
            </Text>
            <View style={UploadPictureStyles.finalizedWrapper} mt10>
              <FastImage
                style={{width: '100%', height: '100%', index: 2000}}
                source={{
                  uri: finalImage?.uri,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        )}
      </View>
    );
  }

  if (screenView === 'cameraUpload') {
    if (!device) {
      return (
        <View flex centerVH style={{backgroundColor: 'white'}}>
          <Text>No Camera Found</Text>
        </View>
      );
    }
    return (
      <View style={UploadPictureStyles.cameraWrapper}>
        <View flex>
          <Camera
            ref={cameraRef}
            style={[{flex: 1, zIndex: 1}, cameraStyles]}
            device={device}
            isActive={cameraActive}
            photo={true}
            autoFocus="on"
            frameColor="white"
            zoom={1.5}
            enableZoomGesture={false}
            enableShutterSound={true}
          />
        </View>
        <View row style={UploadPictureStyles.btWrapper}>
          <View flex mh20 row>
            <View mh5>
              <Text kqColor="white" size="small" font="open-7">
                Flash:
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleFlash}>
                <Text kqColor={flashColor} size="small" font="open-7">
                  {capFirst(flashOption)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View flex rightAlign mh15>
            <TouchableOpacity onPress={() => handleOnPress('cancelPhoto')}>
              <Icons.XCircleOutline size={25} color={useColors('white')} />
            </TouchableOpacity>
          </View>
        </View>
        <View row style={UploadPictureStyles.bbWrapper}>
          <View flex />
          <View centerVH>
            <TouchableOpacity
              onPress={() => handleOnPress('takePhoto')}
              style={UploadPictureStyles.cameraButton(buttonWidth)}>
              <View flex style={UploadPictureStyles.redDot} />
            </TouchableOpacity>
          </View>
          <View flex />
        </View>
      </View>
    );
  }

  if (screenView === 'crop' && tempImage) {
    return (
      <View flex centerVH>
        <Text centered italic size="xSmall">
          Loading Crop Screen, Please Wait
        </Text>
      </View>
    );
  }

  if (screenView === 'final' && finalImage) {
    return (
      <View flex>
        <View style={UploadPictureStyles.previewWrapper}>
          <FastImage
            style={{width: '100%', height: '100%', index: 2000}}
            source={{
              uri: finalImage?.uri,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View mt15>
          <Button
            type="outline"
            onPress={() => {
              setScreenView('crop');
            }}>
            Reset
          </Button>
        </View>
        <View mt5>
          <Button onPress={() => handleOnPress('finalize')}>Done</Button>
        </View>
      </View>
    );
  }
};

export default UploadPicture;
