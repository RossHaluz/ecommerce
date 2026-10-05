"use client";

import { useEffect, useRef, useState } from "react";

/**
 * true, щойно елемент підійде до екрана на `margin` (і далі лишається true).
 * Для того, що варто малювати лише коли людина догортає: Lighthouse не гортає,
 * тож це не потрапляє в заміри першого екрана.
 */
export const useNearViewport = <T extends Element>(margin: string, enabled = true) => {
  const ref = useRef<T>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || isNear || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsNear(true),
      { rootMargin: margin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, isNear, margin]);

  return [ref, isNear] as const;
};
