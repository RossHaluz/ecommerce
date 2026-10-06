"use client";
import { StockStatus } from "@/entities/product/ui/stock-status";

import React, { FC } from "react";
import { useTranslations } from "next-intl";
import Slider from "./slider";
import { Separator } from "@/components/ui/separator";
import ProductPrice from "./product-price";
import ProductBtn from "./product-btn";
import ProductAttention from "./product-attention";
import ProductDetails from "./product-details";
import OrderOneClick from "./order-one-click";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductInfoProps {
  initialData: Product;
  /** H1 з моделлю — той самий текст, що й остання ланка хлібних крихт. */
  heading: string;
}

const ProductInfo: FC<ProductInfoProps> = ({ initialData, heading }) => {
  const {
    images: imagesProduct,
    title,
    price,
    quantity,
    catalog_number,
    article,
    models,
  } = initialData;

  const images = imagesProduct?.flatMap(
    (item: { url: string; id: string }) => item
  );
  const t = useTranslations("product");

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="grid grid-cols-1 gap-[15px] lg:grid-cols-2 lg:gap-4 items-start">
        <Slider images={images} title={title} />
        <div className="flex flex-col gap-[15px] lg:gap-4">
          <h1 className="text-[#484848] text-base font-bold lg:text-[30px] lg:leading-[32px]">
            {heading}
          </h1>
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#484848] text-sm text-bold">
                {t("catalogNumber")}:{" "}
                <span className="text-bold">{catalog_number}</span>
              </span>
              <span className="text-[#484848] text-sm text-bold">
                <span className="font-semibold">{t("article")}:</span>{" "}
                {article}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <StockStatus quantity={quantity} className="text-sm" withIcon />
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
              <ProductPrice price={Number(price)} />

              <div className="flex items-center gap-[15px]">
                <ProductBtn item={initialData} />
              </div>
            </div>
          </div>

          <ProductDetails initialData={initialData} />
          <div className="flex items-center flex-wrap gap-3">
            {models?.length > 0 && (
              <h3 className="text-base font-bold">{t("modelPlural")}</h3>
            )}
            {models?.map((item, index) => {
              return (
                <React.Fragment key={item?.model?.id}>
                  <Link
                    href={`/${item?.model?.modelName}`}
                    className="underline text-[#C0092A] cursor-pointer max-w-max"
                    scroll={false}
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
