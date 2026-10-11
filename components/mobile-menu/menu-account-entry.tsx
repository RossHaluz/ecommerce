"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, User2Icon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useCurrentUser } from "@/features/account";

const CARD = "flex w-full items-center gap-3 rounded-xl bg-[#F7F7F7] px-3.5 py-3 text-left";

const Avatar = () => (
  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4E4E4] text-[#484848]">
    <User2Icon size={20} aria-hidden />
  </span>
);

/** Перше в меню: залогіненому — кабінет, решті — вхід з поясненням, як саме. */
export const MenuAccountEntry = ({ onSignIn, onNavigate }: { onSignIn: () => void; onNavigate: () => void }) => {
  const { data: user } = useCurrentUser();
  const t = useTranslations("nav");

  const body = (title: string, hint: string) => (
    <>
      <Avatar />
      <span className="flex flex-1 flex-col">
        <span className="text-base font-extrabold text-[#2E2E2E]">{title}</span>
        <span className="text-[13px] text-[#6B6B6B]">{hint}</span>
      </span>
      <ChevronRight size={18} className="text-[#6B6B6B]" aria-hidden />
    </>
  );

  if (user?.role === "user") {
    return (
      <Link href="/account" prefetch={false} onClick={onNavigate} className={CARD}>
        {body(user.firstName || t("account"), t("goToAccount"))}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSignIn} className={CARD}>
      {body(t("signInShort"), t("signInHint"))}
    </button>
  );
};
