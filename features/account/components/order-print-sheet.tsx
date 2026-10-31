import { forwardRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { formatOrderDate, lineTotal } from "../model/order-format";
import type { OrderDetails } from "../model/order-types";
import { OrderPrice } from "./order-price";

const CELL = "border border-[#343a40] p-2 text-left";

/** Stays out of the page (the print-hidden class) and only appears on the printed sheet. */
export const OrderPrintSheet = forwardRef<HTMLDivElement, { order: OrderDetails }>(({ order }, ref) => {
  const t = useTranslations("account");
  const locale = useLocale();
  const { service, city, separation, address } = order.delivery;

  return (
    <div ref={ref} className="print-hidden p-[50px] text-xs">
      <p className="m-0 mb-1 font-bold">
        {t("order.title", { number: order.number })} · {formatOrderDate(order.createdAt, locale)}
      </p>
      <p className="m-0">{[order.recipient.name, order.recipient.phone].filter(Boolean).join(", ")}</p>
      {order.dropClient && (
        <p className="m-0">
          {t("order.dropClient")}: {order.dropClient.name}, {order.dropClient.phone}
        </p>
      )}
      <p className="m-0 mb-4">
        {[t(`delivery.${service}` as "delivery.pickup"), city, address || separation].filter(Boolean).join(", ")} ·{" "}
        {t(`paymentMethod.${order.payment.method}` as "paymentMethod.monobank")}
      </p>
      <table className="mb-4 w-full border-collapse">
        <thead>
          <tr>
            {(["article", "catalogNumber", "part", "quantity", "price", "sum"] as const).map((column) => (
              <th key={column} className={CELL}>
                {t(`order.${column}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {order.items.map((line) => (
            <tr key={line.slug}>
              <td className={CELL}>{line.article}</td>
              <td className={CELL}>{line.oe}</td>
              <td className={CELL}>{line.title}</td>
              <td className={CELL}>{line.quantity}</td>
              <td className={CELL}>
                <OrderPrice amount={line.price} />
              </td>
              <td className={CELL}>
                <OrderPrice amount={lineTotal(line)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="m-0 text-right font-bold">
        {t("order.total")}: <OrderPrice amount={order.totalPrice} />
      </p>
      {order.comment && (
        <p className="m-0 mt-3">
          {t("order.comment")}: {order.comment}
        </p>
      )}
    </div>
  );
});

OrderPrintSheet.displayName = "OrderPrintSheet";
