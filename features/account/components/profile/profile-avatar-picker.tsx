"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AVATAR_ACCEPT, isAcceptableAvatar } from "../../model/profile-avatar";

interface ProfileAvatarPickerProps {
  currentUrl: string | null;
  initials: string;
  onPick: (file: File | null) => void;
}

export const ProfileAvatarPicker = ({ currentUrl, initials, onPick }: ProfileAvatarPickerProps) => {
  const t = useTranslations("account.profile");
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [refused, setRefused] = useState(false);

  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  const pick = (file: File | undefined) => {
    if (!file) return;
    const ok = isAcceptableAvatar(file);
    setRefused(!ok);
    setPreview(ok ? URL.createObjectURL(file) : null);
    onPick(ok ? file : null);
  };

  const shown = preview ?? currentUrl;

  return (
    <div className="flex items-center gap-4 lg:flex-col lg:items-center">
      <span className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2E2E2E] text-2xl font-extrabold text-white">
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element -- a local preview blob cannot go through next/image
          <img src={shown} alt={t("avatar")} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden>{initials}</span>
        )}
      </span>
      <span className="flex flex-col gap-1 lg:items-center">
        <input ref={inputRef} type="file" accept={AVATAR_ACCEPT} className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="min-h-11 rounded-[10px] border border-[#CFCFCF] bg-white px-4 text-sm font-extrabold text-[#2E2E2E]"
        >
          {t("changePhoto")}
        </button>
        <span className={`text-xs ${refused ? "font-semibold text-[#C0092A]" : "text-[#6B6B6B]"}`}>{t("photoHint")}</span>
      </span>
    </div>
  );
};
