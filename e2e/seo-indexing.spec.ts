import { test, expect } from "./fixtures";

const API = process.env.E2E_API_URL ?? "http://localhost:3005";
const STORE_ID = process.env.STORE_ID ?? "25a4ead9-5f7d-4d12-9a93-15ff69478aaa";

const isNoindex = (html: string) =>
  /<meta name="robots" content="[^"]*noindex/.test(html);

test.describe("індексація сторінок «категорія + модель»", () => {
  test("пара з товарами індексується", async ({ request }) => {
    const { data } = await (await request.get(`${API}/api/product/${STORE_ID}`)).json();
    const product = data.products.find(
      (p: any) => p.categories?.length && p.models?.[0]?.model?.modelName
    );
    const { data: categories } = await (
      await request.get(`${API}/api/category/${STORE_ID}`)
    ).json();
    const all = categories.flatMap((c: any) => [c, ...(c.children ?? [])]);
    const category = all.find((c: any) => c.id === product.categories[0].categoryId);

    const html = await (
      await request.get(`/categories/${category.category_name}/${product.models[0].model.modelName}`)
    ).text();

    expect(isNoindex(html)).toBe(false);
  });

  test("порожня пара має noindex", async ({ request }) => {
    const { data: models } = await (await request.get(`${API}/api/model/${STORE_ID}`)).json();
    let emptyPath: string | undefined;

    for (const model of models) {
      if (!model.modelName) continue;
      const body = await (
        await request.get(`${API}/api/category/${STORE_ID}/aksesuary/${model.modelName}`)
      ).json();
      if (body?.data?.products?.length === 0) {
        emptyPath = `/categories/aksesuary/${model.modelName}`;
        break;
      }
    }

    expect(emptyPath, "не знайшлося порожньої пари в «Аксесуарах»").toBeTruthy();
    expect(isNoindex(await (await request.get(emptyPath!)).text())).toBe(true);
  });
});
