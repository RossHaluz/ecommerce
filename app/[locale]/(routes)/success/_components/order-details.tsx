"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { selectOrderDetails, selectOrderRehydrated } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { useMounted } from "@/hooks/use-mounted";
import { shouldLeaveSuccess } from "../model/should-leave-success";
import { toSuccessView } from "../model/success-view";
import { SuccessHero } from "./success-hero";
import { NextSteps } from "./next-steps";
import { OrderRecap } from "./order-recap";
import { OrderQuestions } from "./order-questions";

const OrderDetails = () => {
  const t = useTranslations("cart");
  const orderDetails = useHydratedSelector(selectOrderDetails);
  const rehydrated = useSelector(selectOrderRehydrated);
  const mounted = useMounted();
  const router = useRouter();

  useEffect(() => {
    if (shouldLeaveSuccess({ mounted, rehydrated, hasOrder: Boolean(orderDetails) })) {
      router.replace("/");
    }
  }, [mounted, rehydrated, orderDetails, router]);

  if (!orderDetails) return <div className="min-h-[100svh]" aria-busy />;
  const view = toSuccessView(orderDetails);

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-3">
      <SuccessHero view={view} />
      <NextSteps steps={view.nextSteps} />
      <OrderRecap view={view} />
      <OrderQuestions />
      <Link
        href="/"
        className="flex h-[52px] items-center justify-center rounded-lg border-2 border-[#C0092A] bg-white text-base font-extrabold text-[#C0092A]"
      >
        {t("continueShopping")}
      </Link>
    </div>
  );
};

export default OrderDetails;
