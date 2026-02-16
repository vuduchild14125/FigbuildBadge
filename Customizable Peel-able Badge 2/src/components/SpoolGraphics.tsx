import React from 'react';

export function SpoolGraphics({ id }: { id: string }) {
  return (
    <>
      {/* Roll cylinder */}
      <div className="absolute h-[16px] right-0 top-[91px] w-[64px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.367 15.5321">
          <ellipse cx="32.1835" cy="7.76607" fill={`url(#radial_roll_${id})`} rx="32.1835" ry="7.76607" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(32.1835 7.76607) rotate(90) scale(49.858 12.031)" gradientUnits="userSpaceOnUse" id={`radial_roll_${id}`} r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#D9D9D9" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Inner spool */}
      <div className="absolute h-[11px] right-[8px] top-[93px] w-[48px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.3099 10.9606">
          <ellipse cx="24.155" cy="5.48032" fill={`url(#linear_spool_${id})`} rx="24.155" ry="5.48032" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id={`linear_spool_${id}`} x1="24.155" x2="24.155" y1="-14.9701" y2="9.88243">
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
                  <path d="M2.50722 0C3.88623 0 5.00722 34.1778 5.00722 76.3958H0C0 34.1778 1.12099 0 2.50722 0Z" fill={`url(#linear_highlight_${id})`} />
                </g>
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id={`linear_highlight_${id}`} x1="3.00722" x2="3.00722" y1="0" y2="76.3958">
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
    </>
  );
}
