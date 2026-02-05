import { BarChart3, Users, Zap } from "lucide-react";

const items = [
  {
    icon: <Zap className="w-6 h-6 text-teal-600" />,
    title: "Instant Polls",
    description: "Create and launch polls in seconds.",
  },
  {
    icon: <Users className="w-6 h-6 text-teal-600" />,
    title: "Live Participation",
    description: "Participants vote from any device instantly.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
    title: "Clear Results",
    description: "Visual charts and insights in real-time.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-12">What You Can Do</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
