"use client";

import { useEffect, useState } from "react";

const DEBOUNCE_MS = 250;

/** Підказки під полем: запит після паузи в наборі; застарілу відповідь скасовуємо, щоб не перезаписала свіжу. */
export function useSuggestions<T>(search: (signal: AbortSignal) => Promise<T[]>, key: string, enabled: boolean) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const result = await search(controller.signal);
      if (!controller.signal.aborted) {
        setItems(result);
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
    // search — нова функція на кожен рендер; запит визначає key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  return { items, loading };
}
