import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

import Footer from "@/components/layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className=" mx-auto">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </Provider>
  );
}
