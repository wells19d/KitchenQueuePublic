//* KQToast.jsx
import Toast, {BaseToast} from 'react-native-toast-message';

const DEFAULT_VISIBILITY_TIME = 1500;

// ✅ Patch Toast.show to use default visibilityTime if not provided
const originalShow = Toast.show;
Toast.show = (options = {}) => {
  if (!options.visibilityTime) {
    options.visibilityTime = DEFAULT_VISIBILITY_TIME;
  }
  originalShow(options);
};

const toastStyles = (fontSize1, fontSize2) => ({
  baseStyle: {
    top: 60,
    minHeight: 75,
    paddingVertical: 10,
    height: 'auto',
  },
  primary: {borderLeftColor: '#29856c'},
  success: {borderLeftColor: '#63b76C'},
  info: {borderLeftColor: '#009DC4'},
  warning: {borderLeftColor: '#dda44b'},
  danger: {borderLeftColor: '#da2c43'},
  error: {borderLeftColor: '#da2c43'},
  dark: {borderLeftColor: '#373d43'},
  basic: {borderLeftColor: '#C4C4C4'},
  textStyle1: {
    fontSize: fontSize1 || 16,
    color: '#000',
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  textStyle2: {
    fontSize: fontSize2 || 14,
    color: '#000',
    fontFamily: 'OpenSans-SemiBold',
    fontWeight: '600',
  },
});

const toastConfig = {
  primary: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);

    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.primary]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  success: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.success]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  info: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.info]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  warning: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.warning]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  danger: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.danger]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  error: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.error]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  dark: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.dark]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
  basic: props => {
    const {fontSize1, fontSize2} = props.props || {};
    const styles = toastStyles(fontSize1, fontSize2);
    return (
      <BaseToast
        {...props}
        style={[styles.baseStyle, styles.basic]}
        text1Style={styles.textStyle1}
        text2Style={styles.textStyle2}
        text1NumberOfLines={2}
        text2NumberOfLines={10}
        topOffset={100}
      />
    );
  },
};

export default toastConfig;
