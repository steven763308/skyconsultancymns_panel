"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 自动跳转：如果 cookie 已存在就跳转首页
  useEffect(() => {
    const isLoggedIn = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sky_logged_in="))?.split("=")[1];

    if (isLoggedIn === "true") {
      router.push("/");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "steven" && password === "scmns0901") {
      // 设置 cookie 有效期 7 天
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `sky_logged_in=true; path=/; expires=${expires.toUTCString()}`;

      router.push("/dashboard");
    } else {
      setError("账号或密码错误");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/image/scmnsLogo.png"
            alt="Sky Consultancy Logo"
            className="h-14"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sky Consultancy 登入
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="账号"
          className="border border-gray-300 w-full px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="密码"
          className="border border-gray-300 w-full px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          登录
        </button>
      </form>
    </main>
  );
}
