import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "../../components/auth/PasswordInput";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  clearAuthError,
} from "../../store/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "interviewee",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Clear the field's validation error.
    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    // Clear the general authentication error.
    if (error) {
      dispatch(clearAuthError());
    }

    // Clear the success message when the user edits the form.
    if (successMessage) {
      setSuccessMessage("");
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccessMessage("");
    dispatch(registerStart());

    // Temporary registration simulation.
    // The backend API will replace this later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = {
      id: 1,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
    };

    dispatch(
      registerSuccess({
        user,
        token: "temporary-demo-token",
      })
    );

    setSuccessMessage(
      "Account created successfully. Redirecting to login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#F1F3F6]/60">
              Create an account to access the assessment platform.
            </p>
          </div>

          {/* Success message */}
          {successMessage && (
            <div
              role="status"
              className="mb-5 rounded-lg border border-[#2FD5A6]/30 bg-[#2FD5A6]/10 px-4 py-3 text-sm text-[#2FD5A6]"
            >
              {successMessage}
            </div>
          )}

          {/* General authentication error */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-[#E85C4A]/30 bg-[#E85C4A]/10 px-4 py-3 text-sm text-[#E85C4A]"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                className={`w-full rounded-lg border bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
                  errors.name
                    ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
                    : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
                }`}
              />

              {errors.name && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.name}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                className={`w-full rounded-lg border bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
                  errors.email
                    ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
                    : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
                }`}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                label="Password"
              />

              {errors.password && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                label="Confirm password"
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-[#E85C4A]">
                  {errors.confirmPassword}
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
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#0F1830] bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition focus:border-[#2FD5A6] focus:ring-2 focus:ring-[#2FD5A6]/20"
              >
                <option value="interviewee">Interviewee</option>
                <option value="recruiter">Recruiter</option>
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
              className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#1A2547] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-[#F1F3F6]/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2FD5A6] transition hover:text-[#F1F3F6]"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;