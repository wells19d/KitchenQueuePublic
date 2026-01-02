//* Help.jsx
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Layout, Modal, ScrollView, Text} from '../../KQ-UI';
import {ScreenStyles} from '../../styles/Styles';
import {useProfile} from '../../hooks/useHooks';
import {View} from 'react-native';
import TellMeButton from '../../components/TellMeButton';
import {AppInfo} from '../../../AppInfo';
import TermsService from '../Legal/TermsService';
import PrivacyPolicy from '../Legal/PrivacyPolicy';
import About from '../Legal/About';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Help = () => {
  const profile = useProfile();
  const navigation = useNavigation();

  const [showPPModal, setShowPPModal] = useState(false);
  const [showTOSModal, setShowTOSModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <Layout
      headerTitle="Help"
      LeftButton="Back"
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      // outerViewStyles={{paddingBottom: 0}}
    >
      <View style={[ScreenStyles.viewContainer, {flex: 1}]}>
        <View style={ScreenStyles.viewInnerTopContainer}>
          <Text size="small" font="open-7" centered>
            Tell me about...
          </Text>
        </View>

        <ScrollView contentContainerStyle={ScreenStyles.scrollContainer}>
          <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={() => setShowAboutModal(true)}
            tt1={`${AppInfo.appName}`}
            tt2="Information about this app."
          />
          <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={() => setShowPPModal(true)}
            tt1="Privacy Policy"
            tt2="How we collect, use, and protect your data."
          />
          <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={() => setShowTOSModal(true)}
            tt1="Terms of Service"
            tt2="The rules and regulations for using our services."
          />
          {/* <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={() => navigation.navigate('Passwords')}
            tt1="Changing My Password"
            tt2="Changes your password to a new one."
          /> */}
          <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={() => navigation.navigate('Resets')}
            tt1="Resetting Your Lists"
            tt2="Clear your cupboard / shopping lists."
          />
          <TellMeButton
            profile={profile?.userSettings?.hapticStrength}
            action={async () => {
              await AsyncStorage.removeItem('permissionsModalShown');
              alert(
                'Permission prompts have been reset.\n\n' +
                  'Note: This only resets the in-app popup. If camera or photo permissions are already set, you must change them in your device settings.\n\n' +
                  'Please fully close and reopen the app to see the prompts again.',
              );
            }}
            tt1="Reset Permissions"
            tt2="Reset the in-app permission prompts."
          />
        </ScrollView>
      </View>
      <Modal
        visible={showTOSModal}
        title={`Terms of Service v${AppInfo.tosVersion}`}
        onClose={() => setShowTOSModal(false)}
        headerFont="open-6"
        headerSize="small"
        height="98%"
        width="98%">
        <TermsService hideConfirm />
      </Modal>
      <Modal
        visible={showPPModal}
        title={`Privacy Policy v${AppInfo.ppVersion}`}
        onClose={() => setShowPPModal(false)}
        headerFont="open-6"
        headerSize="small"
        height="98%"
        width="98%">
        <PrivacyPolicy hideConfirm />
      </Modal>
      <Modal
        visible={showAboutModal}
        title={`About ${AppInfo.appName}`}
        onClose={() => setShowAboutModal(false)}
        headerFont="open-6"
        headerSize="small"
        height="98%"
        width="98%">
        <About hideConfirm />
      </Modal>
    </Layout>
  );
};

export default Help;
