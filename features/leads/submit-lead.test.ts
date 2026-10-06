import { beforeEach, describe, expect, it, vi } from "vitest";

const post = vi.fn();
vi.mock("@/lib/browser-client", () => ({ default: { post: (...args: unknown[]) => post(...args) } }));
const trackEvent = vi.fn();
vi.mock("@/lib/analytics/gtag", () => ({ trackEvent: (...args: unknown[]) => trackEvent(...args) }));
vi.hoisted(() => {
  process.env.STORE_ID = "store-1";
});

import { submitLead } from "./submit-lead";

describe("submitLead", () => {
  beforeEach(() => {
    post.mockReset().mockResolvedValue({});
    trackEvent.mockReset();
  });

  // Регресія: після рефакторингу 2026-09-27 форми слали відносний /call-me/… на адресу сайту — 404.
  it("шле на API через browserClient, а не на адресу сайту", async () => {
    await submitLead({ phone: "+380 67 123 45 67" }, "call_me");

    expect(post).toHaveBeenCalledWith("/call-me/store-1", expect.any(FormData));
  });

  it("не губить опис запчастини з форми VIN", async () => {
    await submitLead({ phone: "+380 67 123 45 67", vinCode: "WAUZZZ4M0KD000000", desc: "фара ліва" }, "vin");

    const body = post.mock.calls[0][1] as FormData;
    expect(body.get("vinCode")).toBe("WAUZZZ4M0KD000000");
    expect(body.get("desc")).toBe("фара ліва");
    expect(trackEvent).toHaveBeenCalledWith("generate_lead", { lead_type: "vin" });
  });

  it("подію заявки шле лише після успішної відправки", async () => {
    post.mockRejectedValue(new Error("500"));

    await expect(submitLead({ phone: "+380 67 123 45 67" }, "call_me")).rejects.toThrow();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
