import React from 'react';

export function DecorativeElements() {
  return (
    <>
      <div className="hidden lg:block absolute bottom-0 left-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}bottomleft.png`} alt="" className="block max-w-none w-[180px] xl:w-[220px] 2xl:w-[280px] h-auto" />
      </div>
      <div className="hidden lg:block absolute bottom-0 right-0 pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}bottomright.png`} alt="" className="block max-w-none w-[180px] xl:w-[220px] 2xl:w-[280px] h-auto" />
      </div>
    </>
  );
}
