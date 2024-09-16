"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import print from '/public/images/print.png';

type StoreData = {
  heroTitle: string;
  heroDesc: string;
  heroImages: {
    image: string;
    id: string;
  }[];
};

const Hero: FC<StoreData> = ({ heroTitle, heroDesc, heroImages }) => {
  return (
    <div className="relative overflow-hidden  pt-[189px] pb-[215px]">
      {heroImages?.map(({ image: herpImage, id }) => (
        <Image
          src={herpImage}
          key={id}
          priority={true}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Hero backgraund"
        />
      ))}

      <div className="relative container w-full h-full  flex flex-col justify-center gap-[42.97px]">
        <div className="flex flex-col gap-7 lg:w-[656px]">
          <h1 className="font-bold text-[24px] leading-[30.12px] lg:text-[48px] lg:font-bold lg:leading-[60.24px]">
            {heroTitle}
          </h1>
          <h2 className="text-sm text-[#484848] lg:text-[24px] lg:leading-[29.26px]">
            {heroDesc}
          </h2>
          
        </div>

        <Button className="py-[11.5px] px-5 max-w-max cursor-pointer lg:px-[25px] lg:py-[15px] lg:text-base lg:font-semibold rounded-[5px]">
          <Link href="/categories">Перейти в каталог</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
