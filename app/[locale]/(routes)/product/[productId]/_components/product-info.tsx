import { FC } from "react";
import Slider from "./slider";
import ProductDetails from "./product-details";
import { BuyBox } from "./buy-box/buy-box";
import { CompatibilityCard } from "./compatibility/compatibility-card";
import { ProductSpecs } from "./specs/product-specs";
import { FitHelpCard } from "./help/fit-help-card";
import type { Product } from "@/lib/types";

interface ProductInfoProps {
  initialData: Product;
  /** H1 з моделлю — той самий текст, що й остання ланка хлібних крихт. */
  heading: string;
}

const TWO_COLUMNS = "grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6 items-start";

/** Серверна розкладка картки: зверху рішення про покупку, нижче — «чи підійде» і допомога. */
const ProductInfo: FC<ProductInfoProps> = ({ initialData, heading }) => (
  <div className="flex flex-col gap-4 lg:gap-6">
    <div className={TWO_COLUMNS}>
      <Slider images={initialData.images} title={initialData.title} />
      <BuyBox product={initialData} heading={heading} />
    </div>
    <div className={TWO_COLUMNS}>
      <div className="flex flex-col gap-4 lg:gap-6 min-w-0">
        <CompatibilityCard models={initialData.models ?? []} catalogNumber={initialData.catalog_number} />
        <ProductSpecs product={initialData} />
        <ProductDetails initialData={initialData} />
      </div>
      <FitHelpCard />
    </div>
  </div>
);

export default ProductInfo;
