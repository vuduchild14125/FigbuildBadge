import React from 'react';
import { DecorativeElements } from './DecorativeElements';
import lanyardWholeExample from '../assets/LanyardWhole_Example.svg';

export function WelcomeScreen({ onStart, onGallery }: { onStart: () => void; onGallery: () => void }) {
  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-6 sm:gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative flex-shrink-0 lg:self-start lg:-mt-[420px]">
          <img
            src={lanyardWholeExample}
            alt="Example FigBuild badge"
            className="w-[220px] sm:w-[280px] lg:w-[340px] xl:w-[380px] h-auto"
          />
        </div>

        <div className="flex flex-col items-center gap-[20px] sm:gap-[27px]">
          <div className="flex flex-col items-center gap-2">
            <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[32px] sm:text-[40px] lg:text-[54px] xl:text-[66px] tracking-[-1.98px] text-black text-center leading-normal">
              Welcome to
            </p>
            <div className="flex">
              <div className="bg-black px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-5 flex items-center justify-center">
                <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[36px] sm:text-[44px] lg:text-[58px] xl:text-[71px] leading-[0.95] tracking-[-2.13px]">
                  FigBuild
                </span>
              </div>
              <div className="bg-black px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-5 rounded-full flex items-center justify-center">
                <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[36px] sm:text-[44px] lg:text-[58px] xl:text-[71px] leading-[0.95] tracking-[-2.13px]">
                  2026
                </span>
              </div>
            </div>
          </div>
          <p className="font-['Figma_Sans_VF:Medium',sans-serif] text-[20px] sm:text-[24px] lg:text-[30px] xl:text-[36px] text-black text-center max-w-[260px] sm:max-w-[300px] lg:max-w-[381px] leading-normal">
            Start your journey with a FigBuild Badge!
          </p>
          <div className="flex flex-col gap-[16px] sm:gap-[23px] w-[220px] sm:w-[245px]">
            <button
              onClick={onStart}
              className="bg-[#4d49fc] w-full px-[16px] sm:px-[19px] py-[12px] sm:py-[14px] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] sm:text-[21px] text-center text-white leading-[1.45] tracking-[-0.1px] hover:bg-[#3d39ec] transition-colors"
            >
              Build a FigBuild Badge
            </button>
            <button
              onClick={onGallery}
              className="border border-[#171717] w-full px-[16px] sm:px-[19px] py-[12px] sm:py-[14px] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] sm:text-[21px] text-black text-center leading-[1.45] tracking-[-0.1px] hover:bg-black/5 transition-colors"
            >
              I made a FigBuild Badge IRL
            </button>
          </div>
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
}
