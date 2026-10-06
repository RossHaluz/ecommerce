import { useTranslations } from "next-intl";
import type { Product } from "@/lib/types";
import ProductBtn from "../product-btn";
import OrderOneClick from "../order-one-click";
import { CatalogNumberChip } from "./catalog-number-chip";
import { PriceBlock } from "./price-block";
import { StockLine } from "./stock-line";
import { TrustList } from "./trust-list";

/** Рішення про покупку: що це, чи є, скільки коштує, кнопка й чому не страшно. Саме в такому порядку. */
export const BuyBox = ({ product, heading }: { product: Product; heading: string }) => {
  const t = useTranslations("product");

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <h1 className="m-0 text-[22px] leading-7 lg:text-[30px] lg:leading-9 font-extrabold text-[#2E2E2E]">{heading}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {product.catalog_number && <CatalogNumberChip value={product.catalog_number} />}
        {product.article && (
          <span className="text-[#6B6B6B]">
            {t("article")} {product.article}
          </span>
        )}
      </div>
      <StockLine quantity={product.quantity} />
      <PriceBlock price={Number(product.price)} />
      <ProductBtn item={product} />
      <OrderOneClick
        item={{
          productId: product.id,
          price: product.price,
          quantity: 1,
          title: product.title,
          article: product.article,
        }}
      />
      <TrustList />
    </section>
  );
};
