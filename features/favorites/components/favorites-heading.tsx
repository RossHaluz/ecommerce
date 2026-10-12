"use client";

import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { clearFavorites } from "@/redux/favorites/slice";

export const FavoritesHeading = ({ count }: { count: number }) => {
  const t = useTranslations("favorites");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h1 className="text-[22px] font-extrabold text-[#2E2E2E] md:text-[28px]">
        {t("title")} {count > 0 && <span className="font-normal text-[#6B6B6B]">· {count}</span>}
      </h1>
      {count > 0 && (
        <button type="button" onClick={() => dispatch(clearFavorites())} className="h-9 text-sm font-bold text-[#6B6B6B] hover:text-[#C0092A]">
          {t("clear")}
        </button>
      )}
      <p className="w-full text-[13px] text-[#6B6B6B]">{t("localNote")}</p>
    </div>
  );
};
