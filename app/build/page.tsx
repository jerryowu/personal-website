"use client";
import { useState } from "react";

export default function Build() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "jerry" && password === "password") {
      setIsLoggedIn(true);
      setIsUsernameError(false);
      setIsPasswordError(false);
    } else {
      setIsUsernameError(true);
      setIsPasswordError(true);
    }
  };

  const handleUsernameInputFocus = () => {
    setIsUsernameError(false);
  };

  const handlePasswordInputFocus = () => {
    setIsPasswordError(false);
  };

  if (isLoggedIn) {
    return (
      <div className="p-4 bg-[#fbf1c7] text-[#3c3836]">
        <h1 className="text-2xl mb-4 text-[#b57614]">
          Welcome to the Build Page
        </h1>
        <p>You are now logged in and can modify this page.</p>
      </div>
    );
  }
  // Gruvbox color palette
  const gruvboxColors = {
    bg0: "#282828",
    bg1: "#3c3836",
    fg: "#ebdbb2",
    red: "#cc241d",
    green: "#98971a",
    yellow: "#d79921",
    blue: "#458588",
    purple: "#b16286",
    aqua: "#689d6a",
    orange: "#d65d0f",
  };

  if (isLoggedIn) {
    return (
      <div
        className="p-4"
        style={{ backgroundColor: gruvboxColors.bg0, color: gruvboxColors.fg }}
      >
        <h1 className="text-2xl mb-4" style={{ color: gruvboxColors.yellow }}>
          Welcome to the Build Page
        </h1>
        <p>You are now logged in and can modify this page.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start h-100 bg-[#fbf1c7] pt-20">
      <form
        onSubmit={handleLogin}
        className="bg-[#ebdbb2] shadow-md rounded px-16 pt-10 pb-12 mb-4 w-[28rem]"
      >
        <div className="mb-8">
          <label
            className="block text-[#3c3836] text-xl font-bold mb-4"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-4 px-5 text-[#3c3836] bg-[#fbf1c7] leading-tight focus:outline-none focus:shadow-outline text-xl ${
              isUsernameError ? "border-[#cc241d]" : ""
            }`}
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleUsernameInputFocus}
            autoComplete="off"
          />
        </div>
        <div className="mb-10">
          <label
            className="block text-[#3c3836] text-xl font-bold mb-4"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-4 px-5 text-[#3c3836] bg-[#fbf1c7] mb-5 leading-tight focus:outline-none focus:shadow-outline text-xl ${
              isPasswordError ? "border-[#cc241d]" : ""
            }`}
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handlePasswordInputFocus}
            autoComplete="off"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-[#b57614] hover:bg-[#af3a03] text-[#fbf1c7] font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline text-xl"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
