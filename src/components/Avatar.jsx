//* Avatar.jsx
import React, {useMemo} from 'react';
import {SvgXml} from 'react-native-svg';
import {createAvatar} from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {View} from 'react-native';
import {
  bgColorOptions,
  colorOptions,
  facialHairOptions,
  glassesOptions,
  graphicOptions,
  hairColorOptions,
  hairStyleOptions,
  shirtOptions,
  skinColorOptions,
} from '../utilities/avatarOptions';

function Avatar({
  profilePicture = {},
  avatarOptions,
  isEditing,
  cardStyles,
  viewStyles,
}) {
  const mapToString = useMemo(() => {
    const source = isEditing ? avatarOptions : profilePicture;

    return {
      backgroundColor:
        bgColorOptions[source?.bgColor] || source?.backgroundColor || '009DC4',
      accessories: glassesOptions[source?.glasses] || source?.accessories || '',
      accessoriesColor:
        colorOptions[source?.glassesColor] ||
        source?.accessoriesColor ||
        '373D43',
      clothesColor:
        colorOptions[source?.shirtColor] || source?.clothesColor || '373D43',
      clothing:
        shirtOptions[source?.shirtStyle] || source?.clothing || 'graphicShirt',
      clothingGraphic: graphicOptions[source?.clothingGraphic] || '',
      facialHair: isEditing
        ? facialHairOptions[source?.facialHair]
        : source?.facialHair || '',
      facialHairColor: isEditing
        ? hairColorOptions[source?.hairColor]
        : source?.facialHairColor || '1C1C1C',
      hairColor: isEditing
        ? hairColorOptions[source?.hairColor]
        : source?.hairColor || '6B4B31',
      skinColor: isEditing
        ? skinColorOptions[source?.skinColor]
        : source?.skinColor || 'F3B28C',
      top: hairStyleOptions[source?.hairStyle] || source?.top || 'shortFlat',
    };
  }, [avatarOptions, profilePicture, isEditing]);

  const buildAvatar = useMemo(() => {
    return createAvatar(avataaars, {
      scale: 90,
      translateY: 9,
      randomizeIds: true,
      backgroundColor: [mapToString.backgroundColor],
      accessories: [mapToString.accessories],
      accessoriesColor: [mapToString.accessoriesColor],
      accessoriesProbability: 100,
      clothesColor: [mapToString.clothesColor],
      clothing: [mapToString.clothing],
      clothingGraphic: [mapToString.clothingGraphic],
      eyebrows: ['default'],
      eyes: ['default'],
      facialHair: [mapToString.facialHair],
      facialHairColor: [mapToString.facialHairColor],
      facialHairProbability: 100,
      hairColor: [mapToString.hairColor],
      mouth: ['smile'],
      skinColor: [mapToString.skinColor],
      top: [mapToString.top],
    }).toString();
  }, [mapToString]);

  return (
    <View style={[AvatarStyles.avatarCard, cardStyles]}>
      <View style={[AvatarStyles.avatarView, viewStyles]}>
        <SvgXml xml={buildAvatar} />
      </View>
    </View>
  );
}

const AvatarStyles = {
  avatarCard: {
    // width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarView: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
};

export default __DEV__ ? Avatar : React.memo(Avatar);
