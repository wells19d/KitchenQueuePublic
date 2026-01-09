//*NavHeader.jsx
import React, {useCallback} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../KQ-UI';
import {Icons} from './IconListRouter';
import {setHapticFeedback} from '../hooks/setHapticFeedback';
import {useDispatch} from 'react-redux';
import {useShoppingCart} from '../hooks/useHooks';
import {NavHeaderStyles} from '../styles/Styles';
import {useCoreInfo} from '../utilities/coreInfo';

const NavHeader = ({
  title = '',
  headerColor = '#29856c',
  textColor = '#000',
  LeftButton = 'None',
  RightButton = 'None',
  LeftAction,
  RightAction,
  sheetOpen,
}) => {
  const navigation = useNavigation();
  const useHaptics = setHapticFeedback();
  const dispatch = useDispatch();
  const shopping = useShoppingCart();
  const core = useCoreInfo();
  let fadeText = '#ffffff60';

  const cartList =
    shopping?.items?.filter(item => item.status === 'shopping-cart') ?? [];

  const handleSignOut = useCallback(() => {
    Alert.alert('Logging Out', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'destructive'},
      {
        text: 'Confirm',
        onPress: () => {
          useHaptics(core?.userSettings?.hapticStrength || 'light');
          dispatch({type: 'LOGOUT_AND_CLEAR'});
        },
      },
    ]);
  }, [core?.userSettings?.hapticStrength, dispatch]);

  const NavButtonComponent = ({
    position,
    action,
    navigate,
    goBack,
    title,
    icon,
  }) => {
    const handlePress = useCallback(() => {
      if (navigate) navigation.navigate(navigate);
      if (goBack) navigation.goBack();
      if (action) action();
      useHaptics(core?.userSettings?.hapticStrength || 'light');
    }, [navigate, goBack, action, core?.userSettings?.hapticStrength]);

    const isLeft = position === 'Left';

    if (sheetOpen) {
      return (
        <View
          style={[
            isLeft ? NavHeaderStyles.leftWrapper : NavHeaderStyles.rightWrapper,
            {flex: 1},
          ]}>
          {isLeft && icon && (
            <View style={NavHeaderStyles.iconPosition}>{icon}</View>
          )}
          <View
            style={
              isLeft
                ? NavHeaderStyles.leftContainer
                : NavHeaderStyles.rightContainerAlt
            }>
            {title && (
              <Text style={{color: sheetOpen ? fadeText : textColor}}>
                {title}
              </Text>
            )}
          </View>
          {!isLeft && icon && (
            <View style={NavHeaderStyles.iconPosition}>{icon}</View>
          )}
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={handlePress}>
          <View
            style={
              isLeft
                ? NavHeaderStyles.leftWrapper
                : NavHeaderStyles.rightWrapper
            }>
            {isLeft && icon && (
              <View style={NavHeaderStyles.iconPosition}>{icon}</View>
            )}
            <View
              style={
                isLeft
                  ? NavHeaderStyles.leftContainer
                  : NavHeaderStyles.rightContainerAlt
              }>
              {title && <Text style={{color: textColor}}>{title}</Text>}
            </View>
            {!isLeft && icon && (
              <View style={NavHeaderStyles.iconPosition}>{icon}</View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  };

  // ✅ Toggle memo for NavButton
  const NavButton = __DEV__
    ? NavButtonComponent
    : React.memo(NavButtonComponent);

  const renderButton = (buttonType, position) => {
    if (!buttonType || buttonType === 'None') return null;

    const allowedLeftButtons = [
      'Back',
      'Cancel',
      'Cancel-WA',
      'Cancel-Scan',
      'Close',
      'Merge',
      'Split',
      'To-List',
    ];
    const allowedRightButtons = [
      'Add',
      'Checkout',
      'Create',
      'Edit',
      'Logout',
      'Save',
      'Scan',
      'Submit',
      'To-Cart',
      'Torch-On',
      'Torch-Off',
      'Update',
    ];

    if (
      (position === 'Left' && !allowedLeftButtons.includes(buttonType)) ||
      (position === 'Right' && !allowedRightButtons.includes(buttonType))
    ) {
      console.warn(
        `Invalid placement: Button "${buttonType}" is not allowed on the ${position} side.`,
      );
      return null;
    }

    const buttonProps = {
      position,
      title: '',
      icon: null,
      action: null,
      navigate: null,
      goBack: false,
      showCondition: true,
    };

    switch (buttonType) {
      case 'Add':
        buttonProps.title = 'Add';
        buttonProps.icon = (
          <Icons.AddList size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Back':
        buttonProps.title = 'Back';
        buttonProps.icon = (
          <Icons.Back size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.goBack = true;
        break;

      case 'Cancel':
        buttonProps.title = 'Cancel';
        buttonProps.goBack = true;
        break;

      case 'Cancel-WA':
        buttonProps.title = 'Cancel';
        buttonProps.action = () => LeftAction();
        break;

      case 'Cancel-Scan':
        buttonProps.title = 'Cancel';
        buttonProps.action = () => LeftAction();
        break;

      case 'Checkout':
        buttonProps.title = 'Checkout';
        buttonProps.showCondition = cartList?.length > 0;
        buttonProps.icon = (
          <Icons.Forward size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Close':
        buttonProps.title = 'Close';
        buttonProps.action = () => LeftAction();
        break;

      case 'Create':
        buttonProps.title = 'Create';
        buttonProps.icon = (
          <Icons.AddList size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Edit':
        buttonProps.title = 'Edit';
        buttonProps.icon = (
          <Icons.Edit size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Logout':
        buttonProps.title = 'Logout';
        buttonProps.icon = (
          <Icons.Logout size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = handleSignOut;
        break;

      case 'Merge':
        buttonProps.title = 'Grouped';
        buttonProps.navigate = 'CupboardList-Single';
        buttonProps.icon = (
          <View style={{marginRight: 5}}>
            <Icons.Merge size={25} color={sheetOpen ? fadeText : textColor} />
          </View>
        );
        break;

      case 'Save':
        buttonProps.title = 'Save';
        buttonProps.icon = (
          <Icons.Save size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Scan':
        buttonProps.title = 'Scan';
        buttonProps.icon = (
          <Icons.Barcode size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      case 'Split':
        buttonProps.title = 'Single';
        buttonProps.navigate = 'CupboardList-Group';
        buttonProps.icon = (
          <View style={{marginRight: 5}}>
            <Icons.Split size={25} color={sheetOpen ? fadeText : textColor} />
          </View>
        );
        break;

      case 'To-Cart':
        buttonProps.title = 'Cart';
        buttonProps.navigate = 'ShoppingCart';
        buttonProps.icon = <Icons.Forward size={20} color={textColor} />;
        buttonProps.showCondition = cartList?.length > 0;
        break;

      case 'To-List':
        buttonProps.title = 'List';
        buttonProps.navigate = 'ShoppingList';
        buttonProps.icon = (
          <Icons.Back size={20} color={sheetOpen ? fadeText : textColor} />
        );
        break;
      case 'Torch-On':
        buttonProps.title = 'Light On';
        buttonProps.icon = (
          <Icons.LightOn size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;
      case 'Torch-Off':
        buttonProps.title = 'Light Off';
        buttonProps.icon = (
          <Icons.LightOff size={20} color={sheetOpen ? fadeText : textColor} />
        );
        buttonProps.action = () => RightAction();
        break;

      default:
        console.warn(`Unknown buttonType: "${buttonType}"`);
        return null;
    }

    if (!buttonProps.showCondition) return null;

    return <NavButton {...buttonProps} />;
  };

  return (
    <View
      style={[
        NavHeaderStyles.header,
        {backgroundColor: headerColor ?? '#fff', height: 50},
      ]}>
      <View style={NavHeaderStyles.titleContainer}>
        <Text style={{color: textColor}}>{title}</Text>
      </View>
      <View style={NavHeaderStyles.buttonContainer}>
        <View style={NavHeaderStyles.buttonRows}>
          <View style={NavHeaderStyles.sideContainers}>
            {renderButton(LeftButton, 'Left')}
          </View>
          <View style={NavHeaderStyles.sideContainers}>
            {renderButton(RightButton, 'Right')}
          </View>
        </View>
      </View>
    </View>
  );
};

export default __DEV__ ? NavHeader : React.memo(NavHeader);
