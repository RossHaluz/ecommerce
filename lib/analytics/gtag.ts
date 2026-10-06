import { isAutomatedBrowser } from "./is-automated-browser";

export const GA_MEASUREMENT_ID = "G-5DKE9X66KP";

type GtagWindow = { dataLayer?: IArguments[] };

let loaded = false;
const deferred: [string, Record<string, unknown>][] = [];

const SCRIPT_DELAY_MS = 2500;
const SCRIPT_IDLE_TIMEOUT_MS = 3000;

// gtag.js читає з dataLayer саме об'єкти arguments — як у стандартному сніпеті Google.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  ((window as GtagWindow).dataLayer ??= []).push(arguments);
}

/**
 * Підключає GA4 один раз. Викликається на першу дію людини: скрипт важить ~172 КБ
 * і, підключений одразу, забирав процесор у першого фото на телефоні.
 */
export function loadAnalytics() {
  if (loaded || typeof window === "undefined" || isAutomatedBrowser(navigator)) return;
  loaded = true;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
  deferred.splice(0).forEach(([name, params]) => gtag("event", name, params));

  // Черга вже є — події не губляться. Сам скрипт (~172 КБ) — трохи згодом, у простої:
  // перша дія часто і є натисканням на товар, і на повільному інтернеті він ділив канал з переходом.
  const append = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };
  if (typeof window.requestIdleCallback === "function") {
    window.setTimeout(() => window.requestIdleCallback(append, { timeout: SCRIPT_IDLE_TIMEOUT_MS }), SCRIPT_DELAY_MS);
  } else {
    append();
  }
}

/**
 * Подія без дії людини (перегляд товару): чекає першої взаємодії й іде разом із config.
 * trackEvent тут не годиться — він одразу тягне ~172 КБ скрипту і з'їдає швидкодію.
 */
export function trackDeferredEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || isAutomatedBrowser(navigator)) return;
  if (loaded) gtag("event", name, params);
  else deferred.push([name, params]);
}

/** Подія GA4. Стає в чергу й відправиться, щойно скрипт завантажиться — не губиться. */
export function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || isAutomatedBrowser(navigator)) return;
  loadAnalytics();
  gtag("event", name, params);
}
