"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomInputMask from "@/utils/phone-mask";
import { submitLead } from "@/features/leads/submit-lead";
import { UA_PHONE_MASK, UA_PHONE_PATTERN } from "@/lib/format/ua-phone";
import { maskPhone } from "@/lib/format/mask-phone";
import { cn } from "@/lib/utils";

/** Телефон — і менеджер напише ціну; у заявці вже є, що саме за деталь (`text`). */
export const AskPriceForm = ({ text }: { text: string }) => {
  const t = useTranslations("askPrice");
  const tPhone = useTranslations("orderOneClick");
  const tCommon = useTranslations("common");
  const schema = z.object({ phone: z.string().regex(UA_PHONE_PATTERN, tPhone("phoneInvalid")) });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { phone: "" } });
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = async ({ phone }: z.infer<typeof schema>) => {
    try {
      await submitLead({ phone, desc: text }, "price");
      setSentTo(phone);
    } catch {
      toast.error(tCommon("somethingWentWrong"));
    }
  };

  if (sentTo) {
    return (
      <p role="status" className="m-0 rounded-lg bg-[#EEF6F0] p-3 text-sm text-[#1E5E34]">
        <strong className="block text-base">{t("sentTitle")}</strong>
        {t("sentText", { phone: maskPhone(sentTo) })}
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-bold">{t("phoneLabel")}</FormLabel>
              <FormControl>
                <CustomInputMask
                  mask={UA_PHONE_MASK}
                  placeholder={UA_PHONE_MASK}
                  type="tel"
                  {...field}
                  className={cn(
                    "h-12 w-full rounded-lg border bg-white px-3 text-base text-[#2E2E2E] outline-none focus:border-[#2E2E2E]",
                    fieldState.invalid ? "border-red-500" : "border-[#CFCFCF]",
                  )}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 rounded-lg bg-[#C0092A] text-base font-extrabold text-white hover:bg-[#A30722] disabled:opacity-60"
        >
          {form.formState.isSubmitting ? t("sending") : t("submit")}
        </button>
      </form>
    </Form>
  );
};
