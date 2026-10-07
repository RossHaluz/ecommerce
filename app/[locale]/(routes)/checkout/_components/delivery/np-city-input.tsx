"use client";

import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { CityField } from "@/features/nova-poshta/ui/city-field";
import type { CheckoutValues } from "../../model/checkout-schema";
import { FieldShell } from "../fields/field-shell";
import { inputClass } from "../fields/input-class";

const ID = "checkout-city";
const opts = { shouldDirty: true };

/** Нове місто скидає відділення: старе з іншого міста вже недійсне. */
export const NpCityInput = () => {
  const t = useTranslations("checkout");
  const { control, setValue, clearErrors, formState } = useFormContext<CheckoutValues>();
  const city = useWatch({ control, name: "city" });
  const error = formState.errors.city?.message;

  const resetWarehouse = () => {
    setValue("separation", "", opts);
    setValue("ref_separation", "", opts);
  };

  return (
    <FieldShell id={ID} label={t("city")} required error={error}>
      <CityField
        id={ID}
        value={city}
        onType={(text) => {
          setValue("city", text, opts);
          setValue("ref_city", "", opts);
          resetWarehouse();
        }}
        onPick={(option) => {
          setValue("city", option.label, opts);
          setValue("ref_city", option.ref, opts);
          resetWarehouse();
          clearErrors("city");
        }}
        invalid={Boolean(error)}
        describedBy={error ? `${ID}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
    </FieldShell>
  );
};
