import { test, expect } from "./fixtures";

const searchInput = (page: import("@playwright/test").Page) =>
  page.locator("input[placeholder]").first();

test.describe("пошук", () => {
  test("сторінка пошуку віддає результати за назвою", async ({
    page,
    catalog,
  }) => {
    const word = catalog.productTitle.trim().split(/\s+/)[0];

    await page.goto(`/search?searchValue=${encodeURIComponent(word)}`);

    await expect(page.locator('a[href^="/product/"]').first()).toBeVisible();
  });

  test("пошук по каталожному номеру знаходить товар", async ({
    page,
    catalog,
    request,
  }) => {
    const api = process.env.E2E_API_URL ?? "http://localhost:3005";
    const storeId =
      process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";
    const products = await (
      await request.get(`${api}/api/product/${storeId}`)
    ).json();
    const withNumber = products?.data?.products?.find(
      (p: any) => p?.catalog_number?.trim()
    );
    test.skip(!withNumber, "у вибірці немає товару з каталожним номером");

    await page.goto(
      `/search?searchValue=${encodeURIComponent(withNumber.catalog_number)}`
    );

    await expect(page.locator('a[href^="/product/"]').first()).toBeVisible();
  });

  test("під час набору підказує товари з посиланнями на них", async ({ page, catalog }) => {
    await page.goto("/");

    const input = searchInput(page);
    await input.click();
    await input.fill(catalog.productTitle.trim().split(/\s+/)[0]);

    await expect(page.getByRole("option").first()).toBeVisible();
    await expect(page.getByRole("option").first().locator('a[href*="/product/"]')).toBeVisible();
  });

  test("Enter веде на сторінку результатів із запитом", async ({ page, catalog }) => {
    await page.goto("/");
    const word = catalog.productTitle.trim().split(/\s+/)[0];

    const input = searchInput(page);
    await input.click();
    await input.fill(word);
    await input.press("Enter");

    await expect(page).toHaveURL(/\/search\?searchValue=/);
    await expect(page.locator('a[href*="/product/"]').first()).toBeVisible();
  });
});
