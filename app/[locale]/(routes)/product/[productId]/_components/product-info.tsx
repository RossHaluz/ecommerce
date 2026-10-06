import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Slider from "./slider";
import ProductDetails from "./product-details";
import { BuyBox } from "./buy-box/buy-box";
import type { Product } from "@/lib/types";

interface ProductInfoProps {
  initialData: Product;
  /** H1 з моделлю — той самий текст, що й остання ланка хлібних крихт. */
  heading: string;
}

/** Серверна розкладка картки: галерея зліва, рішення про покупку справа; інтерактив — у листках. */
const ProductInfo: FC<ProductInfoProps> = ({ initialData, heading }) => {
  const t = useTranslations("product");
  const { images, title, models } = initialData;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6 items-start">
        <Slider images={images} title={title} />
        <BuyBox product={initialData} heading={heading} />
      </div>

      <ProductDetails initialData={initialData} />
      {models?.length > 0 && (
        <div className="flex items-center flex-wrap gap-3">
          <h2 className="text-base font-bold">{t("modelPlural")}</h2>
          {models.map((item, index) => (
            <Link
              key={item?.model?.id}
              href={`/${item?.model?.modelName}`}
              prefetch={false}
              className="underline text-[#C0092A] max-w-max"
            >
              {item?.model?.name}
              {index < models.length - 1 && ", "}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
