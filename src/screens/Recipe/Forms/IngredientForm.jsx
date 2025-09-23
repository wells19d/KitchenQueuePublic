//* IngredientForm.jsx
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import {Button, Dropdown, Input, ScrollView, Text, View} from '../../../KQ-UI';
import {Icons} from '../../../components/IconListRouter';
import {setHapticFeedback} from '../../../hooks/setHapticFeedback';
import {useColors} from '../../../KQ-UI/KQUtilities';
import {
  capFirst,
  formatMeasurementWithPluralRec,
} from '../../../utilities/helpers';
import {useCoreInfo} from '../../../utilities/coreInfo';
import {displayMeasurements} from '../../../utilities/measurements';

const IngredientForm = props => {
  const {
    ingredients,
    setIngredients,
    tempIngAmount,
    setTempIngAmount,
    tempIngMeasurement,
    setTempIngMeasurement,
    tempIngName,
    setTempIngName,
    handleCloseIngredients,
    tempNote,
    setTempNote,
  } = props;
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();
  const [canAdd, setCanAdd] = useState(false);

  const handleAddIngredient = () => {
    if (canAdd) {
      let newObject = {
        amount: tempIngAmount ? Number(tempIngAmount) : null,
        unit: tempIngMeasurement?.key,
        name: tempIngName?.toLowerCase().trim() ?? null,
        note: tempNote ?? null,
      };
      setIngredients(prev => [...prev, newObject]);
      setTempIngAmount(null);
      setTempIngMeasurement(null);
      setTempIngName(null);
      setTempNote(null);
    }
  };

  const moveIngredient = (fromIndex, toIndex) => {
    setIngredients(prev => {
      const updated = [...prev];
      const item = updated.splice(fromIndex, 1)[0];
      updated.splice(toIndex, 0, item);
      return updated;
    });
  };

  useEffect(() => {
    if (tempIngAmount && tempIngMeasurement && tempIngName) {
      setCanAdd(true);
    } else {
      setCanAdd(false);
    }
  }, [tempIngAmount, tempIngMeasurement, tempIngName]);

  const handleMove = (index, direction) => {
    useHaptics(core?.userSettings?.hapticStrength || 'light');
    moveIngredient(index, direction);
  };

  return (
    <>
      <View row>
        <View flex>
          <Input
            required
            labelStyles={{fontSize: 13}}
            label="Amount"
            value={tempIngAmount}
            onChangeText={setTempIngAmount}
            keyboardType="numeric"
            size="tiny"
          />
        </View>
        <View flex>
          <Dropdown
            required
            label="Measurement"
            placeholder="Select a measurement"
            labelStyles={{fontSize: 13}}
            value={tempIngMeasurement}
            setValue={setTempIngMeasurement}
            mapData={displayMeasurements}
            onRow
          />
        </View>
      </View>
      <View row>
        <View flex>
          <Input
            required
            label="Name"
            labelStyles={{fontSize: 13}}
            value={tempIngName}
            onChangeText={setTempIngName}
            capitalize
            capitalMode="words"
          />
        </View>
      </View>
      {/* 
        Note sure if we need this, but leaving it for now*/}
      <View row>
        <View flex>
          <Input
            label="Note"
            caption="Optional note for the ingredient"
            labelStyles={{fontSize: 13}}
            value={tempNote}
            onChangeText={setTempNote}
            capitalize
            capitalMode="sentences"
            counter
            maxCount={100}
            multiline
            multiHeight="large"
          />
        </View>
      </View>
      <View row mt15>
        <View>
          <Button
            type="outline"
            color="primary"
            textSize="xSmall"
            size="tiny"
            disabled={!canAdd}
            onPress={() => handleAddIngredient()}>
            Add Item
          </Button>
        </View>
        <View flex />
        <View>
          <Button
            textSize="xSmall"
            size="tiny"
            onPress={handleCloseIngredients}>
            Finished
          </Button>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 180} // adjust depending on your header height
      >
        <ScrollView style={styles.scrollStyles} hideBar>
          {ingredients?.length > 0 ? (
            ingredients?.map((ing, index) => (
              <View key={index} row centerH pv5>
                {/* Ingredient text */}
                <View flex ml5>
                  <Text size="xSmall" font="open-6">
                    {formatMeasurementWithPluralRec(
                      ing.amount,
                      ing.unit,
                      ing.name,
                    )}
                  </Text>
                  {ing.note && (
                    <Text size="tiny" font="open-5" italic>
                      ** {ing.note}
                    </Text>
                  )}
                </View>

                {/* Reorder arrows */}
                <View row>
                  {index > 0 && (
                    <TouchableOpacity
                      style={styles.indexButtons}
                      onPress={() => handleMove(index, index - 1)}>
                      <Icons.ChevronUp size={16} color={useColors('dark')} />
                    </TouchableOpacity>
                  )}
                  {index < ingredients.length - 1 && (
                    <TouchableOpacity
                      style={styles.indexButtons}
                      onPress={() => handleMove(index, index + 1)}>
                      <Icons.ChevronDown size={16} color={useColors('dark')} />
                    </TouchableOpacity>
                  )}
                  {/* Delete button */}
                  <View centerVH>
                    <TouchableOpacity
                      style={{marginRight: 10}}
                      onPress={() => {
                        useHaptics(
                          core?.userSettings?.hapticStrength || 'light',
                        );
                        setIngredients(prev =>
                          prev.filter((_, i) => i !== index),
                        );
                      }}>
                      <Icons.XCircleOutline
                        size={20}
                        color={useColors('danger')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View centerH mt20>
              <Text size="xSmall" font="open-6" centered>
                No ingredients added yet.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = {
  indexButtons: {
    marginRight: 10,
    width: 30,
    height: 25,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: useColors('dark70'),
  },
  scrollStyles: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
};

export default IngredientForm;
