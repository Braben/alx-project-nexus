import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/superbase-client";
import { ToastProvider } from "@/components/common/ToastProvider";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleRoute = (url: string) => {
      if (
        url.startsWith("/login") ||
        url.startsWith("/signup") ||
        url.startsWith("/auth/callback")
      ) {
        return;
      }
      localStorage.setItem("pp-last-page", url);
    };

    handleRoute(router.asPath);
    router.events.on("routeChangeComplete", handleRoute);
    return () => {
      router.events.off("routeChangeComplete", handleRoute);
    };
  }, [router.asPath, router.events]);

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
