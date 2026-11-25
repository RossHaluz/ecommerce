import { describe, expect, it } from "vitest";
import { leadWithLargePhoto } from "./lead-with-large-photo";

const photo = (url: string, width?: number, height?: number) => ({ url, width, height });

describe("leadWithLargePhoto", () => {
  it("moves the first photo of at least 500×500 to the front, keeping the others in order", () => {
    const images = [photo("1", 800, 450), photo("2", 600, 400), photo("3", 1600, 900), photo("4", 900, 1600)];
    expect(leadWithLargePhoto(images).map((image) => image.url)).toEqual(["3", "1", "2", "4"]);
  });

  it("keeps the order when the main photo is already large enough", () => {
    const images = [photo("1", 1600, 900), photo("2", 800, 450)];
    expect(leadWithLargePhoto(images)).toEqual(images);
  });

  it("trusts a photo whose size is not measured yet", () => {
    const images = [photo("1"), photo("2", 1600, 900)];
    expect(leadWithLargePhoto(images)).toEqual(images);
  });

  it("leaves the order alone when every photo is too small", () => {
    const images = [photo("1", 800, 450), photo("2", 400, 300)];
    expect(leadWithLargePhoto(images)).toEqual(images);
  });
});
