//*CurvedBottomBar.jsx
import React from 'react';
import Svg, {
  Path,
  Defs,
  Filter,
  FeOffset,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode,
} from 'react-native-svg';

const CurvedBottomBar = props => {
  const {
    width = width || 500,
    height = height || 60,
    fill = fill || '#fff',
    stroke = stroke || '#373d4370',
    strokeWidth = strokeWidth || 1,
    shadowStroke = shadowStroke || '#373d4360',
    shadowStrokeWidth = shadowStrokeWidth || 2,
  } = props;

  const startX = 0;
  const endX = width - 0;
  const topY = 2;
  const bottomY = height;

  const leftCurveStartX = width / 2 - 65;
  const leftCurveEndX = width / 2 - 30;
  const rightCurveStartX = width / 2 + 30;
  const rightCurveEndX = width / 2 + 65;

  const d = `
  M ${startX},${bottomY}
  L ${startX},20
  C ${startX},20 ${topY},${topY} 25,${topY}
  L ${leftCurveStartX},${topY}
  C ${leftCurveStartX},${topY} ${width / 2 - 40},${topY} ${leftCurveEndX},25
  C ${width / 2 - 25},38 ${width / 2 - 15},44 ${width / 2},44
  C ${width / 2 + 15},44 ${width / 2 + 25},38 ${rightCurveStartX},25
  C ${width / 2 + 40},${topY} ${rightCurveEndX},${topY} ${rightCurveEndX},${topY}
  L ${endX - 20},${topY}
  C ${endX - 25},${topY} ${endX - 2},${topY} ${endX},20
  L ${endX},${bottomY}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <Filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <FeOffset dx="0" dy="3" />
          <FeGaussianBlur stdDeviation="3" result="blurred" />
          <FeMerge>
            <FeMergeNode in="blurred" />
            <FeMergeNode in="SourceGraphic" />
          </FeMerge>
        </Filter>
      </Defs>

      <Path
        d={d}
        fill="none"
        stroke={shadowStroke}
        strokeWidth={shadowStrokeWidth}
        filter="url(#shadow)"
      />

      <Path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </Svg>
  );
};

export default CurvedBottomBar;
