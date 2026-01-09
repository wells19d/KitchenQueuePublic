// listHelpers.js

import {Icons} from '../../../components/IconListRouter';
import {View} from '../../../KQ-UI';
import {useColors} from '../../../KQ-UI/KQUtilities';
import {capEachWord} from '../../../utilities/helpers';

const useColor = useColors;

const getIconBorder = color => ({
  borderWidth: 2,
  borderRadius: 50,
  width: 35,
  height: 35,
  borderColor: useColor(color),
});

export const renderIcon = indicator => {
  const c = useColor(indicator.color);

  const wrap = child => (
    <View style={getIconBorder(indicator.color)} centerVH mh10>
      {child}
    </View>
  );

  // 🔑 EDGE CASE FIX:
  // Convertible but not enough → treat as MATCH (green)
  if (indicator.status === 'notEnough' && indicator.convertible) {
    return wrap(<Icons.Check color={useColor('success')} size={16} />);
  }

  switch (indicator.status) {
    case 'match':
      return wrap(<Icons.Check color={c} size={16} />);

    case 'notEnough':
      return wrap(
        <View style={{top: -1}}>
          <Icons.Warning color={c} size={20} />
        </View>,
      );

    case 'inCart':
      return wrap(
        <View style={{left: -1}}>
          <Icons.InCart color={c} size={21} />
        </View>,
      );

    case 'inList':
      return wrap(
        <View style={{left: -1}}>
          <Icons.Receipt color={c} size={21} />
        </View>,
      );

    case 'optional':
      return wrap(
        <View style={{top: -1}}>
          <Icons.WarningOutline color={c} size={22} />
        </View>,
      );

    case 'noMatch':
      return wrap(<Icons.XNoOutline color={c} size={25} />);
  }
};

export const renderSubInfo = (indicator, ing) => {
  if (indicator.status === 'notEnough' && indicator.convertible) {
    return `You have enough ${capEachWord(ing.name)}`;
  }

  switch (indicator.status) {
    case 'match':
      return `You have enough ${capEachWord(ing.name)}`;
    case 'notEnough':
      return `You need more ${capEachWord(ing.name)}`;
    case 'inCart':
      return `${capEachWord(ing.name)} is in your shopping cart`;
    case 'inList':
      return `${capEachWord(ing.name)} is in your shopping list`;
    case 'optional':
      return `${capEachWord(ing.name)} is optional`;
    case 'noMatch':
      return `You don’t have any ${capEachWord(ing.name)}`;
  }
};
