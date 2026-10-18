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

  test("OE-номер, набраний з пробілами, показує точний збіг першим", async ({ page, request }) => {
    const api = process.env.E2E_API_URL ?? "http://localhost:3005";
    const storeId = process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";
    const products = await (await request.get(`${api}/api/product/${storeId}?pageSize=200`)).json();
    const withNumber = products?.data?.products?.find((p: any) => /^[A-Z0-9]{9,}$/i.test(p?.catalog_number?.trim() ?? ""));
    test.skip(!withNumber, "у вибірці немає товару з простим OE-номером");

    const number: string = withNumber.catalog_number.trim();
    const spaced = `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
    await page.goto(`/search?searchValue=${encodeURIComponent(spaced)}`);

    await expect(page.getByRole("heading", { name: "Точний збіг за OE-номером" })).toBeVisible();
  });

  test("OE-номер знаходиться, навіть коли в «Моя Audi» обрана інша модель", async ({ page, request }) => {
    const api = process.env.E2E_API_URL ?? "http://localhost:3005";
    const storeId = process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";
    const products = await (await request.get(`${api}/api/product/${storeId}?pageSize=200`)).json();
    const part = products?.data?.products?.find((p: any) => /^[A-Z0-9]{9,}$/i.test(p?.catalog_number?.trim() ?? "") && p.models?.length);
    const models = await (await request.get(`${api}/api/model/${storeId}`)).json();
    const fitting = new Set(part?.models?.map((m: any) => m.model?.modelName));
    const other = (models?.data ?? models)?.find((m: any) => !fitting.has(m.modelName));
    test.skip(!part || !other, "немає товару з OE і моделлю, якій він не підходить");

    // Саме так redux-persist зберігає «Моя Audi»: до цього фіксу фільтр моделі ховав деталь, що їй не підходить.
    await page.addInitScript((car) => {
      window.localStorage.setItem("persist:myCar", JSON.stringify({ car: JSON.stringify(car), _persist: JSON.stringify({ version: -1, rehydrated: true }) }));
    }, { modelName: other.modelName, name: other.name });

    await page.goto("/");
    const input = searchInput(page);
    await input.click();
    await input.fill(part.catalog_number.trim());

    await expect(page.getByRole("option").first()).toBeVisible();
    await input.press("Enter");
    await expect(page).toHaveURL(/\/search\?searchValue=/);
    await expect(page.getByRole("heading", { name: "Точний збіг за OE-номером" })).toBeVisible();
  });

  test("нічого не знайшли — показує заявку «Знайти для мене» із запитом у полі", async ({ page }) => {
    const query = "zzqx немає такої деталі";
    await page.goto(`/search?searchValue=${encodeURIComponent(query)}`);

    await expect(page.getByRole("button", { name: "Знайти для мене" })).toBeVisible();
    await expect(page.getByLabel("Що шукаєте")).toHaveValue(query);
  });

  test("чип «Уточніть» дописує ознаку до запиту й звужує список", async ({ page }) => {
    await page.goto(`/search?searchValue=${encodeURIComponent("фара q8")}`);
    const refine = page.getByRole("navigation", { name: "Уточніть:" });
    const chip = refine.getByRole("link").first();
    test.skip(!(await chip.count()), "для цього запиту немає уточнень у локальній базі");

    const count = Number((await chip.locator("span").textContent())?.trim());
    await chip.click();

    await expect(page).toHaveURL(/searchValue=%D1%84%D0%B0%D1%80%D0%B0\+q8\+/);
    await expect(page.getByRole("navigation", { name: "Уточніть:" })).toContainText(String(count));
    await expect(page.getByText("Не впевнені, яка саме підійде на вашу Audi?")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Немає саме того, що потрібно?" })).toBeVisible();
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
