"use client";

import { useSelector } from "react-redux";
import { useMounted } from "@/hooks/use-mounted";
import { initialState, type RootState } from "@/redux/store";

/**
 * Для стану, що відновлюється з localStorage (кошик, валюта, вигляд списку):
 * сервер його не бачить, тож перший рендер мусить брати початковий стан,
 * інакше розмітка розходиться з SSR (React #418) і React перемальовує корінь.
 */
export function useHydratedSelector<T>(selector: (state: RootState) => T): T {
  const value = useSelector(selector);
  return useMounted() ? value : selector(initialState);
}
