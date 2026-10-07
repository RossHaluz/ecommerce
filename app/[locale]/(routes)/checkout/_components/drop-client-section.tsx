"use client";

import { useTranslations } from "next-intl";
import { SectionCard } from "./section-card";
import { PhoneField } from "./fields/phone-field";
import { TextField } from "./fields/text-field";

/** Лише для дропшипера: кому Нова пошта видасть посилку. */
export const DropClientSection = ({ step }: { step: number }) => {
  const t = useTranslations("checkout");

  return (
    <SectionCard step={step} title={t("stepRecipient")}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <PhoneField name="clientPhone" label={t("phone")} />
        <div className="grid grid-cols-2 gap-3 lg:contents">
          <TextField name="clientFirstName" label={t("firstName")} required />
          <TextField name="clientLastName" label={t("lastName")} required />
        </div>
      </div>
    </SectionCard>
  );
};
