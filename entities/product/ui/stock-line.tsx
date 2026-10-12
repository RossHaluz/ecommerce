import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { StockStatus } from "./stock-status";

/** «Остання 1 шт.» — чесна правда з бази (quantity = 1), а не вигадана терміновість. */
export const StockLine = ({ quantity, className }: { quantity: number; className?: string }) => {
  const t = useTranslations("product");

  return (
    <p className={cn("m-0 flex flex-wrap items-center gap-x-1.5 text-[15px] font-bold", className)}>
      <StockStatus quantity={quantity} withIcon className="font-bold" />
      {quantity === 1 && <span className="text-[#008038]">· {t("lastUnit")}</span>}
    </p>
  );
};
