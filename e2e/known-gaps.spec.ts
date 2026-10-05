import { test, expect } from "./fixtures";

/**
 * Характеризація ДЕФЕКТІВ, які ми ще не виправили.
 *
 * Ці тести навмисно закріплюють сьогоднішню НЕправильну поведінку. Сенс у
 * двох речах: рефакторинг не має її випадково змінити (це був би неконтрольований
 * побічний ефект), а коли відповідний крок плану її виправить — тест впаде і
 * змусить оновити очікування замість того, щоб фікс проїхав непоміченим.
 *
 * Кожен тест називає крок плану, який його перевертає.
 */
test.describe("відомі дефекти (фіксуємо як є)", () => {
  /**
   * Крок 8.5 закрито. Раніше вигадані адреси віддавали 200 (soft 404), а
   * /about-us і /delivary-payment з футера падали в /[modelName] і показували весь каталог.
   */
  test("вигадані товар, категорія, модель дають 404, футер на них не посилається", async ({
    page,
    request,
  }) => {
    for (const path of [
      "/product/takogo-tovaru-ne-isnuye-12345",
      "/categories/vygadana-kategoriya-12345",
      "/about-us",
      "/delivary-payment",
    ]) {
      expect((await request.get(path)).status(), path).toBe(404);
    }
    await page.goto("/");
    await expect(page.locator('footer a[href="/about-us"], footer a[href="/delivary-payment"]')).toHaveCount(0);
  });

  /** Крок 8.8 закрито: прихована копія H1 у MainSection прибрана. */
  test("у розмітці рівно один <h1>", async ({
    request,
    catalog,
  }) => {
    // Рахуємо в сирому HTML, а не через getByRole: другий <h1> лежить у
    // контейнері, скритому на поточному breakpoint, тому браузер вважає його
    // недоступним і бачить один. Google парсить розмітку й бачить обидва —
    // саме це нас і турбує.
    const html = await (
      await request.get(`/categories/${catalog.categorySlug}`)
    ).text();
    const markup = html.replace(/<script[\s\S]*?<\/script>/g, "");

    expect((markup.match(/<h1/g) ?? []).length).toBe(1);
  });

  /**
   * Уже НЕ дефект — canonical з'явився разом із i18n (крок 8.1 частково).
   * Лишаємо тест як охорону: root layout тепер задає metadataBase, canonical і
   * hreflang, і це не має зникнути при наступних правках метаданих.
   */
  test("canonical і hreflang присутні на обох мовах", async ({ request }) => {
    for (const path of ["/", "/pl"]) {
      const html = await (await request.get(path)).text();

      expect(html, `${path}: немає canonical`).toContain('rel="canonical"');
      expect(html, `${path}: немає hreflang`).toMatch(/hrefLang=|hreflang=/);
      expect(html, `${path}: немає x-default`).toContain("x-default");
    }
  });

  /**
   * Крок 8.1 закрито. До фіксу всі сторінки успадковували canonical головної з
   * layout — Google вважав категорії й товари копіями головної.
   */
  test("кожна сторінка каноніться на саму себе", async ({ request, catalog }) => {
    const cases: [string, string][] = [
      [`/categories/${catalog.categorySlug}`, `/categories/${catalog.categorySlug}`],
      [`/categories/${catalog.categorySlug}/${catalog.modelSlug}`, `/categories/${catalog.categorySlug}/${catalog.modelSlug}`],
      [`/product/${catalog.productSlug}?from=%2Fcategories%2F${catalog.categorySlug}`, `/product/${catalog.productSlug}`],
      [`/pl/categories/${catalog.categorySlug}`, `/pl/categories/${catalog.categorySlug}`],
    ];

    for (const [requested, expected] of cases) {
      const html = await (await request.get(requested)).text();
      const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? "";
      expect(new URL(canonical).pathname, requested).toBe(expected);
    }
  });

  /** Крок 8.6 закрито для товару; категорії й хлібні крихти — ще ні. */
  test("товар має JSON-LD Product", async ({ request, catalog }) => {
    const html = await (await request.get(`/product/${catalog.productSlug}`)).text();
    const raw = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

    expect(raw, "немає JSON-LD").toBeTruthy();
    expect(JSON.parse(raw!)).toMatchObject({ "@type": "Product" });
  });
});
