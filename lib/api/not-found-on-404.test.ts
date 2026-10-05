import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import { ApiError } from "./http";
import { notFoundOn404 } from "./not-found-on-404";

describe("notFoundOn404", () => {
  it("404 від бекенда — сторінка 404", () => {
    expect(() => notFoundOn404(new ApiError(404, "/model/x"))).toThrow("NEXT_NOT_FOUND");
  });

  it("збій бекенда не маскується під 404 — інакше кеш віддавав би 404 на живу сторінку", () => {
    const outage = new ApiError(502, "/model/x");
    expect(() => notFoundOn404(outage)).toThrow(outage);
  });
});
