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
  test("неіснуючий слаг товару віддає 200 замість 404 — крок 8.5", async ({
    request,
  }) => {
    const response = await request.get("/product/takogo-tovaru-ne-isnuye-12345");

    expect(
      response.status(),
      "Якщо тут 404 — крок 8.5 зроблено. Онови очікування на 404."
    ).toBe(200);
  });

  test("неіснуюча категорія віддає 200 замість 404 — крок 8.5", async ({
    request,
  }) => {
    const response = await request.get("/categories/vygadana-kategoriya-12345");

    expect(response.status()).toBe(200);
  });

  test("посилання футера ведуть в нікуди з кодом 200 — крок 8.5", async ({
    request,
  }) => {
    // /about-us і /delivary-payment є в футері КОЖНОЇ сторінки, але таких
    // маршрутів немає: вони падають у динамічний /[modelName].
    //
    // Перевіряємо саме статус, а не обсяг тексту. Довжина була слабким проксі:
    // доки `model.name` кидав виняток на неіснуючій моделі, сторінка вмирала в
    // error-boundary і виходила куцою. Після null-guard у шарі даних вона
    // рендериться повністю — з fallback-заголовком, тобто стала гіршою для
    // Google, а не кращою. Справжній дефект тут один: код 200 замість 404.
    for (const path of ["/about-us", "/delivary-payment"]) {
      const response = await request.get(path);
      expect(
        response.status(),
        `${path}: якщо тут 404 — крок 8.5 зроблено, онови очікування`
      ).toBe(200);
    }
  });

  test("у розмітці два <h1> замість одного — крок 8.8", async ({
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

    expect(
      (markup.match(/<h1/g) ?? []).length,
      "Якщо тут 1 — крок 8.8 зроблено. Онови очікування."
    ).toBe(2);
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

  test("на сторінці категорії канонікала ще немає — крок 8.1", async ({
    request,
    catalog,
  }) => {
    // Root layout дає canonical на себе, але сторінки поки не перекривають його
    // власним шляхом, тому категорія успадковує канонікал головної. Це гірше за
    // відсутність: Google бачить, що категорія «каноністься» на / .
    const html = await (
      await request.get(`/categories/${catalog.categorySlug}`)
    ).text();
    const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? "";

    expect(
      canonical.includes(catalog.categorySlug),
      "Якщо тут true — сторінки почали задавати власний канонікал, крок 8.1 закрито"
    ).toBe(false);
  });

  test("JSON-LD мікророзмітки немає — крок 8.6", async ({
    request,
    catalog,
  }) => {
    const html = await (await request.get(`/product/${catalog.productSlug}`)).text();

    expect(html).not.toContain("application/ld+json");
  });
});
