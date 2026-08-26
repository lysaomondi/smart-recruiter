import { useState } from "react";
import { useDispatch } from "react-redux";

import { setActiveTab } from "../../store/slices/activeTabSlice";
import { loginSuccess } from "../../store/slices/authSlice";
import { registerUser } from "../../services/authService";

function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "INTERVIEWEE",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setError("");
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.password_confirmation
    ) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    if (!formData.role) {
      newErrors.role = "Please select an account type.";
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
    setIsLoading(true);

    try {
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: formData.role,
      };

      const data = await registerUser(payload);

      console.log("Registration successful:", data);

      /*
       * Registration creates the account.
       *
       * We do not automatically log the user in here because
       * your Django registration endpoint returns the created
       * user rather than JWT tokens.
       *
       * Send the user to the login screen.
       */
      dispatch(setActiveTab("login"));
    } catch (err) {
      console.error("Registration error:", err);

      const responseData = err.response?.data;

      if (responseData && typeof responseData === "object") {
        const backendErrors = {};

        Object.entries(responseData).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            backendErrors[field] = messages.join(" ");
          } else {
            backendErrors[field] = String(messages);
          }
        });

        setErrors(backendErrors);

        /*
         * Handle Django's non-field validation errors.
         */
        if (responseData.non_field_errors) {
          setError(
            Array.isArray(responseData.non_field_errors)
              ? responseData.non_field_errors.join(" ")
              : String(responseData.non_field_errors)
          );
        }
      } else {
        setError(
          "Registration failed. Please check your information and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  const inputClassName = (hasError) =>
    `w-full rounded-lg border bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
      hasError
        ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
        : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
    }`;

  return (
    <main className="min-h-screen bg-[#F1F3F6] px-4 py-8 text-[#F1F3F6] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl bg-[#1A2547] p-6 shadow-2xl sm:p-8">

          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#2FD5A6]">
              Smart Recruiter
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#F1F3F6]/60">
              Create an account to access the assessment platform.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-[#E85C4A]/30 bg-[#E85C4A]/10 px-4 py-3 text-sm text-[#E85C4A]"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClassName(errors.full_name)}
              />

              {errors.full_name && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.full_name}
                </p>
              )}
            </div>

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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClassName(errors.email)}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-[#E85C4A]">
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
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`${inputClassName(errors.password)} pr-20`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  required
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`${inputClassName(
                    errors.password_confirmation
                  )} pr-20`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6]"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password_confirmation && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium"
              >
                Account type
              </label>

              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className={inputClassName(errors.role)}
              >
                <option value="INTERVIEWEE">
                  Interviewee
                </option>

                <option value="RECRUITER">
                  Recruiter
                </option>
              </select>

              {errors.role && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#F1F3F6]/60">
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => dispatch(setActiveTab("login"))}
              className="font-semibold text-[#2FD5A6]"
            >
              Sign in
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;