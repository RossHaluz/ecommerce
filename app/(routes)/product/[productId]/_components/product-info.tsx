"use client";
import Available from "/public/images/available.svg";

import React, { FC, useEffect, useState } from "react";
import Slider from "./slider";
import { Separator } from "@/components/ui/separator";
import ProductPrice from "./product-price";
import ProductBtn from "./product-btn";
import ProductAttention from "./product-attention";
import ProductDetails from "./product-details";
import OrderOneClick from "./order-one-click";

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
    catalog_number: string;
    price: string;

    models: {
      id: string;
      model: {
        name: string;
      };
    }[];
    article: string;
    id: string;
  };
}

const ProductInfo: FC<ProductInfoProps> = ({ initialData }) => {
  const {
    images: imagesProduct,
    title,
    price,
    catalog_number,
    article,
    productOptions,
    models,
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
  }, [count, savePrice]);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-2 lg:gap-4 items-start">
        <Slider images={images} />
        <h1 className="text-[#484848] text-base font-bold lg:hidden">
          {capitalizeFirstLetter(title)}
        </h1>
        <div className="flex flex-col gap-[15px] lg:gap-4">
          <h1 className="text-[#484848] hidden lg:inline-block font-bold text-[30px] leading-[32px]">
            {capitalizeFirstLetter(title)}
          </h1>
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#484848] text-sm text-bold">
                Каталожний номер:{" "}
                <span className="text-bold">{catalog_number}</span>
              </span>
              <span className="text-[#484848] text-sm text-bold">
                <span className="font-semibold">Артикул:</span> {article}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px] text-[#c0092a] text-xs font-medium">
                <Available className="stroke-[#c0092a]" />В наявності
              </div>
            </div>

            <div className="flex flex-col gap-[15px] lg:gap-[30px] lg:flex-col-reverse">
              <Separator />
            </div>

            <ProductAttention price={parseInt(initialData?.price)} />
          </div>

          <div className="flex flex-col gap-4">
            <OrderOneClick
              item={{
                productId: initialData?.id,
                price: initialData?.price,
                quantity: 1,
                title: initialData?.title,
                article: initialData?.article,
              }}
            />
            <div className="flex items-center gap-4 justify-between">
              <ProductPrice price={currentPrice} />

              <div className="flex items-center gap-[15px]">
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

          <ProductDetails initialData={initialData} />
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold">Моделі:</h3>
            {models?.map((item, index) => {
              return (
                <React.Fragment key={item?.id}>
                  {item?.model?.name}
                  {index < models.length - 1 && ", "}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
