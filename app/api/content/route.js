import { NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/content";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(req) {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const saved = await writeContent(data);
    return NextResponse.json({ ok: true, content: saved });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 400 });
  }
}
