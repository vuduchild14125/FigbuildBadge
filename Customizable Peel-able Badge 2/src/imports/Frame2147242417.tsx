function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#4d49fc] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="bg-white shrink-0 size-[66px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] font-normal justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[0.95]">None</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px] shrink-0">
      <div className="bg-white relative shrink-0 size-[66px]">
        <div aria-hidden="true" className="absolute border-[1.647px] border-black border-dashed inset-0 pointer-events-none" />
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] font-normal justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[0.95]">Dashed</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px] shrink-0">
      <div className="bg-white relative shrink-0 size-[66px]">
        <div aria-hidden="true" className="absolute border-[1.647px] border-black border-dashed inset-[-0.824px] pointer-events-none" />
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] font-normal justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[0.95]">Wiggly</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center p-[4px] relative rounded-[2px] shrink-0">
      <div className="bg-white relative shrink-0 size-[66px]">
        <div aria-hidden="true" className="absolute border-[1.647px] border-black border-solid inset-[-0.824px] pointer-events-none" />
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Figma_Sans_VF:Regular',sans-serif] font-normal justify-center leading-[0] left-[4px] not-italic opacity-50 text-[14px] text-black top-[86px] tracking-[-0.42px] whitespace-nowrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[0.95]">Solid</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame4 />
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="bg-[#ececec] content-stretch flex flex-col items-start justify-between pb-[40px] pt-[20px] px-[20px] relative rounded-[12px] size-full">
      <div className="flex flex-col font-['Figma_Sans_VF:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-0.72px] w-full" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[0.95] whitespace-pre-wrap">Border</p>
      </div>
      <Frame />
    </div>
  );
}