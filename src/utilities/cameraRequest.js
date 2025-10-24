//* cameraRequest.js

import {Camera} from 'react-native-vision-camera';

export const requestCameraPermission = async () => {
  const status = await Camera.getCameraPermissionStatus(); // ✅ Add await

  if (status === 'authorized') return true;

  const newStatus = await Camera.requestCameraPermission();

  return newStatus === 'authorized' || newStatus === 'granted';
};
