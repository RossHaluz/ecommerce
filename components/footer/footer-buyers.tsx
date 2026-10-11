"use client";

import { useTranslations } from "next-intl";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import { INFO_LINKS } from "@/lib/navigation/info-links";
import { FooterSection } from "./footer-section";
import { FooterLink, FOOTER_LINK } from "./footer-link";

export const FooterBuyers = () => {
  const t = useTranslations("nav");

  return (
    <FooterSection title={t("buyers")}>
      <li>
        <SearchByVinCode trigger={<button type="button" className={FOOTER_LINK}>{t("vinPick")}</button>} />
      </li>
      {INFO_LINKS.map(({ href, labelKey }) => (
        <FooterLink key={href} href={href}>
          {t(labelKey)}
        </FooterLink>
      ))}
      <FooterLink href="/cart">{t("cart")}</FooterLink>
    </FooterSection>
  );
};
