import { useState } from "react";
import { options, results } from "@/interfaces";
import { POLL_OPTIONS, RESULTS } from "@/constants";

export default function PollPreview() {
  const [voted, setVoted] = useState(false);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Vote in Seconds. See Results Instantly.
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          No page reloads. No complexity. Just tap and watch results update
          live.
        </p>

        {/* Mockup Card */}
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 text-left border">
            {/* Poll title */}
            <h3 className="font-semibold text-lg mb-4">
              Which frontend framework do you prefer?
            </h3>

            {/* Before vote */}
            {!voted && (
              <div className="flex flex-col gap-3">
                {POLL_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setVoted(true)}
                    className="w-full border rounded-xl px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-400 transition"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {/* After vote (results view) */}
            {voted && (
              <div className="flex flex-col gap-4">
                {RESULTS.map((item) => (
                  <div key={item.text}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.text}</span>
                      <span className="font-semibold">{item.percent}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-blue-600 transition-all duration-700"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setVoted(false)}
                  className="mt-3 text-sm text-blue-600 hover:underline"
                >
                  Reset demo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
