import Head from "next/head";

import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Features from "@/components/about/Features";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | PulsePoll</title>
      </Head>

      <main>
        <AboutHero />
        <Mission />
        <Features />
        <CTA />
      </main>
    </>
  );
}
