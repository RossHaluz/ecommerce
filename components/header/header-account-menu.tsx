"use client";

import { useState } from "react";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import ModalAuth from "@/components/ui/modal-auth";
import AuthorizationOtp from "@/components/authirization-otp";
import { useCurrentUser } from "@/features/account";
import { HeaderIconLabel } from "./header-icon-label";

/**
 * Іконка кабінету: посилання на `/account`, якщо є токен і реально
 * завантажений користувач, інакше — модалка логіну/OTP.
 */
const HeaderAccountMenu = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
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
    <ModalAuth
      onOpenChange={() => setIsAuthModalOpen(true)}
      triggetBtn={
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <HeaderIconLabel icon={<User2Icon size={24} strokeWidth={1.5} aria-hidden />} label={t("signInShort")} />
        </Button>
      }
    >
      <AuthorizationOtp setIsOpen={setIsAuthModalOpen} />
    </ModalAuth>
  );
};

export default HeaderAccountMenu;
