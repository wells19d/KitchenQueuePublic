//* KQImage.jsx

import React from 'react';
import FastImage from 'react-native-fast-image';

const KQImage = ({image, ...props}) => {
  const isFullUrl = image?.startsWith('http');

  const uri = isFullUrl
    ? image
    : `https://firebasestorage.googleapis.com/v0/b/kitchen-queue-fe2fe.firebasestorage.app/o/recipes%2F${encodeURIComponent(
        image,
      )}?alt=media`;

  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.normal,
        cache: FastImage.cacheControl.web,
      }}
      resizeMode={FastImage.resizeMode.cover}
      {...props}
    />
  );
};

export default __DEV__ ? KQImage : React.memo(KQImage);
