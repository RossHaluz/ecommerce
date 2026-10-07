"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ModalAuth from "@/components/ui/modal-auth";
import AuthorizationOtp from "@/components/authirization-otp";

/** Постійному покупцю — вхід тим самим OTP, що в шапці; після входу форма заповниться його даними. */
export const LoginPrompt = () => {
  const t = useTranslations("checkout");
  const [, setOpen] = useState(false);

  return (
    <p className="m-0 text-sm text-[#484848]">
      {t("loginPrompt")}{" "}
      <ModalAuth
        onOpenChange={() => setOpen(true)}
        triggetBtn={
          <button type="button" className="font-extrabold text-[#C0092A]">
            {t("loginCta")}
          </button>
        }
      >
        <AuthorizationOtp setIsOpen={setOpen} />
      </ModalAuth>{" "}
      <span className="lg:hidden">{t("loginNote")}</span>
    </p>
  );
};
