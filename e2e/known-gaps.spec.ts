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

  test("посилання футера ведуть на порожні сторінки — крок 8.5", async ({
    request,
  }) => {
    // /about-us і /delivary-payment є в футері КОЖНОЇ сторінки, але таких
    // маршрутів немає. Вони падають у динамічний /[modelName] і віддають
    // порожній каркас із кодом 200.
    for (const path of ["/about-us", "/delivary-payment"]) {
      const html = await (await request.get(path)).text();
      const text = html
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      expect(
        text.length,
        `${path}: сторінка наповнилась вмістом — або її створили, або прибрали посилання`
      ).toBeLessThan(700);
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

  test("канонікала немає ні на одній сторінці — крок 8.1", async ({
    request,
    catalog,
  }) => {
    for (const path of ["/", `/categories/${catalog.categorySlug}`]) {
      const html = await (await request.get(path)).text();
      expect(html).not.toContain('rel="canonical"');
    }
  });

  test("JSON-LD мікророзмітки немає — крок 8.6", async ({
    request,
    catalog,
  }) => {
    const html = await (await request.get(`/product/${catalog.productSlug}`)).text();

    expect(html).not.toContain("application/ld+json");
  });
});
