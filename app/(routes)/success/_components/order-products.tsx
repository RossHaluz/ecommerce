import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface OrderProductsProps {
  item: {
    images: {
      url: string;
    }[];
    title: string;
    article: string;
    quantity: number;
    price: number;
    id: string;
    product_name: string;
  };
}

const OrderProducts: FC<OrderProductsProps> = ({ item }) => {
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="relative">
      <div className="flex items-start gap-[15px]">
        <Link
          href={`/${item?.id}`}
          className="relative rounded-[5px] overflow-hidden w-[94px] h-[94px]"
        >
          <Image
            src={item?.images[0]?.url}
            alt="Order image"
            fill
            className="absolute top-0 right-0 object-cover"
            unoptimized={true}
          />
        </Link>

        <div className="flex flex-col gap-[9px]">
          <div className="flex flex-col gap-[15px]">
            <Link
              href={`/product/${item?.product_name}`}
              className="text-[#484848] text-sm font-bold underline"
            >
              {capitalizeFirstLetter(item?.title)}
            </Link>
            <span className="text-[#484848] text-xs">{item?.article}</span>
          </div>

          <span className="text-[#484848] md:text-base hidden md:inline-block absolute left-1/2 bottom-0 transform -translate-x-1/2">
            {item?.quantity} шт.
          </span>

          <div className="flex items-end gap-[26px] md:gap-3 md:absolute bottom-0 right-0">
            <span className="text-[#484848] md:text-base">
              {item?.quantity} товар на суму
            </span>
            <span className="text-[#c0092a] text-lg">
              {USDollar.format(Number(item?.price))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
