import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F1830] px-6 py-12 text-[#F1F3F6]">
      <section className="w-full max-w-3xl text-center">
        <p className="mb-8 text-xs font-bold tracking-[0.3em] text-[#2FD5A6] sm:text-sm">
          SMART RECRUITER
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Smarter Assessments. Better Hiring Decisions.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#F1F3F6]/75 sm:text-lg">
          Create, manage, and take technical assessments with confidence. Smart
          Recruiter makes technical hiring simpler and more effective.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-10 rounded-lg bg-[#F2A93B] px-7 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#0F1830]"
        >
          Get Started
        </button>
        <p className="mt-10 text-sm font-medium tracking-wide text-[#2FD5A6]">
          Assess. Evaluate. Hire Smarter.
        </p>
      </section>
    </main>
  );
}
