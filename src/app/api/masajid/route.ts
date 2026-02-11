import { NextRequest, NextResponse } from "next/server";
import { guardRequest } from "@/lib/guard";

const API_BASE = "https://api.bayanlab.com";
const HEADERS = {
  "X-API-Key": process.env.BAYANLAB_API_KEY || "",
  "User-Agent": "BayanLab-Ramadan/1.0",
};

export async function GET(req: NextRequest) {
  const blocked = guardRequest(req);
  if (blocked) return blocked;

  try {
    const { searchParams } = req.nextUrl;
    const region = searchParams.get("region") || "CO";
    const city = searchParams.get("city") || "";

    const params = new URLSearchParams({ region, limit: "5" });
    if (city) params.set("city", city);

    const res = await fetch(`${API_BASE}/v1/masajid?${params}`, { headers: HEADERS });
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch", detail: String(e) }, { status: 500 });
  }
}
