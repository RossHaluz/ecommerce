import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Available from "/public/images/available.svg";
import Bag from "/public/images/bag.svg";
import { Button } from "@/components/ui/button";

interface BesrSellersItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    price: string;
    article: string;
    images: {
      id: string;
      url: string;
    }[];
  };
}

const BestSellersItem: FC<BesrSellersItemProps> = ({ item }) => {
  const productImage = item?.images?.map((item) => item?.url)[0];

  return (
    <li className="rounded-[5px] border border-[rgba(72,72,72,0.2)] overflow-hidden">
      <Link href="/" className="flex flex-col">
        <div className="w-full h-[253px] relative overflow-hidden">
          <Image
            src={productImage}
            alt={item?.title}
            fill
            className="absolute top-0 left-0 object-cover"
          />
        </div>

        <div className="px-[14px] py-5">
          <div className="flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[15px]">
              <h2 className="font-bold text-base">{item?.title}</h2>

              <div className="flex flex-col gap-[13px]">
                <div className="flex items-center gap-[6px]">
                  <Available />
                  <span className="text-[#7FAA84] text-xs font-medium">
                    В наявності
                  </span>
                </div>

                <span className="text-[#484848] text-xs">
                  Артикул: {item?.article}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#7FAA84] font-bold text-base">
                {item?.price} ₴
              </span>
              <Button variant="ghost" className="hover:bg-none">
                <Bag />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default BestSellersItem;
