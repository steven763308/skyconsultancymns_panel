// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 可配置：所有受保护路径前缀
const protectedPaths = ['/', '/dashboard', '/admin', '/setting'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ 检查当前路径是否属于受保护路径
  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) {
    return NextResponse.next(); // 放行不受保护的路径
  }

  // ✅ 读取 cookie 判断是否登录
  const loggedIn = request.cookies.get('sky_logged_in')?.value;

  // ❌ 未登录则跳转 login 页面
  if (loggedIn !== 'true') {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ 已登录则正常访问
  return NextResponse.next();
}

// ✅ 应用 middleware 的路径规则
export const config = {
  matcher: [
    '/',                      // 首页
    '/dashboard',             // dashboard 主页
    '/dashboard/:path*',      // dashboard 子页
    '/admin',                 // admin 主页
    '/admin/:path*',          // admin 子页
    '/setting',               // setting 主页
    '/setting/:path*',        // setting 子页
  ],
};
