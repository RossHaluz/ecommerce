/**
 * Адреса картки товару. `from` — сторінка списку, з якої прийшли: з неї
 * будуються хлібні крихти. Пошук не передаємо — його крихти будуються інакше.
 */
export function productHref(productName: string, currentPath: string): string {
  const cameFromList = currentPath !== "/" && !currentPath.includes("search");
  return `/product/${productName}${cameFromList ? `?from=${encodeURIComponent(currentPath)}` : ""}`;
}
