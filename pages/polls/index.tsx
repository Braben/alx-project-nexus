import React from "react";
import Head from "next/head";

import PollHeader from "@/components/polls/PollHeader";
import PollList from "@/components/polls/PollList";

export default function PollsPage() {
  return (
    <>
      <Head>
        <title>My Polls | PulsePolls</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <PollHeader />
        <PollList />
      </main>
    </>
  );
}
