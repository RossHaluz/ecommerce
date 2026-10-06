import { describe, expect, it } from "vitest";
import robots, { AI_TRAINING_BOTS } from "./robots";

const rules = () => {
  const { rules } = robots();
  return Array.isArray(rules) ? rules : [rules];
};

describe("robots", () => {
  it("закриває весь сайт ботам навчання ШІ", () => {
    const aiRule = rules().find((rule) => rule.userAgent === AI_TRAINING_BOTS);
    expect(aiRule?.disallow).toBe("/");
    expect(AI_TRAINING_BOTS).toContain("GPTBot");
  });

  it("пошукові боти не потрапляють у заборону — від них залежить SEO", () => {
    for (const bot of ["Googlebot", "bingbot", "OAI-SearchBot"]) {
      expect(AI_TRAINING_BOTS).not.toContain(bot);
    }
  });

  it("решта сайту відкрита для всіх, приватні сторінки закриті", () => {
    const common = rules().find((rule) => rule.userAgent === "*");
    expect(common?.allow).toBe("/");
    expect(common?.disallow).toEqual(["/account", "/checkout", "/search", "/success"]);
  });
});
