// useRequestPermissions.js
import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {useCameraDevice} from 'react-native-vision-camera';

export function useRequestPermissions(renderDisplay) {
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const [permissionStatuses, setPermissionStatuses] = useState({});

  const permissionTypes = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ],
  });

  const checkPermissions = async () => {
    if (!permissionTypes) return;

    const results = {};
    for (const p of permissionTypes) {
      const status = await check(p);
      results[p] = status;
      handlePermissionStatus(p, status);
    }
    setPermissionStatuses(results);
  };

  const requestPermissions = async () => {
    if (!permissionTypes) return;

    const results = {};
    for (const p of permissionTypes) {
      const status = await request(p);
      results[p] = status;
      handlePermissionStatus(p, status);
    }
    setPermissionStatuses(results);
  };

  const handlePermissionStatus = (permission, status) => {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(`${permission} not available on this device.`);
        break;
      case RESULTS.DENIED:
        Alert.alert(
          'Permission Denied',
          `${permission} access is required. Would you like to allow it?`,
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Allow', onPress: () => request(permission)},
          ],
        );
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          `${permission} access is blocked. Please enable it manually in Settings.`,
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
        break;
      case RESULTS.GRANTED:
        // console.log(`${permission} granted`);
        break;
      default:
      // console.log(`Unknown status for ${permission}`);
    }
  };

  return {
    device,
    permissionStatuses,
    checkPermissions,
    requestPermissions,
  };
}
