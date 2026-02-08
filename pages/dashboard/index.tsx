import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jsPDF from "jspdf";

import Sidebar from "@/components/dashboard/SideBar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PollCard from "@/components/dashboard/PollCard";
import PollFilters from "@/components/dashboard/PollFilters";
import CreatePollModal from "@/components/dashboard/CreatePollModal";
import SharePollModal from "@/components/dashboard/SharePollModal";
import { usePollShare } from "@/hooks/usePollShare";

import {
  fetchPolls,
  incrementVote,
  removePoll,
  updatePoll,
} from "@/store/slices/pollsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { supabase } from "@/supabase/superbase-client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useToast } from "@/components/common/ToastProvider";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPollId, setEditingPollId] = useState<string | null>(null);
  const [exportPollId, setExportPollId] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [resultsPollId, setResultsPollId] = useState<string | null>(null);
  const [deletePollId, setDeletePollId] = useState<string | null>(null);
  const { user, loading: userLoading } = useSupabaseUser();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const isVerified = Boolean(
    user?.email_confirmed_at || (user as { confirmed_at?: string } | null)?.confirmed_at,
  );

  // ✅ SINGLE selector (safe)
  const {
    items = [],
    loading,
    filter,
    search,
    votesByPoll,
  } = useAppSelector((state) => state.polls);

  const editingPoll =
    editingPollId ? items.find((poll) => poll.id === editingPollId) ?? null : null;
  const {
    activePoll,
    shareUrl,
    share,
    copy,
    shareModalOpen,
    closeShareModal,
  } = usePollShare();

  const handleShare = async (pollId: string) => {
    await share({
      pollId,
      pollTitle: items.find((poll) => poll.id === pollId)?.title ?? "Poll",
    });
  };


  const formatTimestamp = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds(),
    )}`;
  };

  const slugifyFilename = (title: string) =>
    `pulsepoll-${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleResults = (pollId: string) => {
    setResultsPollId(pollId);
  };

  const handleView = (pollId: string) => {
    router.push(`/polls/${pollId}`);
  };

  const handleExport = (pollId: string) => {
    setExportPollId(pollId);
    setExportModalOpen(true);
  };

  const closeExportModal = () => {
    setExportModalOpen(false);
    setExportPollId(null);
  };

  const closeResultsModal = () => {
    setResultsPollId(null);
  };

  const closeDeleteModal = () => {
    setDeletePollId(null);
  };

  const handleExportCsv = () => {
    if (!exportPollId) return;
    const poll = items.find((item) => item.id === exportPollId);
    if (!poll) return;

    const counts = votesByPoll[poll.id] ?? [];
    const candidates = poll.candidates ?? [];
    const exportedAt = formatTimestamp(new Date().toISOString());
    const filename = `${slugifyFilename(poll.title)}.csv`;
    const csvLines = [
      ["Poll ID", poll.id],
      ["Title", poll.title],
      ["Status", poll.status],
      ["Responses", String(poll.responses)],
      ["Category", poll.category ?? ""],
      ["Description", poll.description ?? ""],
      ["Created At", formatTimestamp(poll.createdAt)],
      ["Updated At", formatTimestamp(poll.updatedAt)],
      ["Exported At", exportedAt],
      [""],
      ["Options"],
      ["Name", "Affiliation", "Votes"],
      ...candidates.map((candidate, index) => [
        candidate.name,
        candidate.affiliation ?? "",
        String(counts[index] ?? 0),
      ]),
      [""],
      ["Total Votes", String(counts.reduce((sum, value) => sum + value, 0))],
    ];

    const csv = csvLines
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(","),
      )
      .join("\n");

    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement("a");
    csvLink.href = csvUrl;
    csvLink.download = filename;
    document.body.appendChild(csvLink);
    csvLink.click();
    document.body.removeChild(csvLink);
    URL.revokeObjectURL(csvUrl);

    showToast("CSV downloaded", "success");
    closeExportModal();
  };

  const handleExportPdf = () => {
    if (!exportPollId) return;
    const poll = items.find((item) => item.id === exportPollId);
    if (!poll) return;

    const counts = votesByPoll[poll.id] ?? [];
    const candidates = poll.candidates ?? [];
    const exportedAt = formatTimestamp(new Date().toISOString());

    const doc = new jsPDF();
    const marginX = 14;
    let y = 16;

    doc.setFontSize(16);
    doc.text(poll.title, marginX, y);
    y += 8;

    doc.setFontSize(11);
    const metaLines = [
      `Status: ${poll.status}`,
      `Responses: ${poll.responses}`,
      `Category: ${poll.category ?? ""}`,
      `Created At: ${formatTimestamp(poll.createdAt)}`,
      `Updated At: ${formatTimestamp(poll.updatedAt)}`,
      `Exported At: ${exportedAt}`,
    ];
    metaLines.forEach((line) => {
      doc.text(line, marginX, y);
      y += 6;
    });

    if (poll.description) {
      const desc = doc.splitTextToSize(`Description: ${poll.description}`, 180);
      doc.text(desc, marginX, y);
      y += desc.length * 6 + 2;
    }

    doc.setFontSize(12);
    doc.text("Options", marginX, y);
    y += 6;

    doc.setFontSize(10);
    doc.text("Name", marginX, y);
    doc.text("Affiliation", marginX + 80, y);
    doc.text("Votes", marginX + 150, y);
    y += 4;
    doc.line(marginX, y, 196, y);
    y += 6;

    candidates.forEach((candidate, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(candidate.name || "-", marginX, y);
      doc.text(candidate.affiliation ?? "-", marginX + 80, y);
      doc.text(String(counts[index] ?? 0), marginX + 150, y);
      y += 6;
    });

    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.text(`Total Responses: ${poll.responses}`, marginX, y);
    y += 6;
    doc.text(
      `Total Votes: ${counts.reduce((sum, value) => sum + value, 0)}`,
      marginX,
      y,
    );
    y += 6;
    doc.text(`Exported At: ${exportedAt}`, marginX, y);

    doc.save(`${slugifyFilename(poll.title)}.pdf`);
    showToast("PDF downloaded", "success");
    closeExportModal();
  };

  const handleEndPoll = async (pollId: string, nextStatus: "Live" | "Ended") => {
    const { error } = await supabase
      .from("polls")
      .update({ status: nextStatus })
      .eq("id", pollId);
    if (error) {
      showToast(error.message, "error");
      return;
    }
    dispatch(
      updatePoll({
        id: pollId,
        changes: { status: nextStatus },
      }),
    );
    showToast(
      nextStatus === "Ended" ? "Poll ended" : "Poll reopened",
      "success",
    );
  };

  const handleToggleVisibility = async (
    pollId: string,
    nextVisibility: "instant" | "hidden",
  ) => {
    const { error } = await supabase
      .from("polls")
      .update({ visibility: nextVisibility })
      .eq("id", pollId);
    if (error) {
      showToast(error.message, "error");
      return;
    }
    dispatch(
      updatePoll({
        id: pollId,
        changes: { visibility: nextVisibility },
      }),
    );
    showToast(
      nextVisibility === "hidden"
        ? "Results hidden from voters"
        : "Results visible to voters",
      "success",
    );
  };

  const handleDeletePoll = async () => {
    if (!deletePollId) return;
    const { error } = await supabase
      .from("polls")
      .delete()
      .eq("id", deletePollId);
    if (error) {
      showToast(error.message, "error");
      return;
    }
    dispatch(removePoll(deletePollId));
    showToast("Poll deleted", "success");
    closeDeleteModal();
  };

  useEffect(() => {
    if (!items.length && !userLoading && user) {
      dispatch(fetchPolls({ ownerId: user.id }));
    }
  }, [dispatch, items.length, userLoading, user]);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [router, user, userLoading]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.create === "1") {
      if (isVerified) {
        setEditingPollId(null);
        setIsModalOpen(true);
      } else {
        showToast("Verify your email to create polls.", "info");
      }
    }
  }, [isVerified, router.isReady, router.query.create, showToast]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        (payload) => {
          const vote = payload.new as {
            poll_id: string;
            option_id: string;
          };
          const poll = items.find((item) => item.id === vote.poll_id);
          if (!poll?.candidates?.length) return;
          const optionIndex = poll.candidates.findIndex(
            (candidate) => candidate.id === vote.option_id,
          );
          if (optionIndex === -1) return;
          dispatch(incrementVote({ pollId: poll.id, index: optionIndex }));
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
  }, [dispatch, items, user]);

  if (userLoading) return <p>Loading account...</p>;
  if (!user) return <p>Redirecting to sign in...</p>;

  // ✅ safe because items defaults to []
  const filteredPolls = items.filter((poll) => {
    const matchesFilter = filter === "All" || poll.status === filter;

    const matchesSearch = poll.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesOwner = poll.ownerId ? poll.ownerId === user.id : true;

    return matchesFilter && matchesSearch && matchesOwner;
  });
  const visiblePolls = filteredPolls.slice(0, page * pageSize);
  const hasMorePolls = filteredPolls.length > visiblePolls.length;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <Sidebar />

      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
        {!isVerified && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Please verify your email to create or edit polls. Check your inbox
            for the confirmation link.
          </div>
        )}
        <DashboardHeader
          canCreate={isVerified}
          disabledReason="Verify your email to create polls."
          onCreate={() => {
            setEditingPollId(null);
            setIsModalOpen(true);
          }}
        />
        <PollFilters />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-pulse rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-1/3 rounded bg-gray-200" />
                <div className="mt-6 h-16 rounded bg-gray-100" />
                <div className="mt-4 h-9 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : filteredPolls.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-10 text-center text-sm text-gray-500">
            No polls yet. Create your first poll to get started.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePolls.map((poll) => {
              return (
                <PollCard
                  key={poll.id}
                  poll={poll}
                  onEdit={(selected) => {
                    setEditingPollId(selected.id);
                    setIsModalOpen(true);
                  }}
                  onShare={(selected) => handleShare(selected.id)}
                  onResults={(selected) => handleResults(selected.id)}
                  onView={(selected) => handleView(selected.id)}
                  onExport={(selected) => handleExport(selected.id)}
                  onEnd={(selected) =>
                    handleEndPoll(
                      selected.id,
                      selected.status === "Ended" ? "Live" : "Ended",
                    )
                  }
                  onDelete={(selected) => setDeletePollId(selected.id)}
                  onToggleVisibility={(selected) =>
                    handleToggleVisibility(
                      selected.id,
                      selected.visibility === "hidden" ? "instant" : "hidden",
                    )
                  }
                />
              );
            })}
          </div>
        )}
        {!loading && hasMorePolls && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load more
            </button>
          </div>
        )}
      </main>

      <CreatePollModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={editingPoll ? "edit" : "create"}
        poll={editingPoll}
      />

      {exportModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-900">
              Export Poll
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a format to download.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                className="rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={closeExportModal}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={handleExportCsv}
              >
                CSV
              </button>
              <button
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                onClick={handleExportPdf}
              >
                PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {resultsPollId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Poll Results
                </h3>
                <p className="text-sm text-gray-500">
                  Internal summary for organizers.
                </p>
              </div>
              <button
                className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                onClick={closeResultsModal}
              >
                Close
              </button>
            </div>
            {(() => {
              const poll = items.find((item) => item.id === resultsPollId);
              if (!poll) {
                return (
                  <p className="mt-4 text-sm text-gray-500">
                    Poll not found.
                  </p>
                );
              }
              const counts = votesByPoll[poll.id] ?? [];
              const totalVotes = counts.reduce((sum, value) => sum + value, 0);
              return (
                <div className="mt-6 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                      onClick={() =>
                        handleToggleVisibility(
                          poll.id,
                          poll.visibility === "hidden" ? "instant" : "hidden",
                        )
                      }
                    >
                      {poll.visibility === "hidden"
                        ? "Show Results to Voters"
                        : "Hide Results from Voters"}
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 text-sm text-gray-600">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Status
                      </p>
                      <p className="font-medium text-gray-900">{poll.status}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Responses
                      </p>
                      <p className="font-medium text-gray-900">
                        {poll.responses}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Visibility
                      </p>
                      <p className="font-medium text-gray-900">
                        {poll.visibility === "hidden"
                          ? "Hidden"
                          : "Instant"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Updated
                      </p>
                      <p className="font-medium text-gray-900">
                        {poll.updatedAt
                          ? new Date(poll.updatedAt).toLocaleString()
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200">
                    <div className="hidden grid-cols-3 gap-2 border-b bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 sm:grid">
                      <span>Option</span>
                      <span>Votes</span>
                      <span>Share</span>
                    </div>
                    <div className="divide-y">
                      {(poll.candidates ?? []).map((candidate, index) => {
                        const count = counts[index] ?? 0;
                        const percent =
                          totalVotes === 0
                            ? 0
                            : Math.round((count / totalVotes) * 100);
                        return (
                          <div
                            key={candidate.id}
                            className="grid grid-cols-1 gap-2 px-4 py-3 text-sm text-gray-700 sm:grid-cols-3 sm:gap-2 sm:py-2"
                          >
                            <div>
                              <p className="text-xs font-semibold uppercase text-gray-400 sm:hidden">
                                Option
                              </p>
                              <p className="font-medium text-gray-900">
                                {candidate.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase text-gray-400 sm:hidden">
                                Votes
                              </p>
                              <p>{count}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase text-gray-400 sm:hidden">
                                Share
                              </p>
                              <p>{percent}%</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {deletePollId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-900">
              Delete poll?
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              This action cannot be undone. This will permanently remove the
              poll and its responses.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                className="rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                onClick={handleDeletePoll}
              >
                Delete
              </button>
            </div>
          </div>
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
    </div>
  );
}
