import { test, expect } from "./fixtures";

/**
 * Сторінки каталогу мусять віддаватися з кешу: рендер на кожен запит давав
 * TTFB ~0,5 с і FCP 2,5 с на телефоні. Ламається тихо — достатньо сторінці
 * прочитати searchParams чи викликати getTranslations без setRequestLocale.
 */
test.describe("кеш сторінок каталогу", () => {
  // Dev-сервер Next не кешує нічого — перевірка має сенс лише для прод-збірки.
  test.skip(!process.env.E2E_BASE_URL, "лише проти прод-збірки (E2E_BASE_URL)");

  test("головна, категорія й «категорія + модель» не рендеряться на кожен запит", async ({
    request,
    catalog,
  }) => {
    for (const path of [
      "/",
      `/categories/${catalog.categorySlug}`,
      `/categories/${catalog.categorySlug}/${catalog.modelSlug}`,
    ]) {
      await request.get(path);
      const response = await request.get(path);

      expect(response.headers()["cache-control"], path).not.toContain("no-store");
    }
  });
});

test.describe("список товарів слідує за адресою", () => {
  test("?page=2 показує другу сторінку, хоча сервер рендерить першу", async ({ page }) => {
    const firstProduct = async () =>
      page.locator('main ul a[href*="/product/"]').first().getAttribute("href");

    await page.goto("/");
    const onFirstPage = await firstProduct();

    await page.goto("/?page=2");
    await expect(page.locator('button[aria-current="page"]')).toHaveText("2");
    expect(await firstProduct()).not.toBe(onFirstPage);
  });
});
