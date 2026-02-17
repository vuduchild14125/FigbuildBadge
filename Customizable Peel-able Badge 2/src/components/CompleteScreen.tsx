import { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import html2canvas from 'html2canvas';
import { DecorativeElements } from './DecorativeElements';
import { BadgePreview } from './BadgePreview';
import type { BorderStyle, CordColor, Background, DrawSize, PlacedSticker, DrawPath, DrawPoint } from '../types';

import photoBackgroundGrid from '../assets/PhotoBackground_Grid.jpg';
import photoBackgroundStory from '../assets/PhotoBackground_Story.jpg';

export function CompleteScreen({
  onRestart,
  borderStyle,
  cordColor,
  background,
  drawSize,
  placedStickers,
  drawPaths,
}: {
  onRestart: () => void;
  borderStyle: BorderStyle;
  cordColor: CordColor;
  background: Background;
  drawSize: DrawSize;
  placedStickers: PlacedSticker[];
  drawPaths: DrawPath[];
}) {
  const staticBadgeRef = useRef<HTMLDivElement>(null);
  const downloadContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawing] = useState(false);
  const [currentPath] = useState<DrawPoint[]>([]);
  const [layoutType, setLayoutType] = useState<'story' | 'grid'>('story'); // Default to story
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerDownload = async (aspectRatio: '3:4' | '9:16') => {
    const target = downloadContainerRef.current;
    if (!target) return;

    const canvas = await html2canvas(target, {
      backgroundColor: '#F5F5F5',
      useCORS: true,
      scale: 2,
    });

    const link = document.createElement('a');
    link.download = `${aspectRatio === '9:16' ? 'FigBuild2026_Story' : 'FigBuild2026_Grid'}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownload = async (aspectRatio: '3:4' | '9:16') => {
    if (isDownloading) return;
    setIsDownloading(true);

    // Switch layout based on aspect ratio
    if (aspectRatio === '3:4') {
      setLayoutType('grid');
    } else {
      setLayoutType('story');
    }

    // Wait one frame so layout updates are applied before capture.
    await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));

    try {
      await triggerDownload(aspectRatio);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-center min-h-screen gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start gap-8 max-w-xl">
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

         <h1 className="font-['Figma_Sans_VF:Medium',sans-serif] text-[36px] lg:text-[54px] tracking-[-1.62px] text-black text-left leading-tight">
  Get hyped, <br /> you're competing in FigBuild 2026!
</h1>

<p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[36px] lg:text-[36px] text-black/70 text-left leading-tight">
  Share your journey <br />with #FigBuild2026 <br />on LinkedIn or IG!
</p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <button
              onClick={() => handleDownload('3:4')}
              disabled={isDownloading}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
            >
              {isDownloading ? 'Preparing Download...' : 'Download 3:4 (Grid)'}
            </button>

            <button
              onClick={() => handleDownload('9:16')}
              disabled={isDownloading}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
            >
              {isDownloading ? 'Preparing Download...' : 'Download 9:16 (Story)'}
            </button>
          </div>

          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/40 text-left">
            See you at FigBuild 2026!
          </p>
        </div>

        {/* Right Column - Badge Preview with Background */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div ref={downloadContainerRef} className="relative w-full h-full overflow-hidden">
            {/* Background Image - Full width and height */}
            <img
              src={layoutType === 'story' ? photoBackgroundStory : photoBackgroundGrid}
              alt="Background"
              className="w-[40%] h-auto object-contain mx-auto"

            />

            {/* Badge on top of background - centered and clipped */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <DndProvider backend={HTML5Backend}>
                
                <div
                  className="scale-[0.55] origin-center -translate-y-[80px]"
                >
                  <BadgePreview
                    ref={staticBadgeRef}
                    borderStyle={borderStyle}
                    cordColor={cordColor}
                    background={background}
                    drawSize={drawSize}
                    placedStickers={placedStickers}
                    setPlacedStickers={() => {}}
                    drawPaths={drawPaths}
                    isDrawing={isDrawing}
                    setIsDrawing={() => {}}
                    currentPath={currentPath}
                    setCurrentPath={() => {}}
                    setDrawPaths={() => {}}
                  />
                </div>
              </DndProvider>
            </div>
          </div>
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
}
