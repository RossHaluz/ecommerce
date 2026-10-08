import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface InCartLinkProps {
  inCart: number;
  /** Липка панель: без пояснення під кнопкою. */
  compact?: boolean;
  className?: string;
}

/** Весь залишок уже в кошику: замість «Купити», що нічого б не додало, — дорога в кошик. */
export const InCartLink = ({ inCart, compact, className }: InCartLinkProps) => {
  const t = useTranslations("product");

  return (
    <div className="flex w-full flex-col gap-2">
      <Link
        href="/cart"
        className={cn(
          "flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border-2 border-[#008038] bg-white text-[17px] font-extrabold text-[#006B2F] lg:h-14 lg:text-lg",
          className
        )}
      >
        <Check size={20} strokeWidth={2.5} aria-hidden />
        {t("inCartGo")}
      </Link>
      {!compact && (
        <p role="status" className="m-0 rounded-lg bg-[#F2F2F2] px-2.5 py-2 text-[13px] text-[#484848]">
          {inCart === 1 ? t("inCartLast") : t("inCartAll", { count: inCart })}
        </p>
      )}
    </div>
  );
};
