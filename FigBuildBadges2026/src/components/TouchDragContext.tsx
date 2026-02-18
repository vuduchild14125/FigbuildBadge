import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface TouchDragItem {
  [key: string]: any;
}

interface TouchDragState {
  item: TouchDragItem | null;
  x: number;
  y: number;
}

interface TouchDragContextValue {
  startDrag: (item: TouchDragItem, x: number, y: number) => void;
  dragState: TouchDragState;
}

const TouchDragCtx = createContext<TouchDragContextValue | null>(null);

export function useTouchDrag() {
  return useContext(TouchDragCtx);
}

export function TouchDragProvider({
  children,
  badgeRef,
  onDrop,
}: {
  children: React.ReactNode;
  badgeRef: React.RefObject<HTMLDivElement | null>;
  onDrop: (item: TouchDragItem, x: number, y: number) => void;
}) {
  const [dragState, setDragState] = useState<TouchDragState>({ item: null, x: 0, y: 0 });
  const dragRef = useRef<TouchDragState>({ item: null, x: 0, y: 0 });
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;

  const startDrag = useCallback((item: TouchDragItem, x: number, y: number) => {
    dragRef.current = { item, x, y };
    setDragState({ item, x, y });
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.item) return;
      e.preventDefault();
      const touch = e.touches[0];
      dragRef.current = { ...dragRef.current, x: touch.clientX, y: touch.clientY };
      setDragState({ ...dragRef.current });
    };

    const handleTouchEnd = () => {
      const state = dragRef.current;
      if (!state.item) return;

      if (badgeRef.current) {
        const badgeRect = badgeRef.current.getBoundingClientRect();
        if (
          state.x >= badgeRect.left &&
          state.x <= badgeRect.right &&
          state.y >= badgeRect.top &&
          state.y <= badgeRect.bottom
        ) {
          const scaleX = badgeRect.width / 483;
          const scaleY = badgeRect.height / 682;
          const dropX = (state.x - badgeRect.left) / scaleX;
          const dropY = (state.y - badgeRect.top) / scaleY;
          onDropRef.current(state.item, dropX, dropY);
        }
      }

      dragRef.current = { item: null, x: 0, y: 0 };
      setDragState({ item: null, x: 0, y: 0 });
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [badgeRef]);

  return (
    <TouchDragCtx.Provider value={{ startDrag, dragState }}>
      {children}
    </TouchDragCtx.Provider>
  );
}
