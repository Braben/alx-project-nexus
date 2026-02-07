import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/superbase-client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finalizeAuth = async () => {
      await supabase.auth.getSession();
      const welcome = router.query.welcome === "1";
      const lastPage =
        typeof window !== "undefined"
          ? localStorage.getItem("pp-last-page")
          : null;
      const fallback = welcome ? "/dashboard?welcome=1" : "/dashboard";
      const target = welcome ? fallback : lastPage || fallback;
      await router.replace(target);
    };

    if (router.isReady) {
      finalizeAuth();
    }
  }, [router.isReady, router.query.welcome, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Signing you in...</p>
    </main>
  );
}
