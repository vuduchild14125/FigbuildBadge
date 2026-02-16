import React from 'react';
import { DecorativeElements } from './DecorativeElements';

export function CompleteScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      <div className="relative z-10 flex flex-col items-start justify-start min-h-screen gap-8 px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <div className="flex">
            <div className="bg-black px-5 py-3 flex items-center justify-center">
              <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[48px] lg:text-[58px] leading-[0.95] tracking-[-1.74px]">
                FigBuild
              </span>
            </div>
            <div className="bg-black px-5 py-3 rounded-full flex items-center justify-center">
              <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[48px] lg:text-[58px] leading-[0.95] tracking-[-1.74px]">
                2026
              </span>
            </div>
          </div>

          <h1 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[36px] lg:text-[54px] tracking-[-1.62px] text-black text-left">
            Get hyped, you're competing in Figbuild 2026!
          </h1>

          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] lg:text-[24px] text-black/70 text-left max-w-lg leading-relaxed">
            Share your journey with #FigBuild2026 on LinkedIn or IG!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => window.print()}
            className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
          >
            Download 3:4 (Grid)
          </button>

          <button
            onClick={onRestart}
            className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
          >
            Download 9:16 (Story)
          </button>
        </div>
        
        {/* Footer note */}
       <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/40 text-center max-w-md mt-4 mx-auto">
  See you at FigBuild 2026!
</p>

      </div>

      <DecorativeElements />
    </div>
  );
}
