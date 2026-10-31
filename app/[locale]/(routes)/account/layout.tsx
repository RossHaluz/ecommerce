import type { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/actions/get-data";
import { AccountShell } from "@/features/account/components/account-shell";
import { maskPhone } from "@/lib/format/mask-phone";

interface AccountUser {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "account" });
  return { title: t("metaTitle"), robots: { index: false, follow: true } };
}

const AccountLayout = async ({ children }: { children: ReactNode }) => {
  const user = (await getCurrentUser()) as AccountUser | null;
  if (!user) redirect("/");

  return (
    <AccountShell firstName={user.firstName ?? ""} lastName={user.lastName ?? ""} phone={maskPhone(user.phoneNumber ?? "")}>
      {children}
    </AccountShell>
  );
};

export default AccountLayout;
