//* ShoppingItems.jsx

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Camera,
  Dropdown,
  Input,
  Layout,
  Modal,
  ScrollView,
  Text,
  View,
} from '../../KQ-UI';
import {
  useDeviceInfo,
  useShoppingCart,
  useUPCData,
  useUPCDataError,
} from '../../hooks/useHooks';
import {displayMeasurements} from '../../utilities/measurements';
import {displayCategories} from '../../utilities/categories';
import {
  displayDropField,
  setNumericValue,
  titleCase,
} from '../../utilities/helpers';
import {Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';
import useBarcodeScanner from '../../hooks/useBarcodeScanner';
import {ListStyles} from '../../styles/Styles';
import Toast from 'react-native-toast-message';
import {transformNutritionFacts} from '../../utilities/transformNutritionFacts';
import {useColors} from '../../KQ-UI/KQUtilities';
import {dailyCheckLimit} from '../../utilities/checkLimit';
import FatSecretAttribution from '../../components/FatSecretBadge';
import NutritionalLabel from '../../components/NutritionalLabel';

const ShoppingItems = () => {
  const route = useRoute();
  const {itemId, statusTo} = route.params || {};

  const dispatch = useDispatch();
  const core = useCoreInfo();
  const navigation = useNavigation();
  const shopping = useShoppingCart();
  const device = useDeviceInfo();
  const isTablet = device?.system?.device === 'Tablet';
  const sideWays = device?.view === 'Landscape';
  const upcData = useUPCData();
  const upcError = useUPCDataError();
  const [showAttModal, setShowAttModal] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [showAsContainer, setShowAsContainer] = useState(false);

  const count = core?.dailyUPCCounter || 0;
  const limit = core?.maxUPCSearchLimit || 0;

  const {
    showScanner,
    setShowScanner,
    torchEnabled,
    toggleTorch,
    scannedData,
    onReadCode,
    resetScanner,
  } = useBarcodeScanner(core);

  const itemToUpdate =
    shopping?.items?.find(item => item.itemId === itemId) ?? null;

  const [itemName, setItemName] = useState(itemToUpdate?.itemName ?? null);
  const [brandName, setBrandName] = useState(itemToUpdate?.brandName ?? '');
  const [description, setDescription] = useState(
    itemToUpdate?.description ?? '',
  );
  const [packageSize, setPackageSize] = useState(
    String(itemToUpdate?.packageSize ?? '1'),
  );
  const [quantity, setQuantity] = useState(
    String(itemToUpdate?.quantity ?? '1'),
  );
  const [measurement, setMeasurement] = useState(
    displayDropField(itemToUpdate?.measurement, displayMeasurements) ?? null,
  );
  const [category, setCategory] = useState(
    displayDropField(itemToUpdate?.category, displayCategories) ?? null,
  );
  const [notes, setNotes] = useState(itemToUpdate?.notes ?? '');
  const [validation, setValidation] = useState(false);
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (upcData) {
      if (!upcData) {
        setStoredData(null);
      } else {
        setStoredData(upcData);
      }
    }
  }, [upcData]);

  useEffect(() => {
    if (upcError !== null) {
      Toast.show({
        type: 'warning',
        text1: 'UPC Not Found in Database.',
        text2: `Please enter the item manually.`,
      });
      dispatch({type: 'RESET_FOOD_DATA'});
    }
  }, [upcError]);

  useEffect(() => {
    if (scannedData) {
      dispatch({
        type: 'FETCH_UPC_DATA',
        payload: {
          barcode: scannedData?.value,
          allowance: core?.dailyUPCCounter,
          profileID: core?.profileID,
          accountID: core?.accountID,
        },
      });
      resetScanner();
    }
  }, [scannedData]);

  useEffect(() => {
    if (storedData) {
      let foodObject = transformNutritionFacts(storedData) || {};
      setItemName(titleCase(foodObject?.itemName));
      setBrandName(titleCase(foodObject?.brandName));
      setDescription('');
      setPackageSize(foodObject?.packageSize || '1');
      setQuantity('1');
      setMeasurement(
        displayMeasurements.find(m => m.key === foodObject?.measurement) ||
          null,
      );
      setCategory(null);
      setNotes('');
      const timer = setTimeout(() => {
        setShowAttModal(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [storedData]);

  useEffect(() => {
    if (itemName === null) {
      setValidation(false);
      setCanSave(false);
    } else if (itemName === '') {
      setValidation(true);
      setCanSave(false);
    } else {
      setValidation(false);
      setCanSave(true);
    }
  }, [itemName]);

  const handlePackageChange = value => {
    const safeValue = value.replace(/[^0-9.]/g, '');

    const parts = safeValue.split('.');
    if (parts.length > 2) return;

    setPackageSize(safeValue);
  };

  const resetForm = () => {
    setItemName(null);
    setBrandName('');
    setDescription('');
    setPackageSize('1');
    setQuantity('1');
    setMeasurement(null);
    setCategory(null);
    setNotes('');
    setShowAttModal(false);
  };

  const SaveItem = () => {
    if (itemName === '' || itemName === null) {
      setValidation(true);
    } else {
      setValidation(false);

      const newItem = {
        itemName: itemName || '',
        brandName: brandName || '',
        description: description || '',
        packageSize: Number(packageSize) > 0 ? Number(packageSize) : 1,
        quantity: Number(quantity) > 0 ? Number(quantity) : 1,
        measurement: measurement?.key?.trim() || 'each',
        category: category?.key?.trim() || 'na',
        notes: notes || '',
        status: itemToUpdate?.status ?? statusTo ?? 'shopping-list',
      };

      const updatedItem = {
        ...itemToUpdate,
        ...newItem,
      };

      if (itemToUpdate) {
        dispatch({
          type: 'UPDATE_ITEM_IN_SHOP_CART',
          payload: {
            shoppingCartID: core.shoppingCartID,
            updatedItem,
            updateType:
              itemToUpdate.status === 'shopping-cart'
                ? 'updateCart'
                : 'updateList',
            profileID: core.profileID,
          },
        });
      } else {
        dispatch({
          type: 'ADD_ITEM_TO_SHOP_CART',
          payload: {
            shoppingCartID: core.shoppingCartID,
            newItem: newItem,
            profileID: core.profileID,
          },
        });
      }

      resetForm();
    }
  };

  const handleClose = () => {
    dispatch({type: 'RESET_UPC_DATA'});
    resetForm();
    setStoredData(null);
    navigation.goBack();
  };

  const handleClear = () => {
    dispatch({type: 'RESET_UPC_DATA'});
    resetForm();
    setStoredData(null);
  };

  useFocusEffect(useCallback(() => () => resetForm(), []));

  const ScanAction = () => {
    if (count < limit) {
      if (showScanner) {
        toggleTorch();
      } else {
        setShowScanner(true);
      }
    } else {
      dailyCheckLimit({
        current: count,
        max: limit,
        label: 'UPC',
      });
    }
  };

  const CloseScanner = () => {
    setShowScanner(false);
  };

  const RenderModalContent = () => {
    if (storedData) {
      let foodObject = transformNutritionFacts(storedData) || {};

      return (
        <View style={ListStyles.rmcContainer}>
          <View
            style={{borderBottomWidth: 0.5, borderColor: useColors('dark90')}}>
            <View m10>
              {foodObject.images?.length > 0 ? (
                <Image
                  source={{uri: `${foodObject.images[0]}`}}
                  style={{
                    resizeMode: 'contain',
                    height: isTablet ? 400 : 250,
                  }}
                />
              ) : (
                <View
                  style={{
                    resizeMode: 'contain',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>No Image Available</Text>
                </View>
              )}
            </View>
          </View>

          <ScrollView style={ListStyles.rmcScroll}>
            <NutritionalLabel data={foodObject} />
          </ScrollView>
          <View style={ListStyles.rmcButtonWrapper}>
            <View style={ListStyles.rmcButtonContainer}>
              <Button
                color="danger"
                type="outline"
                size="small"
                onPress={handleClear}>
                Clear
              </Button>
            </View>
            <View style={ListStyles.rmcButtonContainer}>
              <Button
                size="small"
                status="success"
                onPress={() => setShowAttModal(false)}>
                Confirm
              </Button>
            </View>
          </View>
          <View centerVH style={isTablet ? {margin: 15} : {margin: 10}}>
            <FatSecretAttribution
              width="85%"
              height={isTablet ? 25 : 20}
              color={useColors('fatsecret')}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <Layout
      headerTitle="Shopping Item"
      LeftButton={showScanner ? 'Cancel-Scan' : 'Close'}
      RightButton={
        canSave
          ? 'Save'
          : showScanner
          ? torchEnabled
            ? 'Torch-On'
            : 'Torch-Off'
          : 'Scan'
      }
      LeftAction={showScanner ? CloseScanner : handleClose}
      RightAction={canSave ? SaveItem : ScanAction}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}
      mode={showScanner ? 'keyboard-static' : 'keyboard-scroll'}>
      {showScanner ? (
        <Camera
          torchEnabled={torchEnabled}
          onReadCode={onReadCode}
          onManualEntry={manualUPC => {
            onReadCode([{type: 'manual', value: manualUPC}]);
          }}
          height={device?.dimensions?.height}
        />
      ) : (
        <>
          <Input
            required
            label="Item Name"
            value={itemName}
            onChangeText={setItemName}
            validation={validation}
            validationMessage="Item Name is required"
            capitalize
            capitalMode="words"
          />
          <Input
            label="Brand Name"
            value={brandName}
            onChangeText={setBrandName}
            capitalize
            capitalMode="words"
          />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            capitalize
            capitalMode="sentences"
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Input
                label="Quantity"
                value={quantity}
                onChangeText={setNumericValue(setQuantity)}
                caption="Number of Packages"
                // capitalMode="sentences"
              />
            </View>
            <View style={{flex: 1}}>
              <Input
                label="Package Size"
                value={packageSize}
                onChangeText={handlePackageChange}
                caption="Total in a package"
                capitalMode="sentences"
              />
            </View>
          </View>
          <Dropdown
            label="Measurement"
            // customLabel="Custom Measurement"
            placeholder="Select a measurement"
            value={measurement}
            setValue={setMeasurement}
            caption={'Single is for individual items. Ex: Eggs'}
            mapData={displayMeasurements}
          />
          <Dropdown
            label="Category"
            customLabel="Custom Category"
            placeholder="Select a category"
            value={category}
            setValue={setCategory}
            mapData={displayCategories}
          />
          <Input
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            multiHeight="large"
            caption="Add notes here"
            counter
            maxCount={250}
          />
        </>
      )}
      <Modal
        title={`${brandName ? brandName + ' ' : ''}${itemName || 'Item'}`}
        visible={showAttModal}
        headerFont="open-6"
        headerSize="small"
        height="99.5%"
        width="96%"
        headerColor="orange"
        hideClose
        onClose={handleClose}>
        <RenderModalContent />
      </Modal>
    </Layout>
  );
};

export default ShoppingItems;
