import { test, expect } from "./fixtures";

/**
 * Перевіряємо те, що бачить користувач, а не де саме лежить стан.
 *
 * Кошик — не серверні дані, тому він лишається в Redux + redux-persist і після
 * Фази 3 (TanStack Query забирає лише товари/категорії/моделі/пошук). Але
 * прив'язуватись до ключів localStorage усе одно не варто: такий тест упав би
 * від будь-якої зміни персисту й дав хибну тривогу замість справжньої регресії.
 */
const cartCounter = (page: import("@playwright/test").Page) =>
  page.locator("span").filter({ hasText: /^\d+$/ }).first();

test.describe("кошик", () => {
  test("товар додається — лічильник росте, показується підтвердження", async ({
    page,
    catalog,
  }) => {
    await page.goto(`/product/${catalog.productSlug}`);

    await expect(cartCounter(page)).toHaveText("0");

    await page.getByRole("button", { name: "Купити" }).first().click();

    await expect(page.getByText("Товар доданий до Вашого кошика!")).toBeVisible();
    await expect(cartCounter(page)).toHaveText("1");
  });

  /**
   * Охороняє зняття PersistGate (коміт fe21341): гейт прибрали, щоб відновити
   * SSR, а persistStore() лишили — тому кошик мусить далі виживати
   * перезавантаження. Якщо цей тест упаде, персист зламався разом із гейтом.
   */
  test("кошик виживає перезавантаження", async ({ page, catalog }) => {
    await page.goto(`/product/${catalog.productSlug}`);
    await page.getByRole("button", { name: "Купити" }).first().click();
    await expect(cartCounter(page)).toHaveText("1");

    await page.reload();

    await expect(cartCounter(page)).toHaveText("1");
  });

  test("доданий товар доходить до чекауту", async ({ page, catalog }) => {
    await page.goto(`/product/${catalog.productSlug}`);
    await page.getByRole("button", { name: "Купити" }).first().click();
    await expect(cartCounter(page)).toHaveText("1");

    await page.goto("/checkout");

    await expect(
      page.getByRole("heading", { name: "Оформлення замовлення" })
    ).toBeVisible();
    // На мобільному підсумок замовлення свернутий, тому перевіряємо наявність:
    // питання тесту — чи товар доїхав до чекауту, а не чи він розгорнутий.
    await expect(
      page.getByText(catalog.productTitle.trim(), { exact: false }).first()
    ).toBeAttached();
  });
});
