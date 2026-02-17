import { useRef, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import html2canvas from 'html2canvas';
import { DecorativeElements } from './DecorativeElements';
import { BadgePreview } from './BadgePreview';
import type { BorderStyle, CordColor, Background, DrawSize, PlacedSticker, DrawPath, DrawPoint } from '../types';

import photoBackgroundGrid from '../assets/PhotoBackground_Grid.jpg';
import photoBackgroundStory from '../assets/PhotoBackground_Story.jpg';

const BADGE_NATIVE_WIDTH = 483;
const BADGE_NATIVE_HEIGHT = 1418; // lanyard 736 + badge 682
const BADGE_ROOT_HEIGHT = 682; // just the badge body (no lanyard)
const LANYARD_HEIGHT = 736;
const BADGE_SCALE = 0.5; // matches on-screen scale-[0.50]
const BADGE_TRANSLATE_Y = -80; // matches on-screen -translate-y-[80px]

const BG_DIMS = {
  story: { width: 600, height: 1177, src: photoBackgroundStory },
  grid: { width: 574, height: 718, src: photoBackgroundGrid },
} as const;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

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
  const hiddenBadgeWrapperRef = useRef<HTMLDivElement>(null);
  const hiddenBadgeRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const onScreenBadgeWrapperRef = useRef<HTMLDivElement>(null);
  const [isDrawing] = useState(false);
  const [currentPath] = useState<DrawPoint[]>([]);
  const [downloadingFormat, setDownloadingFormat] = useState<'3:4' | '9:16' | null>(null);
  const [badgeDataUrl, setBadgeDataUrl] = useState<string | null>(null);

  // Rasterize the hidden native-size badge on mount
  useEffect(() => {
    const rasterize = async () => {
      const target = hiddenBadgeWrapperRef.current;
      if (!target) return;
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
      setBadgeDataUrl(canvas.toDataURL('image/png'));
    };
    const timer = setTimeout(rasterize, 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerDownload = async (aspectRatio: '3:4' | '9:16') => {
    if (!badgeDataUrl) return;

    const bg = aspectRatio === '9:16' ? BG_DIMS.story : BG_DIMS.grid;
    const containerEl = previewContainerRef.current;
    const badgeWrapperEl = onScreenBadgeWrapperRef.current;
    if (!containerEl || !badgeWrapperEl) return;

    const [bgImg, badgeImg] = await Promise.all([
      loadImage(bg.src),
      loadImage(badgeDataUrl),
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = bg.width;
    canvas.height = bg.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.drawImage(bgImg, 0, 0, bg.width, bg.height);

    // Measure the on-screen badge position relative to the preview container.
    // This captures the exact result of CSS flexbox centering + scale + translate,
    // regardless of viewport size.
    const containerRect = containerEl.getBoundingClientRect();
    const badgeRect = badgeWrapperEl.getBoundingClientRect();

    // Badge visual center as a proportion of the container (0–1)
    const relCenterX = (badgeRect.left + badgeRect.width / 2 - containerRect.left) / containerRect.width;
    const relCenterY = (badgeRect.top + badgeRect.height / 2 - containerRect.top) / containerRect.height;

    // The on-screen badgeRect is the badge ROOT (483×682 after scale-0.5 → 241.5×341 visual).
    // The rasterized image also includes the lanyard above it.
    // Scale the rasterized image so the badge-body portion matches the on-screen visual size.
    const onScreenScale = badgeRect.width / BADGE_NATIVE_WIDTH; // effective CSS scale
    const downloadScale = onScreenScale * (bg.width / containerRect.width);

    const drawWidth = BADGE_NATIVE_WIDTH * downloadScale;
    const drawHeight = BADGE_NATIVE_HEIGHT * downloadScale;

    // Position: the badge root center (not lanyard) should be at relCenter * bg dimensions.
    // In the rasterized image, badge root center is at (width/2, LANYARD_HEIGHT + BADGE_ROOT_HEIGHT/2).
    const badgeRootCenterInImage = LANYARD_HEIGHT + BADGE_ROOT_HEIGHT / 2;
    const drawX = relCenterX * bg.width - drawWidth / 2;
    const drawY = relCenterY * bg.height - badgeRootCenterInImage * downloadScale;

    ctx.drawImage(badgeImg, drawX, drawY, drawWidth, drawHeight);

    const link = document.createElement('a');
    link.download = aspectRatio === '9:16' ? 'FigBuild2026_Story.jpg' : 'FigBuild2026_Grid.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  const handleDownload = async (aspectRatio: '3:4' | '9:16') => {
    if (downloadingFormat) return;
    setDownloadingFormat(aspectRatio);
    try {
      await triggerDownload(aspectRatio);
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      {/* Hidden off-screen badge at native size for rasterization */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        <div
          ref={hiddenBadgeWrapperRef}
          style={{ width: BADGE_NATIVE_WIDTH, height: BADGE_NATIVE_HEIGHT, position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: LANYARD_HEIGHT }}>
            <DndProvider backend={HTML5Backend}>
              <BadgePreview
                ref={hiddenBadgeRef}
                borderStyle={borderStyle}
                cordColor={cordColor}
                background={background}
                drawSize={drawSize}
                placedStickers={placedStickers}
                setPlacedStickers={() => {}}
                drawPaths={drawPaths}
                isDrawing={false}
                setIsDrawing={() => {}}
                currentPath={[]}
                setCurrentPath={() => {}}
                setDrawPaths={() => {}}
              />
            </DndProvider>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-4 lg:gap-6 px-4 sm:px-6 lg:px-20 py-8 lg:py-0">
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
              disabled={downloadingFormat !== null}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
            >
              {downloadingFormat === '3:4' ? 'Preparing Download...' : 'Download 3:4 (Grid)'}
            </button>

            <button
              onClick={() => handleDownload('9:16')}
              disabled={downloadingFormat !== null}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors"
            >
              {downloadingFormat === '9:16' ? 'Preparing Download...' : 'Download 9:16 (Story)'}
            </button>
          </div>

          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/40 text-left">
            See you at FigBuild 2026!
          </p>
        </div>

        {/* Right Column - Badge Preview with Background (on-screen only) */}
        <div className="flex items-center justify-center">
          <div ref={previewContainerRef} className="relative w-fit overflow-hidden">
            {/* Background Image - Full width and height */}
            <img
              src={photoBackgroundStory}
              alt="Background"
              className="h-[85vh] w-auto object-contain"
            />

            {/* Badge on top of background - centered and clipped */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <DndProvider backend={HTML5Backend}>
                <div ref={onScreenBadgeWrapperRef} className="scale-[0.50] origin-center -translate-y-[80px]">
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
