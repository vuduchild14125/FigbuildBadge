import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import svgPaths from '../imports/svg-fkhx66co9q';
import { STICKER_TYPES, FUN_STICKERS, TIME_STICKER_TYPES, GOAL_SHAPE_PATH } from '../constants/stickers';
import type { BorderStyle, CordColor, Background, DrawSize, PlacedSticker, DrawPoint, DrawPath } from '../types';

import lanyardCordBlack from '../assets/LanyardCord-Black.svg';
import lanyardCordBlue from '../assets/LanyardCord-Blue.svg';
import lanyardCordPeriwinkle from '../assets/LanyardCord-Periwinkle.svg';

const lanyardCordImages = {
  black: lanyardCordBlack,
  periwinkle: lanyardCordPeriwinkle,
  blue: lanyardCordBlue,
};

export const BadgePreview = React.forwardRef<
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
    accept: ['sticker', 'textSticker', 'pronounSticker', 'aboutSticker', 'goalSticker', 'funSticker', 'roleSticker', 'timeSticker'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const badgeEl = (ref as React.RefObject<HTMLDivElement>).current;
      if (offset && badgeEl) {
        const badgeRect = badgeEl.getBoundingClientRect();
        const x = (offset.x - badgeRect.left) / scale;
        const y = (offset.y - badgeRect.top) / scale;

        if (item.stickerType) {
          setPlacedStickers(prev => [...prev, {
            id: `sticker-${Date.now()}`, type: item.stickerType, x, y,
            rotation: Math.random() * 30 - 15,
          }]);
        } else if (item.goalId) {
          setPlacedStickers(prev => [...prev, {
            id: `goal-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            pronounText: item.label, goalColor: item.color,
          }]);
        } else if (item.aboutId) {
          setPlacedStickers(prev => [...prev, {
            id: `about-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            pronounText: item.label, aboutColor: item.color,
          }]);
        } else if (item.text) {
          setPlacedStickers(prev => [...prev, {
            id: `pronoun-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            pronounText: item.text,
          }]);
        } else if (item.funStickerId) {
          setPlacedStickers(prev => [...prev, {
            id: `fun-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            funStickerId: item.funStickerId,
          }]);
        } else if (item.roleId) {
          setPlacedStickers(prev => [...prev, {
            id: `role-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            roleColor: item.color, roleLabel: item.label,
          }]);
        } else if (item.timeId) {
          setPlacedStickers(prev => [...prev, {
            id: `time-${Date.now()}`, type: 0, x, y,
            rotation: Math.random() * 20 - 10,
            timeId: item.timeId,
          }]);
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
      const x = ((e.clientX - rect.left) / rect.width) * 483;
      const y = ((e.clientY - rect.top) / rect.height) * 682;
      setIsDrawing(true);
      setCurrentPath([{ x, y, size: drawSize }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 483;
      const y = ((e.clientY - rect.top) / rect.height) * 682;
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

  return (
    <div className="relative w-[483px]" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {/* Lanyard */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '-736px' }}>
        <div className="w-[345px] h-[736px] overflow-visible">
          <img src={lanyardCordImages[cordColor]} alt={`${cordColor} lanyard cord`} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Badge */}
      <div
        ref={(node) => {
          (ref as any).current = node;
          drop(node);
        }}
        className="bg-white w-[483px] h-[682px] overflow-hidden cursor-crosshair relative border border-black"
        style={{ background: isOver ? '#f9f9f9' : 'white' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Border */}
        {borderStyle === 'dashed' && (
          <div
            className="absolute pointer-events-none border-[3px] border-black border-dashed"
            style={{ inset: '12px' }}
          />
        )}
        {borderStyle === 'wiggly' && (
          <svg
            className="absolute pointer-events-none"
            style={{ inset: '12px' }}
            width="459"
            height="658"
            viewBox="0 0 459 658"
            fill="none"
            preserveAspectRatio="none"
          >
            <rect
              x="1.5"
              y="1.5"
              width="456"
              height="655"
              fill="none"
              stroke="black"
              strokeWidth="3"
              style={{
                filter: 'url(#wiggle)',
              }}
            />
            <defs>
              <filter id="wiggle">
                <feTurbulence baseFrequency="0.2" numOctaves="0.1" result="turbulence" seed="2" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" xChannelSelector="" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
        )}

        {/* Background Pattern */}
        <div className="absolute bottom-[-70px] left-0 right-0 h-[45%]">
          <img
            src={`/${background === 'swag' ? 'swagbg' : background === 'creative' ? 'coolbg' : 'funbg'}.png`}
            alt="" className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Header */}
        <div className="absolute top-[14.71%] left-[5.85%] right-[4.76%] flex gap-0">
          <div className="bg-black px-[18px] py-[18px] flex items-center justify-center">
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[63px] leading-[0.95] tracking-[-1.89px]">FigBuild</span>
          </div>
          <div className="bg-black px-[18px] py-[18px] rounded-[472px] flex items-center justify-center">
            <span className="font-['Figma_Sans_VF:Regular',sans-serif] text-white text-[63px] leading-[0.95] tracking-[-1.89px]">2026</span>
          </div>
        </div>

        {/* Drawing Canvas */}
        <canvas ref={canvasRef} width={483} height={682} className="absolute inset-0 pointer-events-none" />

        {/* Placed Stickers */}
        {placedStickers.map((sticker) => {
          if (sticker.funStickerId) {
            const funSticker = FUN_STICKERS.find(s => s.id === sticker.funStickerId);
            if (!funSticker) return null;
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 27, top: sticker.y - 27, transform: `rotate(${sticker.rotation}deg) scale(1.5)` }}>
                <div className="w-[55px] h-[55px] overflow-hidden rounded-[4px]">
                  {funSticker.type === 'text' && (
                    <div className="w-full h-full px-[8px] py-[4px] flex items-center justify-center" style={{ backgroundColor: (funSticker as any).bg }}>
                      <span className="text-[9px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (funSticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>{(funSticker as any).label}</span>
                    </div>
                  )}
                  {funSticker.type === 'svg' && <img src={(funSticker as any).src} alt="" className="w-full h-full object-contain" />}
                  {funSticker.type === 'svg-bg' && (
                    <div className="w-full h-full relative" style={{ backgroundColor: (funSticker as any).bg }}>
                      <img src={(funSticker as any).src} alt="" className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                  )}
                  {funSticker.type === 'checkerboard' && (
                    <div className="w-full h-full bg-[#24CB71] rounded-[12px] overflow-hidden relative">
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[4px] p-[4px]">
                        {Array.from({ length: 16 }).map((_, i) => (<div key={i} className="bg-[#E4FF97] rounded-[4px]" />))}
                      </div>
                    </div>
                  )}
                  {funSticker.type === 'text-stacked' && (
                    <div className="flex flex-col items-stretch w-full h-full justify-center" style={{ backgroundColor: (funSticker as any).bg }}>
                      <div className="px-[6px] py-[1px] flex items-center justify-center">
                        <span className="text-[10px] tracking-[-0.3px]" style={{ color: (funSticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>{(funSticker as any).label1}</span>
                      </div>
                      <div className="mx-[4px] py-[1px] rounded-[20px] flex items-center justify-center" style={{ backgroundColor: (funSticker as any).bg }}>
                        <span className="text-[10px] tracking-[-0.3px]" style={{ color: (funSticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>{(funSticker as any).label2}</span>
                      </div>
                    </div>
                  )}
                  {funSticker.type === 'text-horizontal' && (
                    <div className="flex items-center h-full" style={{ backgroundColor: (funSticker as any).bg }}>
                      <div className="px-[4px] flex items-center justify-center">
                        <span className="text-[9px] tracking-[-0.3px]" style={{ color: (funSticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>{(funSticker as any).label1}</span>
                      </div>
                      <div className="px-[4px] py-[1px] rounded-[20px] flex items-center justify-center" style={{ backgroundColor: '#333' }}>
                        <span className="text-[9px] tracking-[-0.3px]" style={{ color: (funSticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>{(funSticker as any).label2}</span>
                      </div>
                    </div>
                  )}
                  {funSticker.type === 'figma-logo' && (
                    <div className="w-full h-full relative">
                      <img src={(funSticker as any).blobSrc} alt="" className="absolute inset-[-10%] w-[120%] h-[120%] object-contain" />
                      <img src={(funSticker as any).iconSrc} alt="" className="absolute inset-[10%] w-[80%] h-[80%] object-contain" />
                    </div>
                  )}
                </div>
              </div>
            );
          }
          if (sticker.roleColor && sticker.roleLabel) {
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 37, top: sticker.y - 26, transform: `rotate(${sticker.rotation}deg) scale(1.75)` }}>
                <div className="w-[75px] h-[52px] relative">
                  <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
                    <path d={GOAL_SHAPE_PATH} fill={sticker.roleColor} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] uppercase leading-[1.2] text-center whitespace-nowrap"
                      style={{ color: sticker.roleColor === '#FF00E5' ? '#FFFFFF' : '#000000', fontFamily: "'Figma Mono VF:Regular', monospace" }}>
                      {sticker.roleLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          if (sticker.timeId) {
            const timeSticker = TIME_STICKER_TYPES.find(s => s.id === sticker.timeId);
            if (!timeSticker) return null;
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 26, top: sticker.y - 26, transform: `rotate(${sticker.rotation}deg) scale(1.75)` }}>
                <div className="w-[52px] h-[52px] relative">
                  <img src={timeSticker.src} alt="" className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] uppercase leading-[1.2] text-center whitespace-nowrap"
                      style={{ color: timeSticker.textColor, fontFamily: "'Figma Mono VF:Regular', monospace" }}>
                      {timeSticker.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          if (sticker.goalColor && sticker.pronounText) {
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 37, top: sticker.y - 26, transform: `rotate(${sticker.rotation}deg) scale(1.75)` }}>
                <div className="w-[75px] h-[52px] relative">
                  <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
                    <path d={GOAL_SHAPE_PATH} fill={sticker.goalColor} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] text-black uppercase leading-[1.2] text-center whitespace-nowrap"
                      style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
                      {sticker.pronounText}
                    </span>
                  </div>
                </div>
              </div>
            );
          }
          if (sticker.aboutColor && sticker.pronounText) {
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 40, top: sticker.y - 14, transform: `rotate(${sticker.rotation}deg) scale(1.5)` }}>
                <div className="px-[11px] py-[6px] rounded-[100px] whitespace-nowrap" style={{ backgroundColor: sticker.aboutColor }}>
                  <span className="text-[12px] text-black uppercase leading-[1.2]" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
                    {sticker.pronounText}
                  </span>
                </div>
              </div>
            );
          }
          if (sticker.pronounText) {
            return (
              <div key={sticker.id} className="absolute pointer-events-none"
                style={{ left: sticker.x - 40, top: sticker.y - 14, transform: `rotate(${sticker.rotation}deg) scale(1.5)` }}>
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
            <div key={sticker.id} className="absolute pointer-events-none"
              style={{ left: sticker.x - 35, top: sticker.y - 25, transform: `rotate(${sticker.rotation}deg) scale(1.75)` }}>
              <div className="w-[70px] h-[51px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rotate-90">
                    <svg width="51" height="71" viewBox="0 0 51 71" fill="none">
                      <path d={svgPaths.p143abe00} fill={StickerType?.color} />
                    </svg>
                  </div>
                </div>
                {StickerType?.label && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold uppercase leading-[1.2] text-center whitespace-pre-line"
                      style={{ color: StickerType.textColor || '#000000', fontFamily: "'Figma Mono VF:Regular', monospace" }}>
                      {StickerType.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
