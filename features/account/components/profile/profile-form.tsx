"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { updateUser } from "@/actions/get-data";
import { useRouter } from "@/i18n/routing";
import { initials } from "../../model/order-format";
import { avatarUrl } from "../../model/profile-avatar";
import { profileFormSchema, type ProfileFormValues } from "../../model/profile-form-schema";
import { ProfileAvatarPicker } from "./profile-avatar-picker";
import { ProfileField } from "./profile-field";

export interface ProfileUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
}

const toFormData = (values: ProfileFormValues, avatar: File | null) => {
  const form = new FormData();
  Object.entries(values).forEach(([key, value]) => form.append(key, value));
  if (avatar) form.append("avatar", avatar);
  return form;
};

export const ProfileForm = ({ user }: { user: ProfileUser }) => {
  const t = useTranslations("account.profile");
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const { register, handleSubmit, formState } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { firstName: user.firstName ?? "", lastName: user.lastName ?? "", email: user.email ?? "" },
  });

  // updateUser answers null on any refusal, so «saved» is shown only when the server really saved.
  const save = async (values: ProfileFormValues) => {
    const saved = await updateUser(toFormData(values, avatar));
    if (!saved) return toast.error(t("saveFailed"));
    toast.success(t("saved"));
    setAvatar(null);
    router.refresh();
  };

  const error = (field: keyof ProfileFormValues) => formState.errors[field] && t(`invalid.${field}`);

  return (
    <form onSubmit={handleSubmit(save)} className="flex flex-col gap-6 lg:flex-row-reverse lg:justify-end lg:gap-16">
      <ProfileAvatarPicker
        currentUrl={avatarUrl(user.avatar, process.env.BACKEND_URL)}
        initials={initials(user.firstName ?? "", user.lastName ?? "")}
        onPick={setAvatar}
      />
      <div className="flex w-full flex-col gap-4 lg:max-w-[420px]">
        <ProfileField id="firstName" label={t("firstName")} autoComplete="given-name" error={error("firstName")} {...register("firstName")} />
        <ProfileField id="lastName" label={t("lastName")} autoComplete="family-name" error={error("lastName")} {...register("lastName")} />
        <ProfileField id="phone" label={t("phone")} value={user.phoneNumber ?? ""} readOnly />
        <ProfileField id="email" label={t("email")} type="email" autoComplete="email" error={error("email")} {...register("email")} />
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="min-h-12 rounded-[10px] bg-[#C0092A] px-6 font-extrabold text-white disabled:opacity-60 lg:self-start"
        >
          {t(formState.isSubmitting ? "saving" : "save")}
        </button>
      </div>
    </form>
  );
};
