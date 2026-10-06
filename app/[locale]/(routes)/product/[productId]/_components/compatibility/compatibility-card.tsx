import { useTranslations } from "next-intl";
import { Check, ScanSearch } from "lucide-react";
import { Link } from "@/i18n/routing";
import SearchByVinCode from "@/components/search-by-vin-code/search-by-vin-code";
import { formatModelName } from "@/lib/seo/format-model-name";
import type { Model } from "@/lib/types";

interface CompatibilityCardProps {
  models: { model: Model }[];
  catalogNumber?: string;
}

/** Головний страх покупця — «чи підійде до моєї машини». Тут на нього відповідаємо, а VIN — запасний вихід. */
export const CompatibilityCard = ({ models, catalogNumber }: CompatibilityCardProps) => {
  const t = useTranslations("product");
  const fitting = models.filter(({ model }) => model?.modelName && model.name);

  return (
    <section className="flex flex-col gap-3.5 rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <h2 className="m-0 text-lg lg:text-xl font-extrabold text-[#2E2E2E]">{t("fitsTitle")}</h2>
      {fitting.length > 0 && (
        <ul className="m-0 flex flex-wrap gap-2">
          {fitting.map(({ model }) => (
            <li key={model.id}>
              <Link
                href={`/${model.modelName}`}
                prefetch={false}
                className="inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-lg bg-[#F2F2F2] font-bold text-[#2E2E2E] hover:text-[#C0092A]"
              >
                <Check size={18} strokeWidth={2.4} className="text-[#008038]" aria-hidden />
                Audi {formatModelName(model.name)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {catalogNumber && (
        <p className="m-0 text-sm lg:text-[15px] leading-relaxed text-[#484848]">
          {t.rich("fitsHint", { oe: catalogNumber, b: (chunk) => <b>{chunk}</b> })}
        </p>
      )}
      <SearchByVinCode
        trigger={
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-lg border border-[#484848] font-bold text-[#2E2E2E] lg:self-start"
          >
            <ScanSearch size={18} aria-hidden />
            {t("checkByVin")}
          </button>
        }
      />
    </section>
  );
};
