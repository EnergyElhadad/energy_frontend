'use client'

import { Counter } from "@/shared/components/layout/Header/components/Counter";
import { HeartIcon } from "@/shared/components/icons/Heart";
import { LanguageSwitcher } from "@/shared/components/LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";

export const Toolsbar = () => {
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(1);

  return (
    <div className="flex items-center gap-[24px]">
      <LanguageSwitcher />

      <div className="relative">
        <button className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-Stroke relative">
          <HeartIcon className="text-primary" />

          <span className="absolute top-[-6px] right-[-6px] w-[16px] h-[16px] bg-Alert text-white text-[12px] rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        <div className="absolute top-[50px] left-[50%] translate-x-[-50%] w-[370px] bg-white rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] z-50 p-[20px] cursor-default">
          <div className="arrow-up absolute top-[-20px] left-[50%] translate-x-[-50%] border-10 border-transparent border-b-white z-10"></div>
          <div className="">
            <h3 className="text-[14px] font-semibold mb-[7px]">سلة التسوق</h3>

            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[10px] border border-Stroke rounded-[8px] p-[8px]">
                <Image src="/images/products/01.webp" alt="" width={112} height={106} />
                <div>
                  <h4 className="text-[12px] font-semibold mb-[4px]">Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...</h4>
                  <p className="text-[14px] text-signalGray">Accessories</p>

                  <div className="flex items-center justify-between gap-[10px]">
                    <Counter
                      value={count}
                      onChange={setCount}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-[10px] border border-Stroke rounded-[8px] p-[8px]">
                <Image src="/images/products/01.webp" alt="" width={112} height={106} />
                <div>
                  <h4 className="text-[12px] font-semibold mb-[4px]">Joyroom JR-PBF19 22.5W Digital Display Fast Charging Power Bank with Dual...</h4>
                  <p className="text-[14px] text-signalGray">Accessories</p>

                  <div className="flex items-center justify-between gap-[10px]">
                    <Counter
                      value={count2}
                      onChange={setCount2}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
