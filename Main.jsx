//* Main.jsx
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavMenu from './src/components/NavMenu';
import {useDispatch} from 'react-redux';
import {getNavMenuHeight} from './src/utilities/deviceUtils';
import Home from './src/screens/Home/Home';
import {
  useAccount,
  useAuth,
  useDeviceInfo,
  useProfile,
} from './src/hooks/useHooks';
import {setHapticFeedback} from './src/hooks/setHapticFeedback';
import Account from './src/screens/Account/Account';
import CupboardSingle from './src/screens/Cupboard/CupboardSingle';
import ShoppingList from './src/screens/Shopping/ShoppingList';
import CenterMenu from './src/screens/CenterMenu/CenterMenu';
import {BottomSheet, Button, Modal, Text, View} from './src/KQ-UI';
import DevInputs from './src/screens/Dev/DevInputs';
import DevButtons from './src/screens/Dev/DevButtons';
import DevDropdowns from './src/screens/Dev/DevDropdowns';
import DevPlayground from './src/screens/Dev/DevPlayground';
import DevModals from './src/screens/Dev/DevModals';
import DevText from './src/screens/Dev/DevText';
import {getAuth} from '@react-native-firebase/auth';
import {getApp} from '@react-native-firebase/app';
import Auth from './src/screens/Auth/Auth';
import {
  RTAccounts,
  RTProfiles,
  RTShopping,
  RTCupboards,
  RTUsers,
  RTAllowedProfiles,
  RTFavorites,
  RTRecipeBox,
} from './src/utilities/realtime';
import TermsService from './src/screens/Legal/TermsService';
import PrivacyPolicy from './src/screens/Legal/PrivacyPolicy';
import {AppInfo} from './AppInfo';
import {enableScreens} from 'react-native-screens';
import ShoppingCart from './src/screens/Shopping/ShoppingCart';
import CupboardGroup from './src/screens/Cupboard/CupboardGroup';
import ShoppingItems from './src/screens/Shopping/ShoppingItems';
import CupboardItems from './src/screens/Cupboard/CupboardItems';
import Settings from './src/screens/Account/Settings';
import Help from './src/screens/Account/Help';
import Profile from './src/screens/Account/Profile';
import Vibrations from './src/screens/Account/Vibrations';
import ItemDisplay from './src/screens/Account/ItemDisplay';
import Resets from './src/screens/Account/Resets';
import AccountSetup from './src/screens/Account/AccountSetup';
import FavoriteItems from './src/screens/Favorites/FavoriteItems';
import FavoritesList from './src/screens/Favorites/FavoritesList';
import RecipeSearch from './src/screens/Recipe/RecipeSearch';
import NavigationMode from 'react-native-navigation-mode';
import RecipeBox from './src/screens/Recipe/RecipeBox';
import AddRecipe from './src/screens/Recipe/AddRecipe';
import FastImage from 'react-native-fast-image';
import {useRequestPermissions} from './src/hooks/useRequestPermissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = props => {
  const {appReady, isSplashVisible} = props;

  const dispatch = useDispatch();
  const device = useDeviceInfo();
  const profile = useProfile();
  const account = useAccount();
  const useHaptics = setHapticFeedback();
  const Stack = createNativeStackNavigator();
  const isAuthenticated = useAuth();
  const [mode, setMode] = useState(null);

  const [headerColor, setHeaderColor] = useState('black');
  const [screenLocation, setScreenLocation] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#373d43');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const bottomHeight = getNavMenuHeight(device, mode);

  const [showPPModal, setShowPPModal] = useState(false);
  const [showTOSModal, setShowTOSModal] = useState(true);
  const [currentModal, setCurrentModal] = useState('');
  enableScreens(true);

  const [renderDisplay, setRenderDisplay] = useState('auth');

  // Request permissions (for camera and photos) on first launch
  const {requestPermissions} = useRequestPermissions(renderDisplay);
  const [showPermModal, setShowPermModal] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (renderDisplay !== 'main') return;

      const alreadyShown = await AsyncStorage.getItem('permissionsModalShown');
      if (!alreadyShown) {
        setShowPermModal(true);
        await AsyncStorage.setItem('permissionsModalShown', 'true');
      }
    };
    check();
  }, [renderDisplay]);

  // checks navigation mode (gesture, buttons, etc) for android
  useEffect(() => {
    let isMounted = true;

    NavigationMode.getNavigationMode()
      .then(result => {
        if (isMounted) {
          setMode(result);
        }
      })
      .catch(err => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Step 1: Handle base state – app readiness and auth
  useEffect(() => {
    if (!appReady) {
      setRenderDisplay('logo');
      return;
    }

    if (!isAuthenticated) {
      setRenderDisplay('auth');
      return;
    }
  }, [appReady, isAuthenticated]);

  // Step 2: Wait until profile.account is fully resolved
  useEffect(() => {
    if (!appReady || !isAuthenticated) return;

    if (profile && 'account' in profile) {
      if (profile.account === null) {
        setRenderDisplay('accountSetup');
      } else {
        setRenderDisplay('main');
      }
    }
  }, [appReady, isAuthenticated, profile]);

  const RTEnabled = isAuthenticated && account !== null;
  RTAccounts(RTEnabled);
  RTUsers(RTEnabled);
  RTProfiles(RTEnabled);
  RTShopping(RTEnabled);
  RTCupboards(RTEnabled);
  RTAllowedProfiles(RTEnabled);
  RTFavorites(RTEnabled);
  RTRecipeBox(RTEnabled);

  useEffect(() => {
    try {
      const auth = getAuth(getApp());
      const user = auth.currentUser;

      if (user) {
        dispatch({type: 'SET_USER', payload: user});
      } else {
        dispatch({type: 'LOGOUT'});
      }
    } catch (e) {
      dispatch({type: 'LOGOUT'});
    }
  }, []);

  const borrowedParams = useMemo(
    () => ({bgColor, textColor, headerColor, screenLocation}),
    [bgColor, textColor, headerColor, screenLocation],
  );

  useEffect(() => {
    if (isAuthenticated && profile && account !== null) {
      if (!profile?.tosVersion || profile?.tosVersion !== AppInfo.tosVersion) {
        setCurrentModal('TOS');
        setShowTOSModal(true);
      } else if (
        !profile?.ppVersion ||
        profile?.ppVersion !== AppInfo.ppVersion
      ) {
        setCurrentModal('PP');
        setShowPPModal(true);
      }
    }
  }, [isAuthenticated, profile, account]);

  useEffect(() => {
    dispatch({type: 'FETCH_DEVICE_INFO'});

    const subscription = Dimensions.addEventListener('change', () => {
      dispatch({type: 'FETCH_DEVICE_INFO'});
    });

    return () => subscription?.remove();
  }, [dispatch]);

  const handlePPConfirm = () => {
    let updatedData = {
      ppVersion: AppInfo.ppVersion,
    };
    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {userId: profile?.id, updatedData},
    });
    setShowPPModal(false);

    if (profile?.tosVersion !== AppInfo.tosVersion) {
      setCurrentModal('TOS');
      setShowTOSModal(true);
    }
  };

  const handleTOSConfirm = () => {
    let updatedData = {
      tosVersion: AppInfo.tosVersion,
    };
    dispatch({
      type: 'UPDATE_PROFILE_REQUEST',
      payload: {userId: profile?.id, updatedData},
    });
    setShowTOSModal(false);
    setCurrentModal('');
  };

  const handleCancel = type => {
    Alert.alert(
      `${type} Declined`,
      `Not accepting the ${type}, you will be logged out and prevented from using Kitchen Queue. Are you sure you want to decline?`,
      [
        {text: 'Back'},
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            dispatch({type: 'LOGOUT'});
          },
        },
      ],
    );
  };

  const permissionLocation = () => {
    if (Platform.OS === 'ios') {
      return 'Settings → Apps → Kitchen Queue.';
    } else if (Platform.OS === 'android') {
      return 'Settings → Apps → Kitchen Queue → Permissions.';
    }
  };

  const toggleMenu = useCallback(() => {
    setIsSheetOpen(prev => !prev);
    useHaptics(profile?.userSettings?.hapticStrength || 'light');
  }, [useHaptics]);

  const BottomMenu = () => (
    <BottomSheet
      visible={isSheetOpen}
      onClose={() => setIsSheetOpen(false)}
      snapPoints={[0.01, 0.95]}>
      <CenterMenu borrowedParams={borrowedParams} toggleMenu={toggleMenu} />
    </BottomSheet>
  );

  const Navigation = () => {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            animation: 'none',
            gestureEnabled: false,
            headerBackVisible: false,
            headerShown: false,
            navigationBarColor: '#f7f7f7',
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingList}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="ShoppingItems"
            component={ShoppingItems}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="CupboardList-Single"
            component={CupboardSingle}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="CupboardList-Group"
            component={CupboardGroup}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="CupboardItems"
            component={CupboardItems}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="FavoritesList"
            component={FavoritesList}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="FavoriteItems"
            component={FavoriteItems}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="RecipeSearch"
            component={RecipeSearch}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipe}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="RecipeBox"
            component={RecipeBox}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="AccountProfile"
            component={Profile}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="AccountSettings"
            component={Settings}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="AccountHelp"
            component={Help}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="Vibrations"
            component={Vibrations}
            options={{freezeOnBlur: true}}
          />
          <Stack.Screen
            name="ItemDisplay"
            component={ItemDisplay}
            options={{freezeOnBlur: true}}
          />
          {/* <Stack.Screen
            name="AdvancedFields"
            component={AdvancedFields}
            options={{ freezeOnBlur: true }} 
            
          /> */}
          {/* <Stack.Screen
            name="DefaultView"
            component={DefaultGroupView}
            options={{ freezeOnBlur: true }} 
          
          /> */}
          <Stack.Screen
            name="Resets"
            component={Resets}
            options={{freezeOnBlur: true}}
          />
          {/* <Stack.Screen
            name="Passwords"
            component={Passwords}
            options={{ freezeOnBlur: true }} 
        
          /> */}
          {__DEV__ && (
            <>
              <Stack.Screen
                name="DevPlayground"
                component={DevPlayground}
                options={{freezeOnBlur: true}}
              />
              <Stack.Screen
                name="DevText"
                component={DevText}
                options={{freezeOnBlur: true}}
              />
              <Stack.Screen
                name="DevInputs"
                component={DevInputs}
                options={{freezeOnBlur: true}}
              />
              <Stack.Screen
                name="DevButtons"
                component={DevButtons}
                options={{freezeOnBlur: true}}
              />
              <Stack.Screen
                name="DevModals"
                component={DevModals}
                options={{freezeOnBlur: true}}
              />
              <Stack.Screen
                name="DevDropdowns"
                component={DevDropdowns}
                options={{freezeOnBlur: true}}
              />
            </>
          )}
          <Stack.Screen name="Login" component={Auth} />
        </Stack.Navigator>
      </>
    );
  };

  if (renderDisplay === 'loading') {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{margin: 20}}>
          <ActivityIndicator size="large" color="#29856c" />
        </View>
        <Text size="medium" font="open-6">
          Just getting things ready...
        </Text>
      </View>
    );
  }

  if (renderDisplay === 'logo') {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{position: 'relative', top: 10}}>
          <Image source={require('./src/images/AppLogo_350.png')} />
        </View>
      </View>
    );
  }

  if (renderDisplay === 'auth') {
    return (
      <SafeAreaView style={{flex: 1, margin: 5}}>
        <Auth bgColor={bgColor} isSplashVisible={isSplashVisible} />
      </SafeAreaView>
    );
  }

  if (renderDisplay === 'main') {
    return (
      <NavigationContainer>
        <SafeAreaView
          style={{flex: 1, backgroundColor: '#29856c'}}
          edges={['top']}>
          <View style={{flex: 1}}>
            <Navigation />
            <BottomMenu toggleMenu={toggleMenu} />
          </View>
        </SafeAreaView>
        <SafeAreaView style={{height: bottomHeight}} edges={['bottom']}>
          <NavMenu
            bottomHeight={bottomHeight}
            bottomWidth={device?.dimensions?.width}
            toggleMenu={toggleMenu}
            setIsSheetOpen={setIsSheetOpen}
            device={device}
            navMode={mode}
          />
        </SafeAreaView>
        {currentModal === 'TOS' && (
          <Modal
            visible={showTOSModal}
            title="Terms of Service Update"
            fullScreen
            hideClose>
            <TermsService
              handleTOSConfirm={handleTOSConfirm}
              handleCancel={handleCancel}
            />
          </Modal>
        )}

        {currentModal === 'PP' && (
          <Modal
            visible={showPPModal}
            title="Privacy Policy Update"
            fullScreen
            hideClose>
            <PrivacyPolicy
              handlePPConfirm={handlePPConfirm}
              handleCancel={handleCancel}
            />
          </Modal>
        )}

        {showPermModal && (
          <Modal
            visible={showPermModal}
            onClose={() => setShowPermModal(false)}
            title="Permissions Required"
            headerFont="open-6"
            headerSize="small"
            height="50%"
            width="90%"
            // fullScreen
            hideClose>
            <View flex column>
              <View flex ph15 centerVH>
                <View mv10 ph10>
                  <Text size="medium" style={{marginBottom: 15}} centered>
                    Kitchen Queue needs access to your Camera and Photos to take
                    and upload images, as well as scan UPCs and recipes.
                  </Text>
                </View>
                <View mv10>
                  <Text centered italic>
                    You can update these permissions later in{' '}
                    {permissionLocation()}
                  </Text>
                </View>
              </View>
              <View mv25 ph15>
                <Button
                  onPress={async () => {
                    setShowPermModal(false);
                    await requestPermissions(); // triggers native system dialogs
                  }}>
                  Set Permissions
                </Button>
              </View>
            </View>
          </Modal>
        )}
      </NavigationContainer>
    );
  }

  if (renderDisplay === 'accountSetup') {
    return (
      <SafeAreaView style={{flex: 1, margin: 5}}>
        <StatusBar backgroundColor={bgColor} barStyle="light-content" />
        <AccountSetup />
      </SafeAreaView>
    );
  }
};

export default Main;
