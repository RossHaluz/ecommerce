import { useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format/price";

/** A zero total is an order awaiting a price, never «$0». */
export const OrderPrice = ({ amount }: { amount: number }) => {
  const t = useTranslations("account.order");
  return <>{amount > 0 ? formatPrice(amount, { currency: "USD", usdToUahRate: null }) : t("negotiable")}</>;
};
