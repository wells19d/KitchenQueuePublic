// takePhoto.js
import React, {useRef, useState} from 'react';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const useTakePhoto = () => {
  const cameraRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [flashOption, setFlashOption] = useState('auto');

  const generateMediaStorePath = async () => {
    const dir = `${RNFS.PicturesDirectoryPath}/KitchenQueue`;
    const filename = `KQ_${Date.now()}.jpg`;
    const fullPath = `${dir}/${filename}`;

    const exists = await RNFS.exists(dir);
    if (!exists) await RNFS.mkdir(dir);

    return fullPath;
  };

  const takePhoto = async () => {
    if (!cameraRef?.current?.takePhoto) return;

    try {
      const photo = await cameraRef.current.takePhoto({flash: flashOption});

      const src = photo.path.startsWith('file://')
        ? photo.path.replace('file://', '')
        : photo.path;

      const dest =
        Platform.OS === 'ios'
          ? `${RNFS.DocumentDirectoryPath}/KQ_${Date.now()}.jpg`
          : await generateMediaStorePath();

      await RNFS.copyFile(src, dest);

      if (Platform.OS === 'android') {
        try {
          await RNFS.scanFile(dest);
        } catch {}
      }

      const stat = await RNFS.stat(dest);
      const sizeKB = (Number(stat.size) / 1024).toFixed(2);

      setPhotoData({
        uri: `file://${dest}`,
        width: photo.width,
        height: photo.height,
        size: sizeKB,
      });
      setPhotoError(null);
    } catch (error) {
      const msg = error?.message || String(err);
      setPhotoData(null);
      setPhotoError({
        type: 'warning',
        text1: 'Error taking photo.',
        text2: `Error: ${msg}`,
      });
    }
  };

  return {
    cameraRef,
    takePhoto,
    photoData,
    setPhotoData,
    photoError,
    setPhotoError,
    flashOption,
    setFlashOption,
  };
};
