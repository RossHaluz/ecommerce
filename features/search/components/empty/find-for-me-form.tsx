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
import { cn } from "@/lib/utils";
import { FindForMeSent } from "./find-for-me-sent";

const VIN_LENGTH = 17;

const fieldClass = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-lg border bg-white px-3 text-base text-[#2E2E2E] outline-none focus:border-[#2E2E2E]",
    invalid ? "border-red-500" : "border-[#CFCFCF]",
  );

const buildSchema = (t: (key: string) => string, tPhone: (key: string) => string) =>
  z.object({
    desc: z.string().trim().min(2, t("whatRequired")),
    phone: z.string().regex(UA_PHONE_PATTERN, tPhone("phoneInvalid")),
    vinCode: z.union([z.literal(""), z.string().trim().length(VIN_LENGTH, t("vinInvalid"))]),
  });

/** «Знайти для мене»: менеджер отримує, що шукають, телефон і VIN у Telegram. */
export const FindForMeForm = ({ query }: { query: string }) => {
  const t = useTranslations("search");
  const tPhone = useTranslations("orderOneClick");
  const tCommon = useTranslations("common");
  const schema = buildSchema(t, tPhone);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { desc: query, phone: "", vinCode: "" } });
  const [sent, setSent] = useState<{ query: string; phone: string } | null>(null);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await submitLead({ desc: values.desc, phone: values.phone, vinCode: values.vinCode || undefined }, "search");
      setSent({ query: values.desc, phone: values.phone });
    } catch {
      toast.error(tCommon("somethingWentWrong"));
    }
  };

  if (sent) return <FindForMeSent query={sent.query} phone={sent.phone} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-w-xl flex-col gap-3" noValidate>
        <FormField
          name="desc"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-bold">{t("whatLabel")}</FormLabel>
              <FormControl>
                <input {...field} className={fieldClass(fieldState.invalid)} />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-bold">
                {t("phoneLabel")} <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <CustomInputMask mask={UA_PHONE_MASK} placeholder={UA_PHONE_MASK} type="tel" {...field} className={fieldClass(fieldState.invalid)} />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          name="vinCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-bold">
                {t("vinLabel")} <span className="font-normal text-[#6B6B6B]">({t("vinHint")})</span>
              </FormLabel>
              <FormControl>
                <input {...field} maxLength={VIN_LENGTH} autoCapitalize="characters" className={cn(fieldClass(fieldState.invalid), "uppercase")} />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 rounded-lg bg-[#C0092A] px-5 text-base font-extrabold text-white hover:bg-[#A30722] disabled:opacity-60"
        >
          {form.formState.isSubmitting ? t("sending") : t("findForMe")}
        </button>
      </form>
    </Form>
  );
};
