import { test, expect } from "./fixtures";

const API = process.env.E2E_API_URL ?? "http://localhost:3005";
const STORE_ID = process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";

// Договірна ціна (0): «Купити» без ціни не натискають — замість нього «Дізнатися ціну».
test("товар без ціни пропонує дізнатися ціну замість «Купити»", async ({ page, request }) => {
  // Договірні (0) у списку «від дорожчих» ідуть останніми, тож беремо весь каталог.
  const data = await (await request.get(`${API}/api/product/${STORE_ID}?pageSize=10000`)).json();
  const negotiable = data?.data?.products?.find((p: any) => !Number(p.price) && p.product_name);
  test.skip(!negotiable, "у вибірці немає товару з договірною ціною");

  await page.goto(`/product/${negotiable.product_name}`);
  const main = page.locator("main, body").first();

  await expect(main.getByRole("button", { name: /^Дізнатися ціну:/ }).first()).toBeVisible();
  await expect(page.locator("#one-click-phone-inline")).toHaveCount(0);

  await main.getByRole("button", { name: /^Дізнатися ціну:/ }).first().click();
  const sheet = page.getByRole("dialog");
  await expect(sheet.getByText("Ваш телефон")).toBeVisible();
  await expect(sheet.getByRole("link", { name: "Viber" })).toHaveAttribute("href", /draft=/);
});
