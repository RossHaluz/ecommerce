"use client";

import { useEffect, useState } from "react";

// Подія load настає після виконання скриптів, тобто вже після гідратації. Тож
// під час гідратації тут false (як на сервері), а при переходах усередині
// сайту (зокрема «назад») — true одразу, і відновлення прокрутки не ламається.
let pageLoaded = typeof document !== "undefined" && document.readyState === "complete";
if (typeof window !== "undefined" && !pageLoaded) {
  window.addEventListener("load", () => (pageLoaded = true), { once: true });
}

/**
 * true, коли сторінка повністю завантажилась і браузер простоює. Для того, що
 * не потрібне на першому екрані: воно не повинно ділити канал і процесор з
 * першим фото на телефоні.
 */
export const useAfterLoad = () => {
  const [ready, setReady] = useState(pageLoaded);

  useEffect(() => {
    if (ready) return;
    let idleId: number | undefined;
    const markReady = () => {
      idleId = window.requestIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
        : window.setTimeout(() => setReady(true), 200);
    };

    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady, { once: true });

    return () => {
      window.removeEventListener("load", markReady);
      if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, [ready]);

  return ready;
};
