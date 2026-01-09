//* Home.jsx
import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Layout, Text, View} from '../../KQ-UI';
import {useCoreInfo} from '../../utilities/coreInfo';
import {Image, TouchableOpacity} from 'react-native';
import {useColors} from '../../KQ-UI/KQUtilities';
import {useDeviceInfo} from '../../hooks/useHooks';
import {Icons} from '../../components/IconListRouter';
import {setHapticFeedback} from '../../hooks/setHapticFeedback';

const Home = () => {
  const core = useCoreInfo();
  const device = useDeviceInfo();
  const navigation = useNavigation();
  const isTablet = device?.system?.device === 'Tablet';
  const sideWays = device?.view === 'Landscape';

  let screenWidth = device?.dimensions?.width;
  if (!screenWidth || isNaN(screenWidth)) screenWidth = 1000;

  const imageCutRatio = useMemo(() => {
    if (isTablet && sideWays) {
      return 2000 / (screenWidth / 1.5);
    } else if (isTablet && !sideWays) {
      return 1500 / (screenWidth / 1.5);
    }
    if (!isTablet) {
      return 1000 / (screenWidth / 1.5);
    }
  }, [isTablet, sideWays, screenWidth]);
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
          <View style={blankStyle} p5>
            {children}
          </View>
        ) : (
          <View row>
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
              <View style={[{height: 35, width: 40}, iconStyles]} centerVH m5>
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
                  <Text size={isTablet ? 'medium' : 'small'} font="mont-7">
                    {title}
                  </Text>
                  <Text size={isTablet ? 'xSmall' : 'tiny'} font="mont-6">
                    {subTitle}
                  </Text>
                </View>
                <Text size={isTablet ? 'medium' : 'small'} font="mont-7">
                  {value1} of {value2}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  });

  const DisplayCellMap = useMemo(
    () => [
      {
        title: 'Shopping',
        subTitle: '(Cart / List)',
        value1: core?.shoppingAllItemsLength,
        value2: core?.maxShoppingItems,
        icon: <Icons.Shopping size={25} />,
        onPress: () => navigation.navigate('ShoppingList'),
        isDisabled: false,
      },
      {
        title: 'Cupboards',
        subTitle: '(Items)',
        value1: core?.cupboardLength,
        value2: core?.maxCupboardItems,
        icon: <Icons.Cupboards size={25} />,
        onPress: () => navigation.navigate('CupboardList-Single'),
        isDisabled: false,
      },
      {
        title: 'Favorites',
        subTitle: '(Items)',
        value1: core?.favoritesLength,
        value2: core?.maxFavoriteItems,
        icon: <Icons.Star size={25} />,
        onPress: () => navigation.navigate('FavoritesList'),
        isDisabled: false,
      },
      {
        title: 'Recipe Box',
        subTitle: '(Recipes)',
        value1: core?.recipeBoxLength,
        value2: core?.maxRecipeBoxItems,
        icon: <Icons.Chest size={25} />,
        onPress: () => navigation.navigate('RecipeBox'),
        isDisabled: false,
      },
      {
        title: 'Item Scanner',
        subTitle: '(Daily Limit)',
        value1: core?.dailyUPCCounter,
        value2: core?.maxUPCSearchLimit,
        icon: <Icons.Barcode size={20} />,
        isDisabled: true,
      },
      {
        title: 'Find Recipes',
        subTitle: '(Daily Limit)',
        value1: core?.dailyRecipeCounter,
        value2: core?.maxRecipeSearchLimit,
        icon: <Icons.Search size={25} />,
        onPress: () => navigation.navigate('RecipeSearch'),
        isDisabled: false,
      },
    ],
    [core, navigation],
  );

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const DisplayCellArray = useMemo(() => {
    const columns = isTablet ? 3 : 2;
    const rows = chunkArray(DisplayCellMap, columns);

    return (
      <View centerV>
        {rows.map((row, i) => (
          <View row m5 key={i}>
            {row.map((cell, j) => (
              <DisplayCell
                key={`${i}-${j}`}
                infoCentered
                title={cell.title}
                subTitle={cell.subTitle}
                value1={cell.value1}
                value2={cell.value2}
                icon={cell.icon}
                onPress={cell.onPress}
                disabled={cell.isDisabled}
              />
            ))}
          </View>
        ))}
      </View>
    );
  }, [isTablet, DisplayCellMap]);

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
      <View flex={1} centerV>
        <View centerVH mt10 mb5>
          <View centerVH>
            <Image
              source={require('../../images/AppLogo_1000.png')}
              style={{width: imageWidth, height: imageHeight}}
            />
          </View>
        </View>
      </View>
      <View centerV>{DisplayCellArray}</View>
      <View flex={1} />
    </Layout>
  );
};

export default Home;
