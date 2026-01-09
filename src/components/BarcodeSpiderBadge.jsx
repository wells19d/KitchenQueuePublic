import * as React from 'react';
import Svg, {Rect, Text, G} from 'react-native-svg';

const BarcodeSpiderBadge = ({width = 200, height = 80}) => {
  const barCount = 16;
  const barSpacing = width / (barCount * 2);
  const barWidth = barSpacing / 1.2;

  // Randomized dummy bar heights (just for realistic visual variation)
  const heights = [
    0.9, 0.7, 1, 0.6, 0.95, 0.75, 1, 0.8, 0.5, 0.9, 0.65, 1, 0.7, 0.9, 0.6,
    0.85,
  ];

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 160"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet">
      <G>
        {/* Dummy barcode bars */}
        {heights.map((scale, i) => {
          const x = 40 + i * (barWidth + barSpacing);
          const barHeight = 60 * scale;
          const y = 30 + (60 - barHeight);
          return (
            <Rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#000"
              rx={1}
            />
          );
        })}

        {/* Brand text */}
        <Text
          x="50%"
          y="135"
          fill="#000000"
          fontSize="40"
          fontWeight="normal"
          fontFamily="Georgia, Times New Roman, serif"
          textAnchor="middle">
          BarcodeSpider.com
        </Text>
      </G>
    </Svg>
  );
};

export default BarcodeSpiderBadge;
