"use client";

import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";

/** What happens once someone is signed in, wherever the login was opened. */
export function useAfterLogin({ goToAccount, close }: { goToAccount: boolean; close: () => void }) {
  const t = useTranslations("auth");
  const router = useRouter();

  return () => {
    close();
    toast.success(t("signedIn"));
    if (goToAccount) router.push("/account");
    // Server-rendered parts (checkout form, account) read the new cookie only on a fresh render.
    router.refresh();
  };
}
