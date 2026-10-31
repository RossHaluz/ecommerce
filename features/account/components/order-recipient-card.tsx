import { useTranslations } from "next-intl";
import type { OrderDetails } from "../model/order-types";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <span className="text-[#6B6B6B]">{label}</span>
    <br />
    <strong className="break-words">{children}</strong>
  </div>
);

export const OrderRecipientCard = ({ order }: { order: OrderDetails }) => {
  const t = useTranslations("account");
  const { service, city, separation, address } = order.delivery;
  const place = [t(`delivery.${service}` as "delivery.pickup"), city, address || separation].filter(Boolean).join(", ");

  return (
    <section aria-labelledby="order-who" className="flex flex-col gap-2.5 rounded-[14px] bg-white p-3.5 text-sm leading-5 lg:rounded-2xl lg:p-5">
      <h2 id="order-who" className="m-0 text-lg font-extrabold">
        {t("order.deliveryTitle")}
      </h2>
      <Field label={t("order.recipient")}>{[order.recipient.name, order.recipient.phone].filter(Boolean).join(", ")}</Field>
      {order.dropClient && (
        <Field label={t("order.dropClient")}>{[order.dropClient.name, order.dropClient.phone].filter(Boolean).join(", ")}</Field>
      )}
      <Field label={t("order.where")}>{place}</Field>
      {order.comment && <Field label={t("order.comment")}>{order.comment}</Field>}
    </section>
  );
};
