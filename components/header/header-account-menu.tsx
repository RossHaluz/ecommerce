"use client";

import { useState } from "react";
import Link from "next/link";
import { User2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import ModalAuth from "@/components/ui/modal-auth";
import AuthorizationOtp from "@/components/authirization-otp";
import { useCurrentUser } from "@/features/account";

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
      <Link href="/account" aria-label={t("account")}>
        <User2Icon className="text-[#FFFDFD]" strokeWidth="0.75px" />
      </Link>
    );
  }

  return (
    <ModalAuth
      onOpenChange={() => setIsAuthModalOpen(true)}
      triggetBtn={
        <Button variant="ghost" className="p-0" aria-label={t("account")}>
          <User2Icon className="stroke-[#FFFDFD]" strokeWidth="0.75px" />
        </Button>
      }
    >
      <AuthorizationOtp setIsOpen={setIsAuthModalOpen} />
    </ModalAuth>
  );
};

export default HeaderAccountMenu;
