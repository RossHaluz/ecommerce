import type { OrderLine } from "./order-types";

const KYIV = "Europe/Kyiv";

export const formatOrderDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: KYIV }).format(new Date(iso));

export const formatOrderTime = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone: KYIV }).format(new Date(iso));

/** Who to greet by initials: first letters of the name, or nothing when it is unknown. */
export const initials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

export const lineTotal = ({ price, quantity }: OrderLine) => price * quantity;

/** The first part named, the rest counted: the list row stays one line however big the order is. */
export const linesCaption = (items: OrderLine[]) => ({
  first: items[0]?.title ?? "",
  more: Math.max(items.length - 1, 0),
});
