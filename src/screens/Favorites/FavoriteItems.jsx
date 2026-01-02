//* FavoriteItems.jsx
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Dropdown, Input, Layout} from '../../KQ-UI';
import {useFavorites} from '../../hooks/useHooks';
import {displayMeasurements} from '../../utilities/measurements';
import {displayCategories} from '../../utilities/categories';
import {displayDropField} from '../../utilities/helpers';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../../utilities/coreInfo';

const FavoriteItems = () => {
  const route = useRoute();
  const {itemId} = route.params || {};

  const dispatch = useDispatch();
  const core = useCoreInfo();
  const navigation = useNavigation();
  const favorites = useFavorites();

  const itemToUpdate =
    favorites?.items?.find(item => item.itemId === itemId) ?? null;

  const [itemName, setItemName] = useState(itemToUpdate?.itemName ?? null);
  const [brandName, setBrandName] = useState(itemToUpdate?.brandName ?? '');
  const [description, setDescription] = useState(
    itemToUpdate?.description ?? '',
  );
  const [packageSize, setPackageSize] = useState(
    String(itemToUpdate?.packageSize ?? '1'),
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
    // Allow typing decimals freely
    const safeValue = value.replace(/[^0-9.]/g, '');

    // Prevent more than one "."
    const parts = safeValue.split('.');
    if (parts.length > 2) return;

    setPackageSize(safeValue);
  };

  const resetForm = () => {
    setItemName(null);
    setBrandName('');
    setDescription('');
    setPackageSize('1');
    setMeasurement(null);
    setCategory(null);
    setNotes('');
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
        measurement: measurement?.key?.trim() || 'each',
        category: category?.key?.trim() || 'other',
        notes: notes || '',
      };

      const updatedItem = {
        ...itemToUpdate,
        ...newItem,
      };

      if (itemToUpdate) {
        dispatch({
          type: 'UPDATE_ITEM_IN_FAVORITES',
          payload: {
            favoriteItemsID: core.favoriteItemsID,
            updatedItem,
            profileID: core.profileID,
          },
        });
      } else {
        dispatch({
          type: 'ADD_ITEM_TO_FAVORITES',
          payload: {
            favoriteItemsID: core.favoriteItemsID,
            newItem: newItem,
            profileID: core.profileID,
          },
        });
      }

      resetForm();
    }
  };

  const handleClose = () => {
    resetForm();
    navigation.goBack();
  };

  useFocusEffect(useCallback(() => () => resetForm(), []));

  return (
    <Layout
      headerTitle="Favorite Item"
      LeftButton="Close"
      RightButton={canSave ? 'Save' : null}
      LeftAction={handleClose}
      RightAction={canSave ? SaveItem : null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}
      mode="keyboard-scroll">
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
      <Input
        label="Package Size"
        value={packageSize}
        onChangeText={handlePackageChange}
        caption="Total amount in a package"
        capitalMode="sentences"
      />
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
    </Layout>
  );
};

export default FavoriteItems;
