//* CupboardItems.jsx

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  useCupboard,
  useDeviceInfo,
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
import {exportData} from '../../utilities/conversions';

const CupboardItems = () => {
  const route = useRoute();
  const {itemId, updatingItem, scanAction} = route.params || {};

  const dispatch = useDispatch();
  const core = useCoreInfo();
  const navigation = useNavigation();
  const cupboard = useCupboard();
  const device = useDeviceInfo();
  const isTablet = device?.system?.device === 'Tablet';
  const sideWays = device?.view === 'Landscape';
  const upcData = useUPCData();
  const upcError = useUPCDataError();
  const [showAttModal, setShowAttModal] = useState(false);
  const [storedData, setStoredData] = useState(null);
  const [showAsContainer, setShowAsContainer] = useState(false);
  const [scanActionActive, setScanActionActive] = useState(scanAction);

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

  useEffect(() => {
    if (scanActionActive && upcData === null) {
      setShowScanner(true);
      setScanActionActive(false); // <-- consume the flag
    }

    if (upcData) {
      setShowScanner(false);
      setScanActionActive(false);
    }
  }, [scanActionActive, upcData]);

  const foodObject = useMemo(() => {
    if (!storedData) return null;
    return transformNutritionFacts(storedData);
  }, [storedData]);

  const itemToUpdate =
    cupboard?.items?.find(item => item.itemId === itemId) ?? null;

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
  const [remainingAmount, setRemainingAmount] = useState(
    String(itemToUpdate?.remainingAmount ?? '1'),
  );
  const [measurement, setMeasurement] = useState(
    displayDropField(itemToUpdate?.measurement, displayMeasurements) ?? null,
  );
  const [category, setCategory] = useState(
    displayDropField(itemToUpdate?.category, displayCategories) ?? null,
  );
  const [notes, setNotes] = useState(itemToUpdate?.notes ?? '');

  const [validation, setValidation] = useState(false);
  const [remainValidation, setRemainValidation] = useState(false);
  const [canSave, setCanSave] = useState(false);

  // Watch for UPC data updates
  useEffect(() => {
    if (upcData) {
      if (!upcData) {
        setStoredData(null);
      } else {
        setStoredData(upcData);
      }
    }
  }, [upcData]);

  // Handle UPC fetch errors
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
      // Dispatch the UPC lookup
      dispatch({
        type: 'FETCH_UPC_DATA',
        payload: {
          barcode: scannedData?.value,
          allowance: core?.dailyUPCCounter,
          profileID: core?.profileID,
          accountID: core?.accountID,
        },
      });

      setShowScanner(false);
      resetScanner();
    }
  }, [scannedData]);

  useEffect(() => {
    if (foodObject) {
      setItemName(titleCase(foodObject?.itemName));
      setBrandName(titleCase(foodObject?.brandName));
      setDescription('');
      const pkg = foodObject?.packageSize || '1';
      setPackageSize(pkg);
      setRemainingAmount(pkg);
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
  }, [foodObject]);

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

  useEffect(() => {
    if (!itemToUpdate?.remainingAmount) {
      setRemainingAmount(packageSize);
    }
  }, [packageSize, itemToUpdate?.remainingAmount]);

  const handleRemainingAmountChange = value => {
    const safeValue = value.replace(/[^0-9.]/g, '');

    const parts = safeValue.split('.');
    if (parts.length > 2) return;

    const numericValue = parseFloat(safeValue);

    if (numericValue > parseFloat(packageSize)) {
      setRemainValidation(true);
    } else {
      setRemainValidation(false);
    }

    setRemainingAmount(safeValue);
  };

  const handlePackageChange = value => {
    // Allow typing decimals freely
    const safeValue = value.replace(/[^0-9.]/g, '');

    // Prevent more than one "."
    const parts = safeValue.split('.');
    if (parts.length > 2) return;

    setPackageSize(safeValue);
    setRemainingAmount(safeValue); // default remaining = full package
  };

  const resetForm = () => {
    setItemName(null);
    setBrandName('');
    setDescription('');
    setPackageSize('1');
    setRemainingAmount('1');
    setMeasurement(null);
    setCategory(null);
    setNotes('');
    setQuantity('1');
  };

  const convertedItem = useMemo(() => {
    return exportData(
      measurement?.key,
      Number(packageSize),
      Number(remainingAmount),
    );
  }, [measurement, packageSize, remainingAmount]);

  const SaveItem = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (
      itemName === '' ||
      itemName === null ||
      (!itemToUpdate && (!parsedQuantity || parsedQuantity < 1))
    ) {
      setValidation(true);
      return;
    } else {
      setValidation(false);
    }

    const newItem = {
      itemName: itemName || '',
      brandName: brandName || '',
      description: description || '',

      packageSize: convertedItem
        ? convertedItem.packageSize
        : Number(packageSize) || 1,

      remainingAmount: convertedItem
        ? convertedItem.remainingAmount
        : Number(remainingAmount) || 1,

      measurement: convertedItem
        ? convertedItem.measurement
        : measurement?.key?.trim() || 'each',

      category: category?.key?.trim() || 'other',
      notes: notes || '',

      // Metadata from UPC scan
      ean: foodObject?.ean || null,
      upc: foodObject?.upc || null,
      foodID: foodObject?.foodID || null,
      foodURL: foodObject?.foodURL || null,
      images: foodObject?.images || [],
    };

    const updatedItem = {
      ...itemToUpdate,
      ...newItem,
    };

    if (itemToUpdate) {
      dispatch({
        type: 'UPDATE_ITEM_IN_CUPBOARD',
        payload: {
          cupboardID: core.cupboardID,
          updatedItem,
          profileID: core.profileID,
        },
      });
    } else {
      if (parsedQuantity === 1) {
        dispatch({
          type: 'ADD_ITEM_TO_CUPBOARD',
          payload: {
            cupboardID: core.cupboardID,
            newItem,
            profileID: core.profileID,
          },
        });
      } else {
        dispatch({
          type: 'BATCH_ADD_TO_CUPBOARD',
          payload: {
            cupboardID: core.cupboardID,
            newItem,
            quantity: parsedQuantity,
            profileID: core.profileID,
          },
        });
      }
    }

    resetForm();
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

  const displayRemaining = (packageSize, remainingAmount) => {
    let percent = (remainingAmount / packageSize) * 100;
    return `${percent.toFixed(0)}% left`;
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
    if (foodObject) {
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
      headerTitle="Cupboard Item"
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
          onManualEntry={manualUPC =>
            onReadCode([{type: 'manual', value: manualUPC}])
          }
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
            {!updatingItem && (
              <View style={{flex: 1.25}}>
                <Input
                  label="Qty"
                  value={quantity}
                  onChangeText={setNumericValue(setQuantity)}
                  caption="# of Pkgs"
                  // capitalMode="sentences"
                />
              </View>
            )}
            <View style={{flex: 1.75}}>
              <Input
                label="Package Size"
                value={packageSize}
                onChangeText={handlePackageChange}
                caption="Total in Pkg"
                capitalMode="sentences"
              />
            </View>
            <View style={{flex: 1.75}}>
              <Input
                label="Remaining"
                value={remainingAmount}
                onChangeText={handleRemainingAmountChange}
                caption={displayRemaining(packageSize, remainingAmount)}
                // capitalMode="sentences"
              />
            </View>
          </View>
          <Dropdown
            label="Measurement"
            customLabel="Custom Measurement"
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

export default CupboardItems;
