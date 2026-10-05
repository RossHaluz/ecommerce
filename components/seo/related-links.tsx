import { Link } from "@/i18n/routing";
import { formatModelName } from "@/lib/seo/format-model-name";

export interface RelatedLinksData {
  categories: { name: string; category_name: string }[];
  models: { name: string; modelName: string }[];
}

interface RelatedLinksProps {
  related: RelatedLinksData;
  categorySlug: string;
  modelSlug: string;
  categoriesTitle: string;
  modelsTitle: string;
}

const LinkList = ({ title, links }: { title: string; links: { href: string; label: string }[] }) =>
  links.length ? (
    <section className="flex flex-col gap-3">
      <h2 className="text-[#484848] font-bold text-base">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              prefetch={false}
              className="inline-flex min-h-[32px] items-center rounded-[5px] bg-[#FFFDFD] px-3 text-sm text-[#484848] hover:text-[#c0092a]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  ) : null;

/** Перелінковка «деталь + модель»: Google ходить посиланнями, і кожне веде на сторінку з товарами. */
export const RelatedLinks = ({ related, categorySlug, modelSlug, categoriesTitle, modelsTitle }: RelatedLinksProps) => (
  <div className="flex flex-col gap-6 mt-6">
    <LinkList
      title={categoriesTitle}
      links={related.categories.map((c) => ({
        href: `/categories/${c.category_name}/${modelSlug}`,
        label: c.name.replace(/\s+/g, " ").trim(),
      }))}
    />
    <LinkList
      title={modelsTitle}
      links={related.models.map((m) => ({
        href: `/categories/${categorySlug}/${m.modelName}`,
        label: `Audi ${formatModelName(m.name)}`,
      }))}
    />
  </div>
);
