import { formatModelName } from "./format-model-name";

// Марки в базі немає — лише назва від менеджера. Впізнаємо саме Audi (A4, Q7, S6, RS, e-tron, TT, R8, частину набрано
// кирилицею: «А6 С5»), щоб нова чужа модель («Kia») не отримала «Audi» сама собою.
const AUDI_MODEL = /^(?:audi\s+)?(?:[aаqк]\s?\d|s\d|sq\d|rs\s?[\dqе]|tt|r8|e[\s-]?tron|е[\s-]?трон|allroad)/i;

export const isAudiModel = (raw: string) => AUDI_MODEL.test(raw.trim());

/** Назва моделі для людей і Google: «Audi Q8 (2018–2023)», а чужа марка — без «Audi»: «TOUAREG (2018+)». */
export const brandedModelName = (raw: string) => (isAudiModel(raw) ? `Audi ${formatModelName(raw)}` : formatModelName(raw));
