import React, { useState } from "react";

interface LoginFormProps {
  onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === process.env.NEXT_PUBLIC_LOGIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_LOGIN_PASSWORD
    ) {
      onLogin();
      setErrors({ username: false, password: false });
    } else {
      setErrors({ username: true, password: true });
    }
  };

  const handleInputFocus = (field: "username" | "password") => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-[#ebdbb2] shadow-md rounded p-6 w-80"
    >
      <div className="mb-4">
        <input
          className={`w-full p-2 text-[#3c3836] bg-[#fbf1c7] border rounded outline-none ${
            errors.username ? "border-[#cc241d]" : "border-[#d79921]"
          }`}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => handleInputFocus("username")}
          autoComplete="off"
        />
      </div>
      <div className="mb-4">
        <input
          className={`w-full p-2 text-[#3c3836] bg-[#fbf1c7] border rounded outline-none ${
            errors.password ? "border-[#cc241d]" : "border-[#d79921]"
          }`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => handleInputFocus("password")}
          autoComplete="off"
        />
      </div>
      <button
        className="w-full bg-[#b57614] hover:bg-[#af3a03] text-[#fbf1c7] font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
}
