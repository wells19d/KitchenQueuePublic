// cropPhoto.js
import React, {useRef, useState} from 'react';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import {imageScale} from '../../../utilities/imageScale';

export const useCropPhoto = () => {
  const [croppedData, setCroppedData] = useState(null);
  const [cropError, setCropError] = useState(null);
  const [cropView, setCropView] = useState(false);

  //   const pictureName = photoName || 'KQ_CROPPED';

  const cropPhoto = async (photoData, pictureName) => {
    setCropView(true);
    try {
      if (!photoData?.uri) {
        setCropError({
          type: 'error',
          text1: 'Crop failed',
          text2: 'No photo data available',
        });
      }

      const cropperPath =
        Platform.OS === 'android'
          ? photoData?.uri
          : photoData?.uri.replace('file://', '');

      const exists = await RNFS.exists(
        Platform.OS === 'android'
          ? cropperPath.replace('file://', '')
          : cropperPath,
      );

      if (!exists) {
        setCropError({
          type: 'error',
          text1: 'Crop failed',
          text2: 'Image path not found',
        });
        return;
      }
      const {
        width: targetW,
        height: targetH,
        quality: QUALITY,
      } = imageScale(photoData?.size);

      const image = await ImagePicker.openCropper({
        path: cropperPath,
        width: targetW,
        height: targetH,
        cropping: true,
        includeExif: false,
        mediaType: 'photo',
        forceJpg: true,
        compressImageQuality: QUALITY,
        cropperToolbarTitle: 'Crop Image',
        enableRotationGesture: true,
      });

      const croppedSrc = image.path.replace('file://', '');
      const dest =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/KQ_CROP_${Date.now()}.jpg`
          : `${
              RNFS.PicturesDirectoryPath
            }/KitchenQueue/KQ_CROP_${Date.now()}.jpg`;

      await RNFS.copyFile(croppedSrc, dest);
      if (Platform.OS === 'android') {
        try {
          await RNFS.scanFile(dest);
        } catch {}
      }
      try {
        await RNFS.unlink(croppedSrc);
      } catch {}
      try {
        const stat = await RNFS.stat(dest);
        const sizeKB = (Number(stat.size) / 1024).toFixed(2);

        setCroppedData({
          uri: `file://${dest}`,
          name: `${pictureName}.jpg`,
          width: image.width,
          height: image.height,
          size: `${sizeKB} KB`,
          imageDate: new Date().toISOString(),
          type: 'image/jpeg',
        });
      } catch {
        setCroppedData({
          uri: `file://${dest}`,
          name: `${pictureName}.jpg`,
          width: image.width,
          height: image.height,
          size: null,
          imageDate: new Date().toISOString(),
          type: 'image/jpeg',
        });
      }
    } catch (error) {
      const msg = error?.message || String(err);
      setCroppedData(null);

      //   ImagePicker.clean();
      // console.log('Crop error:', msg);
      if (msg === 'User cancelled image selection') {
        setCropError({
          type: 'info',
          text1: 'Crop Crop Cancelled',
          text2: 'Your image was not saved.',
        });
      } else {
        setCropError({
          type: 'error',
          text1: 'Crop failed',
          text2: `Error: ${msg}`,
        });
      }

      ImagePicker.clean();
    } finally {
      setCropView(false);
    }
  };

  return {
    croppedData,
    setCroppedData,
    cropError,
    setCropError,
    cropPhoto,
    cropView,
  };
};
