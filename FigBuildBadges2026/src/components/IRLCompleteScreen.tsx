import { useRef, useState } from 'react';
import { DecorativeElements } from './DecorativeElements';
import photoBackgroundGrid from '../assets/PhotoBackground_Grid.png';
import photoBackgroundStory from '../assets/PhotoBackground_Story.png';

const BG_DIMS = {
  story: { width: 2400, height: 4708, src: photoBackgroundStory },
  grid: { width: 2296, height: 2872, src: photoBackgroundGrid },
} as const;

// Badge dimensions matching the digital badge
const BADGE_NATIVE_WIDTH = 483;
const BADGE_NATIVE_HEIGHT = 682;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function IRLCompleteScreen({
  onRestart,
  capturedPhoto,
}: {
  onRestart: () => void;
  capturedPhoto: string;
}) {
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [downloadingFormat, setDownloadingFormat] = useState<'3:4' | '9:16' | null>(null);

  const triggerDownload = async (aspectRatio: '3:4' | '9:16') => {
    const bg = aspectRatio === '9:16' ? BG_DIMS.story : BG_DIMS.grid;
    const containerEl = previewContainerRef.current;
    if (!containerEl) return;

    const [bgImg, badgeImg] = await Promise.all([
      loadImage(bg.src),
      loadImage(capturedPhoto),
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = bg.width;
    canvas.height = bg.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.drawImage(bgImg, 0, 0, bg.width, bg.height);

    // Get container dimensions
    const containerRect = containerEl.getBoundingClientRect();

    // The scanned badge has been scaled to ~700x988 (2.5x the crop area)
    // Position it to avoid overlapping with text at the bottom

    let targetHeight;
    if (aspectRatio === '9:16') {
      // Story: badge should be ~55% of background height (reduced from 60%)
      targetHeight = bg.height * 0.55;
    } else {
      // Grid: badge should be ~45% of background height (reduced from 50%)
      targetHeight = bg.height * 0.45;
    }

    const scaleFactor = targetHeight / badgeImg.height;
    const drawWidth = badgeImg.width * scaleFactor;
    const drawHeight = badgeImg.height * scaleFactor;

    // Center horizontally
    const drawX = (bg.width - drawWidth) / 2;

    // Position vertically - higher up to avoid text at bottom
    let drawY;
    if (aspectRatio === '9:16') {
      // Story: position in upper 2/3 of the image to avoid bottom text
      drawY = (bg.height * 0.35) - (drawHeight / 2);
    } else {
      // Grid: position slightly above center
      drawY = (bg.height * 0.42) - (drawHeight / 2);
    }

    ctx.drawImage(badgeImg, drawX, drawY, drawWidth, drawHeight);

    const link = document.createElement('a');
    link.download = aspectRatio === '9:16' ? 'FigBuild2026_IRL_Story.png' : 'FigBuild2026_IRL_Grid.png';
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
      {/* Start Over - top left */}
      <button
        onClick={onRestart}
        className="absolute top-6 left-6 z-20 font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-black/40 hover:text-black/60 transition-colors"
      >
        &lt; Start Over
      </button>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-20 px-4 sm:px-8 lg:px-16 xl:px-20 py-12 lg:py-16 max-w-[1800px] mx-auto">
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-start max-w-xl order-last lg:order-first flex-shrink-0">
          <h1 className="mb-2 lg:mb-3 font-['Figma_Sans_VF:Medium',sans-serif] text-[32px] lg:text-[64px] tracking-[-1.62px] text-black text-left leading-[1.05] lg:leading-tight">
            Amazing work, <br />you made a FigBuild badge IRL!
          </h1>

          <p className="mb-6 lg:mb-12 font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] lg:text-[36px] text-black/70 text-left leading-tight">
            Share your creation <br className="hidden lg:block" />with #FigBuild2026 <br className="hidden lg:block" />on LinkedIn or IG!
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

        {/* Right Column - Photo Preview */}
        <div className="flex items-center justify-center flex-shrink-0 max-w-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2))' }}>
          <div ref={previewContainerRef} className="relative w-fit overflow-hidden max-w-[90vw] lg:max-w-none">
            {/* Background Image */}
            <img
              src={photoBackgroundStory}
              alt="Background"
              className="h-[45vh] sm:h-[50vh] lg:h-[75vh] xl:h-[80vh] 2xl:h-[85vh] w-auto object-contain"
            />

            {/* Captured Badge Photo on top of background - positioned to avoid text */}
            <div className="absolute inset-0 flex items-center justify-center -translate-y-[15%]">
              <img
                src={capturedPhoto}
                alt="Your badge"
                className="h-[55%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
}
