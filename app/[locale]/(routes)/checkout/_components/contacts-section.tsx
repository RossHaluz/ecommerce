"use client";

import { useTranslations } from "next-intl";
import { SectionCard } from "./section-card";
import { LoginPrompt } from "./login-prompt";
import { PhoneField } from "./fields/phone-field";
import { TextField } from "./fields/text-field";

interface ContactsSectionProps {
  step: number;
  isDrop: boolean;
  isSignedIn: boolean;
}

/** Телефон першим: за ним менеджер підтверджує замовлення, а покупець його точно знає. */
export const ContactsSection = ({ step, isDrop, isSignedIn }: ContactsSectionProps) => {
  const t = useTranslations("checkout");

  return (
    <SectionCard step={step} title={t(isDrop ? "stepDropshipper" : "stepContacts")} aside={!isSignedIn && <LoginPrompt />}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <PhoneField name="phone" label={t("phone")} />
        <div className="grid grid-cols-2 gap-3 lg:contents">
          <TextField name="firstName" label={t("firstName")} required autoComplete="given-name" />
          <TextField name="lastName" label={t("lastName")} required autoComplete="family-name" />
        </div>
        <TextField name="email" label="Email" optionalNote={t("optional")} type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" />
      </div>
    </SectionCard>
  );
};
