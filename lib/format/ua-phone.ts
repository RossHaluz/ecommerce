/** Маска поля й правило перевірки — одна пара: змінюєш формат, змінюєш обидва тут. */
export const UA_PHONE_MASK = "+380 999 99 99 99";
export const UA_PHONE_PATTERN = /^\+380 \d{3} \d{2} \d{2} \d{2}$/;

/** Телефон з профілю («380671234567», «+380 67 123 45 67», «0671234567») — у формат маски; невідоме — порожньо. */
export function toMaskedPhone(phone: string | undefined): string {
  const digits = (phone ?? "").replace(/\D/g, "");
  const national = digits.startsWith("380") ? digits.slice(3) : digits.startsWith("0") ? digits.slice(1) : "";
  if (national.length !== 9) return "";
  return `+380 ${national.slice(0, 3)} ${national.slice(3, 5)} ${national.slice(5, 7)} ${national.slice(7)}`;
}
