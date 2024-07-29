"use client";
import Available from "/public/images/available.svg";

import React, { FC, useEffect, useState } from "react";
import Slider from "./slider";
import { Separator } from "@/components/ui/separator";
import ProductOption from "./product-option";
import ProductPrice from "./product-price";
import ProductCount from "./product-count";
import ProductBtn from "./product-btn";
import ProductAttention from "./product-attention";

interface ProductInfoProps {
  initialData: {
    images: { url: string; id: string }[];
    productOptions: {
      option: {
        name: string;
        id: string;
      };

      productOptionValues: {
        id: string;
        price: string;
        optionValue: {
          id: string;
          value: string;
        };
      }[];
    }[];
    title: string;
    description: string;
    price: string;
    article: string;
    id: string;
  };
}

const ProductInfo: FC<ProductInfoProps> = ({ initialData }) => {
  const {
    images: imagesProduct,
    title,
    price,
    article,
    productOptions,
  } = initialData;

  const [currentPrice, setCurrentPrice] = useState(Number(price));
  const [count, setCount] = useState<number>(1);
  const [savePrice, setSavePrice] = useState<string>(price);
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  const [priceForOne, setPriceForOne] = useState<string>("");

  const images = imagesProduct?.flatMap(
    (item: { url: string; id: string }) => item
  );

  useEffect(() => {
    const price = count * Number(savePrice);
    setCurrentPrice(price);
  }, [count]);

  const optionValues = productOptions?.map((option) => ({
    title: option?.option?.name,
    id: option?.option?.id,
    optionValue: option?.productOptionValues?.map((item) => ({
      id: item?.id,
      price: item?.price,
      optionValue: item?.optionValue?.value,
      option: option?.option?.id,
    })),
  }));

  return (
    <div className="flex flex-col gap-[30px]">
      <h1 className="text-[#484848] hidden lg:inline-block font-bold lg:text-2xl">
        {title}
      </h1>

      <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-2 lg:gap-[30px] pb-8 lg:pb-[30px] items-center">
        <Slider images={images} />
        <h1 className="text-[#484848] text-base font-bold lg:hidden">
          {title}
        </h1>
        <div className="flex flex-col gap-[15px] lg:gap-[60px]">
          <div className="flex flex-col gap-[15px] lg:gap-[30px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px] text-[#7FAA84] text-xs font-medium">
                <Available />В наявності
              </div>
              <span className="text-[#484848] text-xs">Артикул: {article}</span>
            </div>
            <div className="flex flex-col gap-[15px] lg:gap-[30px] lg:flex-col-reverse">
              <Separator />
              <ProductOption
                optionValues={optionValues}
                setCurrentPrice={setCurrentPrice}
                setSavePrice={setSavePrice}
                setSelectOptions={setSelectOptions}
                setPriceForOne={setPriceForOne}
              />
            </div>

            <ProductAttention />
          </div>

          <div className="flex flex-col gap-[15px] lg:gap-[30px]">
            <ProductPrice price={currentPrice} />

            <div className="flex items-center gap-[15px]">
              <ProductCount
                count={count}
                setCount={setCount}
                savePrice={Number(savePrice)}
                setCurrentPrice={setCurrentPrice}
              />

              <ProductBtn
                item={initialData}
                priceForOne={priceForOne ? priceForOne : initialData?.price}
                currentPrice={currentPrice}
                selectOptions={selectOptions}
                count={count}
                savePrice={savePrice}
                setCurrentPrice={setCurrentPrice}
                productOptions={productOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
