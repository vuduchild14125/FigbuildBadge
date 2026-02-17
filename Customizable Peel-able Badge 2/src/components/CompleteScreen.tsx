import { useEffect } from 'react';
import { DecorativeElements } from './DecorativeElements';

export function CompleteScreen({
  onRestart,
  badgeImage
}: {
  onRestart: () => void;
  badgeImage: string | null;
}) {
  useEffect(() => {
    console.log('📄 CompleteScreen mounted');
    console.log('🖼️ Badge image:', badgeImage ? `Received (${Math.round(badgeImage.length / 1024)} KB)` : '❌ NULL');
    console.log('🔍 badgeImage value:', badgeImage);
    console.log('🔍 badgeImage truthy?', !!badgeImage);
    console.log('🔍 badgeImage type:', typeof badgeImage);
    if (badgeImage) {
      console.log('🔍 First 100 chars:', badgeImage.substring(0, 100));
    }
  }, [badgeImage]);

  const handleDownload = (aspectRatio: '3:4' | '9:16') => {
    if (!badgeImage) {
      console.log('⚠️ Cannot download: badge image is null');
      return;
    }
    console.log('💾 Downloading badge as', aspectRatio);

    const link = document.createElement('a');
    link.href = badgeImage;
    link.download = `figbuild-badge-${aspectRatio}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              disabled={!badgeImage}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download 3:4 (Grid)
            </button>

            <button
              onClick={() => handleDownload('9:16')}
              disabled={!badgeImage}
              className="px-6 py-4 bg-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-white hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download 9:16 (Story)
            </button>
          </div>

          <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/40 text-left">
            See you at FigBuild 2026!
          </p>
        </div>

        {/* Right Column - Badge Preview */}
        <div
          className="flex-1 flex items-center justify-center lg:justify-end max-w-2xl"
          style={{
            backgroundColor: 'yellow', // DEBUG: Make column visible
            minHeight: '400px'
          }}
        >
          {(() => {
            console.log('🎨 Rendering badge section, badgeImage exists?', !!badgeImage);
            return badgeImage ? (
              <div
                className="relative"
                style={{
                  backgroundColor: 'lime', // DEBUG: Make container visible
                  padding: '20px',
                  border: '5px solid red' // DEBUG: Make boundary visible
                }}
              >
                <img
                  src={badgeImage}
                  alt="Your custom badge"
                  className="w-full max-w-[350px] lg:max-w-[450px] xl:max-w-[550px] h-auto"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                    border: '3px solid blue' // DEBUG: Make image visible
                  }}
                  onLoad={() => console.log('✅ Image loaded successfully')}
                  onError={(e) => console.error('❌ Image failed to load:', e)}
                />
              </div>
            ) : (
              <div className="w-[350px] lg:w-[450px] h-[525px] lg:h-[675px] bg-white/50 rounded-lg border-2 border-dashed border-black/20 flex items-center justify-center">
                <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[18px] text-black/40">
                  Loading badge...
                </p>
              </div>
            );
          })()}
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
}
