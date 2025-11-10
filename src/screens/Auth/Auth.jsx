//* Auth.jsx
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Input, Layout, ScrollView, Text} from '../../KQ-UI';
import {useDeviceInfo, useLoginError} from '../../hooks/useHooks';
import {Icons} from '../../components/IconListRouter';
import {useColors} from '../../KQ-UI/KQUtilities';

function Auth(props) {
  const {bgColor, isSplashVisible} = props;
  const dispatch = useDispatch();
  const device = useDeviceInfo();
  const loginError = useLoginError();

  // ---------- View + Animation State ----------
  const [authView, setAuthView] = useState('create'); // 'login' | 'create' | 'completed'
  const [logoSet, setLogoSet] = useState(false);
  const [delayedError, setDelayedError] = useState(null);
  const logoTop = useRef(new Animated.Value(2)).current;
  const hasAnimated = useRef(false);

  // ---------- Input State ----------
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  // ---------- Derived Sizes ----------
  const deviceWidth = device?.dimensions?.width;
  const deviceHeight = device?.dimensions?.height;

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
  const actPosition = logoSizeConfig.activityOffset;

  const xPosition = useMemo(() => {
    if (!deviceWidth || !logoWidth) return 0;
    return deviceWidth / 2 - logoWidth / 2 - 5;
  }, [deviceWidth]);

  const yPosition = useMemo(() => {
    if (!deviceHeight || !logoHeight) return 0;
    return deviceHeight / 2.25 - logoHeight / 1.37;
  }, [deviceHeight]);

  // ---------- Validation ----------
  const isValidEmail = useCallback(
    email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [],
  );

  const isValidPassword = useCallback(
    password =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,}$/.test(
        password,
      ),
    [],
  );

  const canSignIn = isValidEmail(email) && isValidPassword(password);

  const passwordValidation = useMemo(() => {
    const length = createPassword.length >= 8;
    const upperCase = /[A-Z]/.test(createPassword);
    const lowerCase = /[a-z]/.test(createPassword);
    const number = /\d/.test(createPassword);
    const special = /[!@#$%&*]/.test(createPassword);
    const onlyAllowedChars = /^[a-zA-Z0-9!@#$%&*]*$/.test(createPassword);
    const match =
      confirmedPassword.length > 0 && createPassword === confirmedPassword;

    return {
      validEmail: isValidEmail(createEmail),
      length,
      upperCase,
      lowerCase,
      number,
      special,
      onlyAllowedChars,
      match,
    };
  }, [createEmail, createPassword, confirmedPassword, isValidEmail]);

  const checkMode = useCallback(
    (type, value1, value2) => {
      if (type === 'password-length')
        return value1 >= 8 ? 'check' : value1 ? 'error' : 'uncheck';
      if (type === 'email-check')
        return isValidEmail(value1) ? 'check' : value1 ? 'error' : 'uncheck';
      if (type === 'default')
        return value2 === 0 ? 'uncheck' : value1 ? 'check' : 'error';
    },
    [isValidEmail],
  );

  const allValid = Object.values(passwordValidation).every(Boolean);

  // ---------- Effects ----------
  useEffect(() => {
    if (!isSplashVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      Animated.timing(logoTop, {
        toValue: -(deviceHeight / 2.25 - logoHeight),
        duration: 800,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start(() => setLogoSet(true));
    }
  }, [isSplashVisible]);

  useEffect(() => {
    if (!isSplashVisible && logoSet) {
      setAuthView('login');
    }
  }, [isSplashVisible, logoSet]);

  useEffect(() => {
    if (loginError) {
      const showErrorTimer = setTimeout(() => setDelayedError(loginError), 200);
      const logoutTimer = setTimeout(() => {
        dispatch({type: 'LOGOUT_AND_CLEAR'});
      }, 300);
      const resetFieldsTimer = setTimeout(() => {
        setPassword('');
      }, 1000);
      const clearErrorTimer = setTimeout(() => {
        setDelayedError(null);
      }, 5000);

      return () => {
        clearTimeout(showErrorTimer);
        clearTimeout(logoutTimer);
        clearTimeout(resetFieldsTimer);
        clearTimeout(clearErrorTimer);
      };
    } else {
      setDelayedError(null);
    }
  }, [loginError]);

  // ---------- Handlers ----------
  const handleInputChange = setter => value => {
    dispatch({type: 'LOGIN_FAILED', payload: null});
    setter(value);
  };

  const handleSignIn = () => {
    if (canSignIn) {
      dispatch({type: 'LOGIN_REQUEST', payload: {email, password}});
    }
  };

  const handleCreateUser = () => {
    if (allValid) {
      dispatch({
        type: 'SIGNUP_REQUEST',
        payload: {email: createEmail, password: createPassword},
      });

      setTimeout(() => setAuthView('completed'), 100);
      setTimeout(() => {
        setCreateEmail('');
        setCreatePassword('');
        setConfirmedPassword('');
        setEmail('');
        setPassword('');
      }, 500);
      setTimeout(() => setAuthView('login'), 7000);
    }
  };

  // ---------- UI Render ----------
  const CheckListWrap = ({children}) => (
    <View
      style={{
        backgroundColor: '#fff',
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 8,
        shadowColor: '#373d4380',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 4,
        margin: 5,
        padding: 2,
      }}>
      {children}
    </View>
  );

  const CheckListItem = ({mode, message}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 3,
        paddingVertical: 3,
      }}>
      <View style={{marginRight: 5}}>
        {mode === 'check' ? (
          <Icons.CheckFilledCircle size={15} color={useColors('primary')} />
        ) : mode === 'error' ? (
          <Icons.XCircle size={15} color={useColors('danger')} />
        ) : (
          <Icons.EmptyCircle size={15} color={useColors('dark60')} />
        )}
      </View>
      <Text
        size="xSmall"
        kqColor={
          mode === 'check' ? 'primary' : mode === 'error' ? 'danger' : 'dark60'
        }>
        {message}
      </Text>
    </View>
  );

  const renderEyeIcon = (visible, setVisible) => {
    const IconComponent = visible ? Icons.EyeOff : Icons.EyeOn;
    if (!IconComponent) return null;

    return (
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <IconComponent />
      </TouchableWithoutFeedback>
    );
  };

  const RenderDisplay = () => {
    switch (authView) {
      case 'login':
        return (
          <ScrollView
            style={{
              flex: 1,
              marginTop: logoHeight * 1.25,
              paddingTop: logoHeight / 1.5,
              paddingLeft: 10,
              marginHorizontal: -5,
            }}>
            <Input
              placeholder="Email"
              capitalize={false}
              value={email}
              onChangeText={handleInputChange(setEmail)}
              autoComplete="email"
              textContentType="emailAddress"
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={handleInputChange(setPassword)}
              accessoryRight={() =>
                renderEyeIcon(secureTextEntry, setSecureTextEntry)
              }
              autoComplete="password"
              textContentType="password"
              secureTextEntry={true}
              capitalize={false}
            />
            <Button
              status={canSignIn ? 'primary' : 'basic'}
              onPress={handleSignIn}
              disabled={!canSignIn}>
              Sign In
            </Button>
            <View style={{marginVertical: 10}}>
              <Button
                type="ghost"
                color="primary"
                size="giant"
                textSize="medium"
                font="open-6"
                underline
                underlineWidth={2}
                onPress={() => setAuthView('create')}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    // size="medium"
                    font="open-7"
                    kqColor="primary">{`New User?`}</Text>
                  <Text
                    font="open-7"
                    kqColor="primary">{`Let's get started!`}</Text>
                </View>
              </Button>
            </View>
            <View style={{height: 100, justifyContent: 'center'}}>
              {delayedError && (
                <Text size="small" centered kqColor="danger">
                  {delayedError}
                </Text>
              )}
            </View>
          </ScrollView>
        );
      case 'create':
        return (
          <ScrollView
            style={{
              flex: 1,
              marginTop: logoHeight * 1.25,
              paddingTop: 20,
              paddingLeft: 10,
              marginHorizontal: -5,
              backgroundColor: '#fff',
            }}>
            <Input
              placeholder="Email"
              capitalize={false}
              value={createEmail}
              onChangeText={setCreateEmail}
            />
            <Input
              placeholder="Password"
              value={createPassword}
              onChangeText={setCreatePassword}
              accessoryRight={() =>
                renderEyeIcon(secureTextEntry1, setSecureTextEntry1)
              }
              secureTextEntry={secureTextEntry1}
              capitalize={false}
            />
            <Input
              placeholder="Verify Password"
              value={confirmedPassword}
              onChangeText={setConfirmedPassword}
              accessoryRight={() =>
                renderEyeIcon(secureTextEntry2, setSecureTextEntry2)
              }
              secureTextEntry={secureTextEntry2}
              capitalize={false}
            />
            <CheckListWrap>
              <CheckListItem
                mode={checkMode('email-check', createEmail)}
                message="Valid email format"
              />
              <CheckListItem
                mode={checkMode('password-length', createPassword.length)}
                message="At least 8 characters"
              />
              <CheckListItem
                mode={checkMode(
                  'default',
                  passwordValidation.upperCase,
                  createPassword.length,
                )}
                message="An uppercase letter"
              />
              <CheckListItem
                mode={checkMode(
                  'default',
                  passwordValidation.lowerCase,
                  createPassword.length,
                )}
                message="A lowercase letter"
              />
              <CheckListItem
                mode={checkMode(
                  'default',
                  passwordValidation.number,
                  createPassword.length,
                )}
                message="A number"
              />
              <CheckListItem
                mode={checkMode(
                  'default',
                  passwordValidation.special,
                  createPassword.length,
                )}
                message="A special character (@$!%*?&)"
              />
              <CheckListItem
                mode={checkMode(
                  'default',
                  passwordValidation.match,
                  confirmedPassword.length,
                )}
                message="Passwords match"
              />
              {!passwordValidation.onlyAllowedChars && (
                <CheckListItem
                  mode={checkMode(
                    'default',
                    passwordValidation.onlyAllowedChars,
                    createPassword.length,
                  )}
                  message="Unsupported Character Used"
                />
              )}
            </CheckListWrap>
            <Button
              status={allValid ? 'primary' : 'basic'}
              disabled={!allValid}
              onPress={handleCreateUser}>
              Create User
            </Button>
            <View style={{marginVertical: 10}}>
              <Button
                type="ghost"
                color="primary"
                size="giant"
                textSize="medium"
                font="open-6"
                underline
                underlineWidth={2}
                onPress={() => setAuthView('login')}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    // size="medium"
                    font="open-7"
                    kqColor="primary">{`Returning user?`}</Text>
                  <Text
                    font="open-7"
                    kqColor="primary">{`Press here to sign in.`}</Text>
                </View>
              </Button>
            </View>
          </ScrollView>
        );
      case 'completed':
        return (
          <View
            style={{
              flex: 1,
              marginTop: logoHeight * 1.25,
              paddingTop: 100,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
            }}>
            <Text size="large" font="open-7" centered>
              Your profile has been created!
            </Text>
            <View style={{marginTop: 20}}>
              <Text size="medium" font="open-5" centered>
                We've emailed you a link!
              </Text>
              <Text size="medium" font="open-5" centered>
                Tap it to verify before logging in.
              </Text>
            </View>
            <Button
              type="ghost"
              color="primary"
              underline
              onPress={() => setAuthView('login')}>
              Back to Login
            </Button>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Layout useHeader={false} mode="keyboard-static">
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: yPosition,
          left: xPosition,
          zIndex: 999,
          transform: [{translateY: logoTop}],
        }}>
        {isSplashVisible && (
          <View style={{position: 'relative', top: actPosition}}>
            <ActivityIndicator size="large" color="#29856c" />
          </View>
        )}
        <Image
          source={require('../../images/AppLogo_350.png')}
          style={{width: logoWidth, height: logoHeight}}
        />
      </Animated.View>
      {!isSplashVisible && logoSet && RenderDisplay()}
    </Layout>
  );
}

export default Auth;
