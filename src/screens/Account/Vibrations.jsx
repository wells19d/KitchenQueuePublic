//* Vibrations.jsx

import React, {useEffect, useState} from 'react';
import {Layout, ScrollView, Text} from '../../KQ-UI';
import {useDispatch} from 'react-redux';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';
import {useProfile} from '../../hooks/useHooks';
import {TouchableOpacity, View} from 'react-native';
import {Icons} from '../../components/IconListRouter';
import {ScreenStyles, SettingsStyles} from '../../styles/Styles';

const hapticOptions = [
  {
    row: [
      {label: 'Off', icon: null},
      {
        label: 'Light',
        icon: <Icons.Wave size={25} color={'#29856c'} />,
        activeIcon: <Icons.Wave size={25} color={'#fff'} />,
      },
    ],
  },
  {
    row: [
      {
        label: 'Medium',
        icon: (
          <View>
            <View style={{position: 'relative', top: 9.25}}>
              <Icons.Wave size={25} color={'#29856c'} />
            </View>
            <View style={{position: 'relative', bottom: 9.25}}>
              <Icons.Wave size={25} color={'#29856c'} />
            </View>
          </View>
        ),
        activeIcon: (
          <View>
            <View style={{position: 'relative', top: 9.25}}>
              <Icons.Wave size={25} color={'#fff'} />
            </View>
            <View style={{position: 'relative', bottom: 9.25}}>
              <Icons.Wave size={25} color={'#fff'} />
            </View>
          </View>
        ),
      },
      {
        label: 'Heavy',
        icon: (
          <View>
            <View style={{position: 'relative', top: 18.5}}>
              <Icons.Wave size={25} color={'#29856c'} />
            </View>
            <View>
              <Icons.Wave size={25} color={'#29856c'} />
            </View>
            <View style={{position: 'relative', bottom: 18.5}}>
              <Icons.Wave size={25} color={'#29856c'} />
            </View>
          </View>
        ),
        activeIcon: (
          <View>
            <View style={{position: 'relative', top: 18.5}}>
              <Icons.Wave size={25} color={'#fff'} />
            </View>
            <View>
              <Icons.Wave size={25} color={'#fff'} />
            </View>
            <View style={{position: 'relative', bottom: 18.5}}>
              <Icons.Wave size={25} color={'#fff'} />
            </View>
          </View>
        ),
      },
    ],
  },
];

const Vibrations = () => {
  const dispatch = useDispatch();
  const useHaptics = setHapticFeedback();
  const profile = useProfile();
  const [hapticStrength, setHapticStrength] = useState(
    profile?.userSettings?.hapticStrength || 'light',
  );
  const [canSave, setCanSave] = useState(false);

  useEffect(() => {
    if (profile?.userSettings?.hapticStrength !== hapticStrength) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [profile, hapticStrength]);

  const handleSave = () => {
    if (!canSave) return;
    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {
        userId: profile?.id,
        updatedData: {
          userSettings: {
            ...(profile.userSettings || {}),
            hapticStrength,
          },
        },
      },
    });
  };

  const InfoCell = ({label, description}) => (
    <View style={{marginTop: 5, flexDirection: 'row'}}>
      <View style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 5}}>
        <Text font="open-7" size="small">
          {label}
        </Text>
      </View>
      {description && (
        <View style={{flex: 2, paddingHorizontal: 5}}>
          <Text size="small">{description}</Text>
        </View>
      )}
    </View>
  );

  const HSButton = ({option}) => {
    const isActive = hapticStrength === option.label.toLowerCase();

    return (
      <TouchableOpacity
        onPress={() => {
          setHapticStrength(option.label.toLowerCase());
          useHaptics(option.label.toLowerCase());
        }}
        style={[
          SettingsStyles.hapticButton,
          {
            backgroundColor: isActive ? '#29856c' : '#fff',
            borderWidth: isActive ? 0 : 1,
          },
        ]}>
        <View style={SettingsStyles.hbInner}>
          <View style={{marginHorizontal: 5}}>
            {isActive ? option.activeIcon : option.icon}
          </View>
          <View style={{marginHorizontal: 5}}>
            <Text
              weight="w7"
              size="small"
              style={{
                color: isActive ? '#fff' : '#29856c',
              }}>
              {option.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      headerTitle="Vibrations"
      LeftButton="Back"
      RightButton={canSave ? 'Save' : ''}
      LeftAction={null}
      RightAction={handleSave}
      sheetOpen={false}
      // outerViewStyles={{paddingBottom: 0}}
    >
      <ScrollView style={ScreenStyles.scrollContainer}>
        <View style={ScreenStyles.viewInnerTopContainer}>
          <Text centered>Press a button to set your vibration intensity.</Text>
        </View>
        {hapticOptions.map((group, groupIndex) => (
          <View
            key={groupIndex}
            style={SettingsStyles.segmentedButtonContainer}>
            {group.row.map((option, index) => (
              <View key={index} style={{flex: 1}}>
                <HSButton option={option} />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={{marginTop: 20}}>
        <InfoCell label="Off:" description="No vibration intensity." />
        <InfoCell label="Light:" description="Subtle vibration intensity." />
        <InfoCell label="Medium:" description="Standard vibration intensity." />
        <InfoCell label="Heavy:" description="Strong vibration intensity." />
      </View>
      <View style={{marginTop: 30, paddingHorizontal: 10}}>
        <Text size="small" font="open-5" italic>
          Note: The default for vibration is preset to "Light". The chosen
          setting will not affect all buttons or actions due to some functions
          that require a forced vibration. However, if you choose 'Off', it will
          turn off all vibrations in the app.
        </Text>
      </View>
    </Layout>
  );
};

export default Vibrations;
