const PHONE_LINK = 'a[href^="tel:"]';

type MaybeElement = { closest?: (selector: string) => unknown } | null;

/** Клік усередині посилання `tel:` будь-де на сторінці — це дзвінок із сайту. */
export const isPhoneClick = (target: unknown) => Boolean((target as MaybeElement)?.closest?.(PHONE_LINK));
