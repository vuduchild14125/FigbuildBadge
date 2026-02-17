import React from 'react';
import type { CordColor, Background, DrawSize } from '../types';

import cordBlackSvg from '../assets/filbutton-cordblack.svg';
import cordBlueSvg from '../assets/filbutton-cordblue.svg';
import cordPeriwinkleSvg from '../assets/filbutton-cordperiwinkle.svg';

export function DrawTools({ drawSize, setDrawSize }: { drawSize: DrawSize; setDrawSize: (size: DrawSize) => void }) {
  return (
    <div className="bg-[#ececec] rounded-[12px] p-[20px] w-full flex flex-col items-start justify-between">
      <div className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] text-black w-full">
        <p className="leading-[0.95]">Draw</p>
      </div>
      <div className="flex gap-[24px] h-[129px] items-center w-full mt-4">
        {[
          { size: 'small' as DrawSize, diameter: 8 },
          { size: 'medium' as DrawSize, diameter: 12 },
          { size: 'large' as DrawSize, diameter: 20 }
        ].map(({ size, diameter }) => (
          <button
            key={size}
            onClick={() => setDrawSize(size)}
            className={`flex flex-1 h-[98px] items-center p-[4px] ${
              drawSize === size
                ? 'border border-[#4d49fc] rounded-[6px]'
                : 'rounded-[2px]'
            }`}
          >
            <div className={`bg-white flex-1 h-full relative ${
              drawSize === size ? 'rounded-[6px]' : 'rounded-[5.625px]'
            }`}>
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
                style={{ width: diameter, height: diameter }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function CordsPanel({ cordColor, setCordColor }: { cordColor: CordColor; setCordColor: (color: CordColor) => void }) {
  const cordSvgs = { black: cordBlackSvg, periwinkle: cordPeriwinkleSvg, blue: cordBlueSvg };

  return (
    <div className="bg-[#ececec] rounded-[12px] p-[20px] w-full flex flex-col gap-[16px]">
      <div className="font-['Figma_Sans_VF:Medium',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] text-black h-[17px] flex flex-col justify-center">
        <p className="leading-[0.95]">Cords</p>
      </div>
      <div className="flex gap-[10px] h-[103px] items-center w-full">
        {(['black', 'periwinkle', 'blue'] as CordColor[]).map((color) => (
          <button
            key={color}
            onClick={() => setCordColor(color)}
            className={`flex-1 flex gap-[10px] items-center p-[4px] relative ${
              cordColor === color
                ? 'border border-[#4d49fc] rounded-[4px]'
                : 'rounded-[2px]'
            }`}
          >
            <div className="w-full aspect-square bg-white rounded-[3.184px] overflow-hidden relative">
              <img src={cordSvgs[color]} alt={`${color} cord button`} className="w-full h-full object-cover" />
            </div>
            <span className="absolute bottom-[-11.5px] left-[-1px] translate-y-1/2 font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 tracking-[-0.42px] capitalize w-[104px] text-left leading-[0.95]">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BackgroundPanel({ background, setBackground }: { background: Background; setBackground: (bg: Background) => void }) {
  return (
    <div className="bg-[#ececec] rounded-[12px] pt-[20px] pb-[24px] px-[20px] w-full">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Background</h2>
      <div className="flex gap-[9.5px]">
        {([
          { id: 'swag' as Background, label: 'Swag', img: '/swagbg.png' },
          { id: 'creative' as Background, label: 'Cool', img: '/coolbg.png' },
          { id: 'playful' as Background, label: 'Fun', img: '/funbg.png' },
        ]).map(({ id, label, img }) => (
          <button
            key={id}
            onClick={() => setBackground(id)}
            className="flex flex-col gap-[9.5px] items-start relative flex-1 max-w-[104px]"
          >
            <div className={`p-[4.7px] rounded-[2.4px] relative w-full ${background === id ? 'border border-[#4d49fc]' : ''}`}>
              <div className="w-full aspect-[94.8/43.8] overflow-hidden rounded-[1px]">
                <img src={img} alt={label} className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 tracking-[-0.42px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PatternPreview({ pattern }: { pattern: { primary: string; secondary: string } }) {
  return (
    <div className="size-full overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 119 85" preserveAspectRatio="xMinYMin slice" fill="none">
        <rect width="119" height="85" rx="1.272" fill={pattern.primary} />
        <rect width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="32" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="65" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
      </svg>
    </div>
  );
}
