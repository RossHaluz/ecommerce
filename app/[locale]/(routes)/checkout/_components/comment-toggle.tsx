"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import type { CheckoutValues } from "../model/checkout-schema";

/** Коментар потрібен рідко — сховане поле не подовжує форму для решти. */
export const CommentToggle = () => {
  const t = useTranslations("checkout");
  const { register } = useFormContext<CheckoutValues>();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="self-start text-sm font-bold text-[#484848] underline">
        + {t("addComment")}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="checkout-comment" className="text-sm font-bold text-[#484848]">
        {t("comment")}
      </label>
      <textarea
        id="checkout-comment"
        {...register("comment")}
        autoFocus
        rows={3}
        placeholder={t("commentPlaceholder")}
        className="w-full rounded-lg border border-[#CFCFCF] bg-white p-3 text-base text-[#2E2E2E] outline-none focus:border-2 focus:border-[#484848]"
      />
    </div>
  );
};
