import { test, expect } from "./fixtures";

/**
 * Найважливіший тест у наборі.
 *
 * До 2026-09-21 кожна сторінка віддавала HTML без жодного <div>: у <body>
 * приїжджали тільки скрипти, а розмітку будував клієнт. Причини — createPortal
 * у рендері mobile-menu (ReferenceError на сервері) і PersistGate над root
 * layout. Обидві виправлені в коміті fe21341.
 *
 * Тест ходить через request, а не через браузер: браузер виконає JS і покаже
 * контент навіть тоді, коли серверний HTML порожній — тобто сховає саме ту
 * регресію, яку ми ловимо.
 */
test.describe("серверний рендер", () => {
  const pages = ["/", "/contacts"];

  for (const path of pages) {
    test(`${path} віддає непорожній HTML без участі JS`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);

      const html = await response.text();
      const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/g, "");

      expect(withoutScripts).toContain("<div");
      expect(withoutScripts).toContain("<a ");

      const visibleText = withoutScripts
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      expect(visibleText.length).toBeGreaterThan(300);
    });
  }

  test("категорія віддає товари в серверному HTML", async ({
    request,
    catalog,
  }) => {
    const response = await request.get(`/categories/${catalog.categorySlug}`);
    const html = await response.text();

    // Каркас сторінки рендериться на сервері вже зараз.
    expect(html.replace(/<script[\s\S]*?<\/script>/g, "")).toContain("<div");

    // Грід товарів теж: список іде з серверних пропсів через React Query
    // (крок 3.2.7). Раніше його клали в Redux у useEffect — HTML був порожній.
    const hasProductLinks = /href="\/product\//.test(html);
    expect(
      hasProductLinks,
      "Товари зникли з серверного HTML — Google і перший кадр знову бачать порожній список."
    ).toBe(true);
  });

  test("логотип не інлайнить base64 у HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();

    expect(html).not.toContain("data:image/png;base64");
    expect(html).toContain("logo.webp");
    // 4.6 МБ HTML був наслідком інлайну PNG у SVG-обгортці.
    expect(html.length).toBeLessThan(1_500_000);
  });

  test("лого на товарі — справжнє посилання на головну ще до JS", async ({
    request,
    catalog,
  }) => {
    // Кнопка з onClick на повільному телефоні ігнорувала тап до гідратації.
    const html = await (await request.get(`/product/${catalog.productSlug}`)).text();
    // Просто "/": перша сторінка — типова, а ?page=1 робив окремий URL для префетчу.
    expect(html).toMatch(/<a[^>]*aria-label="Логотип Audiparts"[^>]*href="\/"/);
  });
});
