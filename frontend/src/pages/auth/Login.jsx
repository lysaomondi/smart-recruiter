import { useState } from "react";
import PasswordInput from "../../components/auth/PasswordInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Login form submitted", {
      email,
      password,
    });
  }

  return (
    <main className="min-h-screen bg-[#0F1830] px-4 py-8 text-[#F1F3F6] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl border border-[#1A2547] bg-[#1A2547] p-6 shadow-2xl sm:p-8">
          {/* Branding */}
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#2FD5A6]">
              Smart Recruiter
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#F1F3F6]/60">
              Sign in to continue to your assessment platform.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#0F1830] bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:border-[#2FD5A6] focus:ring-2 focus:ring-[#2FD5A6]/20"
              />
            </div>

            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#1A2547]"
            >
              Sign in
            </button>
          </form>

          {/* Registration link */}
          <p className="mt-6 text-center text-sm text-[#F1F3F6]/60">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-semibold text-[#2FD5A6] transition hover:text-[#F1F3F6]"
            >
              Register
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;