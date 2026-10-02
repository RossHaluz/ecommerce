import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { FooterSection } from "./footer-section";

const INFO_LINKS = [
  { href: "/contacts", labelKey: "contacts" },
  { href: "/about-us", labelKey: "about" },
  { href: "/delivary-payment", labelKey: "deliveryPayment" },
] as const;

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
