"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Cloud, MonitorSmartphone } from "lucide-react";
import ModalAuth from "@/components/ui/modal-auth";
import AuthorizationOtp from "@/components/authirization-otp";
import { useCurrentUser } from "@/features/account";

/** Де живе список — сказано прямо: гість має знати, що на іншому пристрої його не буде. */
export const FavoritesStorageNote = () => {
  const t = useTranslations("favorites");
  const { data: user } = useCurrentUser();
  const [, setAuthOpen] = useState(true);

  if (user) {
    return (
      <p className="flex items-center gap-2 text-[13px] text-[#1E7B3C]">
        <Cloud size={16} aria-hidden />
        {t("syncedNote")}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-[#F2D9A6] bg-[#FFF7E6] px-3 py-2.5 text-[13px] text-[#5C4300]">
      <MonitorSmartphone size={18} className="shrink-0" aria-hidden />
      <span className="min-w-0 flex-1">{t("localNote")}</span>
      <ModalAuth
        onOpenChange={() => setAuthOpen(true)}
        triggetBtn={
          <button type="button" className="h-9 rounded-lg bg-[#2E2E2E] px-4 text-sm font-extrabold text-white">
            {t("signIn")}
          </button>
        }
      >
        <AuthorizationOtp setIsOpen={setAuthOpen} />
      </ModalAuth>
    </div>
  );
};
