import type { Product } from "@/lib/types";
import ProductBtn from "../product-btn";
import { OrderOneClick } from "@/features/one-click/order-one-click";
import { FavoriteButton } from "@/features/favorites";
import { ProductHeadline } from "./product-headline";
import { PriceBlock } from "./price-block";
import { StockLine } from "@/entities/product/ui/stock-line";
import { TrustList } from "./trust-list";
import { MAIN_BUY_CTA_ID } from "./main-buy-cta";

/** Рішення про покупку: що це, чи є, скільки коштує, кнопка й чому не страшно. Саме в такому порядку. */
export const BuyBox = ({ product, heading }: { product: Product; heading: string }) => {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <ProductHeadline product={product} heading={heading} />
      <StockLine quantity={product.quantity} />
      <PriceBlock price={Number(product.price)} />
      <div id={MAIN_BUY_CTA_ID} className="flex items-stretch gap-2">
        <div className="min-w-0 flex-1">
          <ProductBtn item={product} />
        </div>
        <FavoriteButton product={product} variant="outline" />
      </div>
      <OrderOneClick
        items={[
          {
            productId: product.id,
            price: product.price,
            quantity: 1,
            title: product.title,
            article: product.article,
          },
        ]}
      />
      <TrustList />
    </section>
  );
};
