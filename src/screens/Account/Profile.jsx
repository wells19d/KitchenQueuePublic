//* Profile.jsx
import React, {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ProfileStyles} from '../../styles/Styles';
import {useDispatch} from 'react-redux';
import {useDeviceInfo, useProfile} from '../../hooks/useHooks';
import {
  avatarConfig,
  bgColorOptions,
  categoryOptions,
  colorOptions,
  facialHairOptions,
  glassesOptions,
  graphicOptions,
  hairColorOptions,
  hairStyleOptions,
  shirtOptions,
  skinColorOptions,
} from '../../utilities/avatarOptions';
import {Icons} from '../../components/IconListRouter';
import {Input, Layout, ScrollView, Text} from '../../KQ-UI';
import Avatar from '../../components/Avatar';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';

function Profile() {
  const dispatch = useDispatch();
  const profile = useProfile();
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [onlineName, setOnlineName] = useState(profile?.onlineName || '');
  const [canSave, setCanSave] = useState(false);
  const device = useDeviceInfo();
  const useHaptics = setHapticFeedback();

  const [avatarSize, setAvatarSize] = useState({
    width: 200,
  });
  const [buttonHeight, setButtonHeight] = useState({
    height: 35,
  });
  const [buttonWidth, setButtonWidth] = useState({
    width: 150,
  });

  useEffect(() => {
    if (
      firstName !== profile?.firstName ||
      lastName !== profile?.lastName ||
      onlineName !== profile?.onlineName
    ) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [profile, firstName, lastName, onlineName]);

  useEffect(() => {
    if (profile?.account) {
      dispatch({type: 'FETCH_ACCOUNT', payload: profile.account});
    }
  }, [profile, dispatch]);

  const handleProfileUpdate = () => {
    const updatedPictureURL = {
      accessories: glassesOptions[avatarOptions.glasses] || '',
      accessoriesColor: colorOptions[avatarOptions.glassesColor] || '',
      backgroundColor: bgColorOptions[avatarOptions.bgColor] || '009DC4',
      clothesColor: colorOptions[avatarOptions.shirtColor] || '373D43',
      clothing: shirtOptions[avatarOptions.shirtStyle] || 'graphicShirt',
      clothingGraphic: graphicOptions[avatarOptions.clothingGraphic] || '',
      facialHair: facialHairOptions[avatarOptions.facialHair] || '',
      facialHairColor: hairColorOptions[avatarOptions.hairColor] || '',
      hairColor: hairColorOptions[avatarOptions.hairColor] || '1C1C1C',
      skinColor: skinColorOptions[avatarOptions.skinColor] || 'F3B28C',
      top: hairStyleOptions[avatarOptions.hairStyle] || 'shortFlat',
    };

    const updatedData = {
      firstName,
      lastName,
      onlineName,
      pictureURL: updatedPictureURL,
    };

    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {userId: profile?.id, updatedData},
    });
  };

  const getIndexFromValue = (options, value) =>
    options.indexOf(value) !== -1 ? options.indexOf(value) : 0;

  const [avatarOptions, setAvatarOptions] = useState({
    bgColor: getIndexFromValue(
      bgColorOptions,
      profile?.pictureURL?.backgroundColor || '009DC4',
    ),
    skinColor: getIndexFromValue(
      skinColorOptions,
      profile?.pictureURL?.skinColor || 'FFE2C5',
    ),
    hairColor: getIndexFromValue(
      hairColorOptions,
      profile?.pictureURL?.hairColor || '6B4B31',
    ),
    hairStyle: getIndexFromValue(
      hairStyleOptions,
      profile?.pictureURL?.top || 'shortFlat',
    ),
    shirtStyle: getIndexFromValue(
      shirtOptions,
      profile?.pictureURL?.clothing || 'graphicShirt',
    ),
    shirtColor: getIndexFromValue(
      colorOptions,
      profile?.pictureURL?.clothesColor || '373D43',
    ),
    clothingGraphic: getIndexFromValue(
      graphicOptions,
      profile?.pictureURL?.clothingGraphic || '',
    ),
    glasses: getIndexFromValue(
      glassesOptions,
      profile?.pictureURL?.accessories || '',
    ),
    glassesColor: getIndexFromValue(
      colorOptions,
      profile?.pictureURL?.accessoriesColor || '373D43',
    ),
    facialHair: getIndexFromValue(
      facialHairOptions,
      profile?.pictureURL?.facialHair || '',
    ),
  });

  const handleAvatarOptionChange = (optionKey, optionsArray, direction) => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setAvatarOptions(prev => {
      const updatedOptions = {
        ...prev,
        [optionKey]:
          (prev[optionKey] + direction + optionsArray.length) %
          optionsArray.length,
      };
      return updatedOptions;
    });
  };

  useEffect(() => {
    const optionsMapping = {
      backgroundColor: bgColorOptions[avatarOptions.bgColor],
      accessories: glassesOptions[avatarOptions.glasses],
      accessoriesColor: colorOptions[avatarOptions.glassesColor],
      clothesColor: colorOptions[avatarOptions.shirtColor],
      clothing: shirtOptions[avatarOptions.shirtStyle],
      clothingGraphic: graphicOptions[avatarOptions.clothingGraphic],
      facialHair: facialHairOptions[avatarOptions.facialHair],
      facialHairColor: hairColorOptions[avatarOptions.hairColor],
      hairColor: hairColorOptions[avatarOptions.hairColor],
      skinColor: skinColorOptions[avatarOptions.skinColor],
      top: hairStyleOptions[avatarOptions.hairStyle],
    };

    const avatarChanged = Object.keys(optionsMapping).some(
      key => profile?.pictureURL?.[key] !== optionsMapping[key],
    );

    if (avatarChanged) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [avatarOptions, profile?.pictureURL]);

  const shouldShowGraphic =
    shirtOptions[avatarOptions.shirtStyle] === 'graphicShirt';

  const filteredAvatarConfig = useMemo(() => {
    const configCopy = {...avatarConfig};

    if (!shouldShowGraphic) {
      configCopy['Shirt'] = configCopy['Shirt']?.filter(
        option => option.optionKey !== 'clothingGraphic',
      );
    }

    return configCopy;
  }, [avatarOptions.shirtStyle]);

  const [currentCatIndex, setCurrentCatIndex] = useState(0);

  const [currentCat, setCurrentCat] = useState(categoryOptions[0]);

  const handleNextCat = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setCurrentCatIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % categoryOptions.length;
      setCurrentCat(categoryOptions[nextIndex]);
      return nextIndex;
    });
  };

  const handlePrevCat = () => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
    setCurrentCatIndex(prevIndex => {
      const prevIndexAdjusted =
        (prevIndex - 1 + categoryOptions.length) % categoryOptions.length;
      setCurrentCat(categoryOptions[prevIndexAdjusted]);
      return prevIndexAdjusted;
    });
  };

  const handleBtnPress = (optionKey, optionsArray, direction) => {
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
  };

  const AvCategory = () => {
    return (
      <View
        style={[
          ProfileStyles.optionContainer,
          buttonHeight,
          {marginBottom: 5},
        ]}>
        <View style={{flex: 1}}></View>
        <TouchableOpacity
          style={ProfileStyles.optionLeft}
          onPress={handlePrevCat}>
          <View style={ProfileStyles.olInner}>
            <Icons.Back size={18} />
          </View>
        </TouchableOpacity>
        <View style={[ProfileStyles.optionView, buttonWidth]}>
          <Text size={buttonTextSize}>{currentCat}</Text>
        </View>
        <TouchableOpacity
          style={ProfileStyles.optionRight}
          onPress={handleNextCat}>
          <View style={ProfileStyles.orInner}>
            <Icons.Forward size={18} />
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
    );
  };

  const AvButton = ({text, leftAction, rightAction}) => (
    <View style={[ProfileStyles.optionContainer, buttonHeight]}>
      <View style={{flex: 1}}></View>
      <TouchableOpacity
        style={ProfileStyles.optionLeft}
        onPress={() => leftAction()}>
        <View style={ProfileStyles.olInner}>
          <Icons.Back size={18} />
        </View>
      </TouchableOpacity>
      <View style={[ProfileStyles.optionView, buttonWidth]}>
        <Text size={buttonTextSize}>{text}</Text>
      </View>
      <TouchableOpacity
        style={ProfileStyles.optionRight}
        onPress={() => rightAction()}>
        <View style={ProfileStyles.orInner}>
          <Icons.Forward size={18} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
    </View>
  );

  const AvButtonDynamic = ({text, optionKey, optionsArray}) => (
    <AvButton
      text={text}
      leftAction={() => handleAvatarOptionChange(optionKey, optionsArray, -1)}
      rightAction={() => handleAvatarOptionChange(optionKey, optionsArray, 1)}
    />
  );

  const [buttonTextSize, setButtonTextSize] = useState('small');

  useEffect(() => {
    switch (device?.system?.deviceSize) {
      case 'xSmall':
        setAvatarSize({width: 100, height: 100});
        setButtonHeight({height: 35});
        setButtonWidth({width: 125});
        setButtonTextSize('xSmall');
        break;
      case 'small':
        setAvatarSize({width: 125, height: 125});
        setButtonHeight({height: 35});
        setButtonWidth({width: 150});
        setButtonTextSize('small');
        break;
      case 'medium':
        setAvatarSize({width: 150, height: 150});
        setButtonHeight({height: 35});
        setButtonWidth({width: 175});
        setButtonTextSize('small');
        break;
      default:
        setAvatarSize({width: 175, height: 175});
        setButtonHeight({height: 40});
        setButtonWidth({width: 175});
        setButtonTextSize('small');
    }
  }, [device?.system?.deviceSize]);

  return (
    <Layout
      headerTitle="Profile"
      LeftButton="Back"
      RightButton={canSave ? 'Save' : ''}
      RightAction={handleProfileUpdate}
      LeftAction={false}
      sheetOpen={false}
      mode="scroll-only"
      noBar={true}
      // outerViewStyles={{paddingBottom: 0}}
    >
      <Input
        label="Email"
        placeholder="Email"
        value={profile?.email}
        disabled
      />
      <Input
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        capitalize
        capitalMode="words"
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        capitalize
        capitalMode="words"
      />
      <Input
        label={'Online Name'}
        placeholder="Online Name"
        value={onlineName}
        onChangeText={setOnlineName}
        capitalize
        capitalMode="words"
      />
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 25, marginBottom: 10}}>
          <Avatar
            profilePicture={profile?.pictureURL}
            avatarOptions={avatarOptions}
            viewStyles={[avatarSize, {borderRadius: avatarSize.width / 2}]}
            isEditing
          />
        </View>

        <AvCategory />
        {filteredAvatarConfig[currentCat]?.map(
          ({text, optionKey, optionsArray}, index) => (
            <AvButtonDynamic
              key={`${currentCat}-${index}`}
              text={text}
              optionKey={optionKey}
              optionsArray={optionsArray}
            />
          ),
        )}
      </ScrollView>
    </Layout>
  );
}

export default Profile;
