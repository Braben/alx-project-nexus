import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PollVote from "@/components/polls/PollVote";
import PollResults from "@/components/polls/PollResults";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPolls } from "@/store/slices/pollsSlice";

export default function PollDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { items = [], loading } = useAppSelector((state) => state.polls);
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [lastVotedAt, setLastVotedAt] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [voteCounts, setVoteCounts] = useState<number[]>([]);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    if (!items.length && !loading) {
      dispatch(fetchPolls());
    }
  }, [dispatch, id, items.length, loading]);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    setError("");

    const voteKey = `poll-vote:${id}`;
    try {
      const existingVote = localStorage.getItem(voteKey);
      setHasVoted(Boolean(existingVote));
      setLastVotedAt(existingVote);
    } catch {
      setHasVoted(false);
      setLastVotedAt(null);
    }
  }, [id]);

  const poll = useMemo(() => {
    if (!id || Array.isArray(id)) return null;
    return items.find((item) => item.id === id) ?? null;
  }, [id, items]);

  const options = useMemo(() => {
    if (!poll?.candidates?.length) return [];
    return poll.candidates.map((candidate, index) => ({
      label: candidate.name,
      votes: voteCounts[index] ?? 0,
    }));
  }, [poll, voteCounts]);

  useEffect(() => {
    if (!poll?.candidates?.length) {
      setVoteCounts([]);
      return;
    }
    setVoteCounts((prev) => {
      if (prev.length === poll.candidates.length) return prev;
      return Array.from(
        { length: poll.candidates.length },
        (_, idx) => prev[idx] ?? 0,
      );
    });
  }, [poll]);

  const handleVote = () => {
    if (selected === null) return;
    if (!id || Array.isArray(id)) return;

    const voteKey = `poll-vote:${id}`;
    const voteTime = new Date().toISOString();
    setVoteCounts((prev) =>
      prev.map((count, index) => (index === selected ? count + 1 : count)),
    );
    try {
      localStorage.setItem(voteKey, voteTime);
      setHasVoted(true);
      setLastVotedAt(voteTime);
    } catch {
      setHasVoted(true);
      setLastVotedAt(voteTime);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {loading && (
          <p className="text-center text-gray-500">Loading poll...</p>
        )}

        {!loading && error && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {!loading && !error && !poll && (
          <p className="text-center text-red-600">Poll not found.</p>
        )}

        {!loading && !error && poll && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-center">
              {poll.title}
            </h1>
            {poll.description && (
              <p className="text-center text-sm text-gray-500 mb-6">
                {poll.description}
              </p>
            )}

            {poll.status === "Draft" && (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Poll not live yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  This poll is still a draft. Check back once it goes live.
                </p>
              </div>
            )}

            {poll.status !== "Draft" && options.length === 0 && (
              <p className="text-center text-sm text-gray-500">
                No options available yet.
              </p>
            )}

            {poll.status === "Ended" && options.length > 0 && (
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  This poll has ended. Voting is closed.
                  {lastVotedAt && (
                    <span className="block text-xs text-gray-500 mt-1">
                      Last vote: {new Date(lastVotedAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <PollResults options={options} />
              </div>
            )}

            {poll.status === "Live" && options.length > 0 && (
              <>
                {!hasVoted ? (
                  <PollVote
                    options={options}
                    selected={selected}
                    onSelect={setSelected}
                    onVote={handleVote}
                    disabled={poll.status === "Ended"}
                  />
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                      You have already voted on this poll.
                      {lastVotedAt && (
                        <span className="block text-xs text-blue-600 mt-1">
                          Last vote: {new Date(lastVotedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <PollResults options={options} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
