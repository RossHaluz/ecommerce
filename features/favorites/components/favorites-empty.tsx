import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/routing";

export const FavoritesEmpty = () => {
  const t = useTranslations("favorites");

  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center gap-3 py-12 text-center">
      <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#FFF1F2] text-[#C0092A]">
        <Heart size={44} strokeWidth={1.6} aria-hidden />
      </span>
      <h2 className="text-xl font-extrabold text-[#2E2E2E]">{t("emptyTitle")}</h2>
      <p className="text-[15px] leading-[21px] text-[#484848]">{t("emptyText")}</p>
      <Link href="/categories" className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-[#C0092A] text-base font-extrabold text-white">
        {t("toCatalog")}
      </Link>
    </div>
  );
};
