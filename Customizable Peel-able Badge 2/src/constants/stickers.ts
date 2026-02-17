export const STICKER_TYPES = [
  { id: 1, color: '#A89BFF', label: '1ST\nYEAR', textColor: '#000000' },
  { id: 2, color: '#FF00E5', label: '2ND\nYEAR', textColor: '#000000' },
  { id: 3, color: '#24CB71', label: '3RD\nYEAR', textColor: '#000000' },
  { id: 4, color: '#4D49FC', label: '4TH\nYEAR', textColor: '#FFFFFF' },
];

export const TEXT_STICKER = {
  text: 'YEAH TIME-ZONE ABOUT GOALS FIGBUILD',
  bgColor: '#ECECEC',
  textColor: '#171717'
};

export const ABOUT_STICKER_TYPES = [
  { id: 'ambivert', label: 'AMBIVERT', color: '#24CB71' },
  { id: 'introvert', label: 'INTROVERT', color: '#C4BAFF' },
  { id: 'extrovert', label: 'EXTROVERT', color: '#FF7237' },
];

export const GOAL_STICKER_TYPES = [
  { id: 'win', label: 'HERE 2 WIN', color: '#FF7237' },
  { id: 'fun', label: 'HERE 4 FUN', color: '#C4BAFF' },
];

export const GOAL_SHAPE_PATH = 'M36.5322 8.99609L46.4688 0H58.9541L68.8906 8.99609L78.8281 0H90.542L105.423 13.4727V59.5918L90.542 73.0645H78.8281L68.8906 64.0684L58.9541 73.0645H46.4688L36.5322 64.0684L26.5957 73.0645H14.8809L0 59.5918V13.4727L14.8809 0H26.5957L36.5322 8.99609Z';

export const ROLE_STICKER_TYPES = [
  { id: 'designer', label: 'DESIGNER', color: '#24CB71', textColor: '#000000' },
  { id: 'developer', label: 'DEVELOPER', color: '#4D49FC', textColor: '#000000' },
  { id: 'creative', label: 'CREATIVE', color: '#FF00E5', textColor: '#FFFFFF' },
];

export const TIME_STICKER_TYPES = [
  { id: 'pst', label: 'PST', src: '/stickers/time-pst.svg', textColor: '#000000' },
  { id: 'cst', label: 'CST', src: '/stickers/time-cst.svg', textColor: '#000000' },
  { id: 'est', label: 'EST', src: '/stickers/time-est.svg', textColor: '#FFFFFF' },
  { id: 'aest', label: 'AEST', src: '/stickers/time-aest.svg', textColor: '#000000' },
  { id: 'acst', label: 'ACST', src: '/stickers/time-acst.svg', textColor: '#000000' },
  { id: 'awst', label: 'AWST', src: '/stickers/time-awst.svg', textColor: '#000000' },
  { id: 'ist', label: 'IST', src: '/stickers/time-ist.svg', textColor: '#000000' },
];

export const FUN_STICKERS = [
  // Figma logos with blobs
  { id: 'figma-logo-black', type: 'figma-logo', blobSrc: '/stickers/fun-figma-blob-black.svg', iconSrc: '/stickers/fun-figma-icon-black.svg' },
  { id: 'figma-logo-lavender', type: 'figma-logo', blobSrc: '/stickers/fun-figma-blob-lavender.svg', iconSrc: '/stickers/fun-figma-icon-lavender.svg' },
  { id: 'figma-logo-blue', type: 'figma-logo', blobSrc: '/stickers/fun-figma-blob-blue.svg', iconSrc: '/stickers/fun-figma-icon-black.svg' },

  // Text labels - FigBuild 2026
  { id: 'figbuild', type: 'text', label: 'FigBuild', bg: '#000000', textColor: '#FFFFFF' },
  { id: 'figbuild-2026-large', type: 'text-horizontal', label1: 'FigBuild', label2: '2026', bg: '#000000', textColor: '#FFFFFF' },
  { id: 'figbuild-2026-small', type: 'text-horizontal-small', label1: 'FigBuild', label2: '2026', bg: '#000000', textColor: '#FFFFFF' },

  // Figma for Edu labels
  { id: 'figma-edu-blue', type: 'text', label: 'Figma for Edu', bg: '#4D49FC', textColor: '#FFFFFF' },
  { id: 'figma-edu-green', type: 'text', label: 'Figma for Edu', bg: '#24CB71', textColor: '#000000' },

  // Geometric compositions
  { id: 'comp-blue-green-split', type: 'svg', src: '/stickers/fun-comp-subtract-blue.svg' },
  { id: 'comp-periwinkle', type: 'svg', src: '/stickers/fun-comp-periwinkle.svg' },
  { id: 'comp-blue-union', type: 'svg', src: '/stickers/fun-comp-blue-union.svg' },
  { id: 'element-31', type: 'svg', src: '/stickers/fun-element-31.svg' },
  { id: 'element-49-pink', type: 'svg', src: '/stickers/fun-element-49-pink.svg' },
  { id: 'element-50-lime', type: 'svg', src: '/stickers/fun-element-50-lime.svg' },
  { id: 'element-47-green', type: 'svg', src: '/stickers/fun-element-47-green.svg' },
  { id: 'element-46-blue', type: 'svg', src: '/stickers/fun-element-46-blue.svg' },
  { id: 'higher-ed-element', type: 'svg', src: '/stickers/fun-higher-ed-element.svg' },
  { id: 'element-54-peach', type: 'svg', src: '/stickers/fun-element-54-peach.svg' },
  { id: 'element-56-lime', type: 'svg', src: '/stickers/fun-element-56-lime.svg' },

  // Flowers
  { id: 'flower-pink', type: 'svg', src: '/stickers/fun-flower-pink.svg' },
  { id: 'flower-orange', type: 'svg', src: '/stickers/fun-flower-orange.svg' },
  { id: 'flower-lavender', type: 'svg', src: '/stickers/fun-flower-lavender.svg' },
  { id: 'flower-blue', type: 'svg', src: '/stickers/fun-flower-blue.svg' },
  { id: 'flower-lime', type: 'svg', src: '/stickers/fun-flower-lime.svg' },
  { id: 'flower-green', type: 'svg', src: '/stickers/fun-flower-green.svg' },
];
