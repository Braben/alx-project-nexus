import { FormEvent, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPoll } from "@/store/slices/pollsSlice";
import {
  addCandidate,
  initializeCandidates,
  removeCandidate,
  resetCandidates,
  updateCandidate,
} from "@/store/slices/candidatesSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CreatePollModalProps {
  open: boolean;
  onClose: () => void;
}

const initialFormState = {
  title: "",
  category: "",
  description: "",
  startDate: "",
  endDate: "",
  visibility: "instant",
  electionMode: true,
};

export default function CreatePollModal({
  open,
  onClose,
}: CreatePollModalProps) {
  const dispatch = useAppDispatch();
  const candidates = useAppSelector((state) => state.candidates.items);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState(initialFormState);
  const [titleError, setTitleError] = useState("");
  const [candidateError, setCandidateError] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (!open) return;
    dispatch(initializeCandidates());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => firstInputRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, open, onClose]);

  if (!open) return null;

  const updateField = (
    key: keyof typeof initialFormState,
    value: string | boolean,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateDates = (start: string, end: string) => {
    if (!start || !end) {
      setDateError("");
      return true;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      setDateError("Enter valid start and end dates.");
      return false;
    }

    if (endDate <= startDate) {
      setDateError("End date must be after start date.");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle) {
      setTitleError("Title is required.");
      firstInputRef.current?.focus();
      return;
    }

    const filledCandidates = candidates.filter(
      (candidate) => candidate.name.trim().length > 0,
    );
    if (filledCandidates.length < 2) {
      setCandidateError("Please add at least 2 options.");
      return;
    }

    if (!validateDates(formState.startDate.trim(), formState.endDate.trim())) {
      return;
    }

    dispatch(
      addPoll({
        id: `${Date.now()}`,
        title: trimmedTitle,
        status: "Draft",
        responses: 0,
        category: formState.category.trim() || undefined,
        description: formState.description.trim() || undefined,
        startDate: formState.startDate || undefined,
        endDate: formState.endDate || undefined,
        visibility: formState.visibility,
        electionMode: formState.electionMode,
        candidates: filledCandidates.map((candidate) => ({
          ...candidate,
          name: candidate.name.trim(),
          affiliation: candidate.affiliation?.trim() || undefined,
        })),
        createdAt: new Date().toISOString(),
      }),
    );

    setFormState(initialFormState);
    setTitleError("");
    setCandidateError("");
    setDateError("");
    dispatch(resetCandidates());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close create poll modal"
        className="absolute inset-0 z-0 bg-black/40"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Create poll"
        className="relative z-10 mx-auto my-6 flex max-h-[90vh] w-[min(760px,94vw)] flex-col rounded-2xl bg-gray-50 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b bg-white px-6 py-5 rounded-t-2xl">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              My Polls / Create Poll
            </p>
            <h2 className="text-lg font-semibold text-gray-900">Create Poll</h2>
            <p className="text-sm text-gray-500">
              Configure poll details and audience settings.
            </p>
          </div>
          <IoIosCloseCircleOutline
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={onClose}
          />
          {/* <button
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button> */}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-6"
          >
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Poll Title *
                </label>
                <input
                  ref={firstInputRef}
                  value={formState.title}
                  onChange={(event) => {
                    updateField("title", event.target.value);
                    if (titleError) setTitleError("");
                  }}
                  className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Class President 2024"
                />
                {titleError && (
                  <p className="mt-2 text-xs text-red-600">{titleError}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Category
                </label>
                <input
                  value={formState.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Education"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Cover Image
                </label>
                <div className="mt-2 flex h-28 items-center justify-center rounded-xl border border-dashed bg-gray-50 text-center text-xs text-gray-500">
                  Click to upload or drag and drop
                </div>
                <p className="mt-2 text-[11px] text-gray-400">
                  SVG, PNG, JPG or GIF (max 3MB)
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Description
                </label>
                <textarea
                  value={formState.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className="mt-2 min-h-[90px] w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Vote for your favorite candidate for the 2024 academic year."
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Election Mode
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable candidate profiles and party affiliations.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={formState.electionMode}
                  className={`relative h-6 w-11 rounded-full ${
                    formState.electionMode ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    updateField("electionMode", !formState.electionMode);
                    setCandidateError("");
                  }}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      formState.electionMode ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-600">
                    {formState.electionMode ? "Candidates" : "Answers"}
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Min. 2 options required
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  {candidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="rounded-xl border px-3 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold text-gray-500">
                          {formState.electionMode ? "Candidate" : "Answer"}{" "}
                          {index + 1}
                        </p>
                        {candidates.length > 2 && (
                          <button
                            type="button"
                            className="text-xs text-red-500 hover:underline"
                            onClick={() => dispatch(removeCandidate(candidate.id))}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <input
                          value={candidate.name}
                          onChange={(event) => {
                            if (candidateError) setCandidateError("");
                            dispatch(
                              updateCandidate({
                                id: candidate.id,
                                field: "name",
                                value: event.target.value,
                              }),
                            );
                          }}
                          className="w-full rounded-lg border px-3 py-2 text-sm"
                          placeholder={
                            formState.electionMode
                              ? "Candidate name"
                              : "Answer option"
                          }
                        />
                        {formState.electionMode && (
                          <input
                            value={candidate.affiliation ?? ""}
                            onChange={(event) =>
                              dispatch(
                                updateCandidate({
                                  id: candidate.id,
                                  field: "affiliation",
                                  value: event.target.value,
                                }),
                              )
                            }
                            className="w-full rounded-lg border px-3 py-2 text-sm"
                            placeholder="Party / affiliation"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded-xl border border-dashed px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
                  onClick={() => dispatch(addCandidate())}
                >
                  {formState.electionMode ? "Add Candidate" : "Add Option"}
                </button>
                {candidateError && (
                  <p className="mt-2 text-xs text-red-600">{candidateError}</p>
                )}
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-600">
                  Settings & Timeline
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] text-gray-500">
                      Start Date
                    </label>
                    <input
                      value={formState.startDate}
                      onChange={(event) => {
                        updateField("startDate", event.target.value);
                        if (dateError) {
                          validateDates(event.target.value, formState.endDate);
                        }
                      }}
                      className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                      placeholder="10/24/2023 09:00 AM"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500">
                      End Date
                    </label>
                    <input
                      value={formState.endDate}
                      onChange={(event) => {
                        updateField("endDate", event.target.value);
                        validateDates(formState.startDate, event.target.value);
                      }}
                      className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                      placeholder="10/31/2023 05:00 PM"
                    />
                    {dateError && (
                      <p className="mt-2 text-xs text-red-600">{dateError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600">
                  Result Visibility
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="instant"
                      checked={formState.visibility === "instant"}
                      onChange={(event) =>
                        updateField("visibility", event.target.value)
                      }
                    />
                    Show results instantly
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="visibility"
                      value="hidden"
                      checked={formState.visibility === "hidden"}
                      onChange={(event) =>
                        updateField("visibility", event.target.value)
                      }
                    />
                    Hide results until finished
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Create Poll
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
