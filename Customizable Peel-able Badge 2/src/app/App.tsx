import { useState, useRef, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import type { BorderStyle, CordColor, Background, DrawSize, MobileTab, Screen, StickerTab, PlacedSticker, DrawPath, DrawPoint } from '../types';

import { WelcomeScreen } from '../components/WelcomeScreen';
import { GalleryScreen } from '../components/GalleryScreen';
import { CompleteScreen } from '../components/CompleteScreen';
import { BadgePreview } from '../components/BadgePreview';
import { BorderSelector } from '../components/BorderSelector';
import { DrawTools, CordsPanel, BackgroundPanel, PatternPreview } from '../components/Panels';
import { StickersPanel } from '../components/StickersPanel';
import { StickerRoll, PronounStickerRoll, AboutStickerRoll, GoalStickerRoll, TimeStickerRoll, RoleStickerRoll } from '../components/StickerRolls';
import { DecorativeElements } from '../components/DecorativeElements';
import { TouchDragPreview } from '../components/TouchDragPreview';
import { TouchDragProvider } from '../components/TouchDragContext';

import lanyardCordBlack from '../assets/LanyardCord-Black.svg';
import lanyardCordBlue from '../assets/LanyardCord-Blue.svg';
import lanyardCordPeriwinkle from '../assets/LanyardCord-Periwinkle.svg';
import filbuttonCordBlack from '../assets/filbutton-cordblack.svg';
import filbuttonCordBlue from '../assets/filbutton-cordblue.svg';
import filbuttonCordPeriwinkle from '../assets/filbutton-cordperiwinkle.svg';

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
  const tabBarRef = useRef<HTMLDivElement>(null);
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileTab, setMobileTab] = useState<MobileTab>('background');
  const [mobileStickerTab, setMobileStickerTab] = useState<StickerTab>('year');
  const [isMobileStickerAnimating, setIsMobileStickerAnimating] = useState(false);

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

  const handleDone = () => {
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

  const handleTouchDrop = useCallback((item: any, x: number, y: number) => {
    const rotation = Math.random() * 30 - 15;
    if (item.stickerType !== undefined) {
      setPlacedStickers(prev => [...prev, { id: `sticker-${Date.now()}`, type: item.stickerType, x, y, rotation }]);
    } else if (item.goalId) {
      setPlacedStickers(prev => [...prev, { id: `goal-${Date.now()}`, type: 0, x, y, rotation, pronounText: item.label, goalColor: item.color }]);
    } else if (item.aboutId) {
      setPlacedStickers(prev => [...prev, { id: `about-${Date.now()}`, type: 0, x, y, rotation, pronounText: item.label, aboutColor: item.color }]);
    } else if (item.text) {
      setPlacedStickers(prev => [...prev, { id: `pronoun-${Date.now()}`, type: 0, x, y, rotation, pronounText: item.text }]);
    } else if (item.funStickerId) {
      setPlacedStickers(prev => [...prev, { id: `fun-${Date.now()}`, type: 0, x, y, rotation, funStickerId: item.funStickerId }]);
    } else if (item.roleId) {
      setPlacedStickers(prev => [...prev, { id: `role-${Date.now()}`, type: 0, x, y, rotation, roleColor: item.color, roleLabel: item.label }]);
    } else if (item.timeId) {
      setPlacedStickers(prev => [...prev, { id: `time-${Date.now()}`, type: 0, x, y, rotation, timeId: item.timeId }]);
    }
  }, []);

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
        onRestart={() => setCurrentScreen('welcome')}
        borderStyle={borderStyle}
        cordColor={cordColor}
        background={background}
        drawSize={drawSize}
        placedStickers={placedStickers}
        drawPaths={drawPaths}
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
                <div className="lg:scale-[0.45] xl:scale-[0.55] 2xl:scale-[0.65] origin-top">
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
              <div className="flex gap-3 items-center -mt-[170px]">
                <button
                  onClick={handleUndo}
                  className="px-[8px] py-[9px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
                >
                  Undo
                </button>
                <button
                  onClick={handleClear}
                  className="px-[8px] py-[9px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
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
        <TouchDragProvider badgeRef={mobileBadgeRef} onDrop={handleTouchDrop}>
        <div className="flex lg:hidden flex-col h-screen">
          <TouchDragPreview />
          {/* Back button */}
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            <button onClick={() => setCurrentScreen('welcome')} className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px] text-black/50">
              {"< Back"}
            </button>
          </div>

          {/* Centered container for badge and buttons */}
          <div className="flex-1 flex flex-col items-center overflow-hidden min-h-0">
            {/* Badge + Lanyard area */}
            <div className="flex-1 flex items-end justify-center overflow-hidden min-h-0 w-full">
              <div style={{
                width: '362px',
                height: '511px',
                position: 'relative',
                overflow: 'visible',
                marginBottom: '8px',
                transform: mobileTab === 'cord' ? 'scale(0.7)' : 'scale(1)',
                transformOrigin: 'bottom center',
                transition: 'transform 0.4s ease-in-out',
              }}>
                <div style={{
                  transform: 'scale(0.5)',
                  transformOrigin: 'top left',
                  width: '483px',
                  position: 'absolute',
                  top: 0,
                  left: 65,
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
                    scale={1.4}
                  />
                </div>
              </div>
            </div>

            {/* Undo / Clear buttons */}
            <div className="flex justify-center gap-3 py-2 flex-shrink-0 -mt-[20px] w-full">
              <button
                onClick={handleUndo}
                className="px-[8px] py-[9px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
              >
                Undo
              </button>
              <button
                onClick={handleClear}
                className="px-[8px] py-[9px] bg-white border border-black rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Bottom panel */}
          <div className="bg-[#ececec] rounded-t-[20px] flex-shrink-0 flex flex-col items-center">
            {/* Tab bar container */}
            <div className="w-full border-b border-[#CFCFCF]">
              {/* Tab bar */}
              <div ref={tabBarRef} className="flex gap-2 pl-4 pr-8 pt-4 pb-3 overflow-x-auto scroll-smooth">
              {(['background', 'cord', 'stickers', 'draw'] as MobileTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setMobileTab(tab);
                    if (tab === 'stickers' && tabBarRef.current && doneButtonRef.current) {
                      requestAnimationFrame(() => {
                        const container = tabBarRef.current!;
                        const done = doneButtonRef.current!;
                        const containerRect = container.getBoundingClientRect();
                        const doneRect = done.getBoundingClientRect();
                        const scrollTarget = container.scrollLeft + (doneRect.right - containerRect.right) + 40;
                        container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
                      });
                    } else if ((tab === 'background' || tab === 'cord') && tabBarRef.current) {
                      tabBarRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-[16px] py-[12px] rounded-[9px] text-[16px] text-[#f5f5f5] whitespace-nowrap font-['Figma_Sans_VF:Regular',sans-serif] capitalize flex-shrink-0 ${
                    mobileTab === tab ? 'bg-[#4d49fc]' : 'bg-[#171717]'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button
                ref={doneButtonRef}
                onClick={handleDone}
                className="px-[16px] py-[12px] rounded-[9px] text-[16px] text-[#f5f5f5] whitespace-nowrap font-['Figma_Sans_VF:Regular',sans-serif] bg-[#171717] flex-shrink-0"
              >
                Done!
              </button>
            </div>
            </div>

            {/* Tab content */}
            <div className="px-4 py-4 h-[220px] w-full overflow-hidden">
              {/* Background tab */}
              {mobileTab === 'background' && (
                <div>
                  <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px] text-black/50 mb-3">
                    Patterns and Borders
                  </p>
                  <div className="flex gap-4 mb-4">
                    {([
                      { id: 'swag' as Background, label: 'Swag', p: '#4d49fc', s: '#24cb71' },
                      { id: 'creative' as Background, label: 'Creative', p: '#ff00e5', s: '#c4baff' },
                      { id: 'playful' as Background, label: 'Playful', p: '#ff7238', s: '#e4ff97' },
                    ]).map(({ id, label, p, s }) => (
                      <button key={id} onClick={() => setBackground(id)} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-full h-[44px] bg-white rounded overflow-hidden ${background === id ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          <PatternPreview pattern={{ primary: p, secondary: s }} />
                        </div>
                        <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[12px] text-black/50">{label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {(['none', 'dashed', 'wiggly'] as BorderStyle[]).map((border) => (
                      <button key={border} onClick={() => setBorderStyle(border)} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-full h-[32px] bg-white rounded relative ${borderStyle === border ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          {border === 'dashed' && (
                            <div className="absolute border-2 border-black border-dashed inset-0 pointer-events-none" />
                          )}
                          {border === 'wiggly' && (
                            <svg
                              className="absolute inset-0 w-full h-full pointer-events-none"
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
                                  <feTurbulence baseFrequency="0.2" numOctaves="1" result="turbulence" seed="2" />
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
                <div className="flex gap-4 justify-center">
                  {(['black', 'periwinkle', 'blue'] as CordColor[]).map((color) => {
                    const buttonImages = {
                      black: filbuttonCordBlack,
                      periwinkle: filbuttonCordPeriwinkle,
                      blue: filbuttonCordBlue,
                    };
                    return (
                      <button key={color} onClick={() => setCordColor(color)} className="flex-1 flex flex-col items-center gap-2">
                        <div className={`w-full aspect-square bg-white rounded overflow-hidden ${cordColor === color ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          <img
                            src={buttonImages[color]}
                            alt={`${color} lanyard cord`}
                            className="w-full h-full object-contain"
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(['year', 'pronouns', 'about', 'goals', 'time', 'role'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleMobileStickerTabChange(tab)}
                        className={`px-3 py-1.5 rounded text-[13px] uppercase font-['Fragment_Mono:Regular',sans-serif] leading-[1.2] transition-colors whitespace-nowrap ${
                          mobileStickerTab === tab ? 'bg-[#c4baff] text-[#4d49fc]' : 'text-black'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="relative h-[130px] overflow-hidden flex items-center justify-center">
                    {mobileStickerTab === 'year' && <StickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'pronouns' && <PronounStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'about' && <AboutStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'goals' && <GoalStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'time' && <TimeStickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'role' && <RoleStickerRoll isAnimating={isMobileStickerAnimating} />}
                  </div>
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
        </TouchDragProvider>

        {/* Decorative Elements at Bottom */}
        <DecorativeElements />
      </div>
    </DndProvider>
  );
}
