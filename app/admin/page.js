import { isAuthed } from "@/lib/auth";
import { readContent, DEFAULT_CONTENT } from "@/lib/content";
import AdminClient from "./AdminClient";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "SOULCRANE · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = isAuthed();
  const content = authed ? await readContent() : DEFAULT_CONTENT;
  return <AdminClient initialAuthed={authed} initialContent={content} />;
}
