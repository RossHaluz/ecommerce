"use client";

import { useTranslations } from "next-intl";
import { AddPhone } from "@/features/auth/components/add-phone";
import { useRouter } from "@/i18n/routing";

/** Orders are found by phone, so a typed-in one is confirmed first; the same step as after Google. */
export const ConfirmPhone = ({ name }: { name: string }) => {
  const t = useTranslations("account.confirmPhone");
  const router = useRouter();
  return <AddPhone name={name || t("name")} onDone={() => router.refresh()} />;
};
