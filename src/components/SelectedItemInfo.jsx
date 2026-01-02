//* SelectedItemInfo.jsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {SelectItemStyles} from '../styles/Styles';
import {categoryColors, formatCategories} from '../utilities/categories';
import {formatMeasurement} from '../utilities/measurements';
import {Button, Text, ScrollView} from '../KQ-UI';
import {Icons} from './IconListRouter';
import {useDispatch} from 'react-redux';
import {useCoreInfo} from '../utilities/coreInfo';
import {useColors} from '../KQ-UI/KQUtilities';

const SelectedItemInfo = props => {
  const {
    selectedItem,
    setShowItemInfo,
    navigate,
    groupedView = false,
    cupboardView = false,
    addToList = false,
  } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const core = useCoreInfo();

  const [quantity, setQuantity] = useState(1);

  const handleAddToFavorites = () => {
    const newItem = {
      ...selectedItem,
      itemName: selectedItem?.itemName || '',
      brandName: selectedItem?.brandName || '',
      description: selectedItem?.description || '',
      packageSize: Number(selectedItem?.packageSize),
      measurement: selectedItem?.measurement || '',
      category: selectedItem?.category || '',
      notes: selectedItem?.notes || '',
    };

    dispatch({
      type: 'ADD_ITEM_TO_FAVORITES',
      payload: {
        favoriteItemsID: core.favoriteItemsID,
        newItem: newItem,
        profileID: core.profileID,
      },
    });
    setShowItemInfo(false);
  };

  const handleAddFavToShopList = item => {
    const newItem = {
      ...item,
      itemName: item?.itemName || '',
      brandName: item?.brandName || '',
      description: item?.description || '',
      packageSize:
        Number(item?.packageSize) > 0 ? Number(item?.packageSize) : 1,
      quantity: Number(quantity) > 0 ? Number(quantity) : 1,
      measurement: item?.measurement || 'each',
      category: item?.category || '',
      notes: item?.notes || '',
      status: 'shopping-list',
    };

    dispatch({
      type: 'ADD_ITEM_TO_SHOP_CART',
      payload: {
        shoppingCartID: core.shoppingCartID,
        newItem: newItem,
        profileID: core.profileID,
      },
    });
    navigation.navigate(navigate?.backTo);
    setShowItemInfo(false);
  };

  const handleAddToShopList = item => {
    const newItem = {
      itemName: item?.itemName || '',
      brandName: item?.brandName || '',
      description: item?.description || '',
      packageSize: item?.packageSize || 1,
      quantity: 1,
      measurement: item?.measurement || '',
      category: item?.category || '',
      notes: item?.notes || '',
      status: 'shopping-list',
    };

    dispatch({
      type: 'ADD_ITEM_TO_SHOP_CART',
      payload: {
        shoppingCartID: core.shoppingCartID,
        newItem: newItem,
        profileID: core.profileID,
      },
    });
    navigation.navigate(navigate?.backTo);
    setShowItemInfo(false);
  };

  const handleUpdateItem = itemId => {
    navigation.navigate(navigate?.to, {
      itemId,
      navigateBackTo: navigate?.backTo,
      statusTo: navigate?.statusTo,
      updatingItem: true,
    });
    setShowItemInfo(false);
  };

  const ItemRow = ({title, info, info2}) => {
    const asNote = title === 'Notes';
    const remain = title === 'Remaining Amount' || title === 'Total Remaining';

    if (!info) {
      return null;
    } else {
      return (
        <View
          style={
            asNote
              ? SelectItemStyles.itemNoteContainer
              : SelectItemStyles.itemContainer
          }>
          <View style={SelectItemStyles.titleWrap}>
            <Text size="small">{title}:</Text>
          </View>
          <View
            style={[
              asNote
                ? SelectItemStyles.infoNoteWrap
                : SelectItemStyles.infoWrap,
            ]}>
            <Text
              size="small"
              style={[
                asNote
                  ? SelectItemStyles.textNoteStyles
                  : SelectItemStyles?.textStyles,
              ]}
              numberOfLines={asNote ? 0 : 1}>
              {info}
            </Text>
          </View>
          {remain && (
            <View>
              <Text size="small" style={{paddingTop: 3, paddingHorizontal: 1}}>
                ({((info / info2) * 100).toFixed(0)}% left)
              </Text>
            </View>
          )}
        </View>
      );
    }
  };

  const BannerField = ({children, backgroundColor}) => {
    return (
      <View style={SelectItemStyles.bannerFieldWrapper(backgroundColor)}>
        <Text
          font="banana"
          centered
          style={{
            fontSize: 65,
            color: 'white',
            position: 'relative',
            top: -9,
          }}
          numberOfLines={1}>
          {children}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {selectedItem && (
        <View style={SelectItemStyles.container}>
          <BannerField backgroundColor={categoryColors(selectedItem?.category)}>
            {formatCategories(selectedItem?.category)}
          </BannerField>
          {groupedView ? (
            <View
              style={{
                marginHorizontal: 5,
                padding: 5,
              }}>
              <Text centered size="xSmall">
                Can't update grouped items.
              </Text>
              <Text centered size="xSmall">
                Please close and select single view.
              </Text>
            </View>
          ) : (
            <View style={SelectItemStyles.updateContainer}>
              <Button
                color="info"
                type="outline"
                size="small"
                onPress={() => handleUpdateItem(selectedItem?.itemId)}>
                Update Item
              </Button>
            </View>
          )}
          <ScrollView contentContainerStyle={SelectItemStyles.infoContainer}>
            <ItemRow title="Item Name" info={selectedItem?.itemName} />
            <ItemRow title="Brand" info={selectedItem?.brandName} />
            <ItemRow title="Description" info={selectedItem?.description} />
            {!cupboardView && (
              <ItemRow title="Quantity" info={selectedItem?.quantity} />
            )}
            <ItemRow
              title={groupedView ? 'Total Remaining' : 'Remaining Amount'}
              info={selectedItem?.remainingAmount}
              info2={selectedItem?.packageSize}
            />
            <ItemRow
              title={groupedView ? 'Total Package Size' : 'Package Size'}
              info={selectedItem?.packageSize}
            />
            <ItemRow
              title="Measurement"
              info={formatMeasurement(selectedItem?.measurement)}
            />
            {selectedItem?.notes && (
              <ItemRow title="Notes" info={selectedItem?.notes} />
            )}
            {cupboardView && !groupedView && (
              <View style={{marginLeft: 5, marginTop: 15}}>
                <Button
                  size="large"
                  // color={useColors('gold')}
                  onPress={() => handleAddToShopList(selectedItem)}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 10}}>
                      <Icons.AddList color={useColors('white')} />
                    </View>
                    <View>
                      <Text kqColor="white" font="open-6">
                        Add to Shopping List
                      </Text>
                    </View>
                  </View>
                </Button>
              </View>
            )}
            {!addToList && !groupedView && (
              <View
                style={{
                  marginLeft: 5,
                  marginTop: cupboardView && !groupedView ? 5 : 15,
                }}>
                <Button
                  size="large"
                  color={useColors('gold')}
                  onPress={() => handleAddToFavorites()}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 10}}>
                      <Icons.Star color={useColors('dark')} />
                    </View>
                    <View>
                      <Text font="open-6">Add to Favorites</Text>
                    </View>
                  </View>
                </Button>
              </View>
            )}

            {addToList && (
              <View style={SelectItemStyles.addToContainer}>
                <View style={SelectItemStyles.quantityWrapper}>
                  <View style={SelectItemStyles.quantityContainer}>
                    <Button
                      type="ghost"
                      symbols
                      symbolStyle={{width: 35, height: '100%'}}
                      style={{flex: 1}}
                      onPress={() => {
                        setQuantity(prev => Math.max(1, prev - 1));
                      }}>
                      <Icons.Minus size={20} />
                    </Button>
                  </View>

                  <View style={SelectItemStyles.quantityText}>
                    <Text size="small">{quantity}</Text>
                  </View>
                  <View style={SelectItemStyles.quantityContainer}>
                    <Button
                      type="ghost"
                      symbols
                      symbolStyle={{width: 35, height: '100%'}}
                      style={{flex: 1}}
                      onPress={() => {
                        setQuantity(prev => prev + 1);
                      }}>
                      <Icons.Plus size={20} />
                    </Button>
                  </View>
                </View>

                <View style={{flex: 3, marginLeft: 10}}>
                  <Button
                    size="medium"
                    style={{flex: 1}}
                    onPress={() => handleAddFavToShopList(selectedItem)}>
                    Add to Shopping List
                  </Button>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SelectedItemInfo;
