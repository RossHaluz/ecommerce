import type { Product } from "@/lib/types";
import ProductBtn from "../product-btn";
import { OrderOneClick } from "@/features/one-click/order-one-click";
import { FavoriteButton } from "@/features/favorites";
import { AskPriceButton } from "@/features/ask-price";
import { ProductHeadline } from "./product-headline";
import { PriceBlock } from "./price-block";
import { StockLine } from "@/entities/product/ui/stock-line";
import { TrustList } from "./trust-list";
import { MAIN_BUY_CTA_ID } from "./main-buy-cta";

/** Рішення про покупку: що це, чи є, скільки коштує, кнопка й чому не страшно. Саме в такому порядку. */
export const BuyBox = ({ product, heading }: { product: Product; heading: string }) => {
  const negotiable = !Number(product.price);

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <ProductHeadline product={product} heading={heading} />
      <StockLine quantity={product.quantity} />
      <PriceBlock price={Number(product.price)} />
      <div id={MAIN_BUY_CTA_ID} className="flex items-stretch gap-2">
        <div className="min-w-0 flex-1">
          {negotiable ? <AskPriceButton product={product} variant="block" /> : <ProductBtn item={product} />}
        </div>
        <FavoriteButton product={product} variant="outline" />
      </div>
      {/* «В один клік» без ціни — той самий запит ціни, лише гірше названий: лишаємо одну дію. */}
      {!negotiable && (
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
      )}
      <TrustList />
    </section>
  );
};
