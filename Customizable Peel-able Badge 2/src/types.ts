export type BorderStyle = 'none' | 'dashed' | 'wiggly';
export type CordColor = 'black' | 'periwinkle' | 'blue';
export type Background = 'swag' | 'creative' | 'playful';
export type DrawSize = 'small' | 'medium' | 'large';
export type MobileTab = 'background' | 'cord' | 'stickers' | 'draw';
export type Screen = 'welcome' | 'customize' | 'gallery' | 'complete';
export type StickerTab = 'year' | 'pronouns' | 'about' | 'goals' | 'time' | 'role';

export interface PlacedSticker {
  id: string;
  type: number;
  x: number;
  y: number;
  rotation: number;
  pronounText?: string;
  aboutColor?: string;
  goalColor?: string;
  funStickerId?: string;
  roleColor?: string;
  roleLabel?: string;
  timeId?: string;
}

export interface DrawPoint {
  x: number;
  y: number;
  size: DrawSize;
}

export interface DrawPath {
  points: DrawPoint[];
}
