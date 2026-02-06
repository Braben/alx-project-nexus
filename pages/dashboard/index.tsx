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

import { fetchPolls, setVoteCounts } from "@/store/slices/pollsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPollId, setEditingPollId] = useState<string | null>(null);
  const [exportPollId, setExportPollId] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

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
    showToast,
    shareModalOpen,
    closeShareModal,
    shareToast,
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
    router.push(`/polls/${pollId}`);
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

    showToast("CSV downloaded");
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
    showToast("PDF downloaded");
    closeExportModal();
  };

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchPolls());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (!items.length || typeof window === "undefined") return;

    items.forEach((poll) => {
      const votesKey = `poll-votes:${poll.id}`;
      try {
        const storedVotes = localStorage.getItem(votesKey);
        if (!storedVotes) return;
        const parsedVotes = JSON.parse(storedVotes) as number[];
        if (!Array.isArray(parsedVotes)) return;
        const normalized = Array.from(
          { length: poll.candidates?.length ?? parsedVotes.length },
          (_, idx) => parsedVotes[idx] ?? 0,
        );
        dispatch(setVoteCounts({ pollId: poll.id, counts: normalized }));
      } catch {
        // Ignore malformed localStorage entries.
      }
    });
  }, [dispatch, items]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || !event.key.startsWith("poll-votes:")) return;
      const pollId = event.key.replace("poll-votes:", "");
      if (!pollId) return;
      if (!event.newValue) return;
      try {
        const parsedVotes = JSON.parse(event.newValue) as number[];
        if (!Array.isArray(parsedVotes)) return;
        const poll = items.find((item) => item.id === pollId);
        const normalized = Array.from(
          { length: poll?.candidates?.length ?? parsedVotes.length },
          (_, idx) => parsedVotes[idx] ?? 0,
        );
        dispatch(setVoteCounts({ pollId, counts: normalized }));
      } catch {
        // Ignore malformed updates.
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [dispatch, items]);

  if (loading) return <p>Loading polls...</p>;

  // ✅ safe because items defaults to []
  const filteredPolls = items.filter((poll) => {
    const matchesFilter = filter === "All" || poll.status === filter;

    const matchesSearch = poll.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <DashboardHeader
          onCreate={() => {
            setEditingPollId(null);
            setIsModalOpen(true);
          }}
        />
        <PollFilters />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => {
            // console.log("Rendering poll:", poll);
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
              />
            );
          })}
        </div>
      </main>

      <CreatePollModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={editingPoll ? "edit" : "create"}
        poll={editingPoll}
      />

      {shareToast && (
        <div className="fixed bottom-6 right-6 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
          {shareToast}
        </div>
      )}

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
