import storage from '@react-native-firebase/storage';

export const checkImage = async path => {
  console.log('📦 checkImage got path:', path);
  try {
    const ref = storage().ref(path);
    // console.log('📦 got ref, fetching download URL...');
    const url = await ref.getDownloadURL();
    // console.log('📦 success, URL:', url);
    return url;
  } catch (error) {
    // console.log('📦 checkImage error:', error);
    if (error.code === 'storage/object-not-found') {
      return null;
    }
    throw error;
  }
};

export const deletePicture = async fileName => {
  if (!fileName) {
    console.error('❌ No filename provided to deletePicture');
    return;
  }

  try {
    const ref = storage().ref(`recipes/${fileName}`);

    // Try to get metadata first (confirms it exists)
    await ref.getMetadata();
    // console.log(`📂 Found image: ${fileName}`);

    // Delete the file
    await ref.delete();
    // console.log(`🗑️ Successfully deleted image: ${fileName}`);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      // console.error(`❌ File not found in storage: ${fileName}`);
    } else {
      // console.error(`❌ Failed to delete image ${fileName}:`, error);
    }
  }
};
