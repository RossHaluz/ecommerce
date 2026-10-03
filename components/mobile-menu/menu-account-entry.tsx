"use client";

import { useTranslations } from "next-intl";
import { User2Icon } from "lucide-react";
import Account from "/public/images/account.svg";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/account";

const ENTRY_CLASS =
  "bg-[#F2F2F2] rounded-[5px] p-4 h-auto flex items-center justify-start gap-[10px] hover:bg-[#F2F2F2] text-[#484848]";

/** Залогінений покупець іде в кабінет, решта — на панель входу. */
export const MenuAccountEntry = ({ onSignIn, onNavigate }: { onSignIn: () => void; onNavigate: () => void }) => {
  const { data: user } = useCurrentUser();
  const t = useTranslations("nav");

  if (user?.role === "user") {
    return (
      <Link href="/account" prefetch={false} onClick={onNavigate} className={ENTRY_CLASS}>
        <User2Icon className="text-[#c0092a]" strokeWidth="0.75px" aria-hidden />
        {t("goToAccount")}
      </Link>
    );
  }

  return (
    <Button className={ENTRY_CLASS} onClick={onSignIn}>
      <Account aria-hidden />
      {t("signIn")}
    </Button>
  );
};
