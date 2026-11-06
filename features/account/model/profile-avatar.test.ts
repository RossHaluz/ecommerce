import { describe, it, expect } from "vitest";
import { avatarUrl, isAcceptableAvatar } from "./profile-avatar";

describe("isAcceptableAvatar", () => {
  it("accepts a jpeg, png or webp up to 5 MB", () => {
    expect(isAcceptableAvatar({ type: "image/jpeg", size: 5 * 1024 * 1024 })).toBe(true);
  });

  it("refuses other types and bigger files", () => {
    expect(isAcceptableAvatar({ type: "image/heic", size: 10 })).toBe(false);
    expect(isAcceptableAvatar({ type: "image/png", size: 5 * 1024 * 1024 + 1 })).toBe(false);
  });
});

describe("avatarUrl", () => {
  it("serves an uploaded file from /avatars, escaping old names with spaces", () => {
    expect(avatarUrl("a b.jpg", "https://api.x")).toBe("https://api.x/avatars/a%20b.jpg");
  });

  it("completes an old gravatar link and gives nothing without an avatar", () => {
    expect(avatarUrl("//www.gravatar.com/avatar/1", "https://api.x")).toBe("https://www.gravatar.com/avatar/1");
    expect(avatarUrl("", "https://api.x")).toBeNull();
  });
});
