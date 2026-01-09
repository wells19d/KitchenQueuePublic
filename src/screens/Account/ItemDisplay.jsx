// * ItemDisplay.jsx
import React, {useState, useEffect, useMemo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Button, Layout, ScrollView, Text} from '../../KQ-UI';
import {useDispatch} from 'react-redux';
import {useProfile, useShoppingCart} from '../../hooks/useHooks';
import {
  displayMeasurements,
  formatMeasurement,
} from '../../utilities/measurements';
import pluralize from 'pluralize';
import {Icons} from '../../components/IconListRouter';

const defaultFlashCellOrder = [
  {index: 0, key: 'brandName', label: 'Brand Name'},
  {index: 1, key: 'description', label: 'Description'},
  {index: 2, key: 'itemName', label: 'Item Name'},
];

const areArraysEqual = (a, b) =>
  a.length === b.length && a.every((item, i) => item.key === b[i].key);

const ItemDisplay = () => {
  const dispatch = useDispatch();
  const profile = useProfile();
  const shopping = useShoppingCart();

  const userSettings =
    profile?.userSettings?.flashCellOrder || defaultFlashCellOrder;

  const [initialFlashCellOrder] = useState([...userSettings]);
  const [flashCellOrder, setFlashCellOrder] = useState([...userSettings]);
  const [canSave, setCanSave] = useState(false);

  const demoItem = useMemo(() => {
    const item =
      shopping?.items?.find(item => item.status === 'shopping-list') || {};
    return {
      brandName: item.brandName || 'Local Brand',
      description: item.description || '2% Reduced Fat',
      itemName: item.itemName || 'Milk',
      packageSize: item.packageSize || '52',
      measurement: item.measurement || 'fluidounce',
      quantity: item.quantity || '1',
    };
  }, [shopping]);

  const renderPreviewText = useMemo(() => {
    return flashCellOrder
      .map(field => demoItem[field.key])
      .filter(Boolean)
      .join(' ');
  }, [flashCellOrder, demoItem]);

  const formatMeasurementWithPlural = (packageSize, measurement, itemName) => {
    if (!packageSize || !measurement) return '';

    if (packageSize === 1 && measurement === 'each') return '';
    if (measurement === 'each') return `${packageSize} ${pluralize(itemName)}`;

    const match = displayMeasurements.find(m => m.key === measurement);
    const label = match?.label || formatMeasurement(measurement);

    return `${packageSize} ${packageSize > 1 ? pluralize(label) : label}`;
  };

  useEffect(() => {
    setCanSave(!areArraysEqual(flashCellOrder, initialFlashCellOrder));
  }, [flashCellOrder, initialFlashCellOrder]);

  const handleSave = () => {
    if (!canSave) return;
    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {
        userId: profile?.id,
        updatedData: {
          userSettings: {
            ...profile.userSettings,
            flashCellOrder,
          },
        },
      },
    });
  };

  const hasResettableChanges = () =>
    !areArraysEqual(flashCellOrder, defaultFlashCellOrder);

  const handleReset = () => {
    setFlashCellOrder([...defaultFlashCellOrder]);
  };

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= flashCellOrder.length) return;

    const updated = [...flashCellOrder];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFlashCellOrder(updated);
  };

  return (
    <Layout
      headerTitle="Item Display"
      LeftButton="Back"
      RightButton={canSave ? 'Save' : ''}
      LeftAction={null}
      RightAction={handleSave}
      sheetOpen={false}>
      <ScrollView style={{padding: 10}}>
        <Text centered size="small" style={{marginBottom: 5}}>
          Example Preview:
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#373d4380',
            marginHorizontal: 10,
            height: 65,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
          }}>
          <View
            style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 50,
                height: 50,
                borderWidth: 1.25,
                borderColor: '#373d4380',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 4,
                backgroundColor: '#fff',
              }}>
              <Text size="tiny">Qty</Text>
              <Text size="medium">{demoItem.quantity}</Text>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
            <Text numberOfLines={1} size="small" font="open-7">
              {renderPreviewText}
            </Text>
            <Text size="xSmall" numberOfLines={1}>
              {formatMeasurementWithPlural(
                demoItem.packageSize,
                demoItem.measurement,
                demoItem.itemName,
              )}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          {flashCellOrder.map((field, index) => (
            <View
              key={field.key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomWidth: index !== flashCellOrder.length - 1 ? 1 : 0,
                borderColor: '#e0e0e0',
              }}>
              <Text style={{width: 25}} size="small" centered>
                {index + 1}.
              </Text>
              <Text style={{flex: 1}} size="small">
                {field.label}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  disabled={index === 0}
                  onPress={() => handleMove(index, -1)}
                  style={{
                    paddingHorizontal: 5,
                    opacity: index === 0 ? 0.4 : 1,
                  }}>
                  <Icons.ChevronUp size={18} color="#29856c" />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={index === flashCellOrder.length - 1}
                  onPress={() => handleMove(index, 1)}
                  style={{
                    paddingHorizontal: 5,
                    opacity: index === flashCellOrder.length - 1 ? 0.4 : 1,
                  }}>
                  <Icons.ChevronDown size={18} color="#29856c" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <Button
          type="outline"
          size="small"
          color="primary"
          disabled={!hasResettableChanges()}
          onPress={handleReset}>
          Reset
        </Button>
      </ScrollView>
    </Layout>
  );
};

export default ItemDisplay;
