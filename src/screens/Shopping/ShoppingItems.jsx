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
} from '../../KQ-UI';
import {
  useDeviceInfo,
  useFoodData,
  useFoodDataError,
  useShoppingCart,
} from '../../hooks/useHooks';
import {displayMeasurements} from '../../utilities/measurements';
import {displayCategories} from '../../utilities/categories';
import {
  displayDropField,
  setNumericValue,
  titleCase,
} from '../../utilities/helpers';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';
import useBarcodeScanner from '../../hooks/useBarcodeScanner';
import {ListStyles} from '../../styles/Styles';
import EdamamAttribution from '../../components/EdamanBadge';
import Toast from 'react-native-toast-message';
import {transformNutritionFacts} from '../../utilities/transformNutritionFacts';
import {formatPluralUnit} from '../../utilities/formatPluralUnit';
import {useColors} from '../../KQ-UI/KQUtilities';
import {dailyCheckLimit} from '../../utilities/checkLimit';

const ShoppingItems = () => {
  const route = useRoute();
  const {itemId, statusTo} = route.params || {};

  const dispatch = useDispatch();
  const core = useCoreInfo();
  const navigation = useNavigation();
  const shopping = useShoppingCart();
  const device = useDeviceInfo();
  const foodData = useFoodData();
  const foodError = useFoodDataError();
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
    if (foodData) {
      if (!foodData?.hints || foodData?.hints.length === 0) {
        setStoredData(null);
      } else {
        setStoredData(foodData?.hints[0]);
      }
    }
  }, [foodData]);

  useEffect(() => {
    if (foodError !== null) {
      Toast.show({
        type: 'warning',
        text1: 'UPC Not Found in Database.',
        text2: `Please enter the item manually.`,
      });
      dispatch({type: 'RESET_FOOD_DATA'});
    }
  }, [foodError]);

  useEffect(() => {
    if (scannedData) {
      dispatch({
        type: 'FETCH_FOOD_DATA',
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
      setItemName(titleCase(storedData?.food?.label));
      setBrandName(titleCase(storedData?.food?.brand));
      setDescription('');
      setPackageSize('1');
      setQuantity('1');
      setMeasurement(null);
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
    dispatch({type: 'RESET_FOOD_DATA'});
    resetForm();
    setStoredData(null);
    navigation.goBack();
  };

  const handleClear = () => {
    dispatch({type: 'RESET_FOOD_DATA'});
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
      let foodObject = transformNutritionFacts(storedData?.food) || {};

      return (
        <View style={ListStyles.rmcContainer}>
          <View
            style={{borderBottomWidth: 1, borderColor: useColors('dark10')}}>
            {foodObject.image ? (
              <Image
                source={{uri: `${foodObject.image}`}}
                style={{
                  width: '100%',
                  height: 250,
                }}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No Image Available</Text>
              </View>
            )}
          </View>
          <ScrollView style={ListStyles.rmcScroll}>
            <View style={ListStyles.rmcScrollShellTop} />
            <View style={[ListStyles.rmcScrollWrapper]}>
              <TouchableOpacity
                style={{
                  marginTop: 2,
                  marginBottom: 10,
                  marginHorizontal: 15,
                }}
                onPress={() => setShowAsContainer(!showAsContainer)}>
                <Text
                  size="tiny"
                  font="open-5"
                  kqColor="rgb(56, 71, 234)"
                  centered>
                  {showAsContainer ? 'Show Per Serving' : 'Show Per Container'}
                </Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <View style={ListStyles.rmcNutrientLabel}>
                  <Text size="xSmall" numberOfLines={1}>
                    Container Size:
                  </Text>
                </View>
                <View style={ListStyles.rmcNutrientValue}>
                  <Text size="xSmall">
                    {foodObject?.packageSize?.quantity}{' '}
                    {formatPluralUnit(
                      foodObject?.packageSize?.quantity,
                      foodObject?.packageSize?.unit,
                    )}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={ListStyles.rmcNutrientLabel}>
                  <Text size="xSmall" numberOfLines={1}>
                    Serving Size:
                  </Text>
                </View>
                <View style={ListStyles.rmcNutrientValue}>
                  <Text size="xSmall">
                    {foodObject?.servingSizes[0]?.quantity}{' '}
                    {formatPluralUnit(
                      foodObject?.servingSizes[0]?.quantity,
                      foodObject?.servingSizes[0]?.label,
                    )}
                  </Text>
                </View>
              </View>

              {showAsContainer
                ? Object.entries(foodObject.nutrients?.perContainer).map(
                    ([key, value]) => (
                      <View key={key} style={{flexDirection: 'row'}}>
                        <View style={ListStyles.rmcNutrientLabel}>
                          <Text size="xSmall" numberOfLines={1}>
                            {value.label}:
                          </Text>
                        </View>
                        <View style={ListStyles.rmcNutrientValue}>
                          <Text size="xSmall">
                            {Math.round(value.value * 100) / 100}
                            {value.unit ? ` ${value.unit}` : null}
                          </Text>
                        </View>
                      </View>
                    ),
                  )
                : Object.entries(foodObject.nutrients?.perServing).map(
                    ([key, value]) => (
                      <View key={key} style={{flexDirection: 'row'}}>
                        <View style={ListStyles.rmcNutrientLabel}>
                          <Text size="xSmall" numberOfLines={1}>
                            {value.label}:
                          </Text>
                        </View>
                        <View style={ListStyles.rmcNutrientValue}>
                          <Text size="xSmall">
                            {Math.round(value.value * 100) / 100}
                            {value.unit ? ` ${value.unit}` : null}
                          </Text>
                        </View>
                      </View>
                    ),
                  )}
            </View>
            <View style={ListStyles.rmcDisclaimer}>
              <Text size="tiny" italic justified>
                The nutritional information displayed is based on data provided
                by Edamam and is intended for reference purposes only. This
                information may not reflect the exact values on the current
                product label, as manufacturers may have updated or changed the
                product's formulation or packaging since the data was recorded.
                For the most accurate and up-to-date information, please refer
                to the actual product label.
              </Text>
            </View>
            <View style={ListStyles.rmcContents}>
              <Text size="xSmall">
                Contains: {titleCase(foodObject.foodContentsLabel)}
              </Text>
            </View>
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
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <EdamamAttribution
              width={device?.dimensions.width - 50}
              height={device?.dimensions.width / 10}
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
        title={storedData?.food?.label}
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
