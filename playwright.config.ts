import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

/**
 * Страхувальна сітка перед рефакторингом.
 *
 * Ці тести описують поведінку такою, яка вона є СЬОГОДНІ, включно з дивною
 * (див. unknown-slug.spec.ts). Їхня задача — не описати ідеал, а зловити
 * момент, коли рефакторинг щось тихо змінив.
 *
 * Потрібен запущений бекенд на :3005 і база з реальними товарами.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  expect: { timeout: 15_000 },

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    locale: "uk-UA",
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
});
