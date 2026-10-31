import { useTranslations } from "next-intl";
import { linesCaption } from "../model/order-format";
import type { OrderLine } from "../model/order-types";

export const OrderCaption = ({ items }: { items: OrderLine[] }) => {
  const t = useTranslations("account.orders");
  const { first, more } = linesCaption(items);
  return <>{more > 0 ? t("more", { first, more }) : first}</>;
};
