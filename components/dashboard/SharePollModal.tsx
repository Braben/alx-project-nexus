import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { QRCodeCanvas } from "qrcode.react";

interface SharePollModalProps {
  open: boolean;
  pollTitle: string;
  shareUrl: string;
  onClose: () => void;
  onCopy: () => void;
}

export default function SharePollModal({
  open,
  pollTitle,
  shareUrl,
  onClose,
  onCopy,
}: SharePollModalProps) {
  if (!open) return null;

  const shareText = `Check out this poll: ${pollTitle}`;

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-900">Share Poll</h3>
        <p className="mt-1 text-sm text-gray-500">
          Share this poll on social platforms.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() =>
              openShareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl,
                )}`,
              )
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              <FaFacebookF size={12} />
            </span>
            Facebook
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl,
                )}&text=${encodeURIComponent(shareText)}`,
              )
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
              <FaXTwitter size={12} />
            </span>
            X
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() =>
              openShareWindow(
                `https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${shareText} ${shareUrl}`,
                )}`,
              )
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
              <FaWhatsapp size={12} />
            </span>
            WhatsApp
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() =>
              openShareWindow(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl,
                )}`,
              )
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-white">
              <FaLinkedinIn size={12} />
            </span>
            LinkedIn
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() =>
              openShareWindow(
                `https://t.me/share/url?url=${encodeURIComponent(
                  shareUrl,
                )}&text=${encodeURIComponent(shareText)}`,
              )
            }
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white">
              <FaTelegramPlane size={12} />
            </span>
            Telegram
          </button>
          <button
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onCopy}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-700">
              Link
            </span>
            Copy Link
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center gap-2">
          <QRCodeCanvas value={shareUrl} size={120} />
          <p className="text-xs text-gray-500">Scan to open the poll</p>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            className="rounded-lg border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
