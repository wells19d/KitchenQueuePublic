//* avatarOptions.js

export const categoryOptions = [
  'Background',
  'Skin',
  'Hair',
  'Shirt',
  'Glasses',
];

export const skinColorOptions = [
  'FFE2C5',
  'F9CBA8',
  'F3B28C',
  'E3A977',
  'D19A75',
  'C6885E',
  'B6764C',
  '9C6654',
  '6A3A2A',
];

export const hairColorOptions = [
  '1C1C1C',
  '3A2A20',
  '6B4B31',
  '9A5835',
  'C58644',
  'D4A763',
  'E7BF82',
  'F4D3A2',
  'B2B2B2',
];

export const colorOptions = [
  'FFFFFF',
  'F7EFEF',
  'F0E6E6',
  'E8D6C0',
  'DAE6F2',
  'D8BFD8',
  'B89BCF',
  'C7A7D9',
  '9E84B5',
  '8364A1',
  '7B92D6',
  '6DADD4',
  '56A7D3',
  '63B79C',
  '6DA78A',
  '88B76C',
  'A3B071',
  'D9CE6F',
  'EDD884',
  'F6C87A',
  'F9C88F',
  'F6A97A',
  'E27A74',
  'DA6A6A',
  'C56A60',
  'A57885',
  '8B5A4A',
  '4F4141',
  '373D43',
  '2C2F36',
];

export const hairStyleOptions = [
  'bigHair',
  'bob',
  'bun',
  'curly',
  'curvy',
  'dreads',
  'dreads01',
  'dreads02',
  'frizzle',
  'fro',
  'froBand',
  'longButNotTooLong',
  'miaWallace',
  'shaggy',
  'shaggyMullet',
  'shavedSides',
  'shortCurly',
  'shortFlat',
  'shortRound',
  'shortWaved',
  'sides',
  '',
  'straight01',
  'straight02',
  'straightAndStrand',
  'theCaesar',
  'hat',
  'turban',
  'hijab',
];

export const bgColorOptions = [
  'FFFFFF',
  'C4C4C4',
  'FCC945',
  '63B76C',
  '009DC4',
  'A781D5',
  '8364A1',
  'DA2C43',
  '373D43',
];

export const shirtOptions = [
  'blazerAndShirt',
  'blazerAndSweater',
  'collarAndSweater',
  'graphicShirt',
  'hoodie',
  'overall',
  'shirtCrewNeck',
  'shirtScoopNeck',
  'shirtVNeck',
];

export const graphicOptions = [
  '',
  'bat',
  'bear',
  'deer',
  'diamond',
  'pizza',
  'skull',
  'skullOutline',
];

export const glassesOptions = [
  '',
  'kurt',
  'prescription01',
  'prescription02',
  'round',
  'sunglasses',
  'wayfarers',
];

export const facialHairOptions = [
  '',
  'beardLight',
  'beardMajestic',
  'beardMedium',
  'moustacheFancy',
  'moustacheMagnum',
];

export const avatarConfig = {
  Background: [
    {text: 'BG Color', optionKey: 'bgColor', optionsArray: bgColorOptions},
  ],
  Skin: [
    {
      text: 'Skin Tone',
      optionKey: 'skinColor',
      optionsArray: skinColorOptions,
    },
  ],
  Hair: [
    {
      text: 'Hair Style',
      optionKey: 'hairStyle',
      optionsArray: hairStyleOptions,
    },
    {
      text: 'Hair Color',
      optionKey: 'hairColor',
      optionsArray: hairColorOptions,
    },
    {
      text: 'Facial Hair',
      optionKey: 'facialHair',
      optionsArray: facialHairOptions,
    },
  ],
  Shirt: [
    {
      text: 'Shirt Style',
      optionKey: 'shirtStyle',
      optionsArray: shirtOptions,
    },
    {
      text: 'Shirt Color',
      optionKey: 'shirtColor',
      optionsArray: colorOptions,
    },
    {
      text: 'Graphic',
      optionKey: 'clothingGraphic',
      optionsArray: graphicOptions,
    },
  ],
  Glasses: [
    {
      text: 'Glasses Style',
      optionKey: 'glasses',
      optionsArray: glassesOptions,
    },
    {
      text: 'Glasses Color',
      optionKey: 'glassesColor',
      optionsArray: colorOptions,
    },
  ],
};
