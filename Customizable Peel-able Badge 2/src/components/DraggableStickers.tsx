import { useState, useCallback, useRef } from 'react';
import { useDrag } from 'react-dnd';
import svgPaths from '../imports/svg-fkhx66co9q';
import { GOAL_SHAPE_PATH, FUN_STICKERS } from '../constants/stickers';
import { useTouchDrag } from './TouchDragContext';

function useTouchDragHandler(item: Record<string, any>) {
  const ctx = useTouchDrag();
  const itemRef = useRef(item);
  itemRef.current = item;
  return useCallback((e: React.TouchEvent) => {
    if (!ctx) return;
    // Prevent react-dnd touch backend from also handling this touch
    e.stopPropagation();
    const touch = e.touches[0];
    ctx.startDrag(itemRef.current, touch.clientX, touch.clientY);
  }, [ctx]);
}

export function DraggableSticker({ stickerType, color, label, textColor }: { stickerType: number; color: string; label?: string; textColor?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sticker',
    item: { stickerType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ stickerType });

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: (isHovered || isDragging) ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
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
          {label && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className="text-[10px] font-normal uppercase leading-[1.2] text-center whitespace-pre-line"
                style={{ color: textColor || '#000000', fontFamily: "'Figma Mono VF:Regular', monospace", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          )}
        </div>
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

export function DraggablePronounSticker({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'pronounSticker',
    item: { text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ text });

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
      onTouchStart={onTouchStart}
    >
      <div className="relative">
        <div className="bg-[#e4ff97] content-start flex flex-wrap items-start px-[12.432px] py-[6.605px] relative shrink-0">
          <div className="flex flex-col font-['Figma_Mono_VF:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13.986px] text-black uppercase whitespace-nowrap">
            <p className="leading-[1.2]">{text}</p>
          </div>
        </div>
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

export function DraggableAboutSticker({ aboutId, label, color }: { aboutId: string; label: string; color: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'aboutSticker',
    item: { aboutId, label, color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ aboutId, label, color });

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300 flex-shrink-0"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: (isHovered || isDragging) ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
    >
      <div className="relative">
        <div
          className="px-[11px] py-[6px] rounded-[100px] whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          <span
            className="text-[12px] text-black uppercase leading-[1.2]"
            style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}
          >
            {label}
          </span>
        </div>
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[65px] h-[20px] pointer-events-none">
            <svg width="65" height="20" viewBox="0 0 65 20" fill="none" className="opacity-40">
              <ellipse cx="32.5" cy="10" rx="32.5" ry="10" fill="url(#shadow-gradient-about)" />
              <defs>
                <radialGradient id="shadow-gradient-about" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 10) rotate(90) scale(10 32.5)">
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

export function DraggableGoalSticker({ goalId, label, color }: { goalId: string; label: string; color: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'goalSticker',
    item: { goalId, label, color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ goalId, label, color });

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300 flex-shrink-0"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: (isHovered || isDragging) ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
    >
      <div className="relative">
        <div className="w-[75px] h-[52px] relative">
          <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
            <path d={GOAL_SHAPE_PATH} fill={color} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[10px] text-black uppercase leading-[1.2] text-center whitespace-nowrap"
              style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}
            >
              {label}
            </span>
          </div>
        </div>
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[65px] h-[20px] pointer-events-none">
            <svg width="65" height="20" viewBox="0 0 65 20" fill="none" className="opacity-40">
              <ellipse cx="32.5" cy="10" rx="32.5" ry="10" fill="url(#shadow-gradient-goal)" />
              <defs>
                <radialGradient id="shadow-gradient-goal" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 10) rotate(90) scale(10 32.5)">
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

export function DraggableRoleSticker({ roleId, label, color, textColor }: { roleId: string; label: string; color: string; textColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'roleSticker',
    item: { roleId, label, color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ roleId, label, color });

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300 flex-shrink-0"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: (isHovered || isDragging) ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
    >
      <div className="relative">
        <div className="w-[75px] h-[52px] relative">
          <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
            <path d={GOAL_SHAPE_PATH} fill={color} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[9px] uppercase leading-[1.2] text-center whitespace-nowrap"
              style={{ color: textColor, fontFamily: "'Figma Mono VF:Regular', monospace" }}
            >
              {label}
            </span>
          </div>
        </div>
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[65px] h-[20px] pointer-events-none">
            <svg width="65" height="20" viewBox="0 0 65 20" fill="none" className="opacity-40">
              <ellipse cx="32.5" cy="10" rx="32.5" ry="10" fill="url(#shadow-gradient-role)" />
              <defs>
                <radialGradient id="shadow-gradient-role" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 10) rotate(90) scale(10 32.5)">
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

export function DraggableTimeSticker({ timeId, label, src, textColor }: { timeId: string; label: string; src: string; textColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'timeSticker',
    item: { timeId, label, src },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ timeId, label, src });

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300 flex-shrink-0"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: (isHovered || isDragging) ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
    >
      <div className="relative">
        <div className="w-[40px] h-[40px] relative">
          <img src={`${import.meta.env.BASE_URL}${src}`} alt="" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[6.5px] uppercase leading-[1.2] text-center whitespace-nowrap font-['Figma_Mono_VF:Regular',monospace]"
              style={{ color: textColor }}
            >
              {label}
            </span>
          </div>
        </div>
        {isHovered && !isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[50px] h-[16px] pointer-events-none">
            <svg width="50" height="16" viewBox="0 0 50 16" fill="none" className="opacity-40">
              <ellipse cx="25" cy="8" rx="25" ry="8" fill="url(#shadow-gradient-time)" />
              <defs>
                <radialGradient id="shadow-gradient-time" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(25 8) rotate(90) scale(8 25)">
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

export function DraggableFunSticker({ sticker }: { sticker: typeof FUN_STICKERS[number] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'funSticker',
    item: { funStickerId: sticker.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const onTouchStart = useTouchDragHandler({ funStickerId: sticker.id });

  const renderContent = () => {
    if (sticker.type === 'text') {
      return (
        <div className="px-[8px] py-[4px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
          <span className="text-[9px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
            {(sticker as any).label}
          </span>
        </div>
      );
    }
    if (sticker.type === 'text-stacked') {
      return (
        <div className="flex flex-col items-stretch w-full">
          <div className="px-[6px] py-[2px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[10px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label1}
            </span>
          </div>
          <div className="px-[6px] py-[2px] rounded-[20px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[10px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label2}
            </span>
          </div>
        </div>
      );
    }
    if (sticker.type === 'text-horizontal') {
      return (
        <div className="flex items-center">
          <div className="px-[6px] py-[2px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[9px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label1}
            </span>
          </div>
          <div className="px-[6px] py-[2px] rounded-[20px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[9px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label2}
            </span>
          </div>
        </div>
      );
    }
    if (sticker.type === 'text-horizontal-small') {
      return (
        <div className="flex items-center gap-0">
          <div className="px-[4px] py-[2px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[7px] tracking-[-0.2px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label1}
            </span>
          </div>
          <div className="px-[4px] py-[2px] rounded-[15px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[7px] tracking-[-0.2px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label2}
            </span>
          </div>
        </div>
      );
    }
    if (sticker.type === 'svg') {
      return <img src={(sticker as any).src} alt="" className="w-full h-full object-contain" />;
    }
    if (sticker.type === 'svg-bg') {
      return (
        <div className="w-full h-full relative" style={{ backgroundColor: (sticker as any).bg }}>
          <img src={(sticker as any).src} alt="" className="absolute inset-0 w-full h-full object-contain" />
        </div>
      );
    }
    if (sticker.type === 'checkerboard') {
      return (
        <div className="w-full h-full bg-[#24CB71] rounded-[12px] overflow-hidden relative">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[4px] p-[4px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-[#E4FF97] rounded-[4px]" />
            ))}
          </div>
        </div>
      );
    }
    if (sticker.type === 'figma-logo') {
      return (
        <div className="w-full h-full relative">
          <img src={(sticker as any).blobSrc} alt="" className="absolute inset-[-10%] w-[120%] h-[120%] object-contain" />
          <img src={(sticker as any).iconSrc} alt="" className="absolute inset-[10%] w-[80%] h-[80%] object-contain" />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={drag}
      className="cursor-move transition-all duration-300"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isHovered && !isDragging ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
    >
      <div className="w-[55px] h-[55px] overflow-hidden rounded-[4px]">
        {renderContent()}
      </div>
    </div>
  );
}
