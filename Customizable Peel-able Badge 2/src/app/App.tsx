import React, { useState, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Undo2, Trash2, ArrowLeft } from 'lucide-react';

// Import Figma lanyard components
import BlackLanyard from '../imports/Group2147221362';
import BlueLanyard from '../imports/Group2147221363-9-3579';
import PeriwinkleLanyard from '../imports/Group2147221361';

// Import SVG paths from Figma
import svgPaths from '../imports/svg-fkhx66co9q';

type BorderStyle = 'none' | 'dashed' | 'wiggly' | 'solid';
type CordColor = 'black' | 'periwinkle' | 'blue';
type Background = 'swag' | 'creative' | 'playful';
type DrawSize = 'small' | 'medium' | 'large';
type MobileTab = 'background' | 'cord' | 'stickers' | 'draw';
type Screen = 'welcome' | 'customize';

interface PlacedSticker {
  id: string;
  type: number;
  x: number;
  y: number;
  rotation: number;
  pronounText?: string;
}

interface DrawPoint {
  x: number;
  y: number;
  size: DrawSize;
}

interface DrawPath {
  points: DrawPoint[];
}

const STICKER_TYPES = [
  { id: 1, color: '#D65EFF' },
  { id: 2, color: '#FF00E5' },
  { id: 3, color: '#24CB71' },
  { id: 4, color: '#8676FF' },
];

const TEXT_STICKER = {
  text: 'YEAH TIME-ZONE ABOUT GOALS FIGBUILD',
  bgColor: '#ECECEC',
  textColor: '#171717'
};

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
  const [mobileStickerTab, setMobileStickerTab] = useState<'year' | 'pronouns' | 'about' | 'goals'>('year');
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
    alert("Your FigBadge is complete! 🎉");
  };

  const handleMobileStickerTabChange = (newTab: 'year' | 'pronouns' | 'about' | 'goals') => {
    if (newTab !== mobileStickerTab) {
      setIsMobileStickerAnimating(true);
      setTimeout(() => {
        setMobileStickerTab(newTab);
        setIsMobileStickerAnimating(false);
      }, 300);
    }
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={() => setCurrentScreen('customize')} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full bg-[#F5F5F5] overflow-auto relative">
        <div className="hidden md:block min-h-screen py-24 px-8">
          <div className="flex gap-8 items-start mt-12">
            {/* Left Column - Header + Border + Cords */}
            <div className="flex-shrink-0 space-y-6 w-[372px]">
              {/* Header */}
              <div className="mb-6">
                <button onClick={() => setCurrentScreen('welcome')} className="flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-6">
                  <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px]">{"< Back"}</span>
                </button>
                <h1 className="font-['Figma_Sans_VF:Regular',sans-serif] text-[64px] tracking-[-1.92px] leading-[0.95] text-black max-w-[339px]">
                  Make your FigBadge your own!
                </h1>
              </div>

              {/* Border Options */}
              <BorderSelector borderStyle={borderStyle} setBorderStyle={setBorderStyle} />

              {/* Cords */}
              <CordsPanel cordColor={cordColor} setCordColor={setCordColor} />
            </div>

            {/* Middle Column - Draw + Stickers + Background */}
            <div className="flex-shrink-0 space-y-6 w-[372px]" style={{ marginTop: '40px' }}>
              {/* Draw Tools */}
              <DrawTools drawSize={drawSize} setDrawSize={setDrawSize} />

              {/* Stickers */}
              <StickersPanel />

              {/* Background */}
              <BackgroundPanel background={background} setBackground={setBackground} />
            </div>

            {/* Right Column - Badge Preview */}
            <div className="flex-1 flex flex-col items-center gap-6" style={{ marginTop: '80px' }}>
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleUndo}
                  className="px-6 py-3 bg-white border border-black/10 rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors flex items-center gap-2"
                >
                  Undo
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-white border border-black/10 rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors flex items-center gap-2"
                >
                  Clear
                </button>
                <button
                  onClick={handleDone}
                  className="px-6 py-3 bg-[#4d49fc] rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] text-white hover:bg-[#3d39ec] transition-colors"
                >
                  I'm done!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col h-screen">
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
                transform: 'scale(0.565)',
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
                    {(['none', 'dashed', 'wiggly', 'solid'] as BorderStyle[]).map((border) => (
                      <button key={border} onClick={() => setBorderStyle(border)} className="flex flex-col items-center gap-1">
                        <div className={`w-[64px] h-[32px] bg-white rounded relative ${borderStyle === border ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                          {border === 'dashed' && (
                            <div className="absolute border-2 border-black border-dashed inset-0 pointer-events-none" />
                          )}
                          {border === 'wiggly' && (
                            <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" fill="none">
                              <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" stroke="black" strokeWidth="2" strokeDasharray="6,3" strokeLinecap="round" fill="none" />
                            </svg>
                          )}
                          {border === 'solid' && (
                            <div className="absolute border-2 border-black border-solid inset-0 pointer-events-none" />
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
                  {(['black', 'periwinkle', 'blue'] as CordColor[]).map((color) => (
                    <button key={color} onClick={() => setCordColor(color)} className="flex flex-col items-center gap-2">
                      <div className={`w-[80px] h-[80px] bg-white rounded overflow-hidden flex items-center justify-center ${cordColor === color ? 'ring-2 ring-[#4d49fc]' : ''}`}>
                        <div className="scale-[0.08] origin-center">
                          {color === 'black' && <BlackLanyard />}
                          {color === 'blue' && <BlueLanyard />}
                          {color === 'periwinkle' && <PeriwinkleLanyard />}
                        </div>
                      </div>
                      <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[12px] text-black/50 capitalize">{color}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Stickers tab */}
              {mobileTab === 'stickers' && (
                <div>
                  <div className="flex gap-3 mb-3">
                    {(['year', 'pronouns', 'about', 'goals'] as const).map((tab) => (
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
                    {mobileStickerTab === 'about' && <StickerRoll isAnimating={isMobileStickerAnimating} />}
                    {mobileStickerTab === 'goals' && <StickerRoll isAnimating={isMobileStickerAnimating} />}
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

        {/* Decorative Elements at Bottom */}
      </div>
    </DndProvider>
  );
}

// Border Selector Component
function BorderSelector({ borderStyle, setBorderStyle }: { borderStyle: BorderStyle; setBorderStyle: (style: BorderStyle) => void }) {
  return (
    <div className="bg-[#ececec] rounded-[12px] pb-[40px] pt-[20px] px-[20px] w-[372px]">
      <div className="flex flex-col font-['Figma_Sans_VF:Bold',sans-serif] justify-center leading-[0] not-italic text-[24px] text-black tracking-[-0.72px] mb-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[0.95]">Border</p>
      </div>
      <div className="flex items-center justify-between w-full">
        {/* None */}
        <button
          onClick={() => setBorderStyle('none')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'none' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white size-[66px]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">None</p>
          </div>
        </button>

        {/* Dashed */}
        <button
          onClick={() => setBorderStyle('dashed')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'dashed' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white relative size-[66px]">
            <div className="absolute border-[3px] border-black border-dashed inset-0 pointer-events-none" />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">Dashed</p>
          </div>
        </button>

        {/* Wiggly */}
        <button
          onClick={() => setBorderStyle('wiggly')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'wiggly' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white relative size-[66px]">
            <svg className="absolute inset-[-1.5px] pointer-events-none" width="69" height="69" fill="none">
              <rect
                x="1.5"
                y="1.5"
                width="66"
                height="66"
                stroke="black"
                strokeWidth="3"
                strokeDasharray="8,4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">Wiggly</p>
          </div>
        </button>

        {/* Solid */}
        <button
          onClick={() => setBorderStyle('solid')}
          className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px]"
        >
          <div className={`absolute inset-0 pointer-events-none rounded-[2px] ${borderStyle === 'solid' ? 'border border-[#4d49fc] border-solid' : ''}`} />
          <div className="bg-white relative size-[66px]">
            <div className="absolute border-[3px] border-black border-solid inset-[-1.5px] pointer-events-none" />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[0.95]">Solid</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// Draw Tools Component
function DrawTools({ drawSize, setDrawSize }: { drawSize: DrawSize; setDrawSize: (size: DrawSize) => void }) {
  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Draw</h2>
      <div className="flex gap-6">
        {[
          { size: 'small' as DrawSize, diameter: 8 },
          { size: 'medium' as DrawSize, diameter: 12 },
          { size: 'large' as DrawSize, diameter: 20 }
        ].map(({ size, diameter }) => (
          <button
            key={size}
            onClick={() => setDrawSize(size)}
            className={`flex-1 h-[98px] bg-white rounded-md flex items-center justify-center ${drawSize === size ? 'ring-2 ring-[#4d49fc]' : ''}`}
          >
            <div 
              className="rounded-full bg-[#171717]" 
              style={{ width: diameter, height: diameter }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Stickers Panel Component
function StickersPanel() {
  const [activeTab, setActiveTab] = useState<'year' | 'pronouns' | 'about' | 'goals'>('year');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleTabChange = (newTab: 'year' | 'pronouns' | 'about' | 'goals') => {
    if (newTab !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(newTab);
        setIsAnimating(false);
      }, 300); // Half of collapse animation time
    }
  };
  
  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px] relative">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-3">Stickers</h2>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {(['year', 'pronouns', 'about', 'goals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-1 py-1 rounded text-[14px] uppercase font-['Fragment_Mono:Regular',sans-serif] leading-[1.2] transition-colors ${
              activeTab === tab
                ? 'bg-[#c4baff] text-[#4d49fc]'
                : 'text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Sticker Roll */}
      <div className="relative h-[130px] overflow-hidden">
        {activeTab === 'year' && <StickerRoll isAnimating={isAnimating} />}
        {activeTab === 'pronouns' && <PronounStickerRoll isAnimating={isAnimating} />}
        {activeTab === 'about' && <StickerRoll isAnimating={isAnimating} />}
        {activeTab === 'goals' && <StickerRoll isAnimating={isAnimating} />}
      </div>
    </div>
  );
}

// Animated Sticker Roll Component
function StickerRoll({ isAnimating }: { isAnimating: boolean }) {
  // Create a longer array of stickers by repeating the pattern 3 times
  const extendedStickers = [
    ...STICKER_TYPES,
    ...STICKER_TYPES,
    ...STICKER_TYPES,
  ];

  return (
    <div className="relative h-full">
      {/* Back of spool */}
      <div className="absolute bg-white h-[50px] right-0 rounded-tr-[16px] top-[50px] w-[64px]" />
      
      {/* Main sticker roll container - stretches to reveal stickers */}
      <div className={`absolute bg-white h-[80px] right-0 overflow-hidden rounded-tr-[20px] top-[15px] w-[64px] ${
        isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
      }`}>
        {/* Stickers - positioned inside, revealed as backing stretches */}
        <div className="absolute left-[8px] top-[2px] h-[56px] w-[900px]">
          <div className="flex gap-3 py-3">
            {extendedStickers.map((sticker, idx) => (
              <DraggableSticker key={`roll-${idx}`} stickerType={sticker.id} color={sticker.color} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Roll cylinder */}
      <div className="absolute h-[16px] right-0 top-[91px] w-[64px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.367 15.5321">
          <ellipse cx="32.1835" cy="7.76607" fill="url(#paint0_radial_roll)" rx="32.1835" ry="7.76607" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(32.1835 7.76607) rotate(90) scale(49.858 12.031)" gradientUnits="userSpaceOnUse" id="paint0_radial_roll" r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#D9D9D9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Inner spool */}
      <div className="absolute h-[11px] right-[8px] top-[93px] w-[48px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.3099 10.9606">
          <ellipse cx="24.155" cy="5.48032" fill="url(#paint0_linear_spool)" rx="24.155" ry="5.48032" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_spool" x1="24.155" x2="24.155" y1="-14.9701" y2="9.88243">
              <stop stopColor="#5A5A5A" />
              <stop offset="0.971154" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Highlight effect */}
      <div className="absolute flex h-[76px] items-center justify-center right-[17px] mix-blend-overlay top-[16px] w-[1px]">
        <div className="rotate-[-0.53deg]">
          <div className="h-[76px] relative w-0">
            <div className="absolute inset-[0_-2.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.01443 76.3958">
                <g style={{ mixBlendMode: "overlay" }}>
                  <path d="M2.50722 0C3.88623 0 5.00722 34.1778 5.00722 76.3958H0C0 34.1778 1.12099 0 2.50722 0Z" fill="url(#paint0_linear_highlight)" />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_highlight" x1="3.00722" x2="3.00722" y1="0" y2="76.3958">
                    <stop stopColor="white" stopOpacity="0.12" />
                    <stop offset="0.5" stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pronoun Sticker Roll Component
function PronounStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const pronouns = [
    'any pronouns',
    'he/him', 
    'he/They',
    'She/They',
    'She/her',
    'they/them',
    'any pronouns',
    'he/him'
  ];

  return (
    <div className="relative h-full">
      {/* Back of spool */}
      <div className="absolute bg-white h-[50px] right-0 rounded-tr-[16px] top-[50px] w-[64px]" />
      
      {/* Main sticker roll container - stretches to reveal stickers */}
      <div className={`absolute bg-white h-[80px] right-0 overflow-hidden rounded-tr-[20px] top-[15px] w-[64px] ${
        isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
      }`}>
        {/* Stickers - positioned inside, revealed as backing stretches */}
        <div className="absolute left-[8px] top-[8px] w-[427px]">
          <div className="flex flex-wrap gap-[6px] gap-x-[14px]">
            {pronouns.map((pronoun, idx) => (
              <DraggablePronounSticker key={`pronoun-${idx}`} text={pronoun} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Roll cylinder */}
      <div className="absolute h-[16px] right-0 top-[91px] w-[64px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.367 15.5321">
          <ellipse cx="32.1835" cy="7.76607" fill="url(#paint0_radial_roll_pronoun)" rx="32.1835" ry="7.76607" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(32.1835 7.76607) rotate(90) scale(49.858 12.031)" gradientUnits="userSpaceOnUse" id="paint0_radial_roll_pronoun" r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#D9D9D9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Inner spool */}
      <div className="absolute h-[11px] right-[8px] top-[93px] w-[48px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.3099 10.9606">
          <ellipse cx="24.155" cy="5.48032" fill="url(#paint0_linear_spool_pronoun)" rx="24.155" ry="5.48032" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_spool_pronoun" x1="24.155" x2="24.155" y1="-14.9701" y2="9.88243">
              <stop stopColor="#5A5A5A" />
              <stop offset="0.971154" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Highlight effect */}
      <div className="absolute flex h-[76px] items-center justify-center right-[17px] mix-blend-overlay top-[16px] w-[1px]">
        <div className="rotate-[-0.53deg]">
          <div className="h-[76px] relative w-0">
            <div className="absolute inset-[0_-2.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.01443 76.3958">
                <g style={{ mixBlendMode: "overlay" }}>
                  <path d="M2.50722 0C3.88623 0 5.00722 34.1778 5.00722 76.3958H0C0 34.1778 1.12099 0 2.50722 0Z" fill="url(#paint0_linear_highlight_pronoun)" />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_highlight_pronoun" x1="3.00722" x2="3.00722" y1="0" y2="76.3958">
                    <stop stopColor="white" stopOpacity="0.12" />
                    <stop offset="0.5" stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Draggable Sticker Component
function DraggableSticker({ stickerType, color }: { stickerType: number; color: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sticker',
    item: { stickerType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transform: isHovered && !isDragging ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="w-[70px] h-[51px] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rotate-90">
              <svg width="51" height="71" viewBox="0 0 51 71" fill="none">
                <path d={svgPaths.p143abe00} fill={color} />
              </svg>
            </div>
          </div>
        </div>
        {/* Shadow/Peel effect - only show on hover */}
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[65px] h-[20px] pointer-events-none">
            <svg width="65" height="20" viewBox="0 0 65 20" fill="none" className="opacity-40">
              <ellipse cx="32.5" cy="10" rx="32.5" ry="10" fill="url(#shadow-gradient)" />
              <defs>
                <radialGradient id="shadow-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 10) rotate(90) scale(10 32.5)">
                  <stop stopColor="#000000" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

// Draggable Pronoun Sticker Component
function DraggablePronounSticker({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'pronounSticker',
    item: { text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300 flex-shrink-0 scale-[0.95] origin-top-left"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transform: isHovered && !isDragging ? 'scale(0.95) translateY(-8px)' : 'scale(0.95) translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="bg-[#e4ff97] content-start flex flex-wrap items-start px-[12.432px] py-[6.605px] relative shrink-0">
          <div className="flex flex-col font-['Figma_Mono_VF:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13.986px] text-black uppercase whitespace-nowrap">
            <p className="leading-[1.2]">{text}</p>
          </div>
        </div>
        {/* Shadow/Peel effect - only show on hover */}
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[50px] h-[16px] pointer-events-none">
            <svg width="50" height="16" viewBox="0 0 50 16" fill="none" className="opacity-40">
              <ellipse cx="25" cy="8" rx="25" ry="8" fill="url(#shadow-gradient-pronoun)" />
              <defs>
                <radialGradient id="shadow-gradient-pronoun" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25 8) rotate(90) scale(8 25)">
                  <stop stopColor="#000000" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

// Cords Panel Component  
function CordsPanel({ cordColor, setCordColor }: { cordColor: CordColor; setCordColor: (color: CordColor) => void }) {
  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Cords</h2>
      <div className="flex gap-4">
        {(['black', 'blue', 'periwinkle'] as CordColor[]).map((color) => (
          <button
            key={color}
            onClick={() => setCordColor(color)}
            className="flex flex-col items-center gap-2 group relative"
          >
            <div className={`w-[90px] h-[90px] bg-white rounded overflow-hidden flex items-center justify-center ${cordColor === color ? 'ring-2 ring-[#4d49fc]' : ''}`}>
              <div className="scale-[0.09] origin-center">
                {color === 'black' && <BlackLanyard />}
                {color === 'blue' && <BlueLanyard />}
                {color === 'periwinkle' && <PeriwinkleLanyard />}
              </div>
            </div>
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 capitalize">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Background Panel Component
function BackgroundPanel({ background, setBackground }: { background: Background; setBackground: (bg: Background) => void }) {
  const patterns = {
    swag: { primary: '#4d49fc', secondary: '#24cb71' },
    creative: { primary: '#ff00e5', secondary: '#c4baff' },
    playful: { primary: '#ff7238', secondary: '#e4ff97' }
  };

  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Background</h2>
      <div className="flex gap-4">
        {(['swag', 'creative', 'playful'] as Background[]).map((bg) => (
          <button
            key={bg}
            onClick={() => setBackground(bg)}
            className="flex flex-col items-center gap-2 group relative"
          >
            <div className={`w-[104px] h-[53px] bg-white rounded overflow-hidden ${background === bg ? 'ring-2 ring-[#4d49fc]' : ''}`}>
              <PatternPreview pattern={patterns[bg]} />
            </div>
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 capitalize">{bg}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Pattern Preview Component
function PatternPreview({ pattern }: { pattern: { primary: string; secondary: string } }) {
  return (
    <div className="size-full p-1 scale-[0.45] origin-top-left">
      <svg width="119" height="85" viewBox="0 0 119 85" fill="none">
        <rect width="119" height="85" rx="1.272" fill={pattern.primary} />
        <rect width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="32" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="65" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
      </svg>
    </div>
  );
}

// Badge Preview Component
const BadgePreview = React.forwardRef<
  HTMLDivElement,
  {
    borderStyle: BorderStyle;
    cordColor: CordColor;
    background: Background;
    drawSize: DrawSize;
    placedStickers: PlacedSticker[];
    setPlacedStickers: React.Dispatch<React.SetStateAction<PlacedSticker[]>>;
    drawPaths: DrawPath[];
    isDrawing: boolean;
    setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
    currentPath: DrawPoint[];
    setCurrentPath: React.Dispatch<React.SetStateAction<DrawPoint[]>>;
    setDrawPaths: React.Dispatch<React.SetStateAction<DrawPath[]>>;
    scale?: number;
  }
>(function BadgePreview(
  {
    borderStyle,
    cordColor,
    background,
    drawSize,
    placedStickers,
    setPlacedStickers,
    drawPaths,
    isDrawing,
    setIsDrawing,
    currentPath,
    setCurrentPath,
    setDrawPaths,
    scale = 1,
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['sticker', 'textSticker', 'pronounSticker'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const badgeEl = (ref as React.RefObject<HTMLDivElement>).current;
      if (offset && badgeEl) {
        const badgeRect = badgeEl.getBoundingClientRect();
        const x = (offset.x - badgeRect.left) / scale;
        const y = (offset.y - badgeRect.top) / scale;
        
        if (item.stickerType) {
          setPlacedStickers(prev => [
            ...prev,
            {
              id: `sticker-${Date.now()}`,
              type: item.stickerType,
              x,
              y,
              rotation: Math.random() * 30 - 15,
            }
          ]);
        } else if (item.text) {
          setPlacedStickers(prev => [
            ...prev,
            {
              id: `pronoun-${Date.now()}`,
              type: 0,
              x,
              y,
              rotation: Math.random() * 20 - 10,
              pronounText: item.text,
            }
          ]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      setIsDrawing(true);
      setCurrentPath([{ x, y, size: drawSize }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      setCurrentPath(prev => [...prev, { x, y, size: drawSize }]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 0) {
      setDrawPaths(prev => [...prev, { points: currentPath }]);
      setCurrentPath([]);
      setIsDrawing(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawPath = (path: DrawPath) => {
      if (path.points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      for (let i = 1; i < path.points.length; i++) {
        const point = path.points[i];
        const size = point.size === 'small' ? 8 : point.size === 'medium' ? 12 : 20;
        ctx.lineWidth = size;
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.strokeStyle = '#171717';
      ctx.stroke();
    };

    drawPaths.forEach(drawPath);
    if (currentPath.length > 0) {
      drawPath({ points: currentPath });
    }
  }, [drawPaths, currentPath]);

  const patterns = {
    swag: { primary: '#4d49fc', secondary: '#24cb71' },
    creative: { primary: '#ff00e5', secondary: '#c4baff' },
    playful: { primary: '#ff7238', secondary: '#e4ff97' }
  };

  const cordColors = {
    black: 'black',
    periwinkle: '#C4BAFF',
    blue: '#4d49fc'
  };

  return (
    <div className="relative w-[483px] h-[1200px]">
      {/* Lanyard - absolutely positioned */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '-840px' }}>
        <div className="w-[400px] h-[850px] overflow-visible">
          <div className="scale-[1.0] origin-top-left">
            {cordColor === 'black' && <BlackLanyard />}
            {cordColor === 'blue' && <BlueLanyard />}
            {cordColor === 'periwinkle' && <PeriwinkleLanyard />}
          </div>
        </div>
      </div>

      {/* Badge - absolutely positioned */}
      <div
        ref={(node) => {
          (ref as any).current = node;
          drop(node);
        }}
        className="absolute left-1/2 -translate-x-1/2 bg-white w-[483px] h-[682px] overflow-hidden cursor-crosshair z-0"
        style={{
          background: isOver ? '#f9f9f9' : 'white',
          top: '0px'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Border with gap from edge */}
        {borderStyle !== 'none' && (
          <>
            {borderStyle === 'wiggly' ? (
              <svg
                className="absolute pointer-events-none"
                style={{ inset: '12px' }}
                width="100%"
                height="100%"
                fill="none"
              >
                <rect
                  x="1.5"
                  y="1.5"
                  width="calc(100% - 3px)"
                  height="calc(100% - 3px)"
                  rx="0"
                  ry="0"
                  stroke="black"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            ) : (
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '12px',
                  border: '3px black',
                  borderStyle: borderStyle === 'solid' ? 'solid' : 'dashed',
                }}
              />
            )}
          </>
        )}

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <PatternBackground pattern={patterns[background]} />
        </div>

        {/* Header */}
        <div className="absolute top-[6.11%] left-[5.85%] right-[4.76%] flex gap-2">
          <div className="bg-black px-4 py-4 flex items-center justify-center">
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[63px] leading-[0.95] tracking-[-1.89px]">
              FigBuild
            </span>
          </div>
          <div className="bg-black px-4 py-4 rounded-full flex items-center justify-center">
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[63px] leading-[0.95] tracking-[-1.89px]">
              2026
            </span>
          </div>
        </div>

        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={483}
          height={682}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Placed Stickers */}
        {placedStickers.map((sticker) => {
          if (sticker.pronounText) {
            return (
              <div
                key={sticker.id}
                className="absolute pointer-events-none"
                style={{
                  left: sticker.x - 40,
                  top: sticker.y - 14,
                  transform: `rotate(${sticker.rotation}deg)`,
                }}
              >
                <div className="bg-[#e4ff97] px-[12px] py-[6px] whitespace-nowrap">
                  <span className="font-['Figma_Mono_VF:Regular',sans-serif] text-[14px] text-black uppercase leading-[1.2]">
                    {sticker.pronounText}
                  </span>
                </div>
              </div>
            );
          }
          const StickerType = STICKER_TYPES.find(s => s.id === sticker.type);
          return (
            <div
              key={sticker.id}
              className="absolute pointer-events-none"
              style={{
                left: sticker.x - 35,
                top: sticker.y - 25,
                transform: `rotate(${sticker.rotation}deg)`,
              }}
            >
              <div className="w-[70px] h-[51px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-90">
                    <svg width="51" height="71" viewBox="0 0 51 71" fill="none">
                      <path d={svgPaths.p143abe00} fill={StickerType?.color} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// Full Pattern Background
function PatternBackground({ pattern }: { pattern: { primary: string; secondary: string } }) {
  return (
    <svg width="100%" height="100%" className="absolute inset-0">
      <pattern id="pattern" x="0" y="0" width="120" height="85" patternUnits="userSpaceOnUse">
        <rect width="120" height="85" fill={pattern.primary} />
        <rect width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="32" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="32" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect y="65" width="25" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="63" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
        <rect x="103" y="65" width="16" height="20" rx="1.272" fill={pattern.secondary} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );
}

// Decorative Elements at Bottom
function DecorativeElements() {
  const patterns = [
    { primary: '#4d49fc', secondary: '#24cb71' },
    { primary: '#ff00e5', secondary: '#c4baff' },
    { primary: '#ff7238', secondary: '#e4ff97' },
    { primary: '#24cb71', secondary: '#4d49fc' },
  ];

  return (
    <>
      {/* Bottom Left Decorative Patterns */}
      <div className="absolute bottom-0 left-0 flex gap-2 p-4">
        {patterns.slice(0, 2).map((pattern, idx) => (
          <div key={`left-${idx}`} className="w-[120px] h-[120px] rounded-lg overflow-hidden transform rotate-12">
            <PatternBackground pattern={pattern} />
          </div>
        ))}
      </div>

      {/* Bottom Right Decorative Patterns */}
      <div className="absolute bottom-0 right-0 flex gap-2 p-4">
        {patterns.slice(2).map((pattern, idx) => (
          <div key={`right-${idx}`} className="w-[120px] h-[120px] rounded-lg overflow-hidden transform -rotate-12">
            <PatternBackground pattern={pattern} />
          </div>
        ))}
      </div>
    </>
  );
}

// Welcome Screen Component
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="size-full bg-[#F5F5F5] relative overflow-hidden min-h-screen">
      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 md:gap-16 px-6 md:px-8 py-12">
        {/* Left - Badge with Lanyard */}
        <div className="relative flex-shrink-0 flex flex-col items-center">
          {/* Lanyard */}
          <div className="absolute -top-[280px] md:-top-[340px] -left-[10px] md:-left-[15px] w-[160px] md:w-[200px] h-[340px] md:h-[425px] z-10">
            <BlackLanyard />
          </div>
          {/* Lanyard clip */}
          <div className="w-[75px] md:w-[96px] h-[16px] md:h-[20px] bg-[#d9d9d9] border border-black/40 mb-[-2px] relative z-20" />
          {/* Badge image */}
          <div className="w-[295px] md:w-[378px] relative z-0">
            <img
              src="/welcome-badge.png"
              alt="Example FigBuild badge"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right - Hero content */}
        <div className="flex flex-col items-center gap-[27px]">
          <div className="flex flex-col items-center gap-2">
            <p className="font-['Figma_Sans_VF:Regular',sans-serif] text-[40px] md:text-[66px] tracking-[-1.98px] text-black text-center leading-normal">
              Welcome to
            </p>
            <div className="flex">
              <div className="bg-black px-4 md:px-5 py-3 md:py-5 flex items-center justify-center">
                <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[44px] md:text-[71px] leading-[0.95] tracking-[-2.13px]">
                  FigBuild
                </span>
              </div>
              <div className="bg-black px-4 md:px-5 py-3 md:py-5 rounded-full flex items-center justify-center">
                <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[44px] md:text-[71px] leading-[0.95] tracking-[-2.13px]">
                  2026
                </span>
              </div>
            </div>
          </div>
          <p className="font-['Figma_Sans_VF:Medium',sans-serif] text-[24px] md:text-[36px] text-black text-center max-w-[300px] md:max-w-[381px] leading-normal">
            Start your journey with a FigBuild Badge!
          </p>
          {/* Buttons */}
          <div className="flex flex-col gap-[23px] w-[245px]">
            <button
              onClick={onStart}
              className="bg-[#4d49fc] w-full px-[19px] py-[14px] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[21px] text-center text-white leading-[1.45] tracking-[-0.1px] hover:bg-[#3d39ec] transition-colors"
            >
              Build a FigBadge
            </button>
            <button className="border border-[#171717] w-full px-[19px] py-[14px] rounded-[9px] font-['Figma_Sans_VF:Regular',sans-serif] text-[21px] text-black text-center leading-[1.45] tracking-[-0.1px] hover:bg-black/5 transition-colors">
              I made a FigBadge IRL
            </button>
          </div>
        </div>
      </div>

      {/* Decorative bottom-left elements */}
      <div className="absolute bottom-0 left-0 pointer-events-none">
        <div className="relative w-[366px] h-[240px]">
          {/* Pink checkered block */}
          <div className="absolute bottom-[80px] left-0 w-[80px] h-[57px] bg-[#ff01e5] rounded-[1px]" />
          {/* Pink small blocks grid */}
          <div className="absolute bottom-[30px] left-0 grid grid-cols-3 gap-[5px]">
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[17px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[17px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[11px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
            <div className="w-[17px] h-[13px] bg-[#ffc9c1] rounded-[1px]" />
          </div>
          {/* Blue/green abstract shape */}
          <div className="absolute bottom-0 left-0 w-[178px] h-[178px] overflow-hidden">
            <div className="absolute inset-0 bg-[#4d49fc] rounded-sm" />
            <div className="absolute left-0 top-0 w-[89px] h-full bg-[#24cb71]" />
            <div className="absolute right-0 top-0 w-[89px] h-full bg-white" />
          </div>
          {/* Periwinkle pill */}
          <div className="absolute bottom-0 left-[178px] w-[189px] h-[72px] bg-[#c4baff] rounded-full" />
        </div>
      </div>

      {/* Decorative bottom-right elements */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <div className="relative w-[350px] h-[200px]">
          {/* Green pattern block */}
          <div className="absolute bottom-0 right-[166px] w-[175px] h-[125px] bg-[#24cb71] rounded-[2px] overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="w-[60%] h-[60%] bg-[#4d49fc] rounded-[6px]" />
                </div>
              ))}
            </div>
          </div>
          {/* Colorful shape - right */}
          <div className="absolute bottom-0 right-0 w-[166px] h-[188px] overflow-hidden">
            <div className="absolute inset-0 bg-[#c4baff] rounded-[2px]" />
            <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-[#ff7238] rounded-[2px]" />
            <div className="absolute top-1/3 right-0 w-1/2 h-1/3 bg-[#4d49fc] rounded-[2px]" />
            <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-[#24cb71] rounded-[2px]" />
          </div>
          {/* Small blue/green checker */}
          <div className="absolute bottom-0 right-[341px] w-[92px] h-[86px] overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-4 size-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-[#4d49fc]' : 'bg-[#24cb71]'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}