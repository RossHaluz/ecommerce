import type { ComponentProps } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/actions/get-data";
import { AccountBackLink } from "@/features/account/components/account-back-link";
import ChangePasswordForm from "../_components/change-password-form";
import PersonalDataForm from "../_components/personal-data-form";

type ProfileUser = ComponentProps<typeof PersonalDataForm>["user"] & { hasPassword?: boolean };

const ProfilePage = async () => {
  const token = cookies().get("token")?.value;
  const user = (await getCurrentUser()) as ProfileUser | null;
  if (!token || !user) redirect("/");
  const t = await getTranslations("account");

  return (
    <>
      <AccountBackLink href="/account" label={t("cabinet")} />
      <div className="flex flex-col gap-6 rounded-2xl bg-white p-4 lg:p-5">
        <PersonalDataForm user={user} />
        {user.hasPassword && <ChangePasswordForm token={token} />}
      </div>
    </>
  );
};

export default ProfilePage;
