"use client";

import type { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import type { CheckoutValues } from "../../model/checkout-schema";
import { FieldShell } from "./field-shell";
import { inputClass } from "./input-class";

type TextFieldProps = {
  name: keyof CheckoutValues;
  label: string;
  required?: boolean;
  optionalNote?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "autoComplete" | "placeholder" | "inputMode">;

export const TextField = ({ name, label, required, optionalNote, ...inputProps }: TextFieldProps) => {
  const { register, formState } = useFormContext<CheckoutValues>();
  const error = formState.errors[name]?.message;
  const id = `checkout-${name}`;

  return (
    <FieldShell id={id} label={label} required={required} optionalNote={optionalNote} error={error}>
      <input
        id={id}
        {...register(name)}
        {...inputProps}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
    </FieldShell>
  );
};
