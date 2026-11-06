import { describe, it, expect } from "vitest";
import { profileFormSchema } from "./profile-form-schema";

describe("profileFormSchema", () => {
  it("saves a name without an e-mail", () => {
    expect(profileFormSchema.safeParse({ firstName: "Іван", lastName: "", email: "" }).success).toBe(true);
  });

  it("needs a first name and a real e-mail when one is given", () => {
    expect(profileFormSchema.safeParse({ firstName: " ", lastName: "", email: "" }).success).toBe(false);
    expect(profileFormSchema.safeParse({ firstName: "Іван", lastName: "", email: "ivan@" }).success).toBe(false);
  });
});
