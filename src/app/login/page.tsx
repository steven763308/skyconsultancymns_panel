"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 自动跳转：如果已经登入了就进主页
  useEffect(() => {
    const loggedIn = localStorage.getItem("sky_logged_in");
    if (loggedIn === "true") {
      router.push("/");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "steven" && password === "scmns0901") {
      localStorage.setItem("sky_logged_in", "true");
      router.push("/");
    } else {
      setError("账号或密码错误");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sky Consultancy 登入</h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="账号"
          className="border w-full px-4 py-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          className="border w-full px-4 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          登录
        </button>
      </form>
    </main>
  );
}
