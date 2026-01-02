//* BuildAvatar.jsx
import React, {useMemo} from 'react';
import {createAvatar} from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {useAllowedProfiles, useDeviceInfo, useProfile} from '../hooks/useHooks';
import Avatar from './Avatar';
import {View} from 'react-native';
import {Text} from '../KQ-UI';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';

const BuildAvatar = props => {
  const {setShowModal} = props;
  const device = useDeviceInfo();
  const profile = useProfile();
  const isOwner = profile?.role === 'owner';
  const allowedProfiles = useAllowedProfiles();

  const blankAvatar = createAvatar(avataaars, {
    scale: 90,
    translateY: 9,
    randomizeIds: true,
    backgroundColor: ['eeeeee'],
    accessories: [''],
    accessoriesColor: [''],
    accessoriesProbability: 100,
    clothesColor: ['666666'],
    clothing: ['graphicShirt'],
    clothingGraphic: [''],
    eyebrows: [''],
    eyes: [''],
    facialHair: [''],
    facialHairColor: [''],
    facialHairProbability: 100,
    hairColor: [''],
    mouth: [''],
    skinColor: ['c4c4c4'],
    top: [''],
  }).toString();

  const customAvatarWidth = useMemo(() => {
    switch (device?.system?.deviceSize) {
      case 'small':
        return {height: 70, width: 70};
      case 'medium':
        return {height: 75, width: 75};
      case 'large':
        return {height: 80, width: 80};
      case 'xLarge':
        return {height: 85, width: 85};
      default:
        return {height: 85, width: 85};
    }
  }, [device?.system?.deviceSize]);

  const showAddAvatar = isOwner && allowedProfiles?.length < 4;

  const avatars = allowedProfiles?.map((profile, index) => (
    <View key={`profile-${index}`} style={AvatarStyles.avatarCard}>
      {/* <TouchableOpacity onPress={() => kqconsole.log('View Profile')}> */}
      <Avatar
        profilePicture={profile?.pictureURL}
        viewStyles={customAvatarWidth}
      />
      {/* </TouchableOpacity> */}
      <View style={AvatarStyles.avatarTitle}>
        <Text size="xSmall" font="open-7">
          {profile?.firstName}
        </Text>
        <Text size="tiny">({profile?.role})</Text>
      </View>
    </View>
  ));

  const addAvatar = (
    <View key="add-avatar" style={AvatarStyles.avatarCard}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={[AvatarStyles.avatarView, customAvatarWidth]}>
          <SvgXml xml={blankAvatar} />
        </View>
      </TouchableOpacity>
      <View style={AvatarStyles.avatarTitle}>
        <Text size="xSmall">Add</Text>
        <Text size="tiny">User</Text>
      </View>
    </View>
  );

  return [...avatars, ...(showAddAvatar ? [addAvatar] : [])];
};

const AvatarStyles = {
  avatarCard: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTitle: {
    paddingTop: 2,
    alignItems: 'center',
  },
  avatarView: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
};

export default React.memo(BuildAvatar);
