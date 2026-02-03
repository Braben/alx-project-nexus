import React from "react";
import Head from "next/head";

import PollList from "@/components/polls/PollList";

export default function PollsPage() {
  return (
    <>
      <Head>
        <title>Polls | PulsePolls</title>
      </Head>

      <main className="min-h-screen bg-gray-50 max-w-6xl mx-auto p-8">
        <PollList />
      </main>
    </>
  );
}
