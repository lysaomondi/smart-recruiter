import { useState } from "react";

function PasswordInput({ value, onChange, name = "password" }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#F1F3F6]"
      >
        Password
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className="w-full rounded-lg border border-[#1A2547] bg-[#1A2547] px-4 py-3 pr-20 text-[#F1F3F6] outline-none transition placeholder:text-[#F1F3F6]/40 focus:border-[#2FD5A6] focus:ring-2 focus:ring-[#2FD5A6]/20"
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-[#2FD5A6] transition hover:text-[#F1F3F6]"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;