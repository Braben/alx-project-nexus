import Image from "next/image";

export default function TestimonialPanel() {
  return (
    <section
      aria-label="Customer testimonial"
      className="relative hidden lg:flex items-end justify-center bg-gradient-to-br from-teal-200 to-cyan-200 p-6"
    >
      {/* Background Image */}
      <Image
        src="/assets/auth-bg.png" // use your uploaded image here
        alt=""
        fill
        priority
        className="object-cover opacity-40"
      />

      {/* Testimonial card */}
      <div className="relative bg-white/95 backdrop-blur rounded-2xl p-8 max-w-2xl shadow-xl justify-center">
        <blockquote className="text-gray-800 text-lg leading-relaxed sm:leading-relaxed">
          “Wen App has completely transformed how we handle live audience
          feedback. The real-time polling features are unmatched in
          reliability.”
        </blockquote>

        <footer className="mt-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />

          <div>
            <p className="font-semibold text-sm">Sarah Jenning</p>
            <p className="text-xs text-gray-500">
              Event Coordinator at TechFlow
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
