import { useRef, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toPng } from 'html-to-image';
import { DecorativeElements } from './DecorativeElements';
import { BadgePreview } from './BadgePreview';
import type { BorderStyle, CordColor, Background, DrawSize, PlacedSticker, DrawPath, DrawPoint } from '../types';

import photoBackgroundGrid from '../assets/PhotoBackground_Grid.png';
import photoBackgroundStory from '../assets/PhotoBackground_Story.png';

const BADGE_NATIVE_WIDTH = 483;
const BADGE_NATIVE_HEIGHT = 1418; // lanyard 736 + badge 682
const BADGE_ROOT_HEIGHT = 682; // just the badge body (no lanyard)
const LANYARD_HEIGHT = 736;
const BADGE_SCALE = 0.5; // matches on-screen scale-[0.50]
const BADGE_TRANSLATE_Y = -80; // matches on-screen -translate-y-[80px]

const BG_DIMS = {
  story: { width: 2400, height: 4708, src: photoBackgroundStory },
  grid: { width: 2296, height: 2872, src: photoBackgroundGrid },
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

  // Rasterize the hidden native-size badge on mount.
  // Uses html-to-image (SVG foreignObject) which leverages the browser's
  // own CSS renderer — handles transforms, object-fit, custom fonts, etc.
  useEffect(() => {
    const rasterize = async () => {
      const target = hiddenBadgeWrapperRef.current;
      if (!target) return;

      // html-to-image can produce incomplete results on first call
      // due to resource loading. Call twice — first warms up, second captures.
      try { await toPng(target, { pixelRatio: 8 }); } catch { /* warm-up */ }
      const dataUrl = await toPng(target, { pixelRatio: 8 });
      setBadgeDataUrl(dataUrl);
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

    // For the 3:4 grid export, scale the badge slightly smaller and lower it
    if (aspectRatio === '3:4') {
      const gridScaleFactor = 0.75;
      const gridOffsetY = 320;
      const scaledWidth = drawWidth * gridScaleFactor;
      const scaledHeight = drawHeight * gridScaleFactor;
      const centeredX = drawX + (drawWidth - scaledWidth) / 2;
      const centeredY = drawY + (drawHeight - scaledHeight) / 2 + gridOffsetY;
      ctx.drawImage(badgeImg, centeredX, centeredY, scaledWidth, scaledHeight);
    } else {
      ctx.drawImage(badgeImg, drawX, drawY, drawWidth, drawHeight);
    }

    const link = document.createElement('a');
    link.download = aspectRatio === '9:16' ? 'FigBuild2026_Story.png' : 'FigBuild2026_Grid.png';
    link.href = canvas.toDataURL('image/png');
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

      {/* Start Over - top left */}
      <button
        onClick={onRestart}
        className="absolute top-6 left-6 z-20 font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-black/40 hover:text-black/60 transition-colors"
      >
        &lt; Start Over
      </button>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-12 px-10 sm:px-12 lg:px-10 py-8 lg:py-0">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-xl order-last lg:order-first">
          <h1 className="mb-2 lg:mb-3 font-['Figma_Sans_VF:Medium',sans-serif] text-[32px] lg:text-[54px] tracking-[-1.62px] text-black text-left leading-[1.05] lg:leading-tight">
            Get hyped, <br />you're competing in FigBuild 2026!
          </h1>

          <p className="mb-6 lg:mb-8 font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] lg:text-[36px] text-black/70 text-left leading-tight">
            Share your journey with <br />#FigBuild2026 on LinkedIn or IG!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full max-w-md">
            <button
              onClick={() => handleDownload('9:16')}
              disabled={downloadingFormat !== null}
              className="group w-full px-[24px] py-[12px] bg-black rounded-[9px] hover:rounded-none font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-all duration-300 ease-in-out"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span className="inline-block max-w-0 overflow-hidden group-hover:max-w-[28px] transition-all duration-300 ease-in-out">
                  <img src="/Icon-Download.svg" alt="" className="w-5 h-5 shrink-0" />
                </span>
                {downloadingFormat === '9:16' ? 'Preparing Download...' : 'Download 9:16 (Story)'}
              </span>
            </button>

            <button
              onClick={() => handleDownload('3:4')}
              disabled={downloadingFormat !== null}
              className="group w-full px-[24px] py-[12px] bg-black rounded-[9px] hover:rounded-none font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-all duration-300 ease-in-out"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span className="inline-block max-w-0 overflow-hidden group-hover:max-w-[28px] transition-all duration-300 ease-in-out">
                  <img src="/Icon-Download.svg" alt="" className="w-5 h-5 shrink-0" />
                </span>
                {downloadingFormat === '3:4' ? 'Preparing Download...' : 'Download 3:4 (Grid)'}
              </span>
            </button>
          </div>

        </div>

        {/* Right Column - Badge Preview with Background (on-screen only) */}
        <div className="flex items-center justify-center" style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2))' }}>
          <div ref={previewContainerRef} className="relative w-fit overflow-hidden">
            {/* Background Image - Full width and height */}
            <img
              src={photoBackgroundStory}
              alt="Background"
              className="h-[50vh] lg:h-[85vh] w-auto object-contain"
            />

            {/* Badge on top of background - centered and clipped */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <DndProvider backend={HTML5Backend}>
                <div ref={onScreenBadgeWrapperRef} className="scale-[0.29] lg:scale-[0.50] origin-center -translate-y-[50px] lg:-translate-y-[80px]">
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
