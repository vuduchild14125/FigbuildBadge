import { useState } from 'react';
import { FUN_STICKERS } from '../constants/stickers';
import { DraggableFunSticker } from './DraggableStickers';
import { StickerRoll, PronounStickerRoll, AboutStickerRoll, GoalStickerRoll, RoleStickerRoll, TimeStickerRoll } from './StickerRolls';
import type { StickerTab } from '../types';

export function StickersPanel() {
  const [activeTab, setActiveTab] = useState<StickerTab>('year');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (newTab: StickerTab) => {
    if (newTab !== activeTab) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(newTab);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="bg-[#ececec] rounded-[12px] pt-[20px] pb-[24px] px-[20px] w-full relative">
      <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95] mb-3">Stickers</h2>

      <div className="flex gap-4 mb-4">
        {(['year', 'pronouns', 'about', 'goals', 'time', 'role'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-1 py-1 rounded text-[14px] uppercase font-['Fragment_Mono:Regular',sans-serif] leading-[1.2] transition-colors ${
              activeTab === tab ? 'bg-[#c4baff] text-[#4d49fc]' : 'text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative h-[130px] overflow-hidden">
        {activeTab === 'year' && <StickerRoll isAnimating={isAnimating} />}
        {activeTab === 'pronouns' && <PronounStickerRoll isAnimating={isAnimating} />}
        {activeTab === 'about' && <AboutStickerRoll isAnimating={isAnimating} />}
        {activeTab === 'goals' && <GoalStickerRoll isAnimating={isAnimating} />}
        {activeTab === 'time' && <TimeStickerRoll isAnimating={isAnimating} />}
        {activeTab === 'role' && <RoleStickerRoll isAnimating={isAnimating} />}
      </div>
      <FunStickersSheet />
    </div>
  );
}

export function FunStickersSheet() {
  return (
    <div className="mt-4 px-2">
      <div className="text-[11px] font-bold uppercase text-black mb-2" style={{ fontFamily: "'Figma Mono VF:Regular', monospace" }}>
        Fun Stickers
      </div>
      <div className="flex flex-wrap gap-2">
        {FUN_STICKERS.map((sticker) => (
          <DraggableFunSticker key={sticker.id} sticker={sticker} />
        ))}
      </div>
    </div>
  );
}
