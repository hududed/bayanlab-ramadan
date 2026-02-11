import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://ramadan.bayanlab.com",
  "http://localhost:3000",
];

export function guardRequest(req: NextRequest): NextResponse | null {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Allow if origin or referer matches
  const isAllowed =
    (origin && ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) ||
    (referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o)));

  if (!isAllowed) {
    return NextResponse.json(
      {
        error: "Direct API access not allowed",
        message: "Get your own API key at https://bayanlab.com/docs",
      },
      { status: 403 }
    );
  }

  return null; // request is OK
}
