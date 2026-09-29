"use client";

import { useEffect, useState } from "react";

/**
 * true лише після монтування на клієнті.
 *
 * Потрібен усюди, де рендер торкається DOM (`document`, `window`) — наприклад
 * `createPortal(…, document.body)`. Без цієї перевірки звернення до `document`
 * кидає ReferenceError під час SSR, React обриває генерацію HTML, і сторінка
 * приїжджає порожньою: у `<body>` лишаються тільки скрипти. Один такий компонент
 * у root layout знімає SSR з усього сайту.
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
