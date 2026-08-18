import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "../../components/auth/PasswordInput";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(loginStart());

    // Temporary authentication simulation.
    // The Flask backend will replace this later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "najib@gmail.com" && password === "password123") {
      const user = {
        id: 1,
        name: "Test User",
        email: email,
        role: "interviewee",
      };

      dispatch(
        loginSuccess({
          user,
          token: "temporary-demo-token",
        })
      );

      if (user.role === "recruiter") {
        navigate("/recruiter");
      } else {
        navigate("/interviewee");
      }
    } else {
      dispatch(loginFailure("Invalid email or password."));
    }
  }

  return (
    <main className="min-h-screen bg-[#0F1830] px-4 py-8 text-[#F1F3F6] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl border border-[#1A2547] bg-[#1A2547] p-6 shadow-2xl sm:p-8">
          {/* Header */}
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

          {/* Authentication error */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-[#E85C4A]/30 bg-[#E85C4A]/10 px-4 py-3 text-sm text-[#E85C4A]"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (errors.email) {
                    setErrors((current) => ({
                      ...current,
                      email: "",
                    }));
                  }
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                className={`w-full rounded-lg border bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
                  errors.email
                    ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
                    : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
                }`}
              />

              {errors.email && (
                <p
                  id="email-error"
                  className="mt-2 text-sm text-[#E85C4A]"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <PasswordInput
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);

                  if (errors.password) {
                    setErrors((current) => ({
                      ...current,
                      password: "",
                    }));
                  }
                }}
              />

              {errors.password && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#1A2547] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-[#F1F3F6]/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#2FD5A6] transition hover:text-[#F1F3F6]"
            >
              Register
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;