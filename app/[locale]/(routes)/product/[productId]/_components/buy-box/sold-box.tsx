import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { TELEGRAM_URL } from "@/entities/store/model/contacts";
import type { Product } from "@/lib/types";
import { searchResultsHref } from "@/features/search/model/results-href";
import { ProductHeadline } from "./product-headline";

/**
 * Проданий (архівний) товар: сторінка лишається для старих посилань і пошуковиків,
 * але замість «Купити» — куди піти далі. Бекенд і так не прийняв би замовлення на нього.
 */
export const SoldBox = ({ product, heading }: { product: Product; heading: string }) => {
  const t = useTranslations("product");

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <ProductHeadline product={product} heading={heading} />
      <p className="m-0 self-start rounded-lg bg-[#EFEFEF] px-3 py-1.5 text-[15px] font-extrabold text-[#484848]">{t("sold")}</p>
      <p className="m-0 text-[15px] leading-6 text-[#484848]">{t("soldText")}</p>
      <div className="flex flex-col gap-2 md:flex-row">
        {product.catalog_number && (
          <Link
            href={searchResultsHref(product.catalog_number, null)}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#C0092A] px-4 font-extrabold text-white hover:bg-[#A30722]"
          >
            {t("findByOe")}
          </Link>
        )}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center rounded-lg border-2 border-[#C0092A] px-4 font-extrabold text-[#C0092A] hover:bg-[#FFF2F4]"
        >
          {t("askManager")}
        </a>
      </div>
    </section>
  );
};
