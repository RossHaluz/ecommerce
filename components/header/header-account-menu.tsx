"use client";

import Link from "next/link";
import { User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/account";
import { LoginSheet } from "@/features/auth";
import { HeaderIconLabel } from "./header-icon-label";

/** Іконка кабінету: посилання на `/account` для того, хто увійшов, інакше — вхід за кодом із SMS. */
const HeaderAccountMenu = () => {
  const { data: currentUser } = useCurrentUser();
  const t = useTranslations("nav");

  if (currentUser) {
    return (
      <Link href="/account">
        <HeaderIconLabel icon={<User2Icon size={24} strokeWidth={1.5} aria-hidden />} label={t("account")} />
      </Link>
    );
  }

  return (
    <LoginSheet
      goToAccount
      renderTrigger={(open) => (
        <Button variant="ghost" onClick={open} className="h-auto p-0 hover:bg-transparent">
          <HeaderIconLabel icon={<User2Icon size={24} strokeWidth={1.5} aria-hidden />} label={t("signInShort")} />
        </Button>
      )}
    />
  );
};

export default HeaderAccountMenu;
