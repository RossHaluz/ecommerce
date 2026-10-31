import { test, expect } from "@playwright/test";

/** The signed-in pages are rendered on the server from the real API; here is what a guest gets. */
test.describe("кабінет для гостя", () => {
  for (const path of ["/account", "/account/orders", "/account/orders/1", "/account/profile"]) {
    test(`${path} веде на головну, нічого не показуючи`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/(uk)?$/);
    });
  }
});
