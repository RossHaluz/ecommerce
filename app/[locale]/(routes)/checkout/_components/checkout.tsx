"use client";

import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useMounted } from "@/hooks/use-mounted";
import type { CheckoutUser } from "../model/checkout-defaults";
import { CheckoutForm } from "./checkout-form";
import { EmptyCheckout } from "./empty-checkout";
import { TrackBeginCheckout } from "./track-begin-checkout";

/** Кошик живе в localStorage: до монтування він невідомий — без заглушки блимало б «кошик порожній». */
const Checkout = ({ user }: { user: (CheckoutUser & { _id?: string }) | null }) => {
  const items = useHydratedSelector(selectOrderItems);
  const mounted = useMounted();

  if (!mounted) return <div className="min-h-[60vh]" aria-busy />;
  if (!items?.length) return <EmptyCheckout />;

  return (
    <>
      <TrackBeginCheckout />
      {/* Після входу через OTP сторінка оновлюється — новий key підставляє дані профілю. */}
      <CheckoutForm key={user?._id ?? "guest"} items={items} user={user} />
    </>
  );
};

export default Checkout;
