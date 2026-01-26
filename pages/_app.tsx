import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
