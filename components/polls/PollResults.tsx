import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Option {
  label: string;
  votes: number;
}

interface Props {
  options: Option[];
}

export default function PollResults({ options }: Props) {
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);
  const chartData = options.map((option) => ({
    name: option.label,
    votes: option.votes,
  }));

  return (
    <div className="space-y-5">
      <h2 className="text-center font-semibold text-lg mb-6">Live Results</h2>

      <div className="h-56 w-full rounded-xl border border-gray-100 bg-white px-2 py-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="votes" fill="#0f766e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {options.map((option, index) => {
        const percent =
          totalVotes === 0
            ? 0
            : Math.round((option.votes / totalVotes) * 100);

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
