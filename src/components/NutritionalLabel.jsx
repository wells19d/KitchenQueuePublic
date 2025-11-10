// NutritionalLabel.jsx
import React from 'react';
import {useDeviceInfo} from '../hooks/useHooks';
import {Text, View} from '../KQ-UI';
import {useColors} from '../KQ-UI/KQUtilities';
import {
  calculatePercentDV,
  nutritionFCCPDisplay,
  nutritionVitDisplay,
  servPerContainer,
} from '../utilities/labelTools';

const NutritionalLabel = ({data}) => {
  const device = useDeviceInfo();
  const isTablet = device?.system?.device === 'Tablet';
  const sideWays = device?.view === 'Landscape';

  const Sup = ({children}) => (
    <Text
      size={isTablet ? 'xSmall' : 'tiny'}
      style={{position: 'relative', top: -1, marginLeft: 1}}>
      {children}
    </Text>
  );

  const Header = () => (
    <>
      <View borderBottomWidth={2}>
        <Text size={isTablet ? 'giant' : 'large'} font="open-7">
          Nutrition Facts
        </Text>
      </View>
    </>
  );

  const ServingSizes = () => (
    <View
      mt={3}
      pb={2}
      borderBottomWidth={15}
      borderColor={useColors('dark90')}>
      <View ph={2}>
        <Text size={isTablet ? 'medium' : 'xSmall'} numberOfLines={1}>
          {servPerContainer(data?.servingSize?.perContainer)}
        </Text>
      </View>
      <View row flex ph={2}>
        <View flex>
          <Text
            size={isTablet ? 'large' : 'small'}
            font="open-7"
            numberOfLines={1}>
            Serving Size:
          </Text>
        </View>
        <View>
          <Text
            size={isTablet ? 'large' : 'small'}
            font="open-7"
            numberOfLines={1}>
            {data?.servingSize?.description} ({data?.servingSize?.metric})
          </Text>
        </View>
      </View>
    </View>
  );

  const Calories = () => (
    <>
      <View mt={1} mb={-5} ph={3}>
        <Text size={isTablet ? 'small' : 'tiny'}>Amount per serving</Text>
      </View>
      <View row borderBottomWidth={7} borderColor={useColors('dark90')} ph={1}>
        <View flex>
          <Text size={isTablet ? 'giant' : 'xLarge'} font="open-7">
            Calories
          </Text>
        </View>
        <View>
          <Text size={isTablet ? 'giant' : 'xLarge'} font="open-7">
            {data?.nutrients?.perServing?.calories?.value}
          </Text>
        </View>
      </View>
    </>
  );

  const DailyFCCPValues = () => (
    <>
      <View mt={1} mb={-5} ph={3} row>
        <View flex />
        <View row>
          <Text size={isTablet ? 'small' : 'tiny'}>% Daily Values</Text>
          <Sup>*</Sup>
        </View>
      </View>
      <View mt={7} borderBottomWidth={15} borderColor={useColors('dark90')}>
        {nutritionFCCPDisplay.map(({key, label, type, showPercent}) => {
          const nutrient = data?.nutrients?.perServing[key];
          if (!nutrient) return null;
          return (
            <View key={key} row borderTopWidth={1} pv={3} flex>
              <View
                pr={5}
                style={[
                  type === 'main' && {paddingLeft: 2},
                  type === 'minor' && {paddingLeft: 15},
                  type === 'sub' && {paddingLeft: 30},
                  type === 'vitamin' && {},
                ]}>
                <Text
                  font={type === 'main' ? 'open-7' : 'open-5'}
                  size={isTablet ? 'medium' : 'xSmall'}>
                  {label}
                </Text>
              </View>
              <View flex>
                <Text font="open-5" size={isTablet ? 'medium' : 'xSmall'}>
                  {nutrient.value}
                  {nutrient.unit}
                </Text>
              </View>
              {showPercent && (
                <View>
                  <Text size={isTablet ? 'medium' : 'xSmall'} font="open-7">
                    {calculatePercentDV(key, nutrient.value)}%
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </>
  );

  const DailyVitaminValues = () => (
    <View mb={5} borderBottomWidth={7} borderColor={useColors('dark90')}>
      {nutritionVitDisplay.map(({key, label, type, showPercent}, index) => {
        const nutrient = data?.nutrients?.perServing[key];
        if (!nutrient) return null;
        return (
          <View
            key={key}
            row
            borderTopWidth={index > 0 ? 1 : 0}
            pv={3}
            flex
            pl={5}>
            <View flex>
              <Text font="open-6" size={isTablet ? 'medium' : 'xSmall'}>
                {label} {nutrient.value}
                {nutrient.unit}
              </Text>
            </View>
            {showPercent && (
              <View>
                <Text size={isTablet ? 'medium' : 'xSmall'}>
                  {calculatePercentDV(key, nutrient.value)}%
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );

  const Clause = () => (
    <View mt={3} mb={10} ph={5}>
      <Text size={isTablet ? 'xSmall' : 'xTiny'}>
        * The % Daily Value (DV) tells you how much a nutrient in a serving of
        food contributes to a daily diet. 2,000 calories a day is used for
        general nutrition advice.
      </Text>
    </View>
  );

  const Disclaimer = () => (
    <View mt={3} mh={5} ml10 pl={7}>
      <Text size={isTablet ? 'xSmall' : 'tiny'} italic justified>
        The nutritional information displayed is based on data provided by
        FatSecret and is intended for reference purposes only. This information
        may not reflect the exact values on the current product label, as
        manufacturers may have updated or changed the product's formulation or
        packaging since the data was recorded. For the most accurate and
        up-to-date information, please refer to the actual product label.
      </Text>
    </View>
  );

  return (
    <View flex>
      <View borderWidth={1} flex ml10 ph={5} pt={1}>
        <Header />
        <ServingSizes />
        <Calories />
        <DailyFCCPValues />
        <DailyVitaminValues />
        <Clause />
      </View>
      <Disclaimer />
    </View>
  );
};

export default NutritionalLabel;
