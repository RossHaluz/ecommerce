"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { OrderItem } from "@/redux/order/slice";
import { createCheckoutSchema, type CheckoutValues } from "../model/checkout-schema";
import { checkoutDefaults, isDropshipper, type CheckoutUser } from "../model/checkout-defaults";
import { ContactsSection } from "./contacts-section";
import { DropClientSection } from "./drop-client-section";
import { DeliverySection } from "./delivery/delivery-section";
import { PaymentSection } from "./payment-section";
import { CommentToggle } from "./comment-toggle";
import { MiniSummary } from "./summary/mini-summary";
import { OrderSummary } from "./summary/order-summary";
import { SummaryTotals } from "./summary/summary-totals";
import { SubmitBar } from "./submit-bar";
import { usePlaceOrder } from "./use-place-order";

// Місто й відділення — не звичайні input, RHF їх не сфокусує сам.
const focusFirstError = () =>
  requestAnimationFrame(() => document.querySelector<HTMLElement>('#checkout-form [aria-invalid="true"]')?.focus());

export const CheckoutForm = ({ items, user }: { items: OrderItem[]; user: CheckoutUser | null }) => {
  const t = useTranslations("checkout.errors");
  const isDrop = isDropshipper(user);
  const schema = useMemo(() => createCheckoutSchema(t, isDrop), [t, isDrop]);
  const form = useForm<CheckoutValues>({ resolver: zodResolver(schema), defaultValues: checkoutDefaults(user) });
  const deliveryMethod = useWatch({ control: form.control, name: "deliveryMethod" });
  const placeOrder = usePlaceOrder(items, isDrop);
  const submitting = form.formState.isSubmitting;
  const step = (n: number) => (isDrop ? n + 1 : n);

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 gap-3 pb-32 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-6 lg:pb-0">
        <form
          id="checkout-form"
          noValidate
          onSubmit={form.handleSubmit(placeOrder, focusFirstError)}
          className="flex min-w-0 flex-col gap-3"
        >
          <div className="lg:hidden">
            <MiniSummary items={items} />
          </div>
          <ContactsSection step={1} isDrop={isDrop} isSignedIn={Boolean(user)} />
          {isDrop && <DropClientSection step={2} />}
          <DeliverySection step={step(2)} isDrop={isDrop} />
          <PaymentSection step={step(3)} />
          <CommentToggle />
          <div className="rounded-xl bg-white p-4 lg:hidden">
            <SummaryTotals items={items} deliveryMethod={deliveryMethod} />
          </div>
        </form>
        <div className="hidden lg:sticky lg:top-6 lg:block">
          <OrderSummary items={items} deliveryMethod={deliveryMethod} submitting={submitting} />
        </div>
      </div>
      <SubmitBar items={items} submitting={submitting} />
    </FormProvider>
  );
};
