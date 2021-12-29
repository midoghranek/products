// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = (request) => {
  const user_role = request.cookies.user_role;
  if (user_role !== "manager") return NextResponse.redirect("/");
};
