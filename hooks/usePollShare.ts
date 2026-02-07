import { useMemo, useState } from "react";
import { useToast } from "@/components/common/ToastProvider";

interface SharePayload {
  pollTitle: string;
  pollId: string;
}

export function usePollShare() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activePoll, setActivePoll] = useState<SharePayload | null>(null);
  const { showToast } = useToast();

  const shareUrl = useMemo(() => {
    const id = activePoll?.pollId ?? "";
    return typeof window !== "undefined"
      ? `${window.location.origin}/polls/${id}`
      : `/polls/${id}`;
  }, [activePoll?.pollId]);

  const openShareModal = () => setShareModalOpen(true);
  const closeShareModal = () => setShareModalOpen(false);

  const share = async ({ pollId, pollTitle }: SharePayload) => {
    setActivePoll({ pollId, pollTitle });
    const nextUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/polls/${pollId}`
        : `/polls/${pollId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "PulsePoll",
          text: `Check out this poll: ${pollTitle}`,
          url: nextUrl,
        });
        showToast("Share dialog opened", "success");
      } else {
        openShareModal();
      }
    } catch {
      showToast("Unable to share link", "error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Share link copied", "success");
    } catch {
      showToast("Unable to copy link", "error");
    }
  };

  return {
    activePoll,
    shareUrl,
    share,
    copy,
    shareModalOpen,
    openShareModal,
    closeShareModal,
  };
}
