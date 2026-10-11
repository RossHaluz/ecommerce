"use client";

import { useTranslations } from "next-intl";
import { useModels } from "@/features/catalog";
import { pickPopularModels } from "@/features/catalog/lib/popular-models";
import { FooterSection } from "./footer-section";
import { FooterLink } from "./footer-link";

export const FooterModels = () => {
  const { data: models = [] } = useModels();
  const t = useTranslations("footer");

  return (
    <FooterSection title={t("popularModels")}>
      {pickPopularModels(models).map((model) => (
        <FooterLink key={model.id} href={`/${model.modelName}`}>
          Audi {model.name}
        </FooterLink>
      ))}
    </FooterSection>
  );
};
