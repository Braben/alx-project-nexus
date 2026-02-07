import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { supabase } from "@/supabase/superbase-client";
import { ToastProvider } from "@/components/common/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sessionOnly = localStorage.getItem("pp-session-only");
    if (!sessionOnly) return;

    const sessionSeen = sessionStorage.getItem("pp-session-only");
    if (!sessionSeen) {
      supabase.auth.signOut();
    }
    sessionStorage.setItem("pp-session-only", "true");
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <main className=" mx-auto">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </ToastProvider>
    </Provider>
  );
}
