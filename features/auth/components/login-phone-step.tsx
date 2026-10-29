"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { PhoneLogin } from "../hooks/use-phone-login";
import { LoginError } from "./login-error";
import { UaPhoneField, UA_NATIONAL_PATTERN, toNational } from "./ua-phone-field";

type Props = Pick<PhoneLogin, "phone" | "failure" | "sendCode" | "isSending">;

export const LoginPhoneStep = ({ phone, failure, sendCode, isSending }: Props) => {
  const t = useTranslations("auth");
  const schema = z.object({ national: z.string().regex(UA_NATIONAL_PATTERN, t("errors.invalidPhone")) });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { national: toNational(phone) },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(({ national }) => sendCode(`+380 ${national}`))} className="flex flex-col gap-3.5" noValidate>
        <FormField
          name="national"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-extrabold">{t("phoneLabel")}</FormLabel>
              <FormControl>
                <UaPhoneField {...field} placeholder={t("phonePlaceholder")} invalid={fieldState.invalid} />
              </FormControl>
              <FormMessage className="text-sm text-[#C0092A]" />
            </FormItem>
          )}
        />
        <LoginError failure={failure} />
        <button
          type="submit"
          disabled={isSending}
          className="h-[52px] w-full rounded-[10px] bg-[#C0092A] text-[17px] font-extrabold text-white hover:bg-[#E2153B] disabled:opacity-60"
        >
          {isSending ? t("sending") : t("getCode")}
        </button>
      </form>
    </Form>
  );
};
