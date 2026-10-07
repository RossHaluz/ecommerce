"use client";

import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { PAYMENT_METHODS, type PaymentMethod } from "../model/checkout-options";
import type { CheckoutValues } from "../model/checkout-schema";
import { SectionCard } from "./section-card";
import { OptionCard } from "./option-card";

export const PaymentSection = ({ step }: { step: number }) => {
  const t = useTranslations("checkout");
  const { control } = useFormContext<CheckoutValues>();
  const { field } = useController({ control, name: "paymentMethod" });

  return (
    <SectionCard step={step} title={t("stepPayment")}>
      <div role="radiogroup" aria-label={t("stepPayment")} className="flex flex-col gap-2">
        {PAYMENT_METHODS.map((method) => (
          <OptionCard
            key={method}
            name="paymentMethod"
            value={method}
            checked={field.value === method}
            onSelect={(value) => field.onChange(value as PaymentMethod)}
            title={t(`payment.${method}.title`)}
            description={t(`payment.${method}.description`)}
          />
        ))}
      </div>
    </SectionCard>
  );
};
