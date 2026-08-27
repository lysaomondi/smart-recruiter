import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../store/slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "interviewee",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validateForm() {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
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
    return newErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
    setErrors((cur) => ({ ...cur, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(
        registerUser({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          passwordConfirmation: formData.confirmPassword,
          role: formData.role.toUpperCase(),
        })
      ).unwrap();
      navigate("/login");
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        setErrors(err);
      } else {
        setErrors({ email: err || "Registration failed." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const inputClassName = (hasError) =>
    `w-full rounded-lg border bg-[#2FD5A6] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
      hasError
        ? "border-[#E85C4A] focus:border-[#E85C4A] focus:ring-[#E85C4A]/20"
        : "border-[#0F1830] focus:border-[#2FD5A6] focus:ring-[#2FD5A6]/20"
    }`;

  return (
    <main className="min-h-screen bg-[#0F1830] px-4 py-8 text-[#F1F3F6] sm:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <section className="w-full max-w-md rounded-2xl bg-[#1A2547] p-6 shadow-2xl sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#2FD5A6]">
              Smart Recruiter
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-[#F1F3F6]/60">
              Create an account to access the assessment platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">Full name</label>
              <input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleChange} placeholder="Your full name" className={inputClassName(errors.fullName)} />
              {errors.fullName && <p className="mt-2 text-sm text-[#E85C4A]">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClassName(errors.email)} />
              {errors.email && <p className="mt-2 text-sm text-[#E85C4A]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="At least 8 characters" className={`${inputClassName(errors.password)} pr-20`} />
                <button type="button" onClick={() => setShowPassword((cur) => !cur)} className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-[#E85C4A]">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">Confirm password</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className={`${inputClassName(errors.confirmPassword)} pr-20`} />
                <button type="button" onClick={() => setShowConfirmPassword((cur) => !cur)} className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]">
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-[#E85C4A]">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium">Account type</label>
              <select id="role" name="role" required value={formData.role} onChange={handleChange} className={inputClassName(errors.role)}>
                <option value="interviewee">Interviewee</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#1A2547] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#F1F3F6]/60">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")} className="font-semibold text-[#2FD5A6] transition hover:text-[#F1F3F6]">
              Sign in
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;
