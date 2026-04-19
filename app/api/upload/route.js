import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { UPLOAD_DIR } from "@/lib/content";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req) {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "파일이 없습니다." }, { status: 400 });
    }
    const name = file.name || "upload";
    const m = name.match(ALLOWED_EXT);
    if (!m) {
      return NextResponse.json(
        { ok: false, error: "이미지 파일만 업로드 가능합니다 (png, jpg, webp, gif, svg)." },
        { status: 400 }
      );
    }
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "파일 크기는 15MB 이하여야 합니다." }, { status: 400 });
    }
    const ext = m[0].toLowerCase();
    const finalName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, finalName), buf);
    return NextResponse.json({ ok: true, url: `/api/uploads/${finalName}`, name: finalName });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 400 });
  }
}
