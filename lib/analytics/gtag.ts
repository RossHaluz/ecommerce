export const GA_MEASUREMENT_ID = "G-5DKE9X66KP";

type GtagWindow = { dataLayer?: IArguments[] };

let loaded = false;

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
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Подія GA4. Стає в чергу й відправиться, щойно скрипт завантажиться — не губиться. */
export function trackEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  loadAnalytics();
  gtag("event", name, params);
}
