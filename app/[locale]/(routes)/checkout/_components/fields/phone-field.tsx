"use client";

import { Controller, useFormContext } from "react-hook-form";
import CustomInputMask from "@/utils/phone-mask";
import { UA_PHONE_MASK } from "@/lib/format/ua-phone";
import type { CheckoutValues } from "../../model/checkout-schema";
import { FieldShell } from "./field-shell";
import { inputClass } from "./input-class";

interface PhoneFieldProps {
  name: "phone" | "clientPhone";
  label: string;
}

export const PhoneField = ({ name, label }: PhoneFieldProps) => {
  const { control, formState } = useFormContext<CheckoutValues>();
  const error = formState.errors[name]?.message;
  const id = `checkout-${name}`;

  return (
    <FieldShell id={id} label={label} required error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomInputMask
            {...field}
            id={id}
            mask={UA_PHONE_MASK}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={UA_PHONE_MASK.replace(/9/g, "0")}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`${inputClass(Boolean(error))} font-bold`}
          />
        )}
      />
    </FieldShell>
  );
};
