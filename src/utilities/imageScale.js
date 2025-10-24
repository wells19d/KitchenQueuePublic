// imageScale.js
import {Platform} from 'react-native';

export const imageScale = (origKB, opts = {}) => {
  const BASE_W = opts.baseW ?? 400;
  const BASE_H = opts.baseH ?? 400;
  const SCALE = opts.scale ?? 1.5; // ~688x425

  const TARGET_KB = opts.targetKB ?? 45;

  const ENC_KB_PER_QPX =
    opts.encKbPerQpx ?? (Platform.OS === 'android' ? 0.00022 : 0.00028);

  const MIN_Q = opts.minQ ?? (Platform.OS === 'android' ? 0.65 : 0.5);
  const MAX_Q = opts.maxQ ?? 0.95;

  // Parse original size (KB)
  const orig =
    Number(
      typeof origKB === 'string' ? origKB.replace(/[^\d.]/g, '') : origKB,
    ) || 0;

  // Small bias for very large originals (slightly more compression)
  const bias = orig >= 2600 ? 3 : orig >= 2000 ? 2 : 0;

  const width = Math.round(BASE_W * SCALE);
  const height = Math.round(BASE_H * SCALE);
  const area = width * height;

  let quality = (TARGET_KB - bias) / (ENC_KB_PER_QPX * area);
  quality = Math.max(MIN_Q, Math.min(MAX_Q, quality));
  const estimatedKB = Number((ENC_KB_PER_QPX * area * quality).toFixed(2));

  return {width, height, quality, estimatedKB};
};
