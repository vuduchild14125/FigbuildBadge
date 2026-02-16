import React from 'react';
import { DecorativeElements } from './DecorativeElements';

export function CompleteScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-[#24CB71] flex items-center justify-center animate-bounce">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center gap-6 max-w-2xl">
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

          <h1 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[36px] lg:text-[54px] tracking-[-1.62px] text-black text-center">
            You're all set!
          </h1>

          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] lg:text-[24px] text-black/70 text-center max-w-lg leading-relaxed">
            Your FigBuild badge is ready! Make sure to print it out and bring it to FigBuild 2026.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => window.print()}
            className="flex-1 px-6 py-4 bg-[#4d49fc] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-[#3d39ec] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Badge
          </button>

          <button
            onClick={onRestart}
            className="flex-1 px-6 py-4 border-2 border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-black hover:bg-black/5 transition-colors"
          >
            Make Another
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="bg-white rounded-[12px] p-6 border border-black/10">
            <div className="w-12 h-12 rounded-full bg-[#4d49fc]/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4d49fc" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[18px] text-black mb-2">
              Share with friends
            </h3>
            <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/60">
              Show off your design and encourage others to make their own!
            </p>
          </div>

          <div className="bg-white rounded-[12px] p-6 border border-black/10">
            <div className="w-12 h-12 rounded-full bg-[#24CB71]/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#24CB71" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
            <h3 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[18px] text-black mb-2">
              Wear it with pride
            </h3>
            <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/60">
              Your badge is your unique identity at FigBuild 2026!
            </p>
          </div>

          <div className="bg-white rounded-[12px] p-6 border border-black/10">
            <div className="w-12 h-12 rounded-full bg-[#FF00E5]/10 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF00E5" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h3 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[18px] text-black mb-2">
              Bring to event
            </h3>
            <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/60">
              Don't forget to bring your printed badge to FigBuild 2026!
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/40 text-center max-w-md mt-4">
          See you at FigBuild 2026!
        </p>
      </div>

      <DecorativeElements />
    </div>
  );
}
