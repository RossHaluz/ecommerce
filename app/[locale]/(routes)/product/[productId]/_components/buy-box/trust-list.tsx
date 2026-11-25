import { useTranslations } from "next-intl";
import { BadgeCheck, PackageSearch, RefreshCw, ScanSearch, Truck } from "lucide-react";
import { Link } from "@/i18n/routing";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import { conditionKey } from "@/entities/product/model/condition-key";
import type { Product } from "@/lib/types";
import { TrustItem } from "./trust-item";

const LINK = "text-left underline underline-offset-2 hover:text-[#c0092a]";

/** The answers to «what if it does not fit / is not as shown», right under the buy button. */
export const TrustList = ({ condition }: { condition: Product["condition"] }) => {
  const t = useTranslations("advantages");
  const conditionLine = conditionKey(condition);

  return (
    <ul className="m-0 flex flex-col gap-3 rounded-lg bg-[#F7F7F7] p-4 text-sm leading-5 text-[#484848]">
      {conditionLine && <TrustItem Icon={BadgeCheck}>{t(conditionLine)}</TrustItem>}
      <TrustItem Icon={PackageSearch}>
        <Link href="/returns" prefetch={false} className={LINK}>
          {t("inspectBeforePay")}
        </Link>
      </TrustItem>
      <TrustItem Icon={ScanSearch}>
        <SearchByVinCode trigger={<button type="button" className={LINK}>{t("checkByVin")}</button>} />
      </TrustItem>
      <TrustItem Icon={RefreshCw}>
        <Link href="/returns" prefetch={false} className={LINK}>
          {t("exchangeGuarantee")}
        </Link>
      </TrustItem>
      <TrustItem Icon={Truck}>{t("deliveryUkraine")}</TrustItem>
    </ul>
  );
};
