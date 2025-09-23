//* Account.jsx
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Input, Layout, Modal, Text, View} from '../../KQ-UI';
import {ActivityIndicator} from 'react-native';
import {Icons} from '../../components/IconListRouter';
import {
  useAccount,
  useDeviceInfo,
  useExistingInvite,
  useProfile,
} from '../../hooks/useHooks';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import BuildAvatar from '../../components/BuildAvatar';
import {AccountStyles} from '../../styles/Styles';
import SAButton from './SAButton';
import Clipboard from '@react-native-clipboard/clipboard';
import {Animated} from 'react-native';
import {AppInfo} from '../../../AppInfo';

const Account = () => {
  const profile = useProfile();
  const device = useDeviceInfo();
  const dispatch = useDispatch();
  const account = useAccount();
  const existingInvite = useExistingInvite();
  const isIOS = device?.system?.os === 'iOS';
  const isAndroid = device?.system?.os === 'Android';
  const deviceAppVersion = isIOS
    ? `(iOS) App Version: ${AppInfo?.appleAppVersion}`
    : isAndroid
    ? `(Android) App Version: ${AppInfo?.googleAppVersion}`
    : '';
  const buildVersion = isIOS
    ? `Build: ${AppInfo?.appleBuildVersion}`
    : isAndroid
    ? `Build: ${AppInfo?.googleBuildVersion}`
    : '';

  const [showModal, setShowModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [invitationMsg, setInvitationMsg] = useState('');
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [displayCode, setDisplayCode] = useState('');
  const [canGenerate, setCanGenerate] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showExceeding, setShowExceeding] = useState(false);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setCodeGenerated(false);
    setCanGenerate(true);
    setDisplayCode('');
    setInviteEmail('');
    setEmailError(false);
    setEmailErrorMsg('');
    setInvitationMsg('');
    setShowExceeding(false);
    dispatch({type: 'CLEAR_EXISTING_INVITE'});
  }, [dispatch]);

  const showCodeModal = useMemo(() => {
    if (
      !showModal &&
      !loadingStatus &&
      ((codeGenerated && displayCode) || invitationMsg || showExceeding)
    ) {
      return true;
    }
  }, [
    codeGenerated,
    displayCode,
    showModal,
    loadingStatus,
    invitationMsg,
    showExceeding,
  ]);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!inviteEmail) {
      setEmailError(false);
      setEmailErrorMsg('');
    }
  }, [inviteEmail]);

  useEffect(() => {
    if (existingInvite?.inviteCode !== displayCode) {
      setCodeGenerated(true);
      setDisplayCode(existingInvite?.inviteCode);
    }
  }, [existingInvite, displayCode]);

  const handleInvite = () => {
    if (!canGenerate || !isValidEmail(inviteEmail)) return;

    const code = uuid.v4().slice(0, 6).toUpperCase();

    const inviteObject = {
      inviteCode: code,
      email: inviteEmail,
      fromFirst: profile?.firstName,
      fromLast: profile?.lastName,
      fromEmail: profile?.email,
      joinCode: account?.joinCode,
      toExpire: new Date().toISOString(),
      accountID: account?.id,
    };

    setLoadingStatus(true);

    new Promise((resolve, reject) => {
      dispatch({
        type: 'QUEUE_INVITE_REQUEST',
        payload: {
          invite: inviteObject,
          accountID: account?.id,
          resolve,
          reject,
        },
      });
    })
      .then(({existing, invite, exceeding}) => {
        setInviteEmail('');
        setCodeGenerated(!!invite);
        setDisplayCode(invite?.inviteCode || '');
        setLoadingStatus(false);
        setCanGenerate(true);

        if (existing) {
          setShowModal(false);
          setInvitationMsg(
            'This invitation already exists. The expiration has been updated.',
          );
        } else if (exceeding) {
          setShowModal(false);
          setShowExceeding(true);
        } else {
          setInvitationMsg('');
        }
      })
      .catch(err => {
        setEmailError(true);
        setEmailErrorMsg(err.message || 'Invite failed');
        setLoadingStatus(false);
        setCanGenerate(true);
      });
  };

  const setScrolling = useMemo(() => {
    switch (device?.system?.deviceSize) {
      case 'small':
        return true;
      case 'xSmall':
        return true;
      default:
        return false;
    }
  }, [device?.system?.deviceSize]);

  return (
    <Layout
      headerTitle="Account"
      LeftButton=""
      RightButton="Logout"
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      mode="scroll-only"
      noBar={setScrolling}
      // outerViewStyles={{paddingBottom: 0}}
    >
      <View style={AccountStyles.topSection}>
        <View style={AccountStyles.sectionNav}>
          <SAButton
            title="Profile"
            location="AccountProfile"
            icon={<Icons.Profile size={20} color="#373d43" />}
          />
          <SAButton
            title="Settings"
            location="AccountSettings"
            icon={<Icons.Settings size={20} color="#373d43" />}
          />
          <SAButton
            title="Help"
            location="AccountHelp"
            icon={<Icons.Help size={20} color="#373d43" />}
          />
        </View>
      </View>

      <View style={AccountStyles.userSection}>
        <View style={AccountStyles.sectionUsers}>
          <View style={AccountStyles.usersHeader}>
            <Text size="small" font="open-7">
              Users:
            </Text>
            <Text size="xSmall" font="open-5">
              Have up to 4 users on your account
            </Text>
          </View>
          <View style={AccountStyles.avatarWrapper}>
            <BuildAvatar setShowModal={setShowModal} />
          </View>
        </View>
      </View>
      {/* <View style={AccountStyles.midSection}>
        <View style={AccountStyles.usersHeader}>
          <Text size="small" font="open-7">
            Collections:
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text size="xSmall">Coming Soon</Text>
        </View>
      </View>
      <View style={AccountStyles.midSection}>
        <View style={AccountStyles.usersHeader}>
          <Text size="small" font="open-7">
            Limits:
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text size="xSmall">Coming Soon</Text>
        </View>
      </View> */}
      {/* <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 2}}>
        <View style={{alignItems: 'flex-start'}}>
          <Text size="xSmall" italic>
            {deviceAppVersion}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text size="xSmall" italic>
            {buildVersion}
          </Text>
        </View>
      </View> */}
      <RenderModal
        showModal={showModal}
        showExceeding={showExceeding}
        invitationMsg={invitationMsg}
        displayCode={displayCode}
        loadingStatus={loadingStatus}
        codeGenerated={codeGenerated}
        closeModal={closeModal}
        handleInvite={handleInvite}
        inviteEmail={inviteEmail}
        setInviteEmail={setInviteEmail}
        emailError={emailError}
        emailErrorMsg={emailErrorMsg}
        canGenerate={canGenerate}
        showCodeModal={showCodeModal}
        existingInvite={existingInvite}
        account={account}
        setEmailError={setEmailError}
        setEmailErrorMsg={setEmailErrorMsg}
      />
    </Layout>
  );
};

const RenderModal = React.memo(props => {
  const {
    showModal,
    showExceeding,
    invitationMsg,
    displayCode,
    loadingStatus,
    codeGenerated,
    closeModal,
    handleInvite,
    inviteEmail,
    setInviteEmail,
    emailError,
    emailErrorMsg,
    canGenerate,
    showCodeModal,
    existingInvite,
    account,
    setEmailError,
    setEmailErrorMsg,
  } = props;
  const [confirmCopy, setConfirmCopy] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const copyToClipboard = () => {
    Clipboard.setString(displayCode);
    setConfirmCopy(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setConfirmCopy(false);
        });
      }, 5000);
    });
  };
  const isInviteModal = showModal;
  const isCodeModal = showCodeModal;
  const isLoading = loadingStatus;

  const getModalTitle = () => {
    if (showExceeding) return 'Maxed Invitations';
    if (invitationMsg) return 'Existing Code';
    if (codeGenerated) return 'Code Generated';
    return 'Invite User';
  };

  const renderInviteContent = () => {
    if (isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#29856c" />
          <Text size="medium" font="open-7">
            Generating Invite...
          </Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Input
          label="User Email"
          value={inviteEmail}
          onChangeText={text => {
            setInviteEmail(text.trim());
            setEmailError(false);
            setEmailErrorMsg('');
          }}
          validation={emailError}
          validationMessage={emailErrorMsg}
        />
        <Button onPress={handleInvite} disabled={!canGenerate}>
          Generate Invite
        </Button>
      </View>
    );
  };

  const renderCodeContent = () => (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      {!showExceeding && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="large" font="open-7" centered>
            Invitation Code: {existingInvite?.inviteCode}
          </Text>
        </View>
      )}
      {showExceeding && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="medium" font="open-6" centered>
            Sorry, but you've reached the maximum number of invitations on your
            account.
          </Text>
        </View>
      )}
      {invitationMsg && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="medium" font="open-6" centered>
            {invitationMsg}
          </Text>
        </View>
      )}
      {!showExceeding && !invitationMsg && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="small" font="open-6" centered>
            An invitation has been generated and sent to {existingInvite?.email}
            . Use this code to invite them to your account.
          </Text>
          <View style={{marginTop: 30}}>
            <Text size="xSmall" font="open-6" centered italic>
              For any reason they didn't get the email, you can press the button
              below to copy and send it via text or email yourself.
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <Button status="primary" size="small" onPress={copyToClipboard}>
              Copy Join Code
            </Button>
          </View>
          <Animated.View style={{opacity: fadeAnim, marginTop: 10}}>
            <Text size="small" font="open-5" centered>
              {confirmCopy && `Code copied!`}
            </Text>
          </Animated.View>
        </View>
      )}
      {showExceeding && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="small" font="open-5" centered italic>
            You currently have {account?.allowedUsers?.length} of 4 users and{' '}
            {account?.accountInvites?.length} active invitations on your
            account.
          </Text>
        </View>
      )}
      {invitationMsg && (
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text size="xSmall" font="open-5" centered italic>
            {invitationMsg}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={isInviteModal || isCodeModal}
      title={getModalTitle()}
      onClose={closeModal}
      height="80%"
      width="95%"
      headerFont="open-7">
      {isInviteModal && renderInviteContent()}
      {isCodeModal && renderCodeContent()}
    </Modal>
  );
});

export default Account;
