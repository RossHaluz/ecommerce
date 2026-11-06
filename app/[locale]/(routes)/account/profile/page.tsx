import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/actions/get-data";
import { AccountBackLink } from "@/features/account/components/account-back-link";
import { ProfileForm, type ProfileUser } from "@/features/account/components/profile/profile-form";
import ChangePasswordForm from "../_components/change-password-form";

const ProfilePage = async () => {
  const token = cookies().get("token")?.value;
  const user = (await getCurrentUser()) as (ProfileUser & { hasPassword?: boolean }) | null;
  if (!token || !user) redirect("/");
  const t = await getTranslations("account");

  return (
    <>
      <AccountBackLink href="/account" label={t("cabinet")} />
      <h1 className="m-0 text-[22px] font-extrabold lg:text-[28px]">{t("profile.title")}</h1>
      <section className="rounded-[14px] bg-white p-4 lg:rounded-2xl lg:p-6">
        <ProfileForm user={user} />
      </section>
      {user.hasPassword && (
        <section className="rounded-[14px] bg-white p-4 lg:rounded-2xl lg:p-6">
          <ChangePasswordForm token={token} />
        </section>
      )}
    </>
  );
};

export default ProfilePage;
