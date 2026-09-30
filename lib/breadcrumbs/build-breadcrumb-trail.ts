import latinToCyrillic from "@/utils/transliterate";

export interface Crumb {
  label: string;
  /** null — поточна сторінка, не посилання. */
  href: string | null;
}

interface BuildBreadcrumbTrailOptions {
  path: string;
  locale?: string;
  searchValue?: string | null;
  /** false — останній сегмент теж посилання (шлях "звідки прийшли" на картці товару). */
  lastIsCurrent?: boolean;
}

const STRUCTURAL_SEGMENTS = new Set(["categories", "product", "search"]);

/**
 * Посилання кожного сегмента — це сам шлях до нього, тож `/categories/` і `/pl`
 * зберігаються без списку категорій. Інакше сервер (без категорій) і клієнт
 * (з категоріями) будували різні href — розбіжність гідратації.
 */
export function buildBreadcrumbTrail({
  path,
  locale,
  searchValue,
  lastIsCurrent = true,
}: BuildBreadcrumbTrailOptions): Crumb[] {
  const visible: { segment: string; href: string }[] = [];
  let href = "";

  for (const part of path.split("/").filter(Boolean)) {
    href += `/${part}`;
    if (STRUCTURAL_SEGMENTS.has(part) || part === locale) continue;
    visible.push({ segment: part, href });
  }

  if (visible.length === 0) {
    return lastIsCurrent && searchValue
      ? [{ label: searchValue, href: null }]
      : [];
  }

  return visible.map(({ segment, href }, index) => {
    const isCurrent = lastIsCurrent && index === visible.length - 1;
    const label =
      isCurrent && visible.length === 1 && searchValue
        ? searchValue
        : latinToCyrillic(segment);
    return { label, href: isCurrent ? null : href };
  });
}
