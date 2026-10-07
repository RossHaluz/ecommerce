"use client";

import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { WarehouseField } from "@/features/nova-poshta/ui/warehouse-field";
import type { CheckoutValues } from "../../model/checkout-schema";
import { FieldShell } from "../fields/field-shell";
import { inputClass } from "../fields/input-class";

const ID = "checkout-separation";
const opts = { shouldDirty: true };

export const NpWarehouseInput = () => {
  const t = useTranslations("checkout");
  const { control, setValue, clearErrors, formState } = useFormContext<CheckoutValues>();
  const [cityRef, separation] = useWatch({ control, name: ["ref_city", "separation"] });
  const error = formState.errors.separation?.message;

  return (
    <FieldShell id={ID} label={t("warehouse")} required error={error}>
      <WarehouseField
        id={ID}
        cityRef={cityRef}
        value={separation}
        onType={(text) => {
          setValue("separation", text, opts);
          setValue("ref_separation", "", opts);
        }}
        onPick={(option) => {
          setValue("separation", option.label, opts);
          setValue("ref_separation", option.ref, opts);
          clearErrors("separation");
        }}
        invalid={Boolean(error)}
        describedBy={error ? `${ID}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
    </FieldShell>
  );
};
