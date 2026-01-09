//* fractionUnit.js

const fractionMap = {
  0.125: '⅛',
  0.167: '⅙',
  0.2: '⅕',
  0.25: '¼',
  0.333: '⅓',
  0.375: '⅜',
  0.4: '⅖',
  0.5: '½',
  0.6: '⅗',
  0.625: '⅝',
  0.667: '⅔',
  0.75: '¾',
  0.8: '⅘',
  0.833: '⅚',
  0.875: '⅞',
};

const roundTo = (value, step = 0.01) => Math.round(value / step) * step;

export const toFraction = amount => {
  if (typeof amount !== 'number') return amount;

  const whole = Math.floor(amount);
  const decimal = roundTo(amount - whole);

  let fraction = Object.entries(fractionMap).find(
    ([num]) => Math.abs(decimal - parseFloat(num)) < 0.02,
  );

  if (!fraction) return amount.toString(); // fallback

  const fractionStr = fraction[1];
  if (whole === 0) return fractionStr;
  return `${whole} ${fractionStr}`;
};
