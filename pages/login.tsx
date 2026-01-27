import Head from "next/head";
import LoginForm from "@/components/common/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Sign In | PulsePoll</title>
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <LoginForm />
      </main>
    </>
  );
}
