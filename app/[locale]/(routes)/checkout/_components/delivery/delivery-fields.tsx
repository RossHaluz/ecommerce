"use client";

import { useTranslations } from "next-intl";
import type { DeliveryMethod } from "@/entities/order/model/order-options";
import { TextField } from "../fields/text-field";
import { NpCityInput } from "./np-city-input";
import { NpWarehouseInput } from "./np-warehouse-input";

const TwoColumns = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{children}</div>
);

const WarehouseFields = () => (
  <TwoColumns>
    <NpCityInput />
    <NpWarehouseInput />
  </TwoColumns>
);

const CourierFields = () => {
  const t = useTranslations("checkout");
  return (
    <TwoColumns>
      <NpCityInput />
      <TextField name="address" label={t("address")} required autoComplete="street-address" placeholder={t("addressPlaceholder")} />
    </TwoColumns>
  );
};

// Перевізник не з довідника Нової пошти — назви вводять вручну.
const TransporterFields = () => {
  const t = useTranslations("checkout");
  return (
    <TwoColumns>
      <TextField name="city" label={t("city")} required autoComplete="address-level2" />
      <TextField name="separation" label={t("transporterBranch")} optionalNote={t("optional")} />
    </TwoColumns>
  );
};

/** Самовивіз: адресу магазину вже видно в описі варіанта. */
const FIELDS: Record<DeliveryMethod, (() => JSX.Element) | null> = {
  warehouse: WarehouseFields,
  courier: CourierFields,
  transporter: TransporterFields,
  pickup: null,
};

export const DeliveryFields = ({ method }: { method: DeliveryMethod }) => {
  const Fields = FIELDS[method];
  return Fields ? <Fields /> : null;
};
