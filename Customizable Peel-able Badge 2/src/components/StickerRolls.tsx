import React from 'react';
import { STICKER_TYPES, ABOUT_STICKER_TYPES, GOAL_STICKER_TYPES, ROLE_STICKER_TYPES, TIME_STICKER_TYPES } from '../constants/stickers';
import { DraggableSticker, DraggablePronounSticker, DraggableAboutSticker, DraggableGoalSticker, DraggableRoleSticker, DraggableTimeSticker } from './DraggableStickers';
import { SpoolGraphics } from './SpoolGraphics';

export function StickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const extendedStickers = [...STICKER_TYPES, ...STICKER_TYPES, ...STICKER_TYPES];

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[2px] h-[56px] w-[900px]">
            <div className="flex gap-3 py-3">
              {extendedStickers.map((sticker, idx) => (
                <DraggableSticker key={`roll-${idx}`} stickerType={sticker.id} color={sticker.color} label={sticker.label} textColor={sticker.textColor} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="year" />
      </div>
    </div>
  );
}

export function PronounStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const pronouns = ['any pronouns', 'he/him', 'he/They', 'She/They', 'She/her', 'they/them', 'any pronouns', 'he/him'];

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[8px] w-[427px]">
            <div className="flex flex-wrap gap-[6px] gap-x-[14px]">
              {pronouns.map((pronoun, idx) => (
                <DraggablePronounSticker key={`pronoun-${idx}`} text={pronoun} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="pronoun" />
      </div>
    </div>
  );
}

export function AboutStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const extendedStickers = [...ABOUT_STICKER_TYPES, ...ABOUT_STICKER_TYPES, ...ABOUT_STICKER_TYPES];

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[8px] w-[900px]">
            <div className="flex gap-[9px] items-center py-[10px]">
              {extendedStickers.map((sticker, idx) => (
                <DraggableAboutSticker key={`about-${idx}`} aboutId={sticker.id} label={sticker.label} color={sticker.color} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="about" />
      </div>
    </div>
  );
}

export function GoalStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const extendedStickers = [...GOAL_STICKER_TYPES, ...GOAL_STICKER_TYPES, ...GOAL_STICKER_TYPES, ...GOAL_STICKER_TYPES];

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[2px] h-[56px] w-[900px]">
            <div className="flex gap-3 py-1 items-center">
              {extendedStickers.map((sticker, idx) => (
                <DraggableGoalSticker key={`goal-${idx}`} goalId={sticker.id} label={sticker.label} color={sticker.color} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="goal" />
      </div>
    </div>
  );
}

export function RoleStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  const extendedStickers = [...ROLE_STICKER_TYPES, ...ROLE_STICKER_TYPES, ...ROLE_STICKER_TYPES, ...ROLE_STICKER_TYPES];

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[2px] h-[56px] w-[900px]">
            <div className="flex gap-3 py-1 items-center">
              {extendedStickers.map((sticker, idx) => (
                <DraggableRoleSticker key={`role-${idx}`} roleId={sticker.id} label={sticker.label} color={sticker.color} textColor={sticker.textColor} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="role" />
      </div>
    </div>
  );
}

export function TimeStickerRoll({ isAnimating }: { isAnimating: boolean }) {
  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <div className="relative">
        <div className="absolute bg-white h-[50px] rounded-tr-[16px] top-[35px] w-[64px] right-0" />
        <div className={`relative bg-white h-[80px] overflow-hidden rounded-tr-[20px] w-[64px] ${
          isAnimating ? 'animate-roll-collapse' : 'animate-roll-expand'
        }`}>
          <div className="absolute left-[8px] top-[17px] h-[56px] w-[600px]">
            <div className="flex gap-1 py-1 items-center">
              {TIME_STICKER_TYPES.map((sticker, idx) => (
                <DraggableTimeSticker key={`time-${idx}`} timeId={sticker.id} label={sticker.label} src={sticker.src} textColor={sticker.textColor} />
              ))}
            </div>
          </div>
        </div>
        <SpoolGraphics id="time" />
      </div>
    </div>
  );
}
