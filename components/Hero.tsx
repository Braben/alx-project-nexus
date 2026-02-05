// import Link from "next/link";
// import { BarChart3 } from "lucide-react";
// import Image from "next/image";
// import { RiDoubleQuotesL } from "react-icons/ri";
// import PollPreview from "./common/PollPreview";

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-b from-blue-100 to-purple-100 ">
//       <div className="max-w-6xl mx-auto px-6 py-24 text-center">
//         {/* Icon */}
//         <div className="flex justify-center mb-8 ">
//           <h3 className="text-blue-600 font-extralight text-sm flex items-center gap-2">
//             New: AI-Powered Question Generation
//           </h3>
//         </div>

//         {/* Heading */}

//         <h1 className="text-4xl md:text-6xl font-bold text-gray-700 leading-tight">
//           Turn Your Audience
//           <br />
//           <span className="text-gray-600">Into A Conversation</span>
//         </h1>

//         {/* Subtext */}
//         <div className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
//           <p>
//             The Zero-friction polling platform for events, elections, and
//             classroom engagement.
//           </p>
//           <p className="text-blue-600 font-bold">
//             No app downloads. Just real-time results.
//           </p>
//         </div>

//         {/* CTA Buttons */}
//         <div className="mt-10 flex justify-center gap-4 flex-wrap">
//           <Link
//             href="/polls"
//             className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//           >
//             Create Your First Poll
//           </Link>

//           <Link
//             href="/register"
//             className="border border-gray-300 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
//           >
//             Watch Demo
//           </Link>
//         </div>

//         {/* Extra hint */}
//         <p className="mt-6 text-sm text-gray-400">
//           No signup required to vote • Real-time results
//         </p>
//       </div>
//       <section className="pb-12">
//         <Image
//           src="/assets/hero-image.png"
//           alt="Hero Image"
//           width={600}
//           height={400}
//           className="mx-auto mb-12 shadow-purple-800 shadow-2xl rounded-lg hover:scale-115 transition-transform duration-600"
//         />
//       </section>
//       {/* poll preview */}
//       <PollPreview />
//       {/* features */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-24">
//         <h3 className="col-span-1 md:col-span-3 text-center text-2xl font-bold">
//           Voting shouldn&apos;t be a chore
//         </h3>
//         <p className="col-span-1 md:col-span-3 text-center text-gray-600 mb-4">
//           Eliminate friction and boost participation rates instantly.
//         </p>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Scan to Join</h3>
//           <p className="text-gray-600">
//             One-second entry via QR-code. No downloads or registration required
//             for attendees or voters.
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Instant Interaction</h3>
//           <p className="text-gray-600">
//             Low latency websocket voting means results appear on screen in
//             real-time.
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Single Vote Security</h3>
//           <p className="text-gray-600">
//             Smart device dectection and browser tracking prevents double-voting
//             abuse.
//           </p>
//         </div>
//       </section>

//       {/* Election Mode Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
//         <div className="flex flex-col justify-center">
//           <p className="text-purple-600 mb-4">Election Mode</p>
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Election Grade Precision
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Running a serious election? Enable Election Mode to add candidate
//             profiles, strict one-person-one-vote enforcement, and detailed audit
//             logs.
//           </p>
//           <p className="font-bold text-purple-600">
//             Candidate Biographies and Photos
//           </p>
//           <p className="font-bold text-purple-600">Secret Ballot Capability</p>
//           <p className="font-bold text-purple-600">
//             Audit Logs for Transparency
//           </p>
//         </div>
//         <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
//           <Image
//             src="/assets/election-grade.png"
//             alt="Election Mode"
//             width="600"
//             height={400}
//             className="mx-auto shadow-purple-800 shadow-2xl rounded-lg border-transparent hover:scale-105 transition-transform duration-600"
//           />
//         </div>
//       </section>

//       {/* Visualisation Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 pb-24">
//         <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
//           <Image
//             src="/assets/visualise.png"
//             alt="Election Mode"
//             width="600"
//             height={400}
//             className="mx-auto shadow-purple-800 shadow-2xl rounded-lg  hover:scale-105 transition-transform duration-600"
//           />
//         </div>
//         <div className="flex flex-col justify-center">
//           <p className="text-purple-600 mb-4">REAL-TIME VISUALISATION</p>
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Visualise Your Data
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Go beyond simple bars. Watch your data come live with dynamic charts
//             and graphs that update in real-time as votes fly in.
//           </p>

//           <button className=" text-lg text-black px-6 py-3 rounded-md font-light border border-gray-500  hover:bg-purple-700 transition w-max hover:text-white shadow-sm">
//             Explore chart types
//           </button>
//         </div>
//       </section>

//       {/* experience section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
//         <div className="flex flex-col justify-center">
//           <p className="text-purple-600 mb-4">White Labeling</p>
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Brand Your Experience
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Make it yours. upload logos, customize colors, and create a seamless
//             branded experience for your audience from start to finish.
//           </p>
//         </div>
//         <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
//           <Image
//             src="/assets/election-grade.png"
//             alt="Election Mode"
//             width="600"
//             height={400}
//             className="mx-auto shadow-purple-800 shadow-2xl rounded-lg border-transparent hover:scale-105 transition-transform duration-600"
//           />
//         </div>
//       </section>

//       {/* how it works */}
//       <section className="container-full mx-auto px-4 bg-white">
//         <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-6 py-8 max-w-6xl bg-white">
//           <h3 className="col-span-1 md:col-span-3 text-center text-2xl font-bold py-8">
//             How It Works
//           </h3>

//           <div className="flex flex-col  items-center bg-white p-6 rounded-lg">
//             <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
//               1
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Scan to Join</h3>
//             <p className="text-gray-600 text-center">
//               One-second entry via QR-code. No downloads or registration
//               required for attendees or voters.
//             </p>
//           </div>
//           <div className="flex flex-col  items-center bg-white p-6 rounded-lg ">
//             <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
//               2
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Instant Interaction</h3>
//             <p className="text-gray-600 text-center">
//               Low latency websocket voting means results appear on screen in
//               real-time.
//             </p>
//           </div>
//           <div className="flex flex-col  items-center bg-white p-6 rounded-lg ">
//             <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
//               3
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Single Vote Security</h3>
//             <p className="text-gray-600 text-center">
//               Smart device dectection and browser tracking prevents
//               double-voting abuse.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* testimonials */}
//       <section className="container-full mx-auto px-8 bg-gray-300/10 relative">
//         <div className=" mx-auto px-6 py-16 md:max-w-4xl ">
//           <RiDoubleQuotesL className=" text-gray-600" />
//           <p className="sm:p-16 text-xl text-center">
//             PulsePoll changed the energy of our 500 person conference. the
//             zero-login feature meant 95% participation from the very first
//             minute.
//           </p>
//           <div className="">
//             <p className="font-semibold text-sm">Sarah Jenkins</p>
//             <p className="text-sm text-gray-600">Event Lead - TechCof</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="container-full mx-auto px-8 py-16 bg-radial-[at_50%_15%] from-blue-400 via-blue-800 to-indigo-900 to-90%">
//         <h2 className="text-center font-bold text-3xl text-white">
//           READY TO ENGAGE YOUR AUDIENCE
//         </h2>
//         <p className="text-center text-white mt-4">
//           Join 1001+ organizations using PulsePoll to make audience engagement
//           simple, secure and fast.
//         </p>
//         <button className="mx-auto block bg-white text-blue-800 font-bold py-2  px-6 rounded-lg mt-16 hover:bg-gray-100 transition duration-300">
//           Get Started for Free
//         </button>
//       </section>
//     </section>
//   );
// }
import Link from "next/link";
import Image from "next/image";
import { BarChart3 } from "lucide-react";
import { RiDoubleQuotesL } from "react-icons/ri";
import PollPreview from "./common/PollPreview";

export default function Hero() {
  return (
    <main className="bg-gradient-to-b from-blue-100 to-purple-100">
      {/* ================= HERO ================= */}
      <header
        className="max-w-6xl mx-auto px-6 py-20 text-center"
        aria-labelledby="hero-heading"
      >
        {/* Badge */}
        <p className="inline-flex items-center gap-2 text-blue-700 text-sm font-medium bg-blue-50 px-4 py-1 rounded-full">
          New: AI-Powered Question Generation
        </p>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="mt-6 text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          Turn Your Audience
          <br />
          <span className="text-blue-700">Into A Conversation</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          The zero-friction polling platform for events, elections, and
          classroom engagement.
        </p>

        <p className="text-blue-700 font-semibold">
          No app downloads. Just real-time results.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/polls/create"
            aria-label="Create your first poll"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 transition"
          >
            Create Your First Poll
          </Link>

          <Link
            href="/demo"
            aria-label="Watch product demo"
            className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-400 transition"
          >
            Watch Demo
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          No signup required • Real-time results
        </p>
      </header>

      {/* ================= HERO IMAGE ================= */}
      <div className="px-6 pb-16 flex justify-center">
        <Image
          src="/assets/hero-image.png"
          alt="Live poll dashboard showing votes updating in real time"
          width={700}
          height={450}
          priority
          sizes="(max-width: 768px) 100vw, 700px"
          className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* ================= POLL PREVIEW ================= */}
      <section aria-label="Live poll preview" className="pb-24">
        <PollPreview />
      </section>

      {/* ================= FEATURES ================= */}
      <section
        aria-labelledby="features-heading"
        className="max-w-6xl mx-auto px-6 pb-12"
      >
        <h2
          id="features-heading"
          className="text-2xl font-bold text-center mb-4"
        >
          Voting shouldn’t be a chore
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Eliminate friction and boost participation instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Scan to Join",
              text: "One-second entry via QR code. No downloads required.",
            },
            {
              title: "Instant Interaction",
              text: "Results update in real-time with ultra-low latency.",
            },
            {
              title: "Single Vote Security",
              text: "Smart device detection prevents double voting.",
            },
          ].map((item, i) => (
            <article
              key={i}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <BarChart3
                aria-hidden="true"
                className="w-8 h-8 text-blue-600 mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= ELECTION MODE ================= */}
      <section
        aria-labelledby="election-heading"
        className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Text */}
        <div>
          <p className="text-purple-700 font-medium mb-2">Election Mode</p>

          <h2 id="election-heading" className="text-3xl font-bold mb-4">
            Election-Grade Precision
          </h2>

          <p className="text-gray-600 mb-6">
            Enable strict one-person-one-vote enforcement, candidate profiles,
            and detailed audit logs for high-stakes voting.
          </p>

          {/* Accessible list */}
          <ul className="space-y-2 text-purple-700 font-medium list-disc list-inside">
            <li>Candidate biographies & photos</li>
            <li>Secret ballot capability</li>
            <li>Transparent audit logs</li>
          </ul>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/assets/election-grade.png"
            alt="Secure election dashboard with verified candidates and audit logs"
            width={650}
            height={420}
            sizes="(max-width: 768px) 100vw, 650px"
            className="rounded-xl shadow-xl hover:scale-105 transition"
          />
        </div>
      </section>

      {/* ================= VISUALIZATION ================= */}
      <section
        aria-labelledby="visual-heading"
        className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Image first on mobile */}
        <div className="order-2 md:order-1 flex justify-center">
          <Image
            src="/assets/visualise.png"
            alt="Dynamic charts updating live as votes are submitted"
            width={650}
            height={420}
            sizes="(max-width: 768px) 100vw, 650px"
            className="rounded-xl shadow-xl hover:scale-105 transition"
          />
        </div>

        {/* Text */}
        <div className="order-1 md:order-2">
          <p className="text-purple-700 font-medium mb-2">
            Real-Time Visualisation
          </p>

          <h2 id="visual-heading" className="text-3xl font-bold mb-4">
            Visualise Your Data
          </h2>

          <p className="text-gray-600 mb-6">
            Watch your data come alive with charts and graphs that update
            instantly as votes are cast.
          </p>

          <Link
            href="/features/charts"
            aria-label="Explore available chart types"
            className="inline-block border border-gray-400 px-6 py-3 rounded-lg hover:bg-purple-700 hover:text-white transition"
          >
            Explore chart types
          </Link>
        </div>
      </section>
      {/* ================= BRANDING ================= */}
      <section
        aria-labelledby="branding-heading"
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <p className="text-purple-700 font-medium mb-2">White Labeling</p>

          <h2 id="branding-heading" className="text-3xl font-bold mb-4">
            Brand Your Experience
          </h2>

          <p className="text-gray-600">
            Upload logos, customize colors, and create a seamless branded
            experience from start to finish.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/assets/election-grade.png"
            alt="Custom branded poll interface with logos and brand colors"
            width={650}
            height={420}
            className="rounded-xl shadow-xl hover:scale-105 transition"
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section aria-labelledby="how-heading" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            id="how-heading"
            className="text-2xl md:text-3xl font-bold text-center mb-14"
          >
            How It Works
          </h2>

          <ol className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Scan to join instantly",
                desc: "One-second entry via QR code. No downloads or registration needed.",
              },
              {
                title: "Vote in real time",
                desc: "Cast your vote instantly and securely.",
              },
              {
                title: "Watch results update live",
                desc: "See real-time results as votes come in.",
              },
            ].map((step, i) => (
              <li
                key={i}
                className="flex flex-col items-center text-center bg-gray-50 p-8 rounded-xl"
              >
                <span
                  aria-hidden="true"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-white font-bold mb-4"
                >
                  {i + 1}
                </span>

                <p className="font-semibold">{step.title}</p>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section
        aria-labelledby="testimonial-heading"
        className="bg-gray-50 py-16 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <RiDoubleQuotesL
            aria-hidden="true"
            className="mx-auto text-gray-400 text-4xl mb-4"
          />

          <h2 id="testimonial-heading" className="sr-only">
            Testimonial
          </h2>

          <blockquote className="text-xl italic text-gray-800">
            “PulsePoll changed the energy of our 500-person conference. The
            zero-login feature meant 95% participation from the very first
            minute.”
          </blockquote>

          <footer className="mt-6 text-sm text-gray-600">
            — Sarah Jenkins, Event Lead
          </footer>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        aria-labelledby="cta-heading"
        className="py-20 text-center bg-gradient-to-r from-blue-700 to-indigo-900 text-white px-6"
      >
        <h2 id="cta-heading" className="text-3xl font-bold">
          Ready to Engage Your Audience?
        </h2>

        <p className="mt-4 max-w-xl mx-auto text-white/90">
          Join thousands of organizations using PulsePoll to make engagement
          simple, secure and fast.
        </p>

        <Link
          href="/register"
          aria-label="Get started for free"
          className="inline-block mt-10 bg-white text-blue-800 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition"
        >
          Get Started for Free
        </Link>
      </section>
    </main>
  );
}
