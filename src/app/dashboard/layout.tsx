"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ 加入 router
import { ReactNode, useEffect, useState } from "react";
import { Pin, PinOff, LogOut, Home } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter(); // ✅ 初始化 router

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isCollapsed = !isPinned && !isHovered;

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <Home size={18} /> },
    { label: "Draft", href: "/dashboard/draftzone", icon: <Home size={18} /> },
    { label: "Services", href: "/dashboard/service", icon: <Home size={18} /> },
    { label: "用户管理", href: "/dashboard/user", icon: <Home size={18} /> },
    { label: "设定", href: "/dashboard/settings", icon: <Home size={18} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // 初始设定
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          bg-gray-800 text-white p-4 flex flex-col transition-all duration-300 ease-in-out 
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobile ? "fixed z-50 h-full top-0 left-0" : ""}
        `}
        onMouseEnter={() => !isPinned && setIsHovered(true)}
        onMouseLeave={() => !isPinned && setIsHovered(false)}
      >
        <div className="flex justify-between items-center mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-bold transition-opacity duration-200">
              Sky Consultancy
            </h2>
          )}
          <button
            onClick={() => setIsPinned(!isPinned)}
            className="text-white hover:text-yellow-400 transition ml-auto"
            title={isPinned ? "Unpin" : "Pin"}
          >
            {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
          </button>
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`py-2 px-2 rounded mb-2 hover:bg-gray-700 flex items-center transition-all duration-200 ${
              pathname === link.href ? "bg-gray-700" : ""
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {!isCollapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">后台系统</h1>
          <button
            className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => {
              // ✅ 清除 JWT Token Cookie
              document.cookie =
                "sky_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              // ✅ 跳转回主页或 login 页
              router.push("/");
            }}
          >
            <LogOut size={16} />
            <span>登出</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
