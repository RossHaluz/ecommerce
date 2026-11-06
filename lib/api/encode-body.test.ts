import { describe, it, expect } from "vitest";
import { encodeBody } from "./encode-body";

describe("encodeBody", () => {
  it("passes a form through untouched, so a file upload is not flattened to {}", () => {
    const form = new FormData();
    form.append("firstName", "Іван");
    expect(encodeBody(form)).toEqual({ body: form, headers: {} });
  });

  it("sends plain objects as JSON", () => {
    expect(encodeBody({ a: 1 })).toEqual({ body: '{"a":1}', headers: { "Content-Type": "application/json" } });
  });

  it("sends nothing without a body", () => {
    expect(encodeBody(undefined)).toEqual({ headers: {} });
  });
});
