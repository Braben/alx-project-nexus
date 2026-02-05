import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PollVote from "@/components/polls/PollVote";
import PollResults from "@/components/polls/PollResults";
import SharePollModal from "@/components/dashboard/SharePollModal";
import { usePollShare } from "@/hooks/usePollShare";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPolls,
  setVoteCounts,
} from "@/store/slices/pollsSlice";

export default function PollDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { items = [], loading, votesByPoll } = useAppSelector(
    (state) => state.polls,
  );
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [lastVotedAt, setLastVotedAt] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [votedIndex, setVotedIndex] = useState<number | null>(null);
  const {
    activePoll,
    shareUrl,
    share,
    copy,
    shareModalOpen,
    closeShareModal,
    shareToast,
  } = usePollShare();

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
    const votesKey = `poll-votes:${id}`;
    try {
      const existingVote = localStorage.getItem(voteKey);
      setHasVoted(Boolean(existingVote));
      setLastVotedAt(existingVote);
      const storedVotes = localStorage.getItem(votesKey);
      if (storedVotes) {
        const parsedVotes = JSON.parse(storedVotes) as number[];
        if (Array.isArray(parsedVotes)) {
          dispatch(setVoteCounts({ pollId: id, counts: parsedVotes }));
        }
      }
      const storedSelection = localStorage.getItem(`${voteKey}:selection`);
      if (storedSelection) {
        const parsedIndex = Number(storedSelection);
        setVotedIndex(Number.isNaN(parsedIndex) ? null : parsedIndex);
      }
    } catch {
      setHasVoted(false);
      setLastVotedAt(null);
      setVotedIndex(null);
    }
  }, [id]);

  const poll = useMemo(() => {
    if (!id || Array.isArray(id)) return null;
    return items.find((item) => item.id === id) ?? null;
  }, [id, items]);

  const handleShare = async () => {
    if (!poll || !id || Array.isArray(id)) return;
    await share({
      pollId: poll.id,
      pollTitle: poll.title,
    });
  };

  const options = useMemo(() => {
    if (!poll?.candidates?.length) return [];
    const counts = votesByPoll[poll.id] ?? [];
    return poll.candidates.map((candidate, index) => ({
      label: candidate.name,
      votes: counts[index] ?? 0,
    }));
  }, [poll, votesByPoll]);

  useEffect(() => {
    if (!poll?.candidates?.length) {
      return;
    }
    const existing = votesByPoll[poll.id];
    if (existing && existing.length === poll.candidates.length) {
      return;
    }
    const normalized = Array.from(
      { length: poll.candidates.length },
      (_, idx) => existing?.[idx] ?? 0,
    );
    dispatch(setVoteCounts({ pollId: poll.id, counts: normalized }));
  }, [dispatch, poll, votesByPoll]);

  const handleVote = () => {
    if (selected === null) return;
    if (!id || Array.isArray(id)) return;
    if (poll?.status === "Ended") return;

    const voteKey = `poll-vote:${id}`;
    const votesKey = `poll-votes:${id}`;
    const voteTime = new Date().toISOString();
    const existingCounts = votesByPoll[id] ?? [];
    const nextCounts = Array.from(
      {
        length: Math.max(
          existingCounts.length,
          poll?.candidates?.length ?? 0,
          selected + 1,
        ),
      },
      (_, idx) => existingCounts[idx] ?? 0,
    ).map((count, index) => (index === selected ? count + 1 : count));

    dispatch(setVoteCounts({ pollId: id, counts: nextCounts }));
    try {
      localStorage.setItem(votesKey, JSON.stringify(nextCounts));
      localStorage.setItem(voteKey, voteTime);
      localStorage.setItem(`${voteKey}:selection`, String(selected));
      setHasVoted(true);
      setLastVotedAt(voteTime);
      setVotedIndex(selected);
    } catch {
      setHasVoted(true);
      setLastVotedAt(voteTime);
      setVotedIndex(selected);
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
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={handleShare}
              >
                Share
              </button>
            </div>

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
                  {votedIndex !== null &&
                    options[votedIndex] &&
                    options[votedIndex].label && (
                      <span className="block text-xs text-gray-500 mt-1">
                        You voted for {options[votedIndex].label}.
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
                      {votedIndex !== null &&
                        options[votedIndex] &&
                        options[votedIndex].label && (
                          <span className="block text-xs text-blue-600 mt-1">
                            You voted for {options[votedIndex].label}.
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

      {shareToast && (
        <div className="fixed bottom-6 right-6 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {shareToast}
        </div>
      )}

      {shareModalOpen && activePoll && (
        <SharePollModal
          open={shareModalOpen}
          pollTitle={activePoll.pollTitle}
          shareUrl={shareUrl}
          onCopy={copy}
          onClose={closeShareModal}
        />
      )}
    </main>
  );
}
