import React from "react";
export default function Mission() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>

          <p className="text-gray-600 mb-4">
            We believe every voice matters. Whether you're running an event,
            leading a class, or managing a team, Pulse gives you a simple way to
            gather opinions and act fast.
          </p>

          <p className="text-gray-600">
            No complex tools. No delays. Just instant feedback.
          </p>
        </div>

        <div className="bg-teal-100 rounded-2xl h-56 flex items-center justify-center text-teal-700 font-semibold">
          Real-time Feedback ⚡
        </div>
      </div>
    </section>
  );
}
