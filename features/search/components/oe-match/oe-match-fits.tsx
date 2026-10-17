import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatModelName } from "@/lib/seo/format-model-name";
import type { Product } from "@/lib/types";

export const OeMatchFits = ({ models }: { models: Product["models"] }) => {
  const t = useTranslations("search");
  if (!models?.length) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm text-[#6B6B6B]">{t("fits")}</span>
      <ul className="flex flex-wrap gap-2">
        {models.map(({ model }) => (
          <li key={model.id} className="flex items-center gap-1.5 rounded-lg bg-[#EEF6F0] px-2.5 py-1 text-sm font-bold text-[#1E7B3C]">
            <Check aria-hidden className="h-4 w-4" />
            {formatModelName(model.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};
