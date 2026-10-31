"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSession } from "../hooks/use-session";

export const LogoutButton = ({ className }: { className: string }) => {
  const t = useTranslations("account.nav");
  const { signOut } = useSession();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button type="button" onClick={logout} className={className}>
      {t("logout")}
    </button>
  );
};
