import type { Page } from "@playwright/test";
import { test, expect } from "./fixtures";

/**
 * Регресія до "Application error" після товар → назад: Swiper отримував власний
 * (згодом знищений) екземпляр як thumbs, а розбіжності гідратації змушували
 * React перемальовувати корінь. Ловимо обидва класи, а не конкретний рядок коду.
 */
const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
};

const roundTrips = async (page: Page, categorySlug: string, productSlug: string) => {
  // Пряме відкриття товару — саме тут ініціалізувався зламаний thumbs-слайдер.
  await page.goto(`/product/${productSlug}`);
  await page.waitForLoadState("networkidle");
  await page.goto(`/categories/${categorySlug}`);
  for (let i = 0; i < 2; i++) {
    await page.locator('a[href*="/product/"]').nth(i).click();
    await expect(page).toHaveURL(/\/product\//);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/categories/${categorySlug}`));
  }
  await expect(page.getByText("Application error")).toHaveCount(0);
};

test.describe("навігація товар → назад", () => {
  test("новий відвідувач: без помилок сторінки", async ({ page, catalog }) => {
    const errors = collectErrors(page);
    await roundTrips(page, catalog.categorySlug, catalog.productSlug);
    expect(errors).toEqual([]);
  });

  test("повторний відвідувач (UAH, список, товар у кошику): без розбіжностей гідратації", async ({
    page,
    catalog,
  }) => {
    await page.goto(`/product/${catalog.productSlug}`);
    await page.getByRole("button", { name: "Купити" }).first().click();
    await page.keyboard.press("Escape");
    await page.evaluate(() =>
      localStorage.setItem(
        "persist:currentCustomizer",
        JSON.stringify({ currentCustomizer: '"list"', currency: '"UAH"', _persist: '{"version":-1,"rehydrated":true}' })
      )
    );

    const errors = collectErrors(page);
    await roundTrips(page, catalog.categorySlug, catalog.productSlug);
    expect(errors).toEqual([]);
  });
});
