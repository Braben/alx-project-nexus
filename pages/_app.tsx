import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className=" mx-auto">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}
