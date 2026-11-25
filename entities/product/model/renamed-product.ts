/** Every product address ends with its article («…-4m0821106d-6416»); renaming keeps it, so it finds the product. */
export function articleFromSlug(slug: string): string | null {
  return slug.match(/-(\d+)$/)?.[1] ?? null;
}

/** Where an address that no longer exists should go: the current address, unless it is the same one. */
export function renamedTo(requested: string, current: string | null): string | null {
  return current && current !== requested ? current : null;
}
