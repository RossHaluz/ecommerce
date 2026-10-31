import { useTranslations } from "next-intl";
import { STAGE_TONE } from "../model/order-stage";
import type { OrderStage } from "../model/order-types";

export const OrderStatusChip = ({ stage }: { stage: OrderStage }) => {
  const t = useTranslations("account.stage");
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-extrabold lg:text-[13px] ${STAGE_TONE[stage]}`}>
      {t(stage)}
    </span>
  );
};
