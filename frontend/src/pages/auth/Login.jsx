import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";

import { setActiveTab } from "../../store/slices/activeTabSlice";
import { loginUser } from "../../services/authService";

function Login() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

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
    setError("");

    dispatch(loginStart());

    try {
      /*
       * Send login credentials to Django.
       */
      const data = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("Login response:", data);

      /*
       * Django returns:
       *
       * {
       *   access: "...",
       *   refresh: "...",
       *   user: {
       *     id: 1,
       *     full_name: "...",
       *     email: "...",
       *     role: "RECRUITER"
       *   }
       * }
       */

      if (!data.access || !data.refresh || !data.user) {
        throw new Error("Invalid login response from server.");
      }

      /*
       * Save JWT tokens.
       */
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      /*
       * Save the authenticated user.
       */
      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      /*
       * Update Redux authentication state.
       */
      dispatch(loginSuccess(data.user));

      /*
       * IMPORTANT:
       * Django uses uppercase role values:
       *
       * RECRUITER
       * INTERVIEWEE
       */

      if (data.user.role === "RECRUITER") {
        dispatch(setActiveTab("recruiter-dashboard"));
      } else if (data.user.role === "INTERVIEWEE") {
        dispatch(setActiveTab("interviewee-dashboard"));
      } else {
        console.error("Unknown user role:", data.user.role);

        dispatch(loginFailure("Unknown account role."));
        setError("Your account has an invalid role.");
      }
    } catch (err) {
      console.error("Login error:", err);

      const responseData = err.response?.data;

      let message = "Invalid email or password.";

      if (responseData?.detail) {
        message = responseData.detail;
      } else if (responseData?.non_field_errors) {
        message = Array.isArray(responseData.non_field_errors)
          ? responseData.non_field_errors.join(" ")
          : responseData.non_field_errors;
      } else if (err.message) {
        message = err.message;
      }

      setError(message);

      dispatch(loginFailure(message));
    }
  }

  return (
    <main className="min-h-screen bg-[#F1F3F6] px-4 py-8 text-[#F1F3F6] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl bg-[#1A2547] p-6 shadow-2xl sm:p-8">

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
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (errors.email) {
                    setErrors((current) => ({
                      ...current,
                      email: "",
                    }));
                  }

                  setError("");
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
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (errors.password) {
                      setErrors((current) => ({
                        ...current,
                        password: "",
                      }));
                    }

                    setError("");
                  }}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "password-error"
                      : undefined
                  }
                  className={`w-full rounded-lg border bg-[#0F1830] px-4 py-3 pr-20 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
                    errors.password
                      ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
                      : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-2 text-sm text-[#E85C4A]"
                >
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

            <button
              type="button"
              onClick={() => dispatch(setActiveTab("register"))}
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