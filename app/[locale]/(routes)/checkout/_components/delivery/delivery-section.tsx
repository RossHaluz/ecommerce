"use client";

import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { deliveryMethodsFor, type DeliveryMethod } from "../../model/checkout-options";
import type { CheckoutValues } from "../../model/checkout-schema";
import { SectionCard } from "../section-card";
import { OptionCard } from "../option-card";
import { DeliveryFields } from "./delivery-fields";

export const DeliverySection = ({ step, isDrop }: { step: number; isDrop: boolean }) => {
  const t = useTranslations("checkout");
  const { control, clearErrors } = useFormContext<CheckoutValues>();
  const { field } = useController({ control, name: "deliveryMethod" });

  const select = (method: string) => {
    field.onChange(method as DeliveryMethod);
    // Помилки полів іншого способу доставки вже не стосуються.
    clearErrors(["city", "separation", "address"]);
  };

  return (
    <SectionCard step={step} title={t("stepDelivery")}>
      <div role="radiogroup" aria-label={t("stepDelivery")} className="flex flex-col gap-2">
        {deliveryMethodsFor(isDrop).map((method) => (
          <OptionCard
            key={method}
            name="deliveryMethod"
            value={method}
            checked={field.value === method}
            onSelect={select}
            title={t(`delivery.${method}.title`)}
            description={t(`delivery.${method}.description`)}
          />
        ))}
      </div>
      <DeliveryFields method={field.value} />
    </SectionCard>
  );
};
