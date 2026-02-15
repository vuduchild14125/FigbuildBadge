import svgPaths from "./svg-mca9e7455i";
import imgCanvas from "figma:asset/8a5217480a69dba70d868631f72831a0ee3222f9.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[21px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[15.5px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px] tracking-[-0.42px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Back
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-0 w-[54.672px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[182.391px] left-0 top-[45px] w-[339px]" data-name="Heading 1">
      <p className="absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[60.8px] left-0 not-italic text-[64px] text-black top-[-0.5px] tracking-[-1.92px] w-[275px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Make your FigBadge your own!
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[227.391px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Heading />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[22.797px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figma_Sans_VF:Bold',sans-serif] font-bold leading-[22.8px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[-0.72px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Border
      </p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[21px] left-[19.85px] top-[82px] w-[34.297px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[17px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        none
      </p>
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-white left-0 rounded-[6px] shadow-[0px_0px_0px_0px_#4d49fc] size-[74px] top-0" data-name="Container" />;
}

function Button1() {
  return (
    <div className="h-[103px] relative shrink-0 w-[74px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text1 />
        <Container6 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[21px] left-[12.49px] top-[82px] w-[49.008px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[25.5px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        dashed
      </p>
    </div>
  );
}

function Container7() {
  return <div className="absolute bg-white border-[1.5px] border-black border-solid left-0 rounded-[6px] size-[74px] top-0" data-name="Container" />;
}

function Button2() {
  return (
    <div className="h-[103px] relative shrink-0 w-[74px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text2 />
        <Container7 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21px] left-[14.58px] top-[82px] w-[44.844px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[22px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        wiggly
      </p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[75.641px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.5px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pt-[-0.82px] px-[-0.82px] rounded-[6px] size-[74px] top-0" data-name="Container">
      <Container9 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[103px] relative shrink-0 w-[74px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text3 />
        <Container8 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[21px] left-[20.46px] top-[82px] w-[33.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[17.5px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        solid
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[75.641px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.5px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 pt-[-0.82px] px-[-0.82px] rounded-[6px] size-[74px] top-0" data-name="Container">
      <Container11 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[103px] relative shrink-0 w-[74px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text4 />
        <Container10 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[16px] h-[103px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#ececec] h-[185.797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
        <Heading1 />
        <Container5 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[22.797px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figma_Sans_VF:Bold',sans-serif] font-bold leading-[22.8px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[-0.72px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Draw
      </p>
    </div>
  );
}

function Container14() {
  return <div className="bg-[#171717] rounded-[16777200px] shrink-0 size-[8px]" data-name="Container" />;
}

function Button5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[98px] min-h-px min-w-px relative rounded-[8px] shadow-[0px_0px_0px_0px_#4d49fc]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return <div className="bg-[#171717] rounded-[16777200px] shrink-0 size-[12px]" data-name="Container" />;
}

function Button6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[98px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return <div className="bg-[#171717] rounded-[16777200px] shrink-0 size-[20px]" data-name="Container" />;
}

function Button7() {
  return (
    <div className="bg-white flex-[1_0_0] h-[98px] min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.008px] relative size-full">
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[98px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[24px] items-start pr-[0.008px] relative size-full">
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#ececec] h-[180.797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
        <Heading2 />
        <Container13 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[22.797px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figma_Sans_VF:Bold',sans-serif] font-bold leading-[22.8px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[-0.72px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Stickers
      </p>
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-white h-[50px] left-[268px] rounded-tr-[16px] top-[50px] w-[64px]" data-name="Container" />;
}

function Icon1() {
  return (
    <div className="h-[71px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_-0.6%_0.04%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.3084 70.9711">
          <path d={svgPaths.p143abe00} fill="var(--fill-0, #D65EFF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[71px] relative w-[51px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex h-[51px] items-center justify-center left-0 top-[12px] w-[70px]" data-name="Container">
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-[71px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[71px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_-0.6%_0.04%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.3084 70.9711">
          <path d={svgPaths.p143abe00} fill="var(--fill-0, #FF00E5)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[71px] relative w-[51px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex h-[51px] items-center justify-center left-[82px] top-[12px] w-[70px]" data-name="Container">
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-[71px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[71px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_-0.6%_0.04%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.3084 70.9711">
          <path d={svgPaths.p143abe00} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[71px] relative w-[51px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex h-[51px] items-center justify-center left-[164px] top-[12px] w-[70px]" data-name="Container">
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-[71px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[71px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0_-0.6%_0.04%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.3084 70.9711">
          <path d={svgPaths.p143abe00} fill="var(--fill-0, #8676FF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[71px] relative w-[51px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex h-[51px] items-center justify-center left-[246px] top-[12px] w-[70px]" data-name="Container">
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-[71px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container24 />
      <Container26 />
      <Container28 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[80px] items-start left-[3.5px] pl-[8px] pr-[-6px] pt-[2px] rounded-tr-[20px] top-[14.72px] w-[328px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 16">
        <path d={svgPaths.p205670b0} fill="url(#paint0_radial_3_2444)" id="Vector" />
        <defs>
          <radialGradient cx="0" cy="0" gradientTransform="translate(32 8.00002) rotate(90) scale(51.36 11.9624)" gradientUnits="userSpaceOnUse" id="paint0_radial_3_2444" r="1">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#D9D9D9" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col h-[16px] items-start left-[268px] top-[91px] w-[64px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0001 11">
        <path d={svgPaths.p94ccb80} fill="url(#paint0_linear_3_2426)" id="Vector" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_2426" x1="24" x2="24" y1="-15.0239" y2="9.91795">
            <stop stopColor="#5A5A5A" />
            <stop offset="0.971154" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-[276px] top-[93px] w-[48px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0.14%_0_0] mix-blend-overlay" data-name="Group">
      <div className="absolute inset-[0_0.14%_0_0] mix-blend-overlay" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99281 76">
          <path d={svgPaths.p2979a830} fill="url(#paint0_linear_3_2454)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_2454" x1="2.99857" x2="2.99857" y1="0" y2="76">
              <stop stopColor="white" stopOpacity="0.12" />
              <stop offset="0.5" stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.12" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[76px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col h-[76.043px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[76px] relative w-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[-0.023px] px-[-2.5px] relative size-full">
        <Container34 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-center justify-center left-[314px] top-[16px] w-px" data-name="Container">
      <div className="flex h-[75.997px] items-center justify-center relative shrink-0 w-[0.703px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "153.5" } as React.CSSProperties}>
        <div className="flex-none rotate-[-0.53deg]">
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[130px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
      <Container30 />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#ececec] h-[212.797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
        <Heading3 />
        <Container18 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[22.797px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figma_Sans_VF:Bold',sans-serif] font-bold leading-[22.8px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[-0.72px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Cords
      </p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[76.2px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0.08%_2.51%_92.05%_1.97%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3891 6.00039">
          <path d={svgPaths.p26d02a00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_-236.01%_-479.48%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.964 441.565">
          <path d={svgPaths.p1402e100} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.35%_60%_65.35%_26.67%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8 4.8">
          <path d={svgPaths.p8570dc0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 overflow-clip pl-[8px] pr-[46px] pt-[8px] rounded-[4px] shadow-[0px_0px_0px_2px_#4d49fc] size-[90px] top-0" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[21px] left-[26.88px] top-[98px] w-[36.242px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[18px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        black
      </p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[119px] left-0 top-0 w-[90px]" data-name="Button">
      <Container37 />
      <Text5 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[76.2px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0.08%_2.51%_92.05%_1.97%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3891 6.00039">
          <path d={svgPaths.p26d02a00} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_-236.01%_-479.48%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.964 441.565">
          <path d={svgPaths.p1402e100} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.35%_60%_65.35%_26.67%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8 4.8">
          <path d={svgPaths.p8570dc0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 overflow-clip pl-[8px] pr-[46px] pt-[8px] rounded-[4px] size-[90px] top-0" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[21px] left-[11.21px] top-[98px] w-[67.57px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[34px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        periwinkle
      </p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[119px] left-[106px] top-0 w-[90px]" data-name="Button">
      <Container38 />
      <Text6 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[76.2px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[0.08%_2.51%_92.05%_1.97%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3891 6.00039">
          <path d={svgPaths.p26d02a00} fill="var(--fill-0, #4D49FC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_-236.01%_-479.48%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120.964 441.565">
          <path d={svgPaths.p1402e100} fill="var(--fill-0, #4D49FC)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[28.35%_60%_65.35%_26.67%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.8 4.8">
          <path d={svgPaths.p8570dc0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 overflow-clip pl-[8px] pr-[46px] pt-[8px] rounded-[4px] size-[90px] top-0" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[21px] left-[30.27px] top-[98px] w-[29.469px]" data-name="Text">
      <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[15px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        blue
      </p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[119px] left-[212px] top-0 w-[90px]" data-name="Button">
      <Container39 />
      <Text7 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[119px] relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[#ececec] h-[201.797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
        <Heading4 />
        <Container36 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[22.797px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Figma_Sans_VF:Bold',sans-serif] font-bold leading-[22.8px] left-0 not-italic text-[#0a0a0a] text-[24px] top-0 tracking-[-0.72px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Background
      </p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[38.25px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.55 38.25">
        <path d={svgPaths.p2d05ff70} fill="var(--fill-0, #4D49FC)" id="Vector" />
      </svg>
      <div className="absolute inset-[0_78.99%_76.47%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_33.61%_76.47%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_76.47%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_78.99%_38.82%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_33.61%_38.82%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_0_38.82%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_78.99%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.p2577d900} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_33.61%_0_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_0_0_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #24CB71)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col h-[23.85px] items-start pl-[1.8px] pr-[-8.55px] pt-[1.8px] relative shrink-0 w-full" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] shadow-[0px_0px_0px_2px_#4d49fc] w-[104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[57.2px] relative rounded-[inherit] size-full">
        <Container43 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[21px] relative shrink-0 w-[36.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[18px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          swag
        </p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[82px] items-center left-0 top-0 w-[104px]" data-name="Button">
      <Container42 />
      <Text8 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[38.25px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.55 38.25">
        <path d={svgPaths.p2d05ff70} fill="var(--fill-0, #FF00E5)" id="Vector" />
      </svg>
      <div className="absolute inset-[0_78.99%_76.47%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_33.61%_76.47%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_76.47%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_78.99%_38.82%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_33.61%_38.82%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_0_38.82%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_78.99%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.p2577d900} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_33.61%_0_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_0_0_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #C4BAFF)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col h-[23.85px] items-start pl-[1.8px] pr-[-8.55px] pt-[1.8px] relative shrink-0 w-full" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[57.2px] relative rounded-[inherit] size-full">
        <Container45 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[21px] relative shrink-0 w-[54.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[27px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          creative
        </p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[82px] items-center left-[120px] top-0 w-[104px]" data-name="Button">
      <Container44 />
      <Text9 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[38.25px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53.55 38.25">
        <path d={svgPaths.p2d05ff70} fill="var(--fill-0, #FF7238)" id="Vector" />
      </svg>
      <div className="absolute inset-[0_78.99%_76.47%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_33.61%_76.47%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_76.47%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_78.99%_38.82%_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.pa46f300} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_33.61%_38.82%_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.65%_0_38.82%_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.pc141000} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_78.99%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9">
          <path d={svgPaths.p2577d900} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_33.61%_0_52.94%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[76.47%_0_0_86.55%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.2 9">
          <path d={svgPaths.p35555880} fill="var(--fill-0, #E4FF97)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col h-[23.85px] items-start pl-[1.8px] pr-[-8.55px] pt-[1.8px] relative shrink-0 w-full" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] w-[104px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[57.2px] relative rounded-[inherit] size-full">
        <Container47 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[21px] relative shrink-0 w-[45.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute capitalize font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[21px] left-[23.5px] not-italic text-[14px] text-[rgba(0,0,0,0.5)] text-center top-[-0.5px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          playful
        </p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[82px] items-center left-[240px] top-0 w-[104px]" data-name="Button">
      <Container46 />
      <Text10 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[82px] relative shrink-0 w-full" data-name="Container">
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#ececec] h-[164.797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[20px] items-start pt-[20px] px-[20px] relative size-full">
        <Heading5 />
        <Container41 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[1041.984px] relative shrink-0 w-[372px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container4 />
        <Container12 />
        <Container17 />
        <Container35 />
        <Container40 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[37px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[40.43%_20.96%_38.53%_69.08%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.97475 7.7848">
          <path d={svgPaths.p2d92ab80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[40.43%_33.03%_39.13%_51.69%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.16815 7.56405">
          <path d={svgPaths.p2f3a0600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[40.43%_51.21%_31.97%_37.58%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.7253 10.2129">
          <path d={svgPaths.p32cfdc00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[32.83%_64.62%_39.13%_33.15%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33915 10.3749">
          <path d={svgPaths.p17aff680} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[32.83%_68.6%_39.13%_20.63%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.46035 10.3749">
          <path d={svgPaths.pd32ff80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col h-[80px] items-start left-0 pl-[30px] pr-[6px] top-0 w-[96px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Container52() {
  return <div className="absolute bg-[#d9d9d9] border border-[rgba(0,0,0,0.2)] border-solid h-[28px] left-0 top-[80px] w-[107px]" data-name="Container" />;
}

function Container50() {
  return (
    <div className="absolute h-[108px] left-[188px] top-0 w-[107px]" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[682px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Vector" />
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col h-[682px] items-start left-0 opacity-10 top-0 w-[483px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[59.844px] relative shrink-0 w-[213.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[59.85px] left-0 not-italic text-[63px] text-white top-[-0.5px] tracking-[-1.89px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          FigBuild
        </p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-black h-[91.844px] relative shrink-0 w-[245.57px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text11 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[59.844px] relative shrink-0 w-[141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[59.85px] left-0 not-italic text-[63px] text-white top-[-0.5px] tracking-[-1.89px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          2026
        </p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-black h-[91.844px] relative rounded-[16777200px] shrink-0 w-[173px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text12 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[91.844px] items-start left-[28.25px] top-[41.66px] w-[431.766px]" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Canvas() {
  return (
    <div className="absolute h-[682px] left-0 top-0 w-[483px]" data-name="Canvas">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCanvas} />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-white h-[682px] left-0 overflow-clip top-[108px] w-[483px]" data-name="Container">
      <Container54 />
      <Container55 />
      <Canvas />
    </div>
  );
}

function Container49() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[483px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container50 />
        <Container53 />
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white h-[50px] relative rounded-[10px] shrink-0 w-[89.469px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[24px] left-[45px] not-italic text-[#0a0a0a] text-[16px] text-center top-[13px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Undo
        </p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-white h-[50px] relative rounded-[10px] shrink-0 w-[89.586px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[24px] left-[45.5px] not-italic text-[#0a0a0a] text-[16px] text-center top-[13px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
          Clear
        </p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-[#4d49fc] flex-[1_0_0] h-[50px] min-h-px min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Figma_Sans_VF:Regular',sans-serif] font-normal leading-[24px] left-[58.5px] not-italic text-[16px] text-center text-white top-[13px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`I'm done!`}</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[50px] relative shrink-0 w-[326.57px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <Button14 />
        <Button15 />
        <Button16 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] h-[864px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-center relative size-full">
        <Container49 />
        <Container58 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[32px] h-[1041.984px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container48 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[1397.375px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[32px] items-start pt-[48px] px-[32px] relative size-full">
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

export default function CustomizablePeelAbleBadge() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start pt-[-338.5px] relative size-full" data-name="Customizable Peel-able Badge">
      <Container />
    </div>
  );
}