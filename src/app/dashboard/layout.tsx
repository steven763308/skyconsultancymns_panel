// dashboard/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "用户管理", href: "/dashboard/user" },
    { label: "设定", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Sky Consultancy</h2>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`py-2 px-4 rounded mb-2 hover:bg-gray-700 ${
              pathname === link.href ? "bg-gray-700" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">后台系统</h1>
          <div>
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => {
                document.cookie =
                  "sky_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/";
              }}
            >
              登出
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
