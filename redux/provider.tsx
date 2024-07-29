"use client";
import { FC, ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

interface ProviderWrapperProps {
  children: ReactNode;
}

const ProviderWrapper: FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ProviderWrapper;
