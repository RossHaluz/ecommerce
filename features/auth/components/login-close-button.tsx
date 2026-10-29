"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** 44 px, not the 16 px default: on a phone the ✕ is a thumb target. */
export const LoginCloseButton = ({ className }: { className?: string }) => {
  const t = useTranslations("auth");

  return (
    <Dialog.Close aria-label={t("close")} className={cn("flex h-11 w-11 items-center justify-center text-[#2E2E2E]", className)}>
      <X size={22} strokeWidth={2} aria-hidden />
    </Dialog.Close>
  );
};
