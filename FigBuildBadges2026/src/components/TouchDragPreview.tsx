import { useTouchDrag } from './TouchDragContext';
import svgPaths from '../imports/svg-fkhx66co9q';
import { STICKER_TYPES, FUN_STICKERS, TIME_STICKER_TYPES, GOAL_SHAPE_PATH } from '../constants/stickers';

function StickerPreview({ item }: { item: any }) {
  if (item.stickerType !== undefined) {
    const sticker = STICKER_TYPES.find((s) => s.id === item.stickerType);
    if (!sticker) return null;
    return (
      <div className="w-[70px] h-[51px] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rotate-90">
            <svg width="51" height="71" viewBox="0 0 51 71" fill="none">
              <path d={svgPaths.p143abe00} fill={sticker.color} />
            </svg>
          </div>
        </div>
        {sticker.label && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[10px] font-normal uppercase leading-[1.2] text-center whitespace-pre-line"
              style={{ color: sticker.textColor || '#000000', fontFamily: "'Figma Mono VF:Regular', monospace", fontWeight: 400 }}
            >
              {sticker.label}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (item.text) {
    return (
      <div className="bg-[#e4ff97] px-[12.432px] py-[6.605px]">
        <span className="text-[13.986px] text-black uppercase leading-[1.2] whitespace-nowrap" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
          {item.text}
        </span>
      </div>
    );
  }

  if (item.aboutId) {
    return (
      <div className="px-[11px] py-[6px] rounded-[100px] whitespace-nowrap" style={{ backgroundColor: item.color }}>
        <span className="text-[12px] text-black uppercase leading-[1.2]" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
          {item.label}
        </span>
      </div>
    );
  }

  if (item.goalId) {
    return (
      <div className="w-[75px] h-[52px] relative">
        <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
          <path d={GOAL_SHAPE_PATH} fill={item.color} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] text-black uppercase leading-[1.2] text-center whitespace-nowrap" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
            {item.label}
          </span>
        </div>
      </div>
    );
  }

  if (item.roleId) {
    return (
      <div className="w-[75px] h-[52px] relative">
        <svg width="75" height="52" viewBox="0 0 105.423 73.0645" fill="none" className="absolute inset-0">
          <path d={GOAL_SHAPE_PATH} fill={item.color} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[9px] uppercase leading-[1.2] text-center whitespace-nowrap" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
            {item.label}
          </span>
        </div>
      </div>
    );
  }

  if (item.timeId) {
    const timeSticker = TIME_STICKER_TYPES.find((t) => t.id === item.timeId);
    if (!timeSticker) return null;
    return (
      <div className="w-[40px] h-[40px] relative">
        <img src={timeSticker.src} alt="" className="absolute inset-0 w-full h-full object-contain" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[6.5px] uppercase leading-[1.2] text-center whitespace-nowrap font-['Figma_Mono_VF:Regular',monospace]" style={{ color: timeSticker.textColor }}>
            {timeSticker.label}
          </span>
        </div>
      </div>
    );
  }

  if (item.funStickerId) {
    const sticker = FUN_STICKERS.find((s) => s.id === item.funStickerId);
    if (!sticker) return null;
    return (
      <div className="w-[55px] h-[55px] overflow-hidden rounded-[4px] bg-white">
        {sticker.type === 'text' && (
          <div className="px-[8px] py-[4px] flex items-center justify-center" style={{ backgroundColor: (sticker as any).bg }}>
            <span className="text-[9px] tracking-[-0.3px] whitespace-nowrap" style={{ color: (sticker as any).textColor, fontFamily: "'Figma Sans VF:Regular', sans-serif" }}>
              {(sticker as any).label}
            </span>
          </div>
        )}
        {sticker.type === 'svg' && <img src={(sticker as any).src} alt="" className="w-full h-full object-contain" />}
        {sticker.type === 'svg-bg' && (
          <div className="w-full h-full relative" style={{ backgroundColor: (sticker as any).bg }}>
            <img src={(sticker as any).src} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        )}
      </div>
    );
  }

  return null;
}

export function TouchDragPreview() {
  const ctx = useTouchDrag();
  if (!ctx) return null;

  const { dragState } = ctx;
  if (!dragState.item) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: dragState.x,
        top: dragState.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.9,
      }}
    >
      <StickerPreview item={dragState.item} />
    </div>
  );
}
