"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { PhoneLogin } from "../hooks/use-phone-login";

type Props = Pick<PhoneLogin, "saveName" | "skipName" | "isSavingName">;

const FIELDS = ["firstName", "lastName"] as const;

/** Only for a new customer: the name goes on the Nova Poshta waybill, so it is asked once, here. */
export const LoginNameStep = ({ saveName, skipName, isSavingName }: Props) => {
  const t = useTranslations("auth");
  const schema = z.object({
    firstName: z.string().trim().min(1, t("firstNameRequired")).max(80),
    lastName: z.string().trim().max(80),
  });
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { firstName: "", lastName: "" } });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((name) => saveName(name))} className="flex flex-col gap-3" noValidate>
        {FIELDS.map((name, index) => (
          <FormField
            key={name}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1.5">
                <FormLabel className="text-sm font-bold">{t(name)}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    autoFocus={index === 0}
                    autoComplete={name === "firstName" ? "given-name" : "family-name"}
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
        ))}
        <button
          type="submit"
          disabled={isSavingName}
          className="h-12 w-full rounded-lg bg-[#C0092A] text-base font-extrabold text-white hover:bg-[#E2153B] disabled:opacity-60"
        >
          {t("saveName")}
        </button>
        <button type="button" onClick={skipName} className="h-11 w-full text-[15px] font-bold text-[#484848]">
          {t("later")}
        </button>
      </form>
    </Form>
  );
};
