"use client";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { TELEGRAM_URL, viberDraftUrl } from "@/entities/store/model/contacts";
import { SITE_URL } from "@/lib/seo/site-url";
import type { FavoriteItem } from "../model/favorite-item";
import { favoritesShareText } from "../model/share-text";

const BUTTON = "flex h-11 items-center justify-center rounded-lg text-sm font-extrabold text-white";

/** Список одним повідомленням менеджеру: так купують СТО — кількома деталями й з уточненнями. */
export const FavoritesShare = ({ items }: { items: FavoriteItem[] }) => {
  const t = useTranslations("favorites");
  const text = () => favoritesShareText(t("shareHeading"), items, SITE_URL);

  // У чат Telegram не можна передати текст наперед — кладемо його в буфер і відкриваємо чат.
  const shareToTelegram = async () => {
    try {
      await navigator.clipboard.writeText(text());
      toast.success(t("copied"));
    } finally {
      window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-extrabold text-[#2E2E2E]">{t("shareTitle")}</span>
      <div className="grid grid-cols-2 gap-2">
        <a href={viberDraftUrl(text())} className={`${BUTTON} bg-[#5B47D6]`}>
          {t("shareViber")}
        </a>
        <button type="button" onClick={shareToTelegram} className={`${BUTTON} bg-[#1E6FA8]`}>
          {t("shareTelegram")}
        </button>
      </div>
      <span className="text-center text-xs text-[#6B6B6B]">{t("shareHint")}</span>
    </div>
  );
};
