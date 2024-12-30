"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLogin } from "../loginContext";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: false, password: false });
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
      setIsLoggedIn(true);
      setErrors({ username: false, password: false });
    } else {
      setIsLoggedIn(false);
      setErrors({ username: true, password: true });
    }
  };

  const handleInputFocus = (field: "username" | "password") => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const loginFormRef = useRef<HTMLDivElement>(null);
  const loginButtonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        loginFormRef.current &&
        !loginFormRef.current.contains(event.target as Node) &&
        loginButtonRef.current &&
        !loginButtonRef.current.contains(event.target as Node)
      ) {
        setUsername("");
        setPassword("");
        setShowLoginForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <div>
          <div ref={loginButtonRef}>
            <button
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="w-20 px-3 md:px-4 py-2 bg-[#b57614] text-[#fbf1c7] rounded hover:bg-[#af3a03] text-sm md:text-base flex items-center justify-center"
            >
              Login
            </button>
          </div>

          {showLoginForm && (
            <div ref={loginFormRef} className="relative z-50">
              <div className="md:absolute md:top-8 md:right-0">
                <form
                  onSubmit={handleLogin}
                  className="bg-[#ebdbb2] shadow-md rounded p-6 w-80"
                >
                  <div className="mb-4">
                    <input
                      className={`w-full p-2 text-[#3c3836] bg-[#fbf1c7] border rounded outline-none ${
                        errors.username
                          ? "border-[#cc241d]"
                          : "border-[#d79921]"
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
                        errors.password
                          ? "border-[#cc241d]"
                          : "border-[#d79921]"
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setShowLoginForm(false);
            setUsername("");
            setPassword("");
          }}
          className="w-20 px-3 md:px-4 py-2 bg-[#cc241d] text-[#fbf1c7] rounded hover:bg-[#9d0006] text-sm md:text-base flex items-center justify-center"
        >
          Logout
        </button>
      )}
    </>
  );
}
