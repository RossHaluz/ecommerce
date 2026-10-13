export interface FaqItem {
  question: string;
  answer: string;
}

/** schema.org FAQPage: питання з відповідями можуть з'явитися у видачі прямо під посиланням. */
export const buildFaqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
