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
    <div className="bg-[#ececec] rounded-[12px] pt-[20px] pb-[24px] px-[20px] w-full relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      {/* Header with Tabs */}
      <div className="flex items-center gap-4 mb-5">
        <h2 className="font-['Figma_Sans_VF:Bold',sans-serif] text-[24px] tracking-[-0.72px] leading-[0.95]">Stickers</h2>
        <div className="flex gap-4">
          {(['year', 'pronouns', 'about', 'goals', 'time', 'role'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-1 py-1 text-[14px] uppercase font-['Fragment_Mono:Regular',sans-serif] leading-[1.2] transition-colors ${
                activeTab === tab ? 'bg-[#c4baff] text-[#4d49fc]' : 'text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sticker Roll */}
      <div className="relative h-[111px] overflow-hidden mb-4">
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
    <div>
      <div className="font-['Fragment_Mono:Regular',sans-serif] text-[14px] uppercase text-black mb-3 leading-[1.2]">
        STICKER SHEET
      </div>
      <div className="bg-white rounded-[8px] p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="grid grid-cols-6 gap-2">
          {FUN_STICKERS.map((sticker) => (
            <DraggableFunSticker key={sticker.id} sticker={sticker} />
          ))}
        </div>
      </div>
    </div>
  );
}
