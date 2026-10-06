import { FC } from "react";
import ProductDetails from "./product-details";
import { ProductGallery } from "./gallery/product-gallery";
import { BuyBox } from "./buy-box/buy-box";
import { CompatibilityCard } from "./compatibility/compatibility-card";
import { ProductSpecs } from "./specs/product-specs";
import { FitHelpCard } from "./help/fit-help-card";
import { StickyBuyBar } from "./buy-box/sticky-buy-bar";
import type { Product } from "@/lib/types";

interface ProductInfoProps {
  initialData: Product;
  /** H1 з моделлю — той самий текст, що й остання ланка хлібних крихт. */
  heading: string;
}

// Порожній блок (компонент повернув null) не має додавати проміжок.
const SLOT = "empty:hidden";

/**
 * Комп'ютер: дві незалежні колонки — висота однієї більше не лишає дірку в іншій.
 * Телефон: одна колонка в порядку макета (фото → покупка → сумісність → характеристики → допомога);
 * колонки там `contents`, а черговість задає `order`.
 */
const ProductInfo: FC<ProductInfoProps> = ({ initialData, heading }) => (
  <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-6">
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-6">
      <div className={`order-1 ${SLOT}`}>
        <ProductGallery images={initialData.images} title={initialData.title} />
      </div>
      <div className={`order-3 ${SLOT}`}>
        <CompatibilityCard models={initialData.models ?? []} catalogNumber={initialData.catalog_number} />
      </div>
      <div className={`order-4 ${SLOT}`}>
        <ProductSpecs product={initialData} />
      </div>
      <div className={`order-5 ${SLOT}`}>
        <ProductDetails initialData={initialData} />
      </div>
    </div>
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-6">
      <div className="order-2">
        <BuyBox product={initialData} heading={heading} />
      </div>
      <div className="order-6">
        <FitHelpCard />
      </div>
    </div>
    <StickyBuyBar product={initialData} />
  </div>
);

export default ProductInfo;
