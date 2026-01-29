import React from "react";
interface Option {
  label: string;
  votes: number;
}

interface Props {
  options: Option[];
  selected: number | null;
  onSelect: (index: number) => void;
  onVote: () => void;
}

export default function PollVote({
  options,
  selected,
  onSelect,
  onVote,
}: Props) {
  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-full p-4 rounded-xl border text-left transition
            ${
              selected === index
                ? "bg-teal-600 text-white border-teal-600"
                : "hover:bg-gray-100"
            }
          `}
        >
          {option.label}
        </button>
      ))}

      <button
        onClick={onVote}
        disabled={selected === null}
        className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl disabled:opacity-50"
      >
        Submit Vote
      </button>
    </div>
  );
}
