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
import Link from "next/link";

interface ProductInfoProps {
  initialData: {
    quantity: number;
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
        modelName: string;
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
    quantity,
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
              {quantity === 0 ? (
                <span className="text-[#ffa900] text-sm font-medium">
                  Під замовлення
                </span>
              ) : (
                <div className="flex items-center gap-[6px] text-[#00a046] text-xs font-medium">
                  <Available className="stroke-[#00a046]" />В наявності
                </div>
              )}
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
          <div className="flex items-center flex-wrap gap-3">
            {models?.length > 0 && (
              <h3 className="text-base font-bold">Моделі:</h3>
            )}
            {models?.map((item, index) => {
              return (
                <React.Fragment key={item?.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/${item?.model?.modelName}`}
                    className="underline text-[#C0092A] cursor-pointer max-w-max"
                  >
                    {item?.model?.name}
                    {index < models.length - 1 && ", "}
                  </Link>
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
