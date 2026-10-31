import { useTranslations } from "next-intl";
import type { OrderDetails } from "../model/order-types";
import { OrderPrice } from "./order-price";
import { OrderUahHint } from "./order-uah-hint";

export const OrderSummaryCard = ({ order }: { order: OrderDetails }) => {
  const t = useTranslations("account");
  const { method, isPaid } = order.payment;

  return (
    <section aria-labelledby="order-sum" className="flex flex-col gap-2.5 rounded-[14px] bg-white p-3.5 text-[15px] lg:rounded-2xl lg:p-5">
      <h2 id="order-sum" className="m-0 text-lg font-extrabold">
        {t("order.summary")}
      </h2>
      <div className="flex justify-between gap-3">
        <span className="text-[#6B6B6B]">{t("order.itemsCount", { count: order.items.length })}</span>
        <OrderPrice amount={order.totalPrice} />
      </div>
      <div className="flex justify-between gap-3">
        <span className="text-[#6B6B6B]">{t("order.shipping")}</span>
        <span className="text-right">{t("order.shippingNote")}</span>
      </div>
      <div className="flex justify-between gap-3 border-t border-[#EEEEEE] pt-2.5 text-lg font-extrabold">
        <span>{t("order.total")}</span>
        <span className="text-[#C0092A]">
          <OrderPrice amount={order.totalPrice} />
        </span>
      </div>
      <OrderUahHint amount={order.totalPrice} />
      <div className="rounded-[10px] bg-[#F7F7F7] px-3 py-2.5 text-sm">
        <strong>{t(`paymentMethod.${method}` as "paymentMethod.monobank")}</strong> · {t(isPaid ? "order.paid" : "order.notPaid")}
      </div>
    </section>
  );
};
