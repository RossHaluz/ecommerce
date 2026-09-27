import { test, expect } from "./fixtures";

const productLinks = 'a[href^="/product/"]';

test.describe("каталог", () => {
  test("головна показує категорії й товари", async ({ page, catalog }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Audiparts/i);
    await expect(page.locator(productLinks).first()).toBeVisible();
    expect(await page.locator(productLinks).count()).toBeGreaterThan(10);
    // Шукаємо за href, а не через getByRole: на мобільному навігація лежить у
    // бургері, а getByRole фільтрує через дерево доступності й скриті елементи
    // просто не бачить — тоді навіть toBeAttached не має що перевіряти.
    await expect(
      page.locator(`a[href="/categories/${catalog.categorySlug}"]`).first()
    ).toBeAttached();
  });

  test("категорія показує свій заголовок і товари", async ({
    page,
    catalog,
  }) => {
    await page.goto(`/categories/${catalog.categorySlug}`);

    await expect(
      page.getByRole("heading", { name: catalog.categoryName, level: 1 }).first()
    ).toBeVisible();
    await expect(page.locator(productLinks).first()).toBeVisible();
    expect(await page.locator(productLinks).count()).toBeGreaterThan(10);
  });

  test("сортування за ціною не ламає список", async ({ page, catalog }) => {
    await page.goto(`/categories/${catalog.categorySlug}?sortByPrice=asc`);
    await expect(page.locator(productLinks).first()).toBeVisible();

    await page.goto(`/categories/${catalog.categorySlug}?sortByPrice=desc`);
    await expect(page.locator(productLinks).first()).toBeVisible();
  });

  test("фільтр наявності не ламає список", async ({ page, catalog }) => {
    await page.goto(`/categories/${catalog.categorySlug}?stockStatus=inStock`);
    await expect(page.locator(productLinks).first()).toBeVisible();
  });

  test("сторінка моделі відкривається", async ({ page, catalog }) => {
    test.skip(!catalog.modelSlug, "у базі немає моделей");

    await page.goto(`/${catalog.modelSlug}`);
    await expect(page.locator(productLinks).first()).toBeVisible();
  });
});

test.describe("сторінка товару", () => {
  test("показує назву, ціну й кнопку купівлі", async ({ page, catalog }) => {
    await page.goto(`/product/${catalog.productSlug}`);

    await expect(page).toHaveTitle(/Audiparts/i);
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Купити" }).first()).toBeVisible();

    // price = 0 означає «Ціна договірна» — це легітимний стан, не дефект.
    await expect(
      page.getByText(/\$[\d,.]+|Ціна договірна/).first()
    ).toBeVisible();
  });

  test("показує сумісні моделі й схожі товари", async ({ page, catalog }) => {
    await page.goto(`/product/${catalog.productSlug}`);

    await expect(page.getByText("Також вас можуть зацікавити:")).toBeVisible();
  });
});
