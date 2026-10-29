"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomInputMask from "@/utils/phone-mask";
import { UA_PHONE_MASK, UA_PHONE_PATTERN } from "@/lib/format/ua-phone";
import { cn } from "@/lib/utils";
import type { PhoneLogin } from "../hooks/use-phone-login";
import { LoginError } from "./login-error";

type Props = Pick<PhoneLogin, "phone" | "failure" | "sendCode" | "isSending">;

export const LoginPhoneStep = ({ phone, failure, sendCode, isSending }: Props) => {
  const t = useTranslations("auth");
  const schema = z.object({ phone: z.string().regex(UA_PHONE_PATTERN, t("errors.invalidPhone")) });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { phone } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(({ phone: to }) => sendCode(to))} className="flex flex-col gap-3" noValidate>
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
                  autoComplete="tel"
                  {...field}
                  className={cn(
                    "h-12 w-full rounded-lg border bg-white px-3 text-base text-[#2E2E2E] outline-none focus:border-[#2E2E2E]",
                    fieldState.invalid ? "border-[#C0092A]" : "border-[#CFCFCF]"
                  )}
                />
              </FormControl>
              <FormMessage className="text-sm text-[#C0092A]" />
            </FormItem>
          )}
        />
        <LoginError failure={failure} />
        <button
          type="submit"
          disabled={isSending}
          className="h-12 w-full rounded-lg bg-[#C0092A] text-base font-extrabold text-white hover:bg-[#E2153B] disabled:opacity-60"
        >
          {isSending ? t("sending") : t("getCode")}
        </button>
      </form>
    </Form>
  );
};
