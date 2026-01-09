//* SAButton.jsx
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AccountStyles} from '../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import {useProfile} from '../../hooks/useHooks';
import {Text} from '../../KQ-UI';

const SAButton = props => {
  const {location, icon, title} = props;
  const useHaptics = setHapticFeedback();
  const navigation = useNavigation();
  const profile = useProfile();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={AccountStyles.subWrapper}
        onPress={() => {
          navigation.navigate(location);
          useHaptics(profile?.userSettings?.hapticStrength || 'light');
        }}>
        <View style={AccountStyles.subIcon}>{icon}</View>
        <View style={AccountStyles.subTextWrap}>
          <Text size="small" font="open-7">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SAButton);
