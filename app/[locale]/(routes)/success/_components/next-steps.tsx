import { useTranslations } from "next-intl";
import type { NextStep } from "../model/success-view";

/** Знімає «а що тепер?»: людина знає, що чекати дзвінка, і не дублює замовлення. */
export const NextSteps = ({ steps }: { steps: NextStep[] }) => {
  const t = useTranslations("success");

  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4">
      <h2 className="m-0 text-lg font-extrabold text-[#2E2E2E]">{t("nextTitle")}</h2>
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E2E2E] text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-extrabold text-[#2E2E2E]">{t(`steps.${step}.title`)}</span>
              <span className="text-[13px] leading-[18px] text-[#6B6B6B]">{t(`steps.${step}.text`)}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};
