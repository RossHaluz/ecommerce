import type { Page } from "@playwright/test";
import { test, expect } from "./fixtures";

/**
 * До фіксу слайдер схожих товарів до ініціалізації Swiper мав слайди на всю
 * ширину, а після — 2/3/5 в ряд: блок стискався, футер підстрибував (CLS 0,17
 * на проді). Сам CLS локально не відтворюється — Swiper встигає до першого
 * малювання, — тому перевіряємо причину: розкладка з SSR-HTML (без JS) має
 * збігатися з розкладкою після ініціалізації.
 */
const similarSlideWidth = (page: Page) =>
  page.evaluate(() => {
    const swipers = document.querySelectorAll(".swiper");
    const slide = swipers[swipers.length - 1]?.querySelector(".swiper-slide");
    return slide ? Math.round(slide.getBoundingClientRect().width) : null;
  });

test("слайдер схожих товарів не змінює розкладку після JS", async ({
  browser,
  page,
  catalog,
  baseURL,
}) => {
  const url = `/product/${catalog.productSlug}`;
  const viewport = page.viewportSize()!;

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport, baseURL });
  const ssrPage = await noJs.newPage();
  await ssrPage.goto(url);
  const ssrWidth = await similarSlideWidth(ssrPage);
  await noJs.close();

  await page.goto(url);
  await page.waitForLoadState("networkidle");
  const hydratedWidth = await similarSlideWidth(page);

  expect(ssrWidth).not.toBeNull();
  expect(Math.abs(ssrWidth! - hydratedWidth!)).toBeLessThanOrEqual(2);
});
