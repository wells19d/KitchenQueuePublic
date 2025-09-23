//* Home.jsx
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Layout, Text} from '../../KQ-UI';
import {useCoreInfo} from '../../utilities/coreInfo';
import {Image, TouchableOpacity, View} from 'react-native';
import {useColors} from '../../KQ-UI/KQUtilities';
import {useDeviceInfo} from '../../hooks/useHooks';
import {Icons} from '../../components/IconListRouter';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';

const Home = () => {
  const core = useCoreInfo();
  const device = useDeviceInfo();
  const navigation = useNavigation();

  let screenWidth = device?.dimensions?.width;
  const imageCutRatio = 1000 / (screenWidth / 1.5);
  const imageWidth = 1000 / imageCutRatio;
  const imageHeight = 500 / imageCutRatio;

  // const greetingMsg = () => {
  //   if (core?.firstName) {
  //     return `Hello, ${core?.firstName}!`;
  //   } else {
  //     return `Hello new user!`;
  //   }
  // };

  // const displayDate = () => {
  //   let day = moment(new Date()).format('ddd');
  //   let date = moment(new Date()).format('MMM DD, YYYY');
  //   return `${day}, ${date}`;
  // };

  const DisplayCell = React.memo(props => {
    const {
      title,
      subTitle,
      icon,
      value1,
      value2,
      blank = false,
      blankStyle = {},
      iconStyles = {},
      height,
      infoCentered,
      onPress = () => {},
      children,
      disabled = false,
    } = props;
    const useHaptics = setHapticFeedback();
    const fixedHeight = height || 90;
    const {color, border} = useMemo(() => {
      const newValue1 = value1 || 0;
      const newValue2 = value2 || 0;
      const percent = newValue2 !== 0 ? (newValue1 / newValue2) * 100 : 0;
      let mode = 'basic';

      if (percent <= 50) {
        mode = 'success';
      } else if (percent <= 85) {
        mode = 'warning';
      } else if (percent <= 100) {
        mode = 'danger';
      }

      const modeStyles = {
        success: {
          color: 'success10',
          border: 'success30',
        },
        warning: {
          color: 'warning10',
          border: 'warning30',
        },
        danger: {color: 'danger10', border: 'danger30'},
        basic: {color: 'basic'},
        header: {color: 'white'},
      };

      const selected = modeStyles[mode] || modeStyles.basic;

      return {
        color: useColors(selected.color),
        border: useColors(selected.border),
      };
    }, [value1, value2]);

    const handleOnPress = () => {
      useHaptics(core?.userSettings?.hapticStrength || 'light');
      onPress();
    };

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderWidth: 1.5,
          borderRadius: 15,
          height: fixedHeight,
          marginHorizontal: 5,
          backgroundColor: useColors('white'),
          borderColor: useColors('dark30'),
          shadowColor: useColors('dark'),
          shadowOffset: {width: 1, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 1.5,
          elevation: 8,
          overflow: 'hidden',
        }}
        disabled={disabled}
        onPress={() => handleOnPress()}>
        {blank ? (
          <View style={[{padding: 5}, blankStyle]}>{children}</View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: fixedHeight,
                justifyContent: 'center',
                backgroundColor: color,
                borderTopLeftRadius: 14,
                borderBottomLeftRadius: 14,
                borderRightWidth: 1,
                borderRightColor: border,
              }}>
              <View
                style={[
                  {
                    height: 35,
                    width: 35,
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  iconStyles,
                ]}>
                {icon}
              </View>
            </View>
            <View
              style={{
                height: fixedHeight,
                flex: 1,
                justifyContent: infoCentered ? 'center' : 'flex-start',
                alignItems: infoCentered ? 'center' : 'flex-start',
              }}>
              <View
                style={{
                  flex: 1,
                  marginBottom: 5,
                  justifyContent: infoCentered ? 'space-evenly' : 'flex-start',
                  alignItems: infoCentered ? 'center' : 'flex-start',
                }}>
                <View
                  style={{alignItems: infoCentered ? 'center' : 'flex-start'}}>
                  <Text size="small" font="mont-7">
                    {title}
                  </Text>
                  <Text size="tiny" font="mont-6">
                    {subTitle}
                  </Text>
                </View>
                <Text size="small" font="mont-7">
                  {value1} of {value2}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  });

  const DisplayRow = ({children}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          marginVertical: 5,
        }}>
        {children}
      </View>
    );
  };

  return (
    <Layout
      headerTitle="Home"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      outerViewStyles={{paddingBottom: 0}}
      innerViewStyles={{}}>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 5,
        }}>
        <View>
          <Image
            source={require('../../images/AppLogo_1000.png')}
            style={{width: imageWidth, height: imageHeight}}
          />
        </View>
      </View>
      <DisplayRow>
        <DisplayCell
          infoCentered
          title="Shopping"
          subTitle="(Cart / List)"
          value1={core?.shoppingAllItemsLength}
          value2={core?.maxShoppingItems}
          icon={<Icons.Shopping size={25} />}
          onPress={() => navigation.navigate('ShoppingList')}
        />
        <DisplayCell
          infoCentered
          title="Cupboards"
          subTitle="(Items)"
          value1={core?.cupboardLength}
          value2={core?.maxCupboardItems}
          icon={<Icons.Cupboards size={25} />}
          onPress={() => navigation.navigate('CupboardList-Single')}
        />
      </DisplayRow>
      <DisplayRow>
        <DisplayCell
          infoCentered
          title="Favorites"
          subTitle="(Items)"
          value1={core?.favoritesLength}
          value2={core?.maxFavoriteItems}
          // iconStyles={{marginTop: -1}}
          icon={<Icons.Star size={25} />}
          onPress={() => navigation.navigate('FavoritesList')}
        />
        <DisplayCell
          infoCentered
          title="Recipe Box"
          subTitle="(Recipes)"
          value1={core?.recipeBoxLength}
          value2={core?.maxRecipeBoxItems}
          // iconStyles={{marginTop: -4}}
          icon={<Icons.Chest size={25} />}
          onPress={() => navigation.navigate('RecipeBox')}
        />
      </DisplayRow>
      <DisplayRow>
        <DisplayCell
          infoCentered
          title="Item Scanner"
          subTitle="(Daily Limit)"
          value1={core?.dailyUPCCounter}
          value2={core?.maxUPCSearchLimit}
          icon={<Icons.Barcode size={20} />}
          // onPress={() => navigation.navigate('FavoritesList')}
          disabled
        />
        <DisplayCell
          infoCentered
          title="Find Recipes"
          subTitle="(Daily Limit)"
          value1={core?.dailyRecipeCounter}
          value2={core?.maxRecipeSearchLimit}
          icon={<Icons.Search size={25} />}
          onPress={() => navigation.navigate('RecipeSearch')}
        />
      </DisplayRow>
    </Layout>
  );
};

export default Home;
