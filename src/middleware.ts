import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/comment", "/account", "/admin"];

export default function validatePage(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.BLOG_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/login");
    }
  }
}
