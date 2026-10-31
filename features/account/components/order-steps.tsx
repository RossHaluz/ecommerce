import { useTranslations } from "next-intl";
import { ORDER_STEPS, stepStates, type StepState } from "../model/order-stage";
import type { OrderStage } from "../model/order-types";

const DOT: Record<StepState, string> = {
  done: "bg-[#1E7B3C]",
  now: "bg-[#1E7B3C] shadow-[0_0_0_5px_rgba(30,123,60,.18)]",
  todo: "bg-[#D6D6D6]",
};
const MARK: Record<StepState, string> = { done: "✓", now: "•", todo: "" };

/** Vertical on a phone, horizontal from lg: four columns do not fit a 320px screen with their titles. */
export const OrderSteps = ({ stage }: { stage: OrderStage }) => {
  const t = useTranslations("account.steps");
  const states = stepStates(stage);
  if (!states) return null;

  return (
    <ol aria-label={t("label")} className="m-0 grid list-none grid-cols-1 gap-3 p-0 lg:grid-cols-4 lg:gap-0">
      {ORDER_STEPS.map((step, index) => (
        <li key={step} className="flex items-center gap-3 lg:flex-col lg:items-stretch lg:gap-2">
          <span className="flex items-center lg:w-full">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ${DOT[states[index]]}`}
            >
              {MARK[states[index]]}
            </span>
            {index < ORDER_STEPS.length - 1 && (
              <span
                className={`mx-1.5 hidden h-1 grow rounded-sm lg:block ${states[index] === "done" ? "bg-[#1E7B3C]" : "bg-[#E6E6E6]"}`}
              />
            )}
          </span>
          <span className={`text-[15px] font-extrabold ${states[index] === "todo" ? "text-[#8A8A8A]" : "text-[#2E2E2E]"}`}>
            {t(step)}
          </span>
        </li>
      ))}
    </ol>
  );
};
