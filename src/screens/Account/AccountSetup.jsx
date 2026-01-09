//* AccountSetup.jsx

import React, {useEffect, useMemo, useState} from 'react';
import {Image, Keyboard, View} from 'react-native';
import {Button, Input, Modal, ScrollView, Text} from '../../KQ-UI';
import {
  useDeviceInfo,
  useFoundAccount,
  useFoundInvite,
} from '../../hooks/useHooks';
import {useCoreInfo} from '../../utilities/coreInfo';
import {useDispatch} from 'react-redux';
import {Icons} from '../../components/IconListRouter';

const AccountSetup = () => {
  const device = useDeviceInfo();
  const dispatch = useDispatch();
  const core = useCoreInfo();
  const {inviteFound, inviteData, error, errorMsg1, errorMsg2} =
    useFoundInvite();
  const {accountData} = useFoundAccount();

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showJoinAccount, setShowJoinAccount] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [foundInvite, setFoundInvite] = useState(false);
  const [foundInviteData, setFoundInviteData] = useState(null);
  const [inviteError, setInviteError] = useState(false);
  const [inviteErrorMsg1, setInviteErrorMsg1] = useState('');
  const [inviteErrorMsg2, setInviteErrorMsg2] = useState('');
  const [foundAccountData, setFoundAccountData] = useState(null);

  useEffect(() => {
    setFoundInvite(inviteFound);
    setFoundInviteData(inviteData);
    setInviteError(error);
    setInviteErrorMsg1(errorMsg1);
    setInviteErrorMsg2(errorMsg2);
  }, [inviteFound, inviteData, error, errorMsg1, errorMsg2]);

  useEffect(() => {
    if (inviteCode) {
      setFoundInvite(false);
      setFoundInviteData(null);
      setInviteError(false);
      setInviteErrorMsg1('');
      setInviteErrorMsg2('');
    }
  }, [inviteCode]);

  useEffect(() => {
    if (foundInviteData) {
      dispatch({
        type: 'CHECK_JOIN_ACCOUNT',
        payload: {
          accountID: foundInviteData?.accountID,
        },
      });
    }
  }, [foundInviteData]);

  useEffect(() => {
    setFoundAccountData(accountData);
  }, [accountData]);

  const logoSizeConfig = useMemo(() => {
    const type = device?.system?.deviceSize;
    switch (type) {
      case 'large':
        return {scale: 1.1, activityOffset: 65};
      case 'medium':
        return {scale: 1.2, activityOffset: 60};
      case 'small':
        return {scale: 1.3, activityOffset: 55};
      case 'xSmall':
        return {scale: 1.4, activityOffset: 50};
      default:
        return {scale: 1, activityOffset: 70};
    }
  }, [device]);

  const logoWidth = 350 / logoSizeConfig.scale;
  const logoHeight = 175 / logoSizeConfig.scale;

  const handleCreateAccount = () => {
    if (isCreatingAccount) return;
    setIsCreatingAccount(true);
    dispatch({
      type: 'CREATE_NEW_ACCOUNT',
      payload: {
        userID: core.userID,
        profileID: core.profileID,
      },
    });
    setTimeout(() => {
      setIsCreatingAccount(false);
    }, 30000);
  };

  const handleJoinAccount = () => {
    const code1 = foundInviteData?.joinCode;
    const code2 = foundAccountData?.joinCode;
    if (code1 === code2) {
      dispatch({
        type: 'UPDATE_PROFILE_REQUEST',
        payload: {
          userId: core.profileID,
          updatedData: {
            account: foundInviteData?.accountID,
            role: 'user',
          },
        },
      });
      dispatch({
        type: 'UPDATE_ACCOUNT',
        payload: {
          profileID: core.profileID,
          accountID: foundInviteData?.accountID,
          updatedData: {
            allowedUsers: [...foundAccountData?.allowedUsers, core.profileID],
            accountInvites: foundAccountData?.accountInvites?.filter(
              code => code !== foundInviteData?.inviteCode,
            ),
          },
        },
      });
      dispatch({
        type: 'DELETE_INVITE_REQUEST',
        payload: {
          inviteCode: foundInviteData?.inviteCode,
        },
      });
      setTimeout(() => {
        dispatch({type: 'START_LOGIN', payload: core?.userID});
      }, 2000);
    }
  };

  const handleSearchCode = () => {
    Keyboard.dismiss();
    const code = inviteCode.trim();

    if (code && code.length === 6) {
      dispatch({
        type: 'CHECK_JOIN_INVITE',
        payload: {
          inviteCode: code,
        },
      });
    } else {
      setInviteError(true);
      setInviteErrorMsg1('Invalid Code');
      setInviteErrorMsg2('Please check the code and try again.');
      return;
    }
  };

  const handleCancelJoin = () => {
    setFoundInvite(false);
    setFoundInviteData(null);
    setInviteError(false);
    setInviteErrorMsg1('');
    setInviteErrorMsg2('');
    dispatch({
      type: 'CLEAR_INVITE_DATA',
    });
    dispatch({
      type: 'CLEAR_TEMP_ACCOUNT_DATA',
    });
    setInviteCode('');
  };

  const handleGoBack = () => {
    setFoundInvite(false);
    setFoundInviteData(null);
    setInviteError(false);
    setInviteErrorMsg1('');
    setInviteErrorMsg2('');
    dispatch({
      type: 'CLEAR_INVITE_DATA',
    });
    dispatch({
      type: 'CLEAR_TEMP_ACCOUNT_DATA',
    });
    setInviteCode('');
    setShowJoinAccount(false);
  };

  const ListItem = ({children}) => (
    <Text size="small" centered>
      {`\u2022`} {children}
    </Text>
  );

  return (
    <>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../images/AppLogo_350.png')}
          style={{width: logoWidth, height: logoHeight}}
        />
      </View>
      <View style={{flex: 1}}>
        {showJoinAccount ? (
          <>
            <View style={styles.centeredBlock}>
              <View style={styles.topPadding}>
                <Text size="giant" font="open-7" centered italic>
                  Welcome
                </Text>
              </View>
              <View style={styles.introPadding}>
                <Text size="medium" centered>
                  Please enter the 6 alphanumeric code provided by the account
                  owner or the email you received, then press search.
                </Text>
              </View>
              <View style={styles.divider} />
            </View>
            <View>
              <Input
                label="Invitation Code"
                placeholder="Enter Here"
                value={inviteCode}
                onChangeText={setInviteCode}
                capitalize={true}
                capitalMode="characters"
                counter
                maxCount={6}
              />
              <Button disabled={foundInvite} onPress={handleSearchCode}>
                Search for Account
              </Button>
            </View>
            {foundInvite && (
              <View style={{margin: 30}}>
                <View style={{alignItems: 'center'}}>
                  <View style={{borderBottomWidth: 1}}>
                    <Text size="medium" font="open-7" centered>
                      Invitation Found:
                    </Text>
                  </View>
                </View>
                <View style={{marginVertical: 20}}>
                  <Text size="medium" font="open-7" centered>
                    {foundInviteData?.fromEmail}
                  </Text>
                  <Text size="medium" font="open-7" centered>
                    {foundInviteData?.fromFirst} {foundInviteData?.fromLast}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <Button onPress={handleJoinAccount}>Join Account</Button>
                  </View>
                  <View style={{flex: 1}}>
                    <Button color="danger" onPress={handleCancelJoin}>
                      Cancel
                    </Button>
                  </View>
                </View>
              </View>
            )}
            {inviteError && (
              <View style={{margin: 30}}>
                <Text kqColor="danger" size="large" font="open-7" centered>
                  {inviteErrorMsg1}
                </Text>
                <Text size="medium" font="open-7" centered italic>
                  {inviteErrorMsg2}
                </Text>
              </View>
            )}
            <Button
              type="ghost"
              onPress={handleGoBack}
              textStyle={{position: 'relative', left: -5}}>
              <Icons.ChevronLeft size={15} color={'#29856c'} />
              Go Back
            </Button>
          </>
        ) : (
          <ScrollView>
            <View style={styles.centeredBlock}>
              <View style={styles.topPadding}>
                <Text size="giant" font="open-7" centered italic>
                  Welcome
                </Text>
              </View>
              <View style={styles.introPadding}>
                <Text size="medium" centered>
                  Before you can use Kitchen Queue, you need to decide if you
                  want to create your own account or join another.
                </Text>
              </View>
              <View style={styles.divider} />
            </View>

            <View style={styles.section}>
              <Text size="large" font="open-7" centered>
                New Account (Free)
              </Text>
              <View>
                <Text size="xSmall" centered>
                  (Base Features Include)
                </Text>
                <ListItem>Invite / Add 3 more users</ListItem>
                <ListItem>100 Cupboard Items</ListItem>
                <ListItem>25 Shopping Items</ListItem>
                <ListItem>25 Favorite Items{'\u002A'}</ListItem>
                <ListItem>5 Recipes Items{'\u002A'}</ListItem>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  size="medium"
                  textSize="medium"
                  fontType="open-7"
                  onPress={handleCreateAccount}>
                  Create My Account
                </Button>
              </View>
              <View style={styles.centered}>
                <View style={styles.divider} />
              </View>
            </View>

            <View style={styles.section}>
              <Text size="large" font="open-7" centered>
                Join an Account
              </Text>
              <Text size="xSmall" centered>
                (Base Features plus...)
              </Text>
              <ListItem>
                Inherited subscription limits{'\u002A'}
                {'\u002A'}
              </ListItem>

              <View style={styles.buttonWrapper}>
                <Button
                  size="medium"
                  textSize="medium"
                  fontType="open-7"
                  onPress={() => setShowJoinAccount(true)}>
                  Join an Account
                </Button>
              </View>
            </View>

            <View style={styles.footerNote}>
              <Text size="small" centered italic>
                {'\u002A'} Features are coming soon and not yet available
              </Text>
              <Text size="small" centered italic>
                {'\u002A'}
                {'\u002A'} Subscriptions are not yet available
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = {
  logoContainer: {
    alignItems: 'center',
  },
  centeredBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPadding: {
    padding: 5,
  },
  introPadding: {
    padding: 10,
  },
  divider: {
    borderBottomWidth: 1,
    width: '80%',
    paddingBottom: 10,
    marginBottom: 20,
  },
  section: {
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  buttonWrapper: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  footerNote: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default AccountSetup;
