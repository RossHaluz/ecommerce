"use client";

import { useCallback, useEffect, useState } from "react";
import { addRecentQuery, parseRecentQueries, removeRecentQuery } from "../model/recent-queries";

// Той самий ключ, що й у старому полі пошуку: історія покупців не губиться після оновлення.
const STORAGE_KEY = "searchQueries";

const readStored = () => {
  try {
    return parseRecentQueries(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

const store = (queries: string[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(queries));
  } catch {
    // Приватний режим чи заблоковане сховище: історія просто не збережеться.
  }
};

/** Нещодавні запити цього браузера. */
export const useRecentQueries = () => {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => setRecent(readStored()), []);

  const update = useCallback((change: (current: string[]) => string[]) => {
    setRecent((current) => {
      const next = change(current);
      store(next);
      return next;
    });
  }, []);

  return {
    recent,
    remember: (query: string) => update((current) => addRecentQuery(current, query)),
    forget: (query: string) => update((current) => removeRecentQuery(current, query)),
    clear: () => update(() => []),
  };
};
