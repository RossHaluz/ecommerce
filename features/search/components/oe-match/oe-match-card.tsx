import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { productTitle } from "@/entities/product/model/product-heading";
import { StockLine } from "@/entities/product/ui/stock-line";
import type { Product } from "@/lib/types";
import { productHref } from "../../model/results-href";
import { OeMatchFits } from "./oe-match-fits";
import { OeMatchBuy } from "./oe-match-buy";
import { OeAlsoList } from "./oe-also-list";
import { OeRenumberNote } from "./oe-renumber-note";

/** Людина ввела номер із деталі — показуємо саме цю деталь першою, а не загальний список. */
export const OeMatchCard = ({ matches }: { matches: Product[] }) => {
  const t = useTranslations();
  const [product, ...others] = matches;
  if (!product) return null;

  return (
    <section aria-labelledby="oe-match-title" className="flex flex-col gap-4 rounded-xl border-2 border-[#1E7B3C] bg-white p-4 lg:p-5">
      <h2 id="oe-match-title" className="m-0 text-sm font-extrabold uppercase tracking-wide text-[#1E7B3C]">
        {t("search.exactTitle")}
      </h2>
      <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)_280px]">
        <Link href={productHref(product.product_name)} className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-[#F7F7F7]">
          <Image
            src={productImageUrl(product.images?.[0]?.url) ?? ImageNotFound}
            alt={product.title}
            fill
            sizes="(max-width: 767px) 92vw, 260px"
            className="object-contain"
          />
        </Link>
        <div className="flex min-w-0 flex-col gap-2">
          <Link href={productHref(product.product_name)} className="text-lg font-extrabold leading-6 text-[#2E2E2E] hover:text-[#C0092A]">
            {productTitle(product.title)}
          </Link>
          <p className="m-0 text-sm text-[#6B6B6B]">
            OE <span className="font-bold text-[#2E2E2E]">{product.catalog_number}</span> · {t("product.article")} {product.article}
          </p>
          <StockLine quantity={product.quantity} />
          <OeMatchFits models={product.models} />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <OeMatchBuy product={product} />
        </div>
      </div>
      <OeAlsoList products={others} />
      <OeRenumberNote />
    </section>
  );
};
