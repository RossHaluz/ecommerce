import type { Category, Model } from "@/lib/types";
import { modelShortcuts, sectionShortcuts } from "@/lib/seo/catalog-shortcuts";
import { LinkChips } from "./link-chips";

interface CatalogShortcutsProps {
  models: Model[];
  categories: Category[];
  modelsTitle: string;
  sectionsTitle: string;
}

/** Прямі посилання з головної на моделі й підрозділи — головні сторінки сайту, які Google інакше вважає другорядними. */
export const CatalogShortcuts = ({ models, categories, modelsTitle, sectionsTitle }: CatalogShortcutsProps) => (
  <div className="mt-6 flex flex-col gap-6">
    <LinkChips title={modelsTitle} links={modelShortcuts(models)} />
    <LinkChips title={sectionsTitle} links={sectionShortcuts(categories)} />
  </div>
);
