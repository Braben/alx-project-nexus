import Link from "next/link";
import { BarChart3 } from "lucide-react";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-purple-100 ">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8 ">
          <h3 className="text-blue-600 font-extralight text-sm flex items-center gap-2">
            New: AI-Powered Question Generation
          </h3>
        </div>

        {/* Heading */}

        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 leading-tight">
          Turn Your Audience
          <br />
          <span className="text-gray-600">Into A Conversation</span>
        </h1>

        {/* Subtext */}
        <div className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          <p>
            The Zero-friction polling platform for events, elections, and
            classroom engagement.
          </p>
          <p className="text-blue-600 font-bold">
            No app downloads. Just real-time results.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/polls"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Create Your First Poll
          </Link>

          <Link
            href="/register"
            className="border border-gray-300 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Watch Demo
          </Link>
        </div>

        {/* Extra hint */}
        <p className="mt-6 text-sm text-gray-400">
          No signup required to vote • Real-time results
        </p>
      </div>
      <section className="pb-12">
        <Image
          src="/assets/hero-image.png"
          alt="Hero Image"
          width={600}
          height={400}
          className="mx-auto mb-12 shadow-purple-800 shadow-2xl rounded-lg hover:scale-115 transition-transform duration-600"
        />
      </section>

      {/* features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-24">
        <h3 className="col-span-1 md:col-span-3 text-center text-2xl font-bold">
          Voting shouldn&apos;t be a chore
        </h3>
        <p className="col-span-1 md:col-span-3 text-center text-gray-600 mb-4">
          Eliminate friction and boost participation rates instantly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Scan to Join</h3>
          <p className="text-gray-600">
            One-second entry via QR-code. No downloads or registration required
            for attendees or voters.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Instant Interaction</h3>
          <p className="text-gray-600">
            Low latency websocket voting means results appear on screen in
            real-time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Single Vote Security</h3>
          <p className="text-gray-600">
            Smart device dectection and browser tracking prevents double-voting
            abuse.
          </p>
        </div>
      </section>

      {/* Election Mode Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        <div className="flex flex-col justify-center">
          <p className="text-purple-600 mb-4">Election Mode</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Election Grade Precision
          </h2>
          <p className="text-gray-600 mb-6">
            Running a serious election? Enable Election Mode to add candidate
            profiles, strict one-person-one-vote enforcement, and detailed audit
            logs.
          </p>
          <p className="font-bold text-purple-600">
            Candidate Biographies and Photos
          </p>
          <p className="font-bold text-purple-600">Secret Ballot Capability</p>
          <p className="font-bold text-purple-600">
            Audit Logs for Transparency
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <Image
            src="/assets/election-grade.png"
            alt="Election Mode"
            width="600"
            height={400}
            className="mx-auto shadow-purple-800 shadow-2xl rounded-lg border-transparent hover:scale-105 transition-transform duration-600"
          />
        </div>
      </section>

      {/* Visualisation Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <Image
            src="/assets/visualise.png"
            alt="Election Mode"
            width="600"
            height={400}
            className="mx-auto shadow-purple-800 shadow-2xl rounded-lg  hover:scale-105 transition-transform duration-600"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-purple-600 mb-4">REAL-TIME VISUALISATION</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Visualise Your Data
          </h2>
          <p className="text-gray-600 mb-6">
            Go beyond simple bars. Watch your data come live with dynamic charts
            and graphs that update in real-time as votes fly in.
          </p>

          <button className=" text-lg text-black px-6 py-3 rounded-md font-light border border-gray-500  hover:bg-purple-700 transition w-max hover:text-white shadow-sm">
            Explore chart types
          </button>
        </div>
      </section>

      {/* experience section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        <div className="flex flex-col justify-center">
          <p className="text-purple-600 mb-4">White Labeling</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Brand Your Experience
          </h2>
          <p className="text-gray-600 mb-6">
            Make it yours. upload logos, customize colors, and create a seamless
            branded experience for your audience from start to finish.
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
          <Image
            src="/assets/election-grade.png"
            alt="Election Mode"
            width="600"
            height={400}
            className="mx-auto shadow-purple-800 shadow-2xl rounded-lg border-transparent hover:scale-105 transition-transform duration-600"
          />
        </div>
      </section>

      {/* how it works */}
      <section className="container-full mx-auto px-4 bg-white">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-6 py-8 max-w-6xl bg-white">
          <h3 className="col-span-1 md:col-span-3 text-center text-2xl font-bold py-8">
            How It Works
          </h3>

          <div className="flex flex-col  items-center bg-white p-6 rounded-lg">
            <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Scan to Join</h3>
            <p className="text-gray-600 text-center">
              One-second entry via QR-code. No downloads or registration
              required for attendees or voters.
            </p>
          </div>
          <div className="flex flex-col  items-center bg-white p-6 rounded-lg ">
            <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Interaction</h3>
            <p className="text-gray-600 text-center">
              Low latency websocket voting means results appear on screen in
              real-time.
            </p>
          </div>
          <div className="flex flex-col  items-center bg-white p-6 rounded-lg ">
            <div className="w-10 h-10 text-white b-4 flex items-center justify-center rounded-full bg-purple-700 border-4 border-purple-300 font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Single Vote Security</h3>
            <p className="text-gray-600 text-center">
              Smart device dectection and browser tracking prevents
              double-voting abuse.
            </p>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="container-full mx-auto px-8 bg-gray-300/10 relative">
        <div className=" mx-auto px-6 py-16 md:max-w-4xl ">
          <RiDoubleQuotesL className=" text-gray-600" />
          <p className="sm:p-16 text-xl text-center">
            PulsePoll changed the energy of our 500 person conference. the
            zero-login feature meant 95% participation from the very first
            minute.
          </p>
          <div className="">
            <p className="font-semibold text-sm">Sarah Jenkins</p>
            <p className="text-sm text-gray-600">Event Lead - TechCof</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-full mx-auto px-8 py-16 bg-radial-[at_50%_15%] from-blue-400 via-blue-800 to-indigo-900 to-90%">
        <h2 className="text-center font-bold text-3xl text-white">
          READY TO ENGAGE YOUR AUDIENCE
        </h2>
        <p className="text-center text-white mt-4">
          Join 1001+ organizations using PulsePoll to make audience engagement
          simple, secure and fast.
        </p>
        <button className="mx-auto block bg-white text-blue-800 font-bold py-2  px-6 rounded-lg mt-16 hover:bg-gray-100 transition duration-300">
          Get Started for Free
        </button>
      </section>
    </section>
  );
}
