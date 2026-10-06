import { useTranslations } from "next-intl";
import { CreditCard, RefreshCw, Truck } from "lucide-react";

/** Відповідь на «а якщо не підійде?» у момент рішення. Тексти — спільні «переваги» магазину. */
export const TrustList = () => {
  const t = useTranslations("advantages");
  const items = [
    { Icon: Truck, text: t("deliveryUkraine") },
    { Icon: RefreshCw, text: t("exchangeGuarantee") },
    { Icon: CreditCard, text: t("securePayment") },
  ];

  return (
    <ul className="m-0 flex flex-col gap-3 rounded-lg bg-[#F7F7F7] p-4 text-sm leading-5 text-[#484848]">
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-start gap-2.5">
          <Icon size={20} strokeWidth={1.8} className="shrink-0" aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  );
};
