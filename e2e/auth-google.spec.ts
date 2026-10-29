import { test, expect } from "@playwright/test";
import { reply } from "./fake-api";

/** Google and the API are answered inside the browser; the backend's side is covered by its own tests. */
test.describe("вхід через Google", () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop", "логіка однакова; телефон перевіряє вхід через SMS"));

  test("кнопка веде на Google і запам'ятовує, з якої сторінки прийшли", async ({ page }) => {
    let startedAt = "";
    await page.route("**/auth/google?**", (route) => {
      startedAt = route.request().url();
      return route.fulfill({ status: 200, body: "google" });
    });
    await page.goto("/favorites");
    await page.getByRole("button", { name: "Увійти" }).last().click();
    await page.getByRole("link", { name: "Продовжити з Google" }).click();

    await expect.poll(() => startedAt).toContain("/auth/google?next=%2Ffavorites");
  });

  test("повернення з Google: сесія на 30 днів, код зник з адреси, людина там, звідки прийшла", async ({ page, context }) => {
    await page.route("**/api/auth/google/exchange", (route) =>
      reply(route, 200, { data: { token: "e2e-google-token", isNew: false, needsPhone: false, name: "Іван" } })
    );
    await page.goto("/auth/callback?next=%2Fcheckout#h=handoff-from-api");

    await expect(page).toHaveURL(/\/checkout$/);
    const token = (await context.cookies()).find((c) => c.name === "token");
    expect(token?.value).toBe("e2e-google-token");
    expect(token!.expires * 1000 - Date.now()).toBeGreaterThan(29 * 24 * 3600 * 1000);
  });

  test("e-mail уже чужий: пояснення і вхід за номером, без марного «ще раз»", async ({ page }) => {
    await page.goto("/auth/callback?error=email_taken");

    await expect(page.getByText("Цей e-mail уже зареєстровано. Увійдіть за номером телефону.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Спробувати ще раз" })).toHaveCount(0);
    await page.getByRole("button", { name: "Увійти за номером телефону" }).click();
    await expect(page.getByRole("heading", { name: "Вхід або реєстрація" })).toBeVisible();
  });

  test("без телефону — «Останній крок», код, і людина там, звідки прийшла, вже в об'єднаному кабінеті", async ({ page, context }) => {
    await page.route("**/api/auth/google/exchange", (route) =>
      reply(route, 200, { data: { token: "google-only", isNew: false, needsPhone: true, name: "Олег Ковальчук" } })
    );
    await page.route("**/api/auth/send-otp", (route) => reply(route, 200, { data: { resendAfterSec: 60, expiresInSec: 300 } }));
    let attachedWith = "";
    await page.route("**/api/auth/phone/attach", (route) => {
      if (route.request().method() === "POST") attachedWith = route.request().headers()["authorization"] ?? "";
      return reply(route, 200, { data: { token: "merged-account", isNew: false, merged: true } });
    });
    await page.goto("/auth/callback?next=%2Fcheckout#h=handoff");

    await expect(page.getByText("✓ Вхід через Google · Олег Ковальчук")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Останній крок — ваш телефон" })).toBeVisible();
    await expect(page.getByText("Цей номер уже має кабінет?")).toBeVisible();
    const phone = page.getByLabel("Номер телефону");
    await phone.click();
    await phone.pressSequentially("501234511");
    await page.getByRole("button", { name: "Отримати код у SMS" }).click();
    await page.getByLabel("Код підтвердження").pressSequentially("042917");

    await expect(page).toHaveURL(/\/checkout$/);
    expect(attachedWith).toBe("Bearer google-only");
    expect((await context.cookies()).find((c) => c.name === "token")?.value).toBe("merged-account");
  });

  test("номер уже з іншим Google — пояснення, а не тиша", async ({ page }) => {
    await page.route("**/api/auth/google/exchange", (route) =>
      reply(route, 200, { data: { token: "google-only", isNew: false, needsPhone: true, name: "" } })
    );
    await page.route("**/api/auth/send-otp", (route) => reply(route, 200, { data: { resendAfterSec: 60, expiresInSec: 300 } }));
    await page.route("**/api/auth/phone/attach", (route) => reply(route, 409, { reason: "phone_taken" }));
    await page.goto("/auth/callback?next=%2Fcheckout#h=handoff");

    await expect(page.getByText("✓ Вхід через Google", { exact: true })).toBeVisible();
    const phone = page.getByLabel("Номер телефону");
    await phone.click();
    await phone.pressSequentially("501234511");
    await page.getByRole("button", { name: "Отримати код у SMS" }).click();
    await page.getByLabel("Код підтвердження").pressSequentially("042917");

    await expect(page.getByText("Цей номер уже прив'язаний до іншого кабінету.")).toBeVisible();
  });

  test("застарілий код обміну — «Вхід застарів» і можна спробувати ще раз", async ({ page }) => {
    await page.route("**/api/auth/google/exchange", (route) => reply(route, 400, { reason: "expired" }));
    await page.goto("/auth/callback?next=%2Fcheckout#h=old");

    await expect(page.getByText("Вхід застарів. Спробуйте ще раз.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Спробувати ще раз" })).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/callback$/);
  });
});
