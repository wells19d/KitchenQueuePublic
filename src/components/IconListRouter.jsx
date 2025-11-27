//*IconListRouter.jsx
import ADIcons from 'react-native-vector-icons/AntDesign';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIIcons from 'react-native-vector-icons/MaterialIcons';
import IIcons from 'react-native-vector-icons/Ionicons';
import EIcons from 'react-native-vector-icons/Entypo';
import FIcons from 'react-native-vector-icons/Fontisto';
import FEIcons from 'react-native-vector-icons/Feather';
import SIIcons from 'react-native-vector-icons/SimpleLineIcons';
import OctIcons from 'react-native-vector-icons/Octicons';
import ZOIcons from 'react-native-vector-icons/Zocial';
import {Keyboard} from 'react-native';

export const Icons = {
  Account: props => (
    <MCIcons name="account-circle" size={20} color="#000" {...props} />
  ),
  AdminEdit: props => (
    <MCIcons name="shield-lock-outline" size={20} color="#000" {...props} />
  ),
  AddCart: props => (
    <FAIcons name="cart-plus" size={20} color="#000" {...props} />
  ),
  AddList: props => (
    <MCIcons name="playlist-plus" size={20} color="#000" {...props} />
  ),
  Back: props => (
    <MIIcons name="arrow-back-ios" size={20} color="#000" {...props} />
  ),
  Barcode: props => (
    <FAIcons name="barcode" size={20} color="#000" {...props} />
  ),

  BookmarkPlus: props => (
    <MCIcons name="bookmark-plus-outline" size={20} color="#000" {...props} />
  ),
  BookmarkMinus: props => (
    <MCIcons name="bookmark-remove-outline" size={20} color="#000" {...props} />
  ),
  Camera: props => <FEIcons name="camera" size={20} color="#000" {...props} />,
  Check: props => <FA5Icons name="check" size={20} color="#000" {...props} />,
  CheckFilledCircle: props => (
    <OctIcons name="check-circle-fill" size={20} color="#000" {...props} />
  ),
  Dot: props => <MCIcons name="circle" size={20} color="#000" {...props} />,
  EmptyCircle: props => (
    <OctIcons name="circle" size={20} color="#000" {...props} />
  ),
  XCircle: props => (
    <OctIcons name="x-circle-fill" size={20} color="#000" {...props} />
  ),
  XCircleOutline: props => (
    <OctIcons name="x-circle" size={20} color="#000" {...props} />
  ),
  Chest: props => (
    <MCIcons name="treasure-chest" size={20} color="#000" {...props} />
  ),
  ChevronDown: props => (
    <FEIcons name="chevron-down" size={20} color="#000" {...props} />
  ),

  ChevronUp: props => (
    <FEIcons name="chevron-up" size={20} color="#000" {...props} />
  ),
  ChevronLeft: props => (
    <FEIcons name="chevron-left" size={20} color="#000" {...props} />
  ),
  CirclePlus: props => (
    <ADIcons name="pluscircleo" size={20} color="#000" {...props} />
  ),
  Close: props => <MCIcons name="close" size={20} color="#000" {...props} />,
  Cupboards: props => (
    <MCIcons name="wardrobe" size={20} color="#000" {...props} />
  ),
  Dev: props => <MCIcons name="dev-to" size={20} color="#000" {...props} />,
  Edit: props => <MIIcons name="edit-note" size={20} color="#000" {...props} />,
  EyeOn: props => <MCIcons name="eye" size={20} color="#000" {...props} />,
  EyeOff: props => <MCIcons name="eye-off" size={20} color="#000" {...props} />,
  Favorite: props => (
    <OctIcons name="star-fill" size={20} color="#000" {...props} />
  ),
  Filter: props => (
    <IIcons name="filter-outline" size={20} color="#000" {...props} />
  ),
  Frame: props => <SIIcons name="frame" size={20} color="#000" {...props} />,
  Forward: props => (
    <MIIcons name="arrow-forward-ios" size={20} color="#000" {...props} />
  ),
  Home: props => <MCIcons name="home" size={20} color="#000" {...props} />,
  Help: props => (
    <MCIcons name="help-circle" size={20} color="#000" {...props} />
  ),
  InCart: props => (
    <FAIcons name="cart-arrow-down" size={20} color="#000" {...props} />
  ),
  Keyboard: props => (
    <MCIcons name="keyboard-variant" size={20} color="#000" {...props} />
  ),
  Menu: props => <FEIcons name="menu" size={20} color="#000" {...props} />,
  MenuList: props => <MCIcons name="menu" size={20} color="#000" {...props} />,
  LightOn: props => (
    <MIIcons name="flashlight-on" size={20} color="#000" {...props} />
  ),
  LightOff: props => (
    <MIIcons name="flashlight-off" size={20} color="#000" {...props} />
  ),
  Logout: props => <MIIcons name="logout" size={20} color="#000" {...props} />,
  Merge: props => (
    <MCIcons name="set-merge" size={20} color="#000" {...props} />
  ),
  Minus: props => <MCIcons name="minus" size={20} color="#000" {...props} />,
  Options: props => (
    <MCIcons name="dots-horizontal" size={20} color="#000" {...props} />
  ),
  Plus: props => <MCIcons name="plus" size={20} color="#000" {...props} />,
  Profile: props => (
    <ADIcons name="profile" size={20} color="#000" {...props} />
  ),
  Recipe: props => (
    <MCIcons name="treasure-chest" size={20} color="#000" {...props} />
  ),
  Receipt: props => (
    <MIIcons name="receipt-long" size={20} color="#000" {...props} />
  ),
  Save: props => (
    <MCIcons name="content-save" size={20} color="#000" {...props} />
  ),
  Search: props => <MIIcons name="search" size={20} color="#000" {...props} />,
  Settings: props => (
    <FA5Icons name="wrench" size={20} color="#000" {...props} />
  ),
  Share: props => <MCIcons name="share" size={20} color="#000" {...props} />,
  Shopping: props => (
    <FAIcons name="shopping-cart" size={20} color="#000" {...props} />
  ),
  Split: props => (
    <MCIcons name="set-split" size={20} color="#000" {...props} />
  ),
  Star: props => <MCIcons name="star" size={20} color="#000" {...props} />,
  Upload: props => <FEIcons name="upload" size={20} color="#000" {...props} />,
  Warning: props => <IIcons name="warning" size={20} color="#000" {...props} />,
  WarningOutline: props => (
    <IIcons name="warning-outline" size={20} color="#000" {...props} />
  ),
  Wave: props => <MCIcons name="wave" size={20} color="#000" {...props} />,
  Waves: props => <MCIcons name="waves" size={20} color="#000" {...props} />,
};
