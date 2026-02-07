import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PollVote from "@/components/polls/PollVote";
import PollResults from "@/components/polls/PollResults";
import SharePollModal from "@/components/dashboard/SharePollModal";
import { usePollShare } from "@/hooks/usePollShare";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPolls,
  incrementVote,
  setVoteCounts,
  updatePoll,
} from "@/store/slices/pollsSlice";
import { supabase } from "@/supabase/superbase-client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { pollsApi } from "@/constants/pollsAPI";

export default function PollDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  const { user } = useSupabaseUser();
  const { items = [], loading, votesByPoll } = useAppSelector(
    (state) => state.polls,
  );
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [lastVotedAt, setLastVotedAt] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [votedIndex, setVotedIndex] = useState<number | null>(null);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const {
    activePoll,
    shareUrl,
    share,
    copy,
    shareModalOpen,
    closeShareModal,
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

    try {
      const existingDeviceId = localStorage.getItem("pp-device-id");
      if (existingDeviceId) {
        setDeviceId(existingDeviceId);
      } else if (typeof crypto !== "undefined" && crypto.randomUUID) {
        const newId = crypto.randomUUID();
        localStorage.setItem("pp-device-id", newId);
        setDeviceId(newId);
      }
    } catch {
      setDeviceId(null);
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

  const resolvedVotedIndex = useMemo(() => {
    if (votedIndex !== null) return votedIndex;
    if (!votedOptionId || !poll?.candidates?.length) return null;
    const index = poll.candidates.findIndex(
      (candidate) => candidate.id === votedOptionId,
    );
    return index === -1 ? null : index;
  }, [poll?.candidates, votedIndex, votedOptionId]);

  const voterOptions = useMemo(() => {
    if (!options.length) return [];
    if (!hasVoted || resolvedVotedIndex === null) return options;
    if (poll?.visibility !== "hidden" || poll?.status === "Ended") {
      return options;
    }
    const selectedOption = options[resolvedVotedIndex];
    return selectedOption ? [selectedOption] : options;
  }, [hasVoted, options, poll?.status, poll?.visibility, resolvedVotedIndex]);

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

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    if (!deviceId && !user) return;

    const checkExistingVote = async () => {
      const voteQuery = supabase
        .from("votes")
        .select("option_id, created_at")
        .eq("poll_id", id);

      const { data, error } = user
        ? await voteQuery.eq("voter_id", user.id).maybeSingle()
        : await voteQuery.eq("device_id", deviceId).maybeSingle();

      if (error) return;
      if (!data) {
        setHasVoted(false);
        setLastVotedAt(null);
        setVotedIndex(null);
        return;
      }

      setHasVoted(true);
      setLastVotedAt(data.created_at ?? null);
      setVotedOptionId(data.option_id ?? null);
      const index = poll?.candidates?.findIndex(
        (candidate) => candidate.id === data.option_id,
      );
      setVotedIndex(index ?? null);
    };

    checkExistingVote();
  }, [deviceId, id, poll?.candidates, user]);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    const channel = supabase
      .channel(`poll-${id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        (payload) => {
          const vote = payload.new as {
            poll_id: string;
            option_id: string;
            device_id?: string | null;
            voter_id?: string | null;
          };
          if (vote.poll_id !== id) return;
          if (vote.device_id && vote.device_id === deviceId) return;
          if (user?.id && vote.voter_id === user.id) return;
          if (!poll?.candidates?.length) return;
          const optionIndex = poll.candidates.findIndex(
            (candidate) => candidate.id === vote.option_id,
          );
          if (optionIndex === -1) return;
          dispatch(incrementVote({ pollId: id, index: optionIndex }));
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "polls" },
        (payload) => {
          const updated = payload.new as {
            id: string;
            status: "Live" | "Draft" | "Ended" | "Archived";
            visibility: "instant" | "hidden";
            updated_at?: string | null;
          };
          if (updated.id !== id) return;
          dispatch(
            updatePoll({
              id: updated.id,
              changes: {
                status: updated.status,
                visibility: updated.visibility,
                updatedAt: updated.updated_at ?? undefined,
              },
            }),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceId, dispatch, id, poll?.candidates, user?.id]);

  const handleVote = async () => {
    if (selected === null) return;
    if (!id || Array.isArray(id)) return;
    if (poll?.status === "Ended") return;
    if (submitting) return;
    if (!deviceId && !user) {
      setVoteError("Unable to identify device. Please refresh.");
      return;
    }

    setSubmitting(true);
    setVoteError(null);

    const candidate = poll?.candidates?.[selected];
    if (!candidate) {
      setVoteError("Please select a valid option.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("votes").insert({
      poll_id: id,
      option_id: candidate.id,
      voter_id: user?.id ?? null,
      device_id: deviceId,
    });

    if (error) {
      if (error.code === "23505") {
        setVoteError("You have already voted on this poll.");
        setHasVoted(true);
      } else {
        setVoteError(error.message);
      }
      setSubmitting(false);
      return;
    }

    dispatch(incrementVote({ pollId: id, index: selected }));
    const voteTime = new Date().toISOString();
    setHasVoted(true);
    setLastVotedAt(voteTime);
    setVotedIndex(selected);
    setSubmitting(false);

    try {
      const counts = await pollsApi.getPollCounts([id]);
      const countsByOption = counts.reduce<Record<string, number>>(
        (acc, row) => {
          acc[row.option_id] = row.votes;
          return acc;
        },
        {},
      );
      const normalized = poll?.candidates?.map(
        (candidate) => countsByOption[candidate.id] ?? 0,
      );
      if (normalized) {
        dispatch(setVoteCounts({ pollId: id, counts: normalized }));
      }
    } catch {
      // Ignore reconcile errors.
    }
  };

  const isOwner = Boolean(user && poll?.ownerId === user.id);
  const canViewResults =
    poll?.visibility !== "hidden" || poll?.status === "Ended" || isOwner;

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-6 w-3/4 mx-auto rounded bg-gray-200" />
            <div className="h-3 w-1/2 mx-auto rounded bg-gray-200" />
            <div className="h-10 w-32 mx-auto rounded bg-gray-200" />
            <div className="h-28 rounded bg-gray-100" />
          </div>
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
                  {resolvedVotedIndex !== null &&
                    options[resolvedVotedIndex] &&
                    options[resolvedVotedIndex].label && (
                      <span className="block text-xs text-gray-500 mt-1">
                        You voted for {options[resolvedVotedIndex].label}.
                      </span>
                    )}
                </div>
                {canViewResults ? (
                  <PollResults options={options} />
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    Results are hidden by the host.
                  </div>
                )}
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
                    disabled={submitting}
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
                      {resolvedVotedIndex !== null &&
                        options[resolvedVotedIndex] &&
                        options[resolvedVotedIndex].label && (
                          <span className="block text-xs text-blue-600 mt-1">
                            You voted for {options[resolvedVotedIndex].label}.
                          </span>
                        )}
                    </div>
                    {poll.visibility === "hidden" ? (
                      <>
                        <PollVote
                          options={voterOptions}
                          selected={0}
                          onSelect={() => undefined}
                          onVote={() => undefined}
                          disabled
                        />
                        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                          Thanks for voting! Results will be revealed by the host.
                        </div>
                      </>
                    ) : (
                      <PollResults options={voterOptions} />
                    )}
                  </div>
                )}
              </>
            )}
            {voteError && (
              <p className="mt-4 text-center text-sm text-red-600">
                {voteError}
              </p>
            )}
          </>
        )}
      </div>

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
