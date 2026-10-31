import { useTranslations } from "next-intl";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import { Link } from "@/i18n/routing";
import { lineTotal } from "../model/order-format";
import type { OrderLine } from "../model/order-types";
import { OrderPrice } from "./order-price";

export const OrderLines = ({ items }: { items: OrderLine[] }) => {
  const t = useTranslations("account.order");

  return (
    <section aria-labelledby="order-items" className="flex flex-col gap-2.5 rounded-[14px] bg-white p-3.5 lg:rounded-2xl lg:p-5">
      <h2 id="order-items" className="m-0 text-lg font-extrabold">
        {t("items")}
      </h2>
      {items.map((line) => (
        <Link
          key={line.slug}
          href={`/product/${line.slug}`}
          className="flex items-center gap-3 border-t border-[#EEEEEE] pt-2.5 text-[#2E2E2E]"
        >
          <OrderItemThumb
            imageUrl={line.image ?? undefined}
            sizes="96px"
            className="h-[54px] w-[72px] shrink-0 rounded-lg lg:h-[72px] lg:w-[96px]"
          />
          <span className="flex min-w-0 grow flex-col gap-0.5">
            <strong className="text-sm lg:text-base">{line.title}</strong>
            <span className="text-xs text-[#6B6B6B] lg:text-[13px]">
              {t("itemMeta", { oe: line.oe, article: line.article, quantity: line.quantity })}
            </span>
          </span>
          <strong className="shrink-0 text-[15px] lg:text-[17px]">
            <OrderPrice amount={lineTotal(line)} />
          </strong>
        </Link>
      ))}
    </section>
  );
};
