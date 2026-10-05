export interface LinkClick {
  href: string;
  target: string;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
}

/** Клік веде на іншу сторінку нашого сайту в цій же вкладці — тоді показуємо індикатор переходу. */
export function isNavigationClick(click: LinkClick, current: URL): boolean {
  if (click.defaultPrevented || click.button !== 0) return false;
  if (click.metaKey || click.ctrlKey || click.shiftKey || click.altKey) return false;
  if (click.target && click.target !== "_self") return false;

  let next: URL;
  try {
    next = new URL(click.href, current);
  } catch {
    return false;
  }
  if (next.origin !== current.origin) return false;
  return next.pathname !== current.pathname || next.search !== current.search;
}
