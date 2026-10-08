"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInputMask from "@/utils/phone-mask";
import { createOrder } from "@/actions/get-data";
import { trackEvent } from "@/lib/analytics/gtag";
import { purchaseEvent } from "@/lib/analytics/ecommerce-events";
import { cn } from "@/lib/utils";
import { UA_PHONE_MASK, UA_PHONE_PATTERN } from "@/lib/format/ua-phone";
import { placeOneClickOrder, type OneClickItem } from "./place-one-click-order";

interface OneClickFormProps {
  items: OneClickItem[];
  /** inline — рядок у блоці покупки (комп'ютер); sheet — вміст шторки (телефон). */
  variant: "inline" | "sheet";
  onPlaced: (orderNumber: number, phone: string) => void;
}

const buildSchema = (t: (key: string) => string) =>
  z.object({
    phone: z.string().min(1, t("phoneRequired")).regex(UA_PHONE_PATTERN, t("phoneInvalid")),
  });

export const OneClickForm = ({ items, variant, onPlaced }: OneClickFormProps) => {
  const t = useTranslations("orderOneClick");
  const tCommon = useTranslations("common");
  const tProduct = useTranslations("product");
  const schema = buildSchema(t);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { phone: "" } });
  const isSheet = variant === "sheet";
  const inputId = `one-click-phone-${variant}`;

  const onSubmit = async ({ phone }: z.infer<typeof schema>) => {
    try {
      const orderNumber = await placeOneClickOrder(phone, items, createOrder);
      const analyticsItems = items.map(({ productId, title, price, quantity }) => ({ id: productId, title, price, quantity }));
      trackEvent("purchase", purchaseEvent(orderNumber, analyticsItems, "one_click"));
      form.reset();
      onPlaced(orderNumber, phone);
    } catch {
      toast.error(tCommon("somethingWentWrong"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-bold text-[#2E2E2E]">
          {isSheet ? t("phoneLabel") : tProduct("oneClickCta")}
        </label>
        <div className={cn("flex gap-2", isSheet ? "flex-col" : "flex-wrap items-start")}>
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[180px]">
                <FormControl>
                  <CustomInputMask
                    id={inputId}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    mask={UA_PHONE_MASK}
                    placeholder={t("phonePlaceholder")}
                    {...field}
                    className={cn(
                      "w-full rounded-lg border px-4 text-base",
                      isSheet ? "h-[52px] border-2 border-[#484848] text-lg font-bold" : "h-12 border-[#CFCFCF]"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-sm text-[#A30722]" />
              </FormItem>
            )}
          />
          {isSheet && (
            <ul className="m-0 my-2 flex flex-col gap-2.5 text-sm leading-5 text-[#484848]">
              {[t("benefitCall"), t("benefitNoPay")].map((text) => (
                <li key={text} className="flex gap-2.5">
                  <Check size={20} strokeWidth={2.2} className="shrink-0 text-[#008038]" aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          )}
          {/* Не вимикаємо до валідного номера: бліда кнопка читалась як зламана, помилку покаже сабміт. */}
          <Button
            type="submit"
            variant={isSheet ? "default" : "outline"}
            disabled={form.formState.isSubmitting}
            className={cn(
              "rounded-lg font-extrabold",
              isSheet ? "h-[52px] text-[17px]" : "h-12 px-5 border-2 border-[#C0092A] text-[#C0092A]"
            )}
          >
            {isSheet ? t("submit") : tProduct("oneClick")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
