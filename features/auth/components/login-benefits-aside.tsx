"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Check, Heart, Truck, CarFront } from "lucide-react";
import Logo from "@/components/ui/logo";

const ITEMS: { key: string; icon: ReactNode }[] = [
  { key: "track", icon: <Truck size={22} strokeWidth={1.8} /> },
  { key: "favorites", icon: <Heart size={22} strokeWidth={1.8} /> },
  { key: "car", icon: <CarFront size={22} strokeWidth={1.8} /> },
  { key: "checkout", icon: <Check size={22} strokeWidth={1.8} /> },
];

/** The dark left column of the login window on a computer: why an account is worth it. */
export const LoginBenefitsAside = () => {
  const t = useTranslations("auth");

  return (
    <aside className="hidden flex-col gap-[22px] bg-[#2E2E2E] px-8 py-9 text-white lg:flex">
      <Logo tone="dark" />
      <p className="m-0 text-[22px] font-extrabold leading-7">{t("benefitsTitle")}</p>
      <ul className="m-0 flex list-none flex-col gap-4 p-0 text-[15px] leading-[21px] text-[#E6E6E6]">
        {ITEMS.map(({ key, icon }) => (
          <li key={key} className="flex gap-3">
            <span className="shrink-0 text-white" aria-hidden>
              {icon}
            </span>
            {t(`benefits.${key}`)}
          </li>
        ))}
      </ul>
    </aside>
  );
};
