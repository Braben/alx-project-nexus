import { useRouter } from "next/router";
import { useState } from "react";

import PollVote from "@/components/polls/PollVote";
import PollResults from "@/components/polls/PollResults";

export default function PollDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // 🔥 mock poll (later from API/Redux)
  const poll = {
    id,
    question: "What feature should we build next?",
    options: [
      { label: "Dark Mode", votes: 40 },
      { label: "Offline Support", votes: 25 },
      { label: "Mobile App", votes: 60 },
    ],
  };

  const handleVote = () => {
    if (selected === null) return;
    setVoted(true);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold mb-8 text-center">
            {poll.question}
          </h1>

          {!voted ? (
            <PollVote
              options={poll.options}
              selected={selected}
              onSelect={setSelected}
              onVote={handleVote}
            />
          ) : (
            <PollResults options={poll.options} />
          )}
        </div>
      </main>
    </>
  );
}
