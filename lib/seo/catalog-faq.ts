import { getTranslations } from "next-intl/server";
import type { FaqItem } from "./faq-json-ld";

const QUESTIONS = ["fit", "condition", "delivery", "payment", "returns", "missing"] as const;

/**
 * Питання списку каталогу. Відповіді — лише те, що магазин справді обіцяє на сайті; перше питання з реальною
 * кількістю деталей саме цієї сторінки, щоб блок не був однаковим на сотнях сторінок.
 */
export async function getCatalogFaq({ locale, subject, count }: { locale: string; subject: string; count: number }): Promise<FaqItem[]> {
  const t = await getTranslations({ locale, namespace: "seo.faq" });
  return [
    { question: t("countQ", { subject }), answer: t("countA", { subject, count }) },
    ...QUESTIONS.map((key) => ({ question: t(`${key}Q`), answer: t(`${key}A`) })),
  ];
}
