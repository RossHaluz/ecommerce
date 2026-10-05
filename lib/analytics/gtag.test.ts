import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const appended: { src: string; async: boolean }[] = [];

const commands = () =>
  ((globalThis as any).window.dataLayer as IArguments[]).map((args) => Array.from(args));

describe("gtag", () => {
  beforeEach(() => {
    vi.resetModules();
    appended.length = 0;
    vi.stubGlobal("window", {});
    vi.stubGlobal("document", {
      createElement: () => ({}),
      head: { appendChild: (el: { src: string; async: boolean }) => appended.push(el) },
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads the GA script once and configures the measurement id", async () => {
    const { loadAnalytics, GA_MEASUREMENT_ID } = await import("./gtag");

    loadAnalytics();
    loadAnalytics();

    expect(appended).toHaveLength(1);
    expect(appended[0].src).toContain(`id=${GA_MEASUREMENT_ID}`);
    expect(appended[0].async).toBe(true);
    expect(commands()).toEqual([
      ["js", expect.any(Date)],
      ["config", GA_MEASUREMENT_ID],
    ]);
  });

  it("queues an event even before the first interaction — nothing is lost", async () => {
    const { trackEvent, GA_MEASUREMENT_ID } = await import("./gtag");

    trackEvent("add_to_cart", { item_id: "p1" });

    expect(appended).toHaveLength(1);
    expect(commands()).toEqual([
      ["js", expect.any(Date)],
      ["config", GA_MEASUREMENT_ID],
      ["event", "add_to_cart", { item_id: "p1" }],
    ]);
  });

  it("pushes Arguments objects, as gtag.js requires", async () => {
    const { trackEvent } = await import("./gtag");

    trackEvent("make_new_order", {});

    const entries = (globalThis as any).window.dataLayer;
    expect(Object.prototype.toString.call(entries[0])).toBe("[object Arguments]");
  });
});
