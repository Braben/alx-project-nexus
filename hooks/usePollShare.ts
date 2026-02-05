import { useEffect, useMemo, useState } from "react";

interface SharePayload {
  pollTitle: string;
  pollId: string;
}

export function usePollShare() {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [activePoll, setActivePoll] = useState<SharePayload | null>(null);

  const shareUrl = useMemo(() => {
    const id = activePoll?.pollId ?? "";
    return typeof window !== "undefined"
      ? `${window.location.origin}/polls/${id}`
      : `/polls/${id}`;
  }, [activePoll]);

  const openShareModal = () => setShareModalOpen(true);
  const closeShareModal = () => setShareModalOpen(false);

  const showToast = (message: string) => {
    setShareToast(message);
    setTimeout(() => setShareToast(null), 2000);
  };

  const share = async ({ pollId, pollTitle }: SharePayload) => {
    setActivePoll({ pollId, pollTitle });
    try {
      if (navigator.share) {
        await navigator.share({
          title: "PulsePoll",
          text: `Check out this poll: ${pollTitle}`,
          url: shareUrl,
        });
        showToast("Share dialog opened");
      } else {
        openShareModal();
      }
    } catch {
      showToast("Unable to share link");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Share link copied");
    } catch {
      showToast("Unable to copy link");
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
    shareToast,
  };
}
