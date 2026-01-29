interface Option {
  label: string;
  votes: number;
}

interface Props {
  options: Option[];
}

export default function PollResults({ options }: Props) {
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="space-y-5">
      <h2 className="text-center font-semibold text-lg mb-6">Live Results</h2>

      {options.map((option, index) => {
        const percent = Math.round((option.votes / totalVotes) * 100);

        return (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{option.label}</span>
              <span>
                {option.votes} votes ({percent}%)
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-teal-600 h-3 rounded-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}

      <p className="text-center text-sm text-gray-500 pt-4">
        Total votes: {totalVotes}
      </p>
    </div>
  );
}
