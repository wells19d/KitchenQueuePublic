// * conversions.js
//
// Measurement normalization and conversion logic
// for cupboard items and recipe usage

// Core idea:
// - Always convert values down to the smallest base unit first
// - Perform all math at that level
// - Then convert back up to the highest sensible display unit
//
// Important behavior to remember:
// - Conversions may change the item's measurement type
//   (e.g. pounds → ounces, gallons → quarts)
// - packageSize and remainingAmount are intentionally recalculated
//   to stay consistent with the new measurement
//
// Do NOT treat remainingAmount as immutable or tied to the original unit.
// It always reflects the current normalized measurement.

let liquidLadder = [
  'gallon',
  'quart',
  'pint',
  'cup',
  'fluidounce',
  'tablespoon',
  'teaspoon',
];

let weightLadder = ['pound', 'ounce', 'gram'];

const unitValues = {
  gallon: {
    quart: 4,
    pint: 8,
    cup: 16,
    fluidounce: 128,
    tablespoon: 256,
    teaspoon: 768,
  },
  quart: {
    gallon: 1 / 4,
    pint: 2,
    cup: 4,
    fluidounce: 32,
    tablespoon: 64,
    teaspoon: 192,
  },
  pint: {
    gallon: 1 / 8,
    quart: 1 / 2,
    cup: 2,
    fluidounce: 16,
    tablespoon: 32,
    teaspoon: 96,
  },
  cup: {
    gallon: 1 / 16,
    quart: 1 / 4,
    pint: 1 / 2,
    fluidounce: 8,
    tablespoon: 16,
    teaspoon: 48,
  },
  fluidounce: {
    gallon: 1 / 128,
    quart: 1 / 32,
    pint: 1 / 16,
    cup: 1 / 8,
    tablespoon: 2,
    teaspoon: 6,
  },
  tablespoon: {
    gallon: 1 / 256,
    quart: 1 / 64,
    pint: 1 / 32,
    cup: 1 / 16,
    fluidounce: 1 / 2,
    teaspoon: 3,
  },
  teaspoon: {
    gallon: 1 / 768,
    quart: 1 / 192,
    pint: 1 / 96,
    cup: 1 / 48,
    fluidounce: 1 / 6,
    tablespoon: 1 / 3,
  },

  // weight (base: pound)
  pound: {ounce: 16, gram: 453.592},
  ounce: {pound: 1 / 16, gram: 28.3495},
  gram: {pound: 1 / 453.592, ounce: 1 / 28.3495},
};

const buildAll = (unit, amount) => {
  let out = {[unit]: amount};
  let conv = unitValues[unit];
  if (!conv) return out;

  for (let u in conv) {
    out[u] = amount * conv[u];
  }
  return out;
};

export const exportData = (measurement, packageSize, remainingAmount) => {
  if (remainingAmount > packageSize) {
    remainingAmount = packageSize;
  }

  const ladder = liquidLadder.includes(measurement)
    ? liquidLadder
    : weightLadder.includes(measurement)
    ? weightLadder
    : null;

  if (!ladder) {
    return {
      measurement,
      packageSize,
      remainingAmount: Number(remainingAmount.toFixed(2)),
    };
  }

  const pkg = buildAll(measurement, packageSize);
  const rem = buildAll(measurement, remainingAmount);

  // Try from largest to smallest
  for (let unit of ladder) {
    if (pkg[unit] >= 1 && rem[unit] >= 1) {
      return {
        measurement: unit,
        packageSize: Number(pkg[unit].toFixed(2)),
        remainingAmount: Number(rem[unit].toFixed(2)),
      };
    }
  }

  // Fall back to smallest unit
  const smallest = ladder[ladder.length - 1];

  return {
    measurement: smallest,
    packageSize: pkg[smallest],
    remainingAmount: Number(rem[smallest].toFixed(2)),
  };
};

export const groupedData = (items = []) => {
  const map = new Map();
  for (const item of items) {
    const {itemName, category, brandName, description} = item;
    const key = `${itemName}__${category || ''}`;

    if (map.has(key)) {
      const group = map.get(key);

      group.count++;
      group.items.push(item);

      group.brandName = group.brandName === brandName ? brandName : undefined;

      if (!group.description && description) {
        group.description = description;
      }
    } else {
      map.set(key, {
        itemName,
        category,
        count: 1,
        brandName,
        description: description || null,
        items: [item],
      });
    }
  }

  const groups = Array.from(map.values());

  const getLadderFor = unit => {
    if (liquidLadder.includes(unit)) return liquidLadder;
    if (weightLadder.includes(unit)) return weightLadder;
    return null;
  };

  const findLowestUnit = items => {
    const units = items.map(i => i.measurement);
    const clean = units.map(u => u?.toLowerCase?.().trim()).filter(Boolean);

    const ladder = getLadderFor(clean[0]);
    if (!ladder) return clean[0];

    return clean.sort((a, b) => ladder.indexOf(b) - ladder.indexOf(a))[0];
  };

  for (const group of groups) {
    group.lowestUnit = findLowestUnit(group.items);
  }

  for (const group of groups) {
    const target = group.lowestUnit;

    group.converted = group.items.map(item => {
      const pkgAll = buildAll(item.measurement, item.packageSize);
      const remAll = buildAll(item.measurement, item.remainingAmount);

      return {
        packageSize: pkgAll[target],
        remainingAmount: remAll[target],
        measurement: target,
      };
    });
  }

  for (const group of groups) {
    let totalPkg = 0;
    let totalRem = 0;
    let measurement = group.lowestUnit;

    for (const c of group.converted) {
      totalPkg += c.packageSize;
      totalRem += c.remainingAmount;
    }

    group.combined = {
      measurement,
      packageSize: totalPkg,
      remainingAmount: totalRem,
    };
  }

  const upscale = ({measurement, packageSize, remainingAmount}) => {
    const ladder = getLadderFor(measurement);
    if (!ladder) return {measurement, packageSize, remainingAmount};

    const pkgAll = buildAll(measurement, packageSize);
    const remAll = buildAll(measurement, remainingAmount);

    for (let unit of ladder) {
      if (pkgAll[unit] >= 1 && remAll[unit] >= 1) {
        return {
          measurement: unit,
          packageSize: pkgAll[unit],
          remainingAmount: remAll[unit],
        };
      }
    }

    const smallest = ladder[ladder.length - 1];

    return {
      measurement: smallest,
      packageSize: pkgAll[smallest],
      remainingAmount: remAll[smallest],
    };
  };

  for (const group of groups) {
    group.final = upscale(group.combined);
  }

  const result = groups.map(group => ({
    itemName: group.itemName,
    category: group.category,
    brandName: group.brandName,
    description: group.description,
    count: group.count,
    itemId: group.items[0].itemId,
    measurement:
      group.final.measurement || group.lowestUnit || group.items[0].measurement,
    packageSize: Number(group.final.packageSize.toFixed(2)),
    remainingAmount: Number(group.final.remainingAmount.toFixed(2)),
    items: group.items,
  }));
  return result;
};

export const matchConversion = (measurement, remainingAmount, unit, amount) => {
  if (!measurement || remainingAmount == null || !unit || amount == null) {
    return false;
  }

  // Convert cupboard remainingAmount into ALL units
  const allUnits = buildAll(measurement, remainingAmount);

  // If the target unit isn’t valid for this measurement type → no match
  if (allUnits[unit] == null) return false;

  // Convert cupboard → recipe unit
  const converted = allUnits[unit];

  // Compare
  return converted >= amount;
};

export const convertToUnit = (item, targetUnit) => {
  if (!item?.measurement || item.remainingAmount == null || !targetUnit) {
    return null;
  }

  const measurement = item.measurement.toLowerCase();
  const unit = targetUnit.toLowerCase();

  const ladder = liquidLadder.includes(measurement)
    ? liquidLadder
    : weightLadder.includes(measurement)
    ? weightLadder
    : null;

  // Non-convertible (each, count-based, etc.)
  if (!ladder) {
    return measurement === unit ? {...item} : null;
  }

  // Target unit not in same ladder → invalid
  if (!ladder.includes(unit)) {
    return null;
  }

  const pkgAll = buildAll(measurement, item.packageSize);
  const remAll = buildAll(measurement, item.remainingAmount);

  return {
    ...item,
    measurement: unit,
    packageSize: pkgAll[unit],
    remainingAmount: remAll[unit],
  };
};
