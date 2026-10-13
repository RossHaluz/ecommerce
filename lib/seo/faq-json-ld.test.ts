import { describe, expect, it } from "vitest";
import { buildFaqJsonLd } from "./faq-json-ld";

describe("buildFaqJsonLd", () => {
  it("maps every item to a Question with an accepted Answer", () => {
    expect(buildFaqJsonLd([{ question: "Як оплатити?", answer: "При отриманні або карткою." }])).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "Як оплатити?", acceptedAnswer: { "@type": "Answer", text: "При отриманні або карткою." } }],
    });
  });
});
