"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectFavorites } from "@/redux/favorites/selectors";
import { HeaderIconLabel } from "./header-icon-label";

export const HeaderFavoritesLink = () => {
  const t = useTranslations("nav");
  const count = useHydratedSelector(selectFavorites).length;

  return (
    <Link href="/favorites" prefetch={false} aria-label={`${t("favorites")}: ${count}`}>
      <HeaderIconLabel icon={<Heart size={24} strokeWidth={1.5} aria-hidden />} label={t("favorites")} badge={count} />
    </Link>
  );
};
