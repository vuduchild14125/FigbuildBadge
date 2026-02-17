import React from 'react';
import type { BorderStyle } from '../types';

export function BorderSelector({ borderStyle, setBorderStyle }: { borderStyle: BorderStyle; setBorderStyle: (style: BorderStyle) => void }) {
  return (
    <div className="bg-[#ececec] rounded-[12px] pb-[40px] pt-[20px] px-[20px] w-full">
      <div className="flex flex-col font-['Figma_Sans_VF:Bold',sans-serif] justify-center leading-[0] not-italic text-[24px] text-black tracking-[-0.72px] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[0.95]">Border</p>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* None */}
        <button
          onClick={() => setBorderStyle('none')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'none' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white size-[66px]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">None</p>
          </div>
        </button>

        {/* Dashed */}
        <button
          onClick={() => setBorderStyle('dashed')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'dashed' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white relative size-[66px]">
            <div className="absolute border-[3px] border-black border-dashed inset-0 pointer-events-none" />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">Dashed</p>
          </div>
        </button>

        {/* Wiggly */}
        <button
          onClick={() => setBorderStyle('wiggly')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'wiggly' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white relative size-[66px]">
            <svg
              className="absolute inset-0 pointer-events-none"
              width="66"
              height="66"
              viewBox="0 0 66 66"
              fill="none"
              preserveAspectRatio="none"
            >
              <rect
                x="1.5"
                y="1.5"
                width="63"
                height="63"
                fill="none"
                stroke="black"
                strokeWidth="3"
                style={{ filter: 'url(#wiggle-desktop)' }}
              />
              <defs>
                <filter id="wiggle-desktop">
                  <feTurbulence baseFrequency="0.2" numOctaves="0.1" result="turbulence" seed="2" />
                  <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">Wiggly</p>
          </div>
        </button>
      </div>
    </div>
  );
}
