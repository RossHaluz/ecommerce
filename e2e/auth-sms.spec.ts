import { test, expect, type Page } from "@playwright/test";
import { reply } from "./fake-api";

/**
 * The API is answered inside the browser, so no request reaches the backend and no SMS is ever sent.
 * The backend's own rules (limits, attempts, hashing) are covered by its tests.
 */

/** Answers the two auth endpoints from queues; returns the codes the page submitted. */
async function fakeAuthApi(page: Page, sendReplies: [number, unknown][], verifyReplies: [number, unknown][]) {
  const submitted: string[] = [];
  await page.route("**/api/auth/send-otp", (route) => reply(route, ...(sendReplies.shift() ?? [200, { data: { resendAfterSec: 60, expiresInSec: 300 } }])));
  await page.route("**/api/auth/verify-otp", (route) => {
    if (route.request().method() === "POST") submitted.push(route.request().postDataJSON().code);
    return reply(route, ...(verifyReplies.shift() ?? [500, {}]));
  });
  return submitted;
}

const SENT: [number, unknown] = [200, { data: { resendAfterSec: 60, expiresInSec: 300 } }];
const SIGNED_IN_NEW: [number, unknown] = [200, { data: { token: "e2e-token", isNew: true, role: "user", type: "user" } }];

async function openFromHeader(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Увійти" }).first().click();
  await expect(page.getByRole("heading", { name: "Вхід або реєстрація" })).toBeVisible();
}

// As a person does it: tap the field, see «+380», then type — keys sent before the mask is up get lost.
async function typePhone(page: Page, digits: string) {
  const field = page.getByLabel("Номер телефону");
  await field.click();
  await expect(field).toHaveValue(/^\+380/);
  await field.pressSequentially(digits);
}

test.describe("вхід через SMS", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "шапка з «Увійти» — на комп'ютері; телефон — окремий тест"));

  test("неповний номер не відправляє код", async ({ page }) => {
    let requests = 0;
    await page.route("**/api/auth/send-otp", (route) => {
      requests += 1;
      return reply(route, ...SENT);
    });
    await openFromHeader(page);
    await typePhone(page, "67383");
    await page.getByRole("button", { name: "Отримати код" }).click();

    await expect(page.getByText("Введіть номер повністю")).toBeVisible();
    expect(requests).toBe(0);
  });

  test("невірний код, потім правильний, ім'я «Пізніше» — людина в системі", async ({ page, context }) => {
    const submitted = await fakeAuthApi(page, [SENT], [[400, { reason: "wrong", attemptsLeft: 4 }], SIGNED_IN_NEW]);
    await openFromHeader(page);
    await typePhone(page, "673834283");
    await page.getByRole("button", { name: "Отримати код" }).click();

    await expect(page.getByText("Надіслали SMS на +380 67 ••• •• 83")).toBeVisible();
    await expect(page.getByText(/Надіслати ще раз можна через \d+ с/)).toBeVisible();

    const code = page.getByLabel("Код із SMS");
    await code.pressSequentially("111111");
    await expect(page.getByText("Невірний код. Залишилось спроб: 4")).toBeVisible();
    await expect(code).toHaveValue("");

    await code.pressSequentially("042917");
    await expect(page.getByRole("heading", { name: "Як до вас звертатися?" })).toBeVisible();
    expect(submitted).toEqual(["111111", "042917"]);

    await page.getByRole("button", { name: "Пізніше" }).click();
    await expect(page.getByText("Ви увійшли")).toBeVisible();
    const token = (await context.cookies()).find((c) => c.name === "token");
    expect(token?.value).toBe("e2e-token");
    // 30 днів, а не 7, як раніше: сесія не змушує вводити код щотижня.
    expect(token!.expires * 1000 - Date.now()).toBeGreaterThan(29 * 24 * 3600 * 1000);
  });

  test("код уже надіслано — одразу поле коду з таймером, а не помилка", async ({ page }) => {
    await fakeAuthApi(page, [[429, { reason: "too_soon", retryAfterSec: 42 }]], []);
    await openFromHeader(page);
    await typePhone(page, "673834283");
    await page.getByRole("button", { name: "Отримати код" }).click();

    await expect(page.getByRole("heading", { name: "Введіть код" })).toBeVisible();
    await expect(page.getByText(/Надіслати ще раз можна через (4[0-2]|3\d) с/)).toBeVisible();
  });

  test("після п'яти спроб головною стає кнопка нового коду", async ({ page }) => {
    await fakeAuthApi(page, [[200, { data: { resendAfterSec: 0, expiresInSec: 300 } }]], [[429, { reason: "locked" }]]);
    await openFromHeader(page);
    await typePhone(page, "673834283");
    await page.getByRole("button", { name: "Отримати код" }).click();
    await page.getByLabel("Код із SMS").pressSequentially("111111");

    await expect(page.getByText("Забагато спроб — надішліть новий код")).toBeVisible();
    await expect(page.getByRole("button", { name: "Надіслати код ще раз" })).toBeVisible();
    await expect(page.getByLabel("Код із SMS")).toBeDisabled();
  });

  test("немає зв'язку — зрозумілий текст замість «Something went wrong»", async ({ page }) => {
    await page.route("**/api/auth/send-otp", (route) => route.abort("internetdisconnected"));
    await openFromHeader(page);
    await typePhone(page, "673834283");
    await page.getByRole("button", { name: "Отримати код" }).click();

    await expect(page.getByText("Немає зв'язку. Перевірте інтернет і спробуйте ще раз")).toBeVisible();
  });
});

test("вхід з меню на телефоні", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "меню з панеллю входу — лише на телефоні");
  await fakeAuthApi(page, [SENT], [[200, { data: { token: "e2e-token", isNew: false, role: "user", type: "user" } }]]);
  await page.goto("/");
  await page.getByRole("button", { name: "Меню" }).click();
  await page.getByRole("button", { name: /Увійти/ }).click();
  await typePhone(page, "673834283");
  await page.getByRole("button", { name: "Отримати код" }).click();
  await page.getByLabel("Код із SMS").pressSequentially("042917");

  await expect(page.getByText("Ви увійшли")).toBeVisible();
});
