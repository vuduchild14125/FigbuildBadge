import { useState, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

// Import SVG paths from Figma
import svgPaths from '../imports/svg-fkhx66co9q';

type BorderStyle = 'none' | 'dashed' | 'wiggly' | 'solid';
type CordColor = 'black' | 'periwinkle' | 'blue';
type Background = 'swag' | 'creative' | 'playful';
type DrawSize = 'small' | 'medium' | 'large';

interface PlacedSticker {
  id: string;
  type: number;
  x: number;
  y: number;
  rotation: number;
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
  const [borderStyle, setBorderStyle] = useState<BorderStyle>('none');
  const [cordColor, setCordColor] = useState<CordColor>('black');
  const [background, setBackground] = useState<Background>('swag');
  const [drawSize, setDrawSize] = useState<DrawSize>('small');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [drawPaths, setDrawPaths] = useState<DrawPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawPoint[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full bg-[#F5F5F5] overflow-auto">
        <div className="min-h-screen py-12 px-8">
          {/* Header */}
          <div className="mb-8">
            <button className="flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-6">
              <ArrowLeft className="size-4" />
              <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] tracking-[-0.42px]">Back</span>
            </button>
            <h1 className="font-['Figma_Sans_VF:Regular',sans-serif] text-[64px] tracking-[-1.92px] leading-[0.95] text-black max-w-[339px]">
              Make your FigBadge your own!
            </h1>
          </div>

          <div className="flex gap-8 items-start">
            {/* Left Panel - Customization Options */}
            <div className="flex-shrink-0 space-y-6">
              {/* Border Options */}
              <BorderSelector borderStyle={borderStyle} setBorderStyle={setBorderStyle} />

              {/* Draw Tools */}
              <DrawTools drawSize={drawSize} setDrawSize={setDrawSize} />

              {/* Stickers */}
              <StickersPanel />

              {/* Cords */}
              <CordsPanel cordColor={cordColor} setCordColor={setCordColor} />

              {/* Background */}
              <BackgroundPanel background={background} setBackground={setBackground} />
            </div>

            {/* Right Panel - Badge Preview */}
            <div className="flex-1 flex flex-col items-center gap-6">
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
                  className="px-6 py-3 bg-white border border-black/10 rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
                >
                  Undo
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-white border border-black/10 rounded-lg font-['Figma_Sans_VF:Regular',sans-serif] text-[16px] hover:bg-black/5 transition-colors"
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
      </div>
    </DndProvider>
  );
}

// Border Selector Component
function BorderSelector({ borderStyle, setBorderStyle }: { borderStyle: BorderStyle; setBorderStyle: (style: BorderStyle) => void }) {
  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Border</h2>
      <div className="flex gap-4">
        {(['none', 'dashed', 'wiggly', 'solid'] as BorderStyle[]).map((style) => (
          <button
            key={style}
            onClick={() => setBorderStyle(style)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`size-[74px] bg-white rounded-sm relative ${borderStyle === style ? 'ring-2 ring-[#4d49fc]' : ''}`}>
              {style === 'none' && <div className="absolute inset-0" />}
              {style === 'dashed' && <div className="absolute inset-0 border-[1.647px] border-black border-dashed" />}
              {style === 'wiggly' && <div className="absolute inset-[-0.824px] border-[1.647px] border-black border-dashed" />}
              {style === 'solid' && <div className="absolute inset-[-0.824px] border-[1.647px] border-black border-solid" />}
            </div>
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 capitalize">{style}</span>
          </button>
        ))}
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
  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Stickers</h2>
      <div className="relative h-[130px] overflow-hidden">
        <StickerRoll />
      </div>
    </div>
  );
}

// Animated Sticker Roll Component
function StickerRoll() {
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
      <div className="absolute bg-white h-[80px] right-0 overflow-hidden rounded-tr-[20px] top-[15px] w-[64px] animate-backing-stretch">
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

// Draggable Text Sticker
function DraggableTextSticker() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'textSticker',
    item: { text: TEXT_STICKER.text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="cursor-move bg-[#ECECEC] rounded px-2 py-1 inline-block"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[8px] tracking-[0.8px] text-[#171717] uppercase">
        {TEXT_STICKER.text}
      </span>
    </div>
  );
}

// Cords Panel Component  
function CordsPanel({ cordColor, setCordColor }: { cordColor: CordColor; setCordColor: (color: CordColor) => void }) {
  const colors = {
    black: { bg: 'black', accent: 'black' },
    periwinkle: { bg: '#C4BAFF', accent: '#C4BAFF' },
    blue: { bg: '#4d49fc', accent: '#4d49fc' }
  };

  return (
    <div className="bg-[#ececec] rounded-xl p-5 w-[372px]">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-5">Cords</h2>
      <div className="flex gap-4">
        {(['black', 'periwinkle', 'blue'] as CordColor[]).map((color) => (
          <button
            key={color}
            onClick={() => setCordColor(color)}
            className="flex flex-col items-center gap-2 group relative"
          >
            <div className={`size-[90px] bg-white rounded overflow-hidden ${cordColor === color ? 'ring-2 ring-[#4d49fc]' : ''}`}>
              <CordPreview color={colors[color]} />
            </div>
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-[14px] text-black/50 capitalize">{color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Cord Preview Component
function CordPreview({ color }: { color: { bg: string; accent: string } }) {
  return (
    <div className="relative size-full p-2">
      <svg width="60" height="127" viewBox="0 0 60 127" fill="none" className="scale-[0.6] origin-top-left">
        <path d="M1.18029 10.0993H58.4954L52.0688 0.0986479H7.63972L1.18029 10.0993Z" fill={color.bg} />
        <path d="M0 68.5918L44.3384 0L201.607 735.941H144.384L0 68.5918Z" fill={color.bg} />
        <circle cx="20" cy="40" r="4" fill="white" />
      </svg>
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
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['sticker', 'textSticker'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const badgeEl = (ref as React.RefObject<HTMLDivElement>).current;
      if (offset && badgeEl) {
        const badgeRect = badgeEl.getBoundingClientRect();
        const x = offset.x - badgeRect.left;
        const y = offset.y - badgeRect.top;
        
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      setCurrentPath([{ x, y, size: drawSize }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
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
    <div className="flex flex-col items-center">
      {/* Lanyard */}
      <div className="relative">
        <div className="w-24 h-20" style={{ background: cordColors[cordColor] }}>
          <svg width="120" height="74" viewBox="0 0 120 74" fill="none" className="scale-[0.5] origin-top">
            <path d={svgPaths.p1810a300} fill="white" />
            <path d={svgPaths.p2ff9ee70} fill="white" />
            <path d={svgPaths.pfcbf600} fill="white" />
            <path d={svgPaths.p340ea780} fill="white" />
            <path d={svgPaths.p38095980} fill="white" />
          </svg>
        </div>
        <div className="w-[107px] h-[28px] bg-[#d9d9d9] border border-black/20 mx-auto" />
      </div>

      {/* Badge */}
      <div
        ref={(node) => {
          (ref as any).current = node;
          drop(node);
        }}
        className="relative bg-white border border-black w-[483px] h-[682px] overflow-hidden cursor-crosshair"
        style={{
          borderStyle: borderStyle === 'none' ? 'none' : borderStyle === 'solid' ? 'solid' : 'dashed',
          borderWidth: borderStyle === 'none' ? 0 : '0.758px',
          background: isOver ? '#f9f9f9' : 'white'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
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