import { useState, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import html2canvas from 'html2canvas';

import type { BorderStyle, CordColor, Background, DrawSize, MobileTab, Screen, StickerTab, PlacedSticker, DrawPath, DrawPoint } from '../types';

import { WelcomeScreen } from '../components/WelcomeScreen';
import { GalleryScreen } from '../components/GalleryScreen';
import { CompleteScreen } from '../components/CompleteScreen';
import { BadgePreview } from '../components/BadgePreview';
import { BorderSelector } from '../components/BorderSelector';
import { DrawTools, CordsPanel, BackgroundPanel, PatternPreview } from '../components/Panels';
import { StickersPanel, FunStickersSheet } from '../components/StickersPanel';
import { StickerRoll, PronounStickerRoll, AboutStickerRoll, GoalStickerRoll, TimeStickerRoll, RoleStickerRoll } from '../components/StickerRolls';
import { DecorativeElements } from '../components/DecorativeElements';

import lanyardCordBlack from '../assets/LanyardCord-Black.svg';
import lanyardCordBlue from '../assets/LanyardCord-Blue.svg';
import lanyardCordPeriwinkle from '../assets/LanyardCord-Periwinkle.svg';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('none');
  const [cordColor, setCordColor] = useState<CordColor>('black');
  const [background, setBackground] = useState<Background>('swag');
  const [drawSize, setDrawSize] = useState<DrawSize>('small');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [drawPaths, setDrawPaths] = useState<DrawPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawPoint[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);
  const mobileBadgeRef = useRef<HTMLDivElement>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('background');
  const [mobileStickerTab, setMobileStickerTab] = useState<StickerTab>('year');
  const [isMobileStickerAnimating, setIsMobileStickerAnimating] = useState(false);
  const [savedBadgeImage, setSavedBadgeImage] = useState<string | null>(null);

  const handleUndo = () => {
    if (drawPaths.length > 0) {
      setDrawPaths(prev => prev.slice(0, -1));
    } else if (placedStickers.length > 0) {
      setPlacedStickers(prev => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    setDrawPaths([]);
    setPlacedStickers([]);
  };

  const handleDone = async () => {
    console.log('🎨 Starting badge capture...');

    // Select the correct ref based on screen size
    const ref = window.innerWidth < 1024 ? mobileBadgeRef : badgeRef;
    console.log('📱 Using', window.innerWidth < 1024 ? 'mobile' : 'desktop', 'ref');

    if (ref.current) {
      try {
        // Capture the PARENT element that includes both lanyard and badge
        const parentElement = ref.current.parentElement;
        if (!parentElement) {
          console.error('No parent element found');
          setCurrentScreen('complete');
          return;
        }

        console.log('📐 Badge size:', ref.current.offsetWidth, 'x', ref.current.offsetHeight);
        console.log('📐 Parent size (with lanyard):', parentElement.offsetWidth, 'x', parentElement.offsetHeight);

        // Capture the parent element which includes the lanyard (positioned 736px above)
        const canvas = await html2canvas(parentElement, {
          backgroundColor: null, // Transparent background to see lanyard
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
          foreignObjectRendering: true,
          y: -736, // Include the lanyard which is 736px above
          height: 736 + ref.current.offsetHeight, // Total height: lanyard (736) + badge (682)
        });

        console.log('🖼️ Canvas created:', canvas.width, 'x', canvas.height);

        // Convert to PNG
        const imageData = canvas.toDataURL('image/png');
        console.log('✅ PNG created, size:', Math.round(imageData.length / 1024), 'KB');

        // Save to state
        setSavedBadgeImage(imageData);
        console.log('💾 Badge saved to state');

        // Wait for state to update
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('❌ Capture failed:', error);
      }
    } else {
      console.error('❌ Badge ref is null');
    }

    setCurrentScreen('complete');
  };

  const handleMobileStickerTabChange = (newTab: StickerTab) => {
    if (newTab !== mobileStickerTab) {
      setIsMobileStickerAnimating(true);
      setTimeout(() => {
        setMobileStickerTab(newTab);
        setIsMobileStickerAnimating(false);
      }, 300);
    }
  };

  if (currentScreen === 'welcome') {
    return (
      <WelcomeScreen
        onStart={() => setCurrentScreen('customize')}
        onGallery={() => setCurrentScreen('gallery')}
      />
    );
  }

  if (currentScreen === 'gallery') {
    return (
      <GalleryScreen
        onBack={() => setCurrentScreen('welcome')}
        onComplete={() => setCurrentScreen('complete')}
      />
    );
  }

  if (currentScreen === 'complete') {
    return (
      <CompleteScreen
        onRestart={() => {
          setCurrentScreen('welcome');
          setSavedBadgeImage(null);
        }}
        badgeImage={savedBadgeImage}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full bg-[#F5F5F5] overflow-hidden relative">
        <div className="hidden lg:flex h-screen overflow-hidden">
          <div className="flex gap-4 xl:gap-6 items-start w-full px-6 xl:px-[80px] pt-[48px]">
            {/* Left Column - Header + Border + Cords */}
            <div className="flex-shrink-0 space-y-5 w-[300px] xl:w-[372px]">
              {/* Header */}
              <div className="mb-2">
                <button onClick={() => setCurrentScreen('welcome')} className="flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-4">
                  <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[20px] tracking-[-0.6px] opacity-45">{"< Back"}</span>
                </button>
                <h1 className="font-['Figma_Sans_VF:Regular',sans-serif] text-[36px] xl:text-[48px] tracking-[-1.92px] leading-[0.95] text-black w-[280px] xl:w-[339px]">
                  Make your FigBuild Badge your own!
                </h1>
              </div>
              <div className="h-[40px]" />

              {/* Border Options */}
              <BorderSelector borderStyle={borderStyle} setBorderStyle={setBorderStyle} />

              {/* Cords */}
              <CordsPanel cordColor={cordColor} setCordColor={setCordColor} />
            </div>

            {/* Middle Column - Draw + Stickers + Background */}
            <div className="flex-shrink-0 space-y-5 w-[300px] xl:w-[372px]">
              {/* Draw Tools */}
              <DrawTools drawSize={drawSize} setDrawSize={setDrawSize} />

              {/* Stickers */}
              <StickersPanel />

              {/* Background */}
              <BackgroundPanel background={background} setBackground={setBackground} />
            </div>

            {/* Right Column - Badge Preview */}
            <div className="flex-1 flex flex-col items-center gap-[36px] justify-start pt-[140px] min-w-0">
              <div className="w-full flex justify-center">
                <div className="lg:scale-[0.52] xl:scale-[0.68] 2xl:scale-[0.8] origin-top">
                  <BadgePreview
                    ref={badgeRef}
                    borderStyle={borderStyle}
                    cordColor={cordColor}
                    background={background}
                    drawSize={drawSize}
                    placedStickers={placedStickers}
                    setPlacedStickers={setPlacedStickers}
                    drawPaths={drawPaths}
                    isDrawing={isDrawing}
                    setIsDrawing={setIsDrawing}
                    currentPath={currentPath}
                    setCurrentPath={setCurrentPath}
                    setDrawPaths={setDrawPaths}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 items-center -mt-[150px]">
                <button
                  onClick={handleUndo}
                  className="px-[8px] py-[12px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
                >
                  Undo
                </button>
                <button
                  onClick={handleClear}
                  className="px-[8px] py-[12px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleDone}
                  className="px-[19px] py-[14px] bg-[#4d49fc] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-white hover:bg-[#3d39ec] transition-colors"
                >
                  I'm done!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="flex lg:hidden flex-col h-screen">
          {/* Back button */}
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <button onClick={() => setCurrentScreen('welcome')} className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px] text-black/50">
              {"< Back"}
            </button>
          </div>

          {/* Badge + Lanyard area */}
          <div className="flex-1 flex items-end justify-center overflow-hidden min-h-0">
            <div style={{
              width: '273px',
              height: '385px',
              position: 'relative',
              overflow: 'visible',
              marginBottom: '8px'
            }}>
              <div style={{
                transform: 'scale(0.452)',
                transformOrigin: 'top left',
                width: '483px',
                position: 'absolute',
                top: 0,
                left: 0
              }}>
                <BadgePreview
                  ref={mobileBadgeRef}
                  borderStyle={borderStyle}
                  cordColor={cordColor}
                  background={background}
                  drawSize={drawSize}
                  placedStickers={placedStickers}
                  setPlacedStickers={setPlacedStickers}
                  drawPaths={drawPaths}
                  isDrawing={isDrawing}
                  setIsDrawing={setIsDrawing}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  setDrawPaths={setDrawPaths}
                  scale={0.565}
                />
              </div>
            </div>
          </div>

          {/* Undo / Clear buttons */}
          <div className="flex justify-center gap-3 py-2 flex-shrink-0">
            <button
              onClick={handleUndo}
              className="bg-[#171717] text-[#f5f5f5] px-4 py-3 rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px]"
            >
              Undo
            </button>
            <button
              onClick={handleClear}
              className="bg-[#171717] text-[#f5f5f5] px-4 py-3 rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px]"
            >
              Clear
            </button>
          </div>

          {/* Bottom panel */}
          <div className="bg-[#ececec] rounded-t-[20px] flex-shrink-0">
            {/* Tab bar */}
            <div className="flex gap-2 px-4 pt-4 pb-3 border-b border-[#cfcfcf] overflow-x-auto">
              {(['background', 'cord', 'stickers', 'draw'] as MobileTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`px-[16px] py-[12px] rounded-[9px] text-[16px] text-[#f5f5f5] whitespace-nowrap font-['Figma_Sans_VF:Regular',sans-serif] capitalize ${
                    mobileTab === tab ? 'bg-[#4d49fc]' : 'bg-[#171717]'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={handleDone}
                className="px-[16px] py-[12px] rounded-[9px] text-[16px] text-[#f5f5f5] whitespace-nowrap font-['Figma_Sans_VF:Regular',sans-serif] bg-[#171717]"
              >
                Done!
              </button>
            </div>

            {/* Tab content */}
            <div className="p-4 min-h-[180px]">
              {/* Background tab */}
              {mobileTab === 'background' && (
                <div>
                  <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px] text-black/50 mb-3">
                    Patterns and Borders
                  </p>
                  <div className="flex gap-3 mb-4">
                    {([
                      { id: 'swag' as Background, label: 'Swag', p: '#4d49fc', s: '#24cb71' },
                      { id: 'creative' as Background, label: 'Creative', p: '#ff00e5', s: '#c4baff' },
                      { id: 'playful' as Background, label: 'Playful', p: '#ff7238', s: '#e4ff97' },
                    ]).map(({ id, label, p, s }) => (
                      <button key={id} onClick={() => setBackground(id)} className="flex flex-col items-center gap-1">
                        <div className={`w-[90px] h-[37px] bg-white rounded overflow-hidden ${background === id ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          <PatternPreview pattern={{ primary: p, secondary: s }} />
                        </div>
                        <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[12px] text-black/50">{label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {(['none', 'dashed', 'wiggly'] as BorderStyle[]).map((border) => (
                      <button key={border} onClick={() => setBorderStyle(border)} className="flex flex-col items-center gap-1">
                        <div className={`w-[64px] h-[32px] bg-white rounded relative ${borderStyle === border ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          {border === 'dashed' && (
                            <div className="absolute border-2 border-black border-dashed inset-0 pointer-events-none" />
                          )}
                          {border === 'wiggly' && (
                            <svg
                              className="absolute inset-0 pointer-events-none"
                              width="64"
                              height="32"
                              viewBox="0 0 64 32"
                              fill="none"
                              preserveAspectRatio="none"
                            >
                              <rect
                                x="1"
                                y="1"
                                width="62"
                                height="30"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                style={{ filter: 'url(#wiggle-thumb)' }}
                              />
                              <defs>
                                <filter id="wiggle-thumb">
                                  <feTurbulence baseFrequency="0.2" numOctaves="0.1" result="turbulence" seed="2" />
                                  <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="1" xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                              </defs>
                            </svg>
                          )}
                        </div>
                        <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[12px] text-black/50 capitalize">{border}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cord tab */}
              {mobileTab === 'cord' && (
                <div className="flex gap-3">
                  {(['black', 'periwinkle', 'blue'] as CordColor[]).map((color) => {
                    const lanyardImages = {
                      black: lanyardCordBlack,
                      periwinkle: lanyardCordPeriwinkle,
                      blue: lanyardCordBlue
                    };
                    return (
                      <button key={color} onClick={() => setCordColor(color)} className="flex flex-col items-center gap-2">
                        <div className={`w-[80px] h-[80px] bg-white rounded overflow-hidden flex items-center justify-center ${cordColor === color ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          <img
                            src={lanyardImages[color]}
                            alt={`${color} lanyard cord`}
                            className="w-full h-full object-contain scale-[0.08]"
                          />
                        </div>
                        <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[12px] text-black/50 capitalize">{color}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Stickers tab */}
              {mobileTab === 'stickers' && (
                <div>
                  <div className="flex gap-3 mb-3">
                    {(['year', 'pronouns', 'about', 'goals', 'time', 'role'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleMobileStickerTabChange(tab)}
                        className={`px-1 py-1 rounded text-[14px] uppercase font-['Fragment_Mono:Regular',sans-serif] leading-[1.2] transition-colors ${
                          mobileStickerTab === tab ? 'bg-[#c4baff] text-[#4d49fc]' : 'text-black'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="relative h-[130px] overflow-hidden">
                    {mobileStickerTab === 'year' && <StickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'pronouns' && <PronounStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'about' && <AboutStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'goals' && <GoalStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'time' && <TimeStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'role' && <RoleStickerRoll isAnimating={isMobileStickerAnimating} />}
                  </div>
                  <FunStickersSheet />
                </div>
              )}

              {/* Draw tab */}
              {mobileTab === 'draw' && (
                <div className="flex gap-4">
                  {[
                    { size: 'small' as DrawSize, diameter: 8 },
                    { size: 'medium' as DrawSize, diameter: 12 },
                    { size: 'large' as DrawSize, diameter: 20 }
                  ].map(({ size, diameter }) => (
                    <button
                      key={size}
                      onClick={() => setDrawSize(size)}
                      className={`flex-1 h-[70px] bg-white rounded-md flex items-center justify-center ${drawSize === size ? 'ring-2 ring-[#4d49fc]' : ''}`}
                    >
                      <div className="rounded-full bg-[#171717]" style={{ width: diameter, height: diameter }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements at Bottom */}
        <DecorativeElements />
      </div>
    </DndProvider>
  );
}
