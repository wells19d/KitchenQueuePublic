//* KQView.jsx
import React, {useMemo} from 'react';
import {View} from 'react-native';

const spacingKeys = [
  'm',
  'ml',
  'mr',
  'mt',
  'mb',
  'mh',
  'mv',
  'p',
  'pl',
  'pr',
  'pt',
  'pb',
  'ph',
  'pv',
];
const spacingValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const getSpacingProps = props => {
  const result = {};

  spacingKeys.forEach(key => {
    spacingValues.forEach(val => {
      const propName = `${key}${val}`;
      if (props[propName]) {
        result[key] = val;
      }
    });
  });

  return result;
};

const parseSpacing = prop => {
  if (typeof prop === 'number') return prop;
  const valid = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  return valid.includes(prop) ? prop : undefined;
};

const KQView = ({
  row,
  column,
  flex,
  centerV = false,
  centerH = false,
  centerVH = false,
  rightAlign = false,
  bottomAlign = false,
  topAlign = false,
  border = false,
  borderWidth = 1,
  borderColor = 'black',

  // Margin and padding (numeric or shorthand)
  m,
  ml,
  mr,
  mt,
  mb,
  mh,
  mv,
  p,
  pl,
  pr,
  pt,
  pb,
  ph,
  pv,

  style = {},
  children,
  ...props
}) => {
  const shorthand = getSpacingProps(props);

  const computedStyle = useMemo(() => {
    const s = {};

    if (row) s.flexDirection = 'row';
    if (column) s.flexDirection = 'column';
    if (flex !== undefined) s.flex = flex === true ? 1 : flex;
    if (border) s.borderWidth = borderWidth;
    if (borderColor) s.borderColor = borderColor;

    if (centerVH) {
      s.justifyContent = 'center';
      s.alignItems = 'center';
    } else {
      if (centerV) s.justifyContent = 'center';
      if (centerH) {
        s.alignItems = 'center';
        s.alignContent = 'center';
      }
    }

    if (rightAlign) {
      s.alignItems = 'flex-end';
      s.alignContent = 'flex-end';
    }

    if (bottomAlign) {
      s.justifyContent = 'flex-end';
    }

    if (topAlign) {
      s.justifyContent = 'flex-start';
    }

    // Merge explicit + shorthand spacing
    const final = {
      m: m ?? shorthand.m,
      ml: ml ?? shorthand.ml,
      mr: mr ?? shorthand.mr,
      mt: mt ?? shorthand.mt,
      mb: mb ?? shorthand.mb,
      mh: mh ?? shorthand.mh,
      mv: mv ?? shorthand.mv,
      p: p ?? shorthand.p,
      pl: pl ?? shorthand.pl,
      pr: pr ?? shorthand.pr,
      pt: pt ?? shorthand.pt,
      pb: pb ?? shorthand.pb,
      ph: ph ?? shorthand.ph,
      pv: pv ?? shorthand.pv,
    };

    // Margin
    if (final.m !== undefined) s.margin = parseSpacing(final.m);
    if (final.ml !== undefined) s.marginLeft = parseSpacing(final.ml);
    if (final.mr !== undefined) s.marginRight = parseSpacing(final.mr);
    if (final.mt !== undefined) s.marginTop = parseSpacing(final.mt);
    if (final.mb !== undefined) s.marginBottom = parseSpacing(final.mb);
    if (final.mh !== undefined) {
      s.marginLeft = parseSpacing(final.mh);
      s.marginRight = parseSpacing(final.mh);
    }
    if (final.mv !== undefined) {
      s.marginTop = parseSpacing(final.mv);
      s.marginBottom = parseSpacing(final.mv);
    }

    // Padding
    if (final.p !== undefined) s.padding = parseSpacing(final.p);
    if (final.pl !== undefined) s.paddingLeft = parseSpacing(final.pl);
    if (final.pr !== undefined) s.paddingRight = parseSpacing(final.pr);
    if (final.pt !== undefined) s.paddingTop = parseSpacing(final.pt);
    if (final.pb !== undefined) s.paddingBottom = parseSpacing(final.pb);
    if (final.ph !== undefined) {
      s.paddingLeft = parseSpacing(final.ph);
      s.paddingRight = parseSpacing(final.ph);
    }
    if (final.pv !== undefined) {
      s.paddingTop = parseSpacing(final.pv);
      s.paddingBottom = parseSpacing(final.pv);
    }

    return s;
  }, [
    row,
    column,
    flex,
    centerV,
    centerH,
    centerVH,
    rightAlign,
    m,
    ml,
    mr,
    mt,
    mb,
    mh,
    mv,
    p,
    pl,
    pr,
    pt,
    pb,
    ph,
    pv,
    props,
  ]);

  return (
    <View style={[computedStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default KQView;
