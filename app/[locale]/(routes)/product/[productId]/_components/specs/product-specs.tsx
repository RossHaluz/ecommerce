import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { orderedCategories } from "@/entities/product/model/product-breadcrumbs";
import { formatCategoryName } from "@/lib/seo/format-category-name";
import { formatModelName } from "@/lib/seo/format-model-name";
import type { Product } from "@/lib/types";

type Row = { label: string; value: ReactNode };

const LINK = "font-bold text-[#C0092A] underline";

/** Факти про деталь таблицею. Лише те, що є в базі, — порожні рядки не малюємо. */
export const ProductSpecs = ({ product }: { product: Product }) => {
  const t = useTranslations("product");
  const leaf = orderedCategories(product.categories).at(-1);
  const model = product.models?.length === 1 ? product.models[0].model : null;

  const rows: Row[] = [];
  if (product.catalog_number) rows.push({ label: t("catalogNumber"), value: <b>{product.catalog_number}</b> });
  if (product.article) rows.push({ label: t("article"), value: <b>{product.article}</b> });
  if (leaf) {
    rows.push({
      label: t("category"),
      value: (
        <Link href={`/categories/${leaf.category_name}`} prefetch={false} className={LINK}>
          {formatCategoryName(leaf.name)}
        </Link>
      ),
    });
  }
  if (model) {
    rows.push({
      label: t("model"),
      value: (
        <Link href={`/${model.modelName}`} prefetch={false} className={LINK}>
          Audi {formatModelName(model.name)}
        </Link>
      ),
    });
  }
  if (rows.length === 0) return null;

  return (
    <section className="rounded-xl bg-[#FFFDFD] p-4 lg:p-6">
      <h2 className="m-0 mb-2 text-lg lg:text-xl font-extrabold text-[#2E2E2E]">{t("specsTitle")}</h2>
      <dl className="m-0 grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] text-sm lg:text-[15px]">
        {rows.map(({ label, value }) => (
          <div key={label} className="contents">
            <dt className="py-2.5 border-b border-[#EEEEEE] text-[#6B6B6B]">{label}</dt>
            <dd className="m-0 py-2.5 border-b border-[#EEEEEE] break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
