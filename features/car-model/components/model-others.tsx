import { useTranslations } from "next-intl";
import type { Model } from "@/lib/types";

/** Не-Audi з бази (Touareg, Cayenne…) — без серій: кожна одразу кнопка. */
export const ModelOthers = ({ models, onChoose }: { models: Model[]; onChoose: (model: Model) => void }) => {
  const t = useTranslations("myAudi");
  if (!models.length) return null;

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.04em] text-[#6B6B6B]">{t("others")}</h3>
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            type="button"
            onClick={() => onChoose(model)}
            className="h-10 rounded-full border border-[#DDDDDD] px-3.5 text-sm font-bold text-[#2E2E2E] hover:border-[#2E2E2E]"
          >
            {model.name}
          </button>
        ))}
      </div>
    </section>
  );
};
