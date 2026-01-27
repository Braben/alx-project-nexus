import SignupForm from "@/components/common/SignupForm";
import TestimonialPanel from "@/components/common/TestimonialPanel";

export default function SignupPage() {
  return (
    <main className=" w-full mx-auto grid lg:grid-cols-2">
      {/* Left visual panel */}
      <TestimonialPanel />

      {/* Right form panel */}
      <SignupForm />
    </main>
  );
}
