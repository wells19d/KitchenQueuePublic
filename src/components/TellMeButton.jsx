//* TellMeButton.jsx
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../KQ-UI';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {Icons} from './IconListRouter';

const TellMeButton = ({action, tt1, tt2, profile}) => {
  const useHaptics = setHapticFeedback();

  const handlePress = () => {
    useHaptics(profile || 'light');
    action();
  };
  return (
    <TouchableOpacity style={{height: 60}} onPress={() => handlePress()}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            paddingLeft: 5,
          }}>
          <View style={{marginVertical: 1.5}}>
            <Text size="small" font="open-7">
              {tt1}
            </Text>
          </View>
          <View style={{marginVertical: 1.5}}>
            <Text size="xSmall" font="open-5">
              {tt2}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 40,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icons.Forward color={'#373d43'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(TellMeButton);
