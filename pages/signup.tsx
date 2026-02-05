import SignupForm from "@/components/common/SignupForm";
import TestimonialPanel from "@/components/common/TestimonialPanel";
import Head from "next/head";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up | PulsePoll</title>
      </Head>

      <main className=" w-full mx-auto grid lg:grid-cols-2">
        {/* Left visual panel */}
        <TestimonialPanel />

        {/* Right form panel */}
        <SignupForm />
      </main>
    </>
  );
}
