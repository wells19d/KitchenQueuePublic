//* shortenUnit.js
export const shortenUnit = unit => {
  if (!unit || typeof unit !== 'string') return '';

  const normalized = unit.toLowerCase().trim();
  if (!normalized) return '';

  const unitMap = {
    // explicitly omitted units
    each: '',
    serving: '',
    servings: '',

    // weight
    pound: 'lb',
    pounds: 'lbs',
    ounce: 'oz',
    ounces: 'oz',
    gram: 'g',
    grams: 'g',
    kilogram: 'kg',
    kilograms: 'kg',
    mg: 'mg',
    milligram: 'mg',

    // volume
    teaspoon: 'tsp',
    teaspoons: 'tsp',
    tablespoon: 'tbsp',
    tablespoons: 'tbsp',
    cup: 'cup',
    cups: 'cups',
    pint: 'pt',
    pints: 'pt',
    quart: 'qt',
    quarts: 'qt',
    gallon: 'gal',
    gallons: 'gal',
    liter: 'L',
    liters: 'L',
    milliliter: 'ml',
    milliliters: 'ml',
    'fluid ounce': 'fl oz',
    'fluid ounces': 'fl oz',

    // counts & non-quantifiables
    clove: 'clv',
    cloves: 'clv',
    piece: 'pc',
    pieces: 'pc',
    slice: 'slc',
    slices: 'slc',
    stick: 'stk',
    sticks: 'stk',

    // informal units
    pinch: 'pinch',
    pinches: 'pinch',
    dash: 'dash',
    dashes: 'dash',
    bunch: 'bunch',
    bunches: 'bunch',
    sprig: 'sprig',
    sprigs: 'sprig',
    handful: 'handful',
    handfuls: 'handful',

    // containers
    can: 'can',
    cans: 'can',
    jar: 'jar',
    jars: 'jar',
    bag: 'bag',
    bags: 'bag',
    bottle: 'btl',
    bottles: 'btl',
    packet: 'pkt',
    packets: 'pkt',
    container: 'ctnr',
    containers: 'ctnr',

    // extras
    drop: 'drop',
    drops: 'drop',
    shot: 'shot',
    shots: 'shot',
    scoop: 'scoop',
    scoops: 'scoop',
  };

  // fallback: return empty string for omitted, or normalized value if unknown
  if (unitMap.hasOwnProperty(normalized)) {
    return unitMap[normalized]; // '', 'tsp', etc.
  }

  return normalized; // fallback for unknown units
};
