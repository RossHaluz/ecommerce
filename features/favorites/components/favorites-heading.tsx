"use client";

import { useTranslations } from "next-intl";
import { useFavoritesActions } from "../hooks/use-favorites-actions";
import { FavoritesStorageNote } from "./favorites-storage-note";

export const FavoritesHeading = ({ ids }: { ids: string[] }) => {
  const t = useTranslations("favorites");
  const { clear } = useFavoritesActions();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[22px] font-extrabold text-[#2E2E2E] md:text-[28px]">
          {t("title")} {ids.length > 0 && <span className="font-normal text-[#6B6B6B]">· {ids.length}</span>}
        </h1>
        {ids.length > 0 && (
          <button type="button" onClick={() => clear(ids)} className="h-9 text-sm font-bold text-[#6B6B6B] hover:text-[#C0092A]">
            {t("clear")}
          </button>
        )}
      </div>
      <FavoritesStorageNote />
    </div>
  );
};
