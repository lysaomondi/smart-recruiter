import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setActiveTab } from "../../store/slices/activeTabSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "interviewee",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check each field before attempting to save the new user.
  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  // Update one form field and clear that field's previous error.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  // Validate and save the account locally. New users must sign in separately.
  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Read the existing accounts and prevent duplicate email addresses.
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email = formData.email.trim().toLowerCase();
    const emailIsTaken = users.some(
      (user) => user.email.toLowerCase() === email
    );

    if (emailIsTaken) {
      const message = "An account with this email already exists.";
      setErrors({ email: message });
      return;
    }

    // Create a user matching the localStorage user structure.
    const newUser = {
      id: Date.now(),
      name: formData.name.trim(),
      email,
      password: formData.password,
      role: formData.role,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    dispatch(setActiveTab("login"));
    navigate("/login");
  }

  const inputClassName = (hasError) =>
    `w-full rounded-lg border bg-[#0F1830] px-4 py-3 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:ring-2 ${
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
            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[#F1F3F6]/60">
              Create an account to access the assessment platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClassName(errors.name)} />
              {errors.name && <p className="mt-2 text-sm text-[#E85C4A]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClassName(errors.email)} />
              {errors.email && <p className="mt-2 text-sm text-[#E85C4A]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="At least 6 characters" className={`${inputClassName(errors.password)} pr-20`} />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-[#E85C4A]">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">Confirm password</label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className={`${inputClassName(errors.confirmPassword)} pr-20`} />
                <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]">
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

            <button type="submit" className="w-full rounded-lg bg-[#2FD5A6] px-4 py-3 font-semibold text-[#0F1830] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#2FD5A6] focus:ring-offset-2 focus:ring-offset-[#1A2547]">
              Create account
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
