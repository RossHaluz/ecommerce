"use client";
import { FC, ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface ProviderWrapperProps {
  children: ReactNode;
}

/**
 * Без `PersistGate` свідомо.
 *
 * `PersistGate` рендерить `loading` (у нас було `null`), поки не завершиться
 * рехідрація з localStorage. На сервері localStorage немає, тому рехідрація не
 * настає ніколи — і весь застосунок під ним віддавав порожній HTML. Оскільки
 * цей провайдер обгортає root layout, сайт цілком втрачав SSR: у `<body>`
 * приїжджали лише скрипти.
 *
 * redux-persist працює і без гейта — стан просто під'їжджає асинхронно. Ціна:
 * перший кадр показує дефолтний стан (порожній кошик) замість збереженого.
 * Це прийнятно; порожній HTML для Google — ні.
 */
const ProviderWrapper: FC<ProviderWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
