import { NextResponse } from "next/server";
import { UPLOAD_DIR } from "@/lib/content";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

export async function GET(_req, { params }) {
  const segments = Array.isArray(params.path) ? params.path : [params.path];
  const rel = segments.join("/");
  const resolved = path.resolve(UPLOAD_DIR, rel);
  if (!resolved.startsWith(path.resolve(UPLOAD_DIR))) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  try {
    const buf = await fs.readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    return new NextResponse(buf, {
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
