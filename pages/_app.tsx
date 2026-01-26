import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/layout/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-7xl mx-auto p-4">
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
