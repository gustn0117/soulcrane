import fs from "fs/promises";
import fsSync from "fs";
import path from "path";

const DATA_DIR = fsSync.existsSync("/app/data")
  ? "/app/data"
  : path.join(process.cwd(), "data");

const CONTENT_FILE = path.join(DATA_DIR, "content.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "SOULCRANE",
    youtubeId: "ScMzIvxBSi4",
    titleLine1: "경험을 넘어 <em>트렌드</em>를",
    titleLine2: "트렌드를 넘어 <em>감동</em>을",
    tagline: "Film · Drama · Digital Content",
  },
  business: {
    lead: "소울크레인은 <em>영상 콘텐츠</em>를 기반으로\n세대를 아우르는 감동을 선사하는 전문 영상 제작사입니다.",
    pillars: [
      {
        title: "Film",
        desc: "장편 · 단편 영화 기획부터 제작까지, 스크린에 새로운 감각을 새깁니다.",
      },
      {
        title: "Drama",
        desc: "장르를 넘나드는 드라마 시리즈로 시대의 정서를 담아냅니다.",
      },
      {
        title: "Digital Content",
        desc: "디지털 환경에 최적화된 콘텐츠로 새로운 관객과 만납니다.",
      },
    ],
  },
  work: [
    { type: "Film", title: "작품 1", date: "2025.01", status: "준비중", image: "", description: "" },
    { type: "Drama", title: "작품 2", date: "", status: "준비중", image: "", description: "" },
    { type: "Digital Content", title: "작품 3", date: "", status: "준비중", image: "", description: "" },
  ],
  seo: {
    title: "SOULCRANE",
    description:
      "소울크레인 - 영상 콘텐츠를 기반으로 세대를 아우르는 감동을 선사하는 전문 영상 제작사",
    ogImage: "",
    siteUrl: "https://soulcrane.co.kr",
  },
  contact: {
    headline: "Next work,\n<em>together.</em>",
    sub: "기획, 제작, 협업 문의는 언제든 환영합니다.\n아래 메일로 연락 주시면 빠르게 회신 드리겠습니다.",
    email: "contact@soulcrane.com",
    tel: "02-000-0000",
    address: "",
    instagram: "",
    youtube: "",
    x: "",
  },
};

function mergeDeep(base, over) {
  if (Array.isArray(over)) return over;
  if (over === null || typeof over !== "object") return over;
  const out = { ...(base || {}) };
  for (const k of Object.keys(over)) {
    const bv = base ? base[k] : undefined;
    out[k] =
      bv && typeof bv === "object" && !Array.isArray(bv)
        ? mergeDeep(bv, over[k])
        : over[k];
  }
  return out;
}

export async function readContent() {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const data = JSON.parse(raw);
    return mergeDeep(DEFAULT_CONTENT, data);
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function writeContent(data) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const merged = mergeDeep(DEFAULT_CONTENT, data);
  await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}
