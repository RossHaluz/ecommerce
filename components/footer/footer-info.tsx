import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { INFO_LINKS } from "@/lib/navigation/info-links";
import { FooterSection } from "./footer-section";

export const FooterInfo = () => {
  const t = useTranslations("nav");

  return (
    <FooterSection title={t("information")}>
      <ul className="flex flex-col gap-[15px] md:gap-5">
        {INFO_LINKS.map(({ href, labelKey }) => (
          <li key={href}>
            <Link href={href}>{t(labelKey)}</Link>
          </li>
        ))}
      </ul>
    </FooterSection>
  );
};
