import { NextRequest, NextResponse } from "next/server";
import { COOKIE_LANG, DEFAULT_LANG } from "@constants";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) return;
  if (request.nextUrl.pathname.includes("/api/")) return;
  const locale = request.cookies[COOKIE_LANG] ?? "en";

  const NO_ACTIVE_SESSION =
    !request.nextUrl.pathname.endsWith("/login") && !request.cookies.session;

  // redirect to cookie locale
  if (request.nextUrl.locale === DEFAULT_LANG) {
    request.nextUrl.pathname = `/${locale}${
      NO_ACTIVE_SESSION
        ? "/login"
        : request.nextUrl.pathname.replace(DEFAULT_LANG, "")
    }`;

    return NextResponse.redirect(request.nextUrl);
  }

  // redirect to login page if no active session
  if (NO_ACTIVE_SESSION) {
    request.nextUrl.pathname = `/login`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (request.cookies.session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect("/");
  }
}
