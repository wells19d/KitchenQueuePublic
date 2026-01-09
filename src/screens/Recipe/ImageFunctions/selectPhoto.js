//* selectPhoto.js

import React, {useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';

export const useSelectPhoto = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedError, setSelectedError] = useState(null);

  const pickImageFromGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async image => {
        let finalPath;

        if (image.path) {
          finalPath = image.path.startsWith('file://')
            ? image.path
            : `file://${image.path}`;
        } else if (
          image.sourceURL &&
          image.sourceURL.startsWith('content://')
        ) {
          const destPath = `${RNFS.CachesDirectoryPath}/${Date.now()}.jpg`;
          await RNFS.copyFile(image.sourceURL, destPath);
          finalPath = `file://${destPath}`;
        } else {
          throw new Error('No valid file path from selected image.');
        }

        const sizeKB = (Number(image.size) / 1024).toFixed(2);

        setSelectedData({
          uri: finalPath,
          width: image?.width,
          height: image?.height,
          size: sizeKB,
          type: image?.mime,
        });
      })
      .catch(error => {
        const msg = error?.message || String(err);
        if (msg === 'User cancelled image selection') {
          setSelectedError({
            type: 'info',
            text1: 'Selection cancelled',
            text2: 'No image selected',
          });
        } else {
          setSelectedError({
            type: 'error',
            text1: 'Selection failed',
            text2: msg,
          });
        }
        ImagePicker.clean();
      });
  };
  return {selectedData, selectedError, pickImageFromGallery};
};
