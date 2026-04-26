"use client";

import { useState } from "react";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "business", label: "Business" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function AdminClient({ initialAuthed, initialContent }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [content, setContent] = useState(initialContent);

  if (!authed) {
    return (
      <LoginView
        onSuccess={async () => {
          setAuthed(true);
          const r = await fetch("/api/content", { cache: "no-store" });
          if (r.ok) setContent(await r.json());
        }}
      />
    );
  }

  return (
    <Dashboard
      content={content}
      setContent={setContent}
      onLogout={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        setAuthed(false);
      }}
    />
  );
}

function LoginView({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        onSuccess();
      } else {
        const d = await r.json().catch(() => ({}));
        setError(d.error || "로그인 실패");
      }
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <form className="admin-login" onSubmit={onSubmit}>
        <div className="admin-login-brand">SOULCRANE · Admin</div>
        <label className="admin-field">
          <span className="admin-field-label">비밀번호</span>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
          />
        </label>
        {error && <div className="admin-error">{error}</div>}
        <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ content, setContent, onLogout }) {
  const [tab, setTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(patch) {
    setContent((c) => ({ ...c, ...patch }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const r = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || "저장 실패");
      if (d.content) setContent(d.content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-brand">SOULCRANE · Admin</div>
        <div className="admin-header-actions">
          <a className="admin-link" href="/" target="_blank" rel="noopener noreferrer">
            사이트 보기 ↗
          </a>
          <button className="admin-link" onClick={onLogout}>로그아웃</button>
        </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`admin-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {tab === "hero" && (
          <HeroEditor value={content.hero} onChange={(v) => update({ hero: v })} />
        )}
        {tab === "business" && (
          <BusinessEditor value={content.business} onChange={(v) => update({ business: v })} />
        )}
        {tab === "work" && (
          <WorkEditor value={content.work} onChange={(v) => update({ work: v })} />
        )}
        {tab === "contact" && (
          <ContactEditor value={content.contact} onChange={(v) => update({ contact: v })} />
        )}
      </main>

      <div className="admin-save-bar">
        <div className="admin-save-msg">
          {error ? <span className="admin-error-inline">{error}</span> : null}
          {saved ? <span className="admin-saved">저장되었습니다.</span> : null}
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={save}
          disabled={saving}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="admin-field">
      <span className="admin-field-label">{label}</span>
      {children}
      {hint ? <span className="admin-hint">{hint}</span> : null}
    </label>
  );
}

function TextInput({ value, onChange, ...rest }) {
  return (
    <input
      className="admin-input"
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

function TextArea({ value, onChange, rows = 3, ...rest }) {
  return (
    <textarea
      className="admin-input admin-textarea"
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}

function HeroEditor({ value, onChange }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });
  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Hero</h2>
      <Field label="Eyebrow (상단 작은 텍스트)">
        <TextInput value={v.eyebrow} onChange={(x) => set({ eyebrow: x })} />
      </Field>
      <Field label="YouTube 영상 ID" hint="예: ScMzIvxBSi4 (유튜브 URL의 v= 뒤 값)">
        <TextInput value={v.youtubeId} onChange={(x) => set({ youtubeId: x })} />
      </Field>
      <Field label="타이틀 1줄차" hint="강조는 <em>텍스트</em> 로 감쌉니다.">
        <TextInput value={v.titleLine1} onChange={(x) => set({ titleLine1: x })} />
      </Field>
      <Field label="타이틀 2줄차" hint="강조는 <em>텍스트</em>">
        <TextInput value={v.titleLine2} onChange={(x) => set({ titleLine2: x })} />
      </Field>
      <Field label="하단 태그라인">
        <TextInput value={v.tagline} onChange={(x) => set({ tagline: x })} />
      </Field>
    </section>
  );
}

function BusinessEditor({ value, onChange }) {
  const v = value || {};
  const pillars = v.pillars || [];
  const set = (patch) => onChange({ ...v, ...patch });
  const setPillar = (i, patch) => {
    const next = pillars.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    set({ pillars: next });
  };
  const addPillar = () => set({ pillars: [...pillars, { title: "", desc: "" }] });
  const delPillar = (i) => set({ pillars: pillars.filter((_, idx) => idx !== i) });
  const movePillar = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= pillars.length) return;
    const next = [...pillars];
    [next[i], next[j]] = [next[j], next[i]];
    set({ pillars: next });
  };

  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Business</h2>
      <Field label="리드 카피" hint="강조는 <em>텍스트</em>. 줄바꿈은 Enter.">
        <TextArea rows={4} value={v.lead} onChange={(x) => set({ lead: x })} />
      </Field>

      <div className="admin-subhead">
        <h3 className="admin-subtitle">사업 영역</h3>
        <button type="button" className="admin-btn" onClick={addPillar}>+ 추가</button>
      </div>

      <div className="admin-cards">
        {pillars.map((p, i) => (
          <div className="admin-card" key={i}>
            <div className="admin-card-head">
              <span className="admin-card-idx">{String(i + 1).padStart(2, "0")}</span>
              <div className="admin-card-actions">
                <button type="button" className="admin-icon-btn" onClick={() => movePillar(i, -1)} title="위로">↑</button>
                <button type="button" className="admin-icon-btn" onClick={() => movePillar(i, 1)} title="아래로">↓</button>
                <button type="button" className="admin-icon-btn danger" onClick={() => delPillar(i)} title="삭제">×</button>
              </div>
            </div>
            <Field label="제목">
              <TextInput value={p.title} onChange={(x) => setPillar(i, { title: x })} />
            </Field>
            <Field label="설명">
              <TextArea rows={3} value={p.desc} onChange={(x) => setPillar(i, { desc: x })} />
            </Field>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkEditor({ value, onChange }) {
  const list = value || [];

  const setItem = (i, patch) => {
    onChange(list.map((w, idx) => (idx === i ? { ...w, ...patch } : w)));
  };
  const addItem = () =>
    onChange([...list, { type: "Film", title: "", date: "", status: "", image: "", description: "" }]);
  const delItem = (i) => onChange(list.filter((_, idx) => idx !== i));
  const moveItem = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <section className="admin-section">
      <div className="admin-subhead">
        <h2 className="admin-section-title">Work</h2>
        <button type="button" className="admin-btn" onClick={addItem}>+ 작품 추가</button>
      </div>
      <p className="admin-hint-block">
        · 날짜(date)를 비워두면 사이트에 날짜가 표시되지 않습니다.<br />
        · 포스터 이미지는 선택사항입니다.
      </p>

      <div className="admin-cards">
        {list.map((w, i) => (
          <div className="admin-card" key={i}>
            <div className="admin-card-head">
              <span className="admin-card-idx">{String(i + 1).padStart(2, "0")}</span>
              <div className="admin-card-actions">
                <button type="button" className="admin-icon-btn" onClick={() => moveItem(i, -1)}>↑</button>
                <button type="button" className="admin-icon-btn" onClick={() => moveItem(i, 1)}>↓</button>
                <button type="button" className="admin-icon-btn danger" onClick={() => delItem(i)}>×</button>
              </div>
            </div>

            <div className="admin-row-2">
              <Field label="카테고리">
                <select
                  className="admin-input"
                  value={w.type || ""}
                  onChange={(e) => setItem(i, { type: e.target.value })}
                >
                  <option value="Film">Film</option>
                  <option value="Drama">Drama</option>
                  <option value="Digital Content">Digital Content</option>
                  <option value="Other">Other</option>
                </select>
              </Field>
              <Field label="상태 (예: 준비중 / 공개)">
                <TextInput value={w.status} onChange={(x) => setItem(i, { status: x })} />
              </Field>
            </div>

            <Field label="제목">
              <TextInput value={w.title} onChange={(x) => setItem(i, { title: x })} />
            </Field>
            <Field label="날짜 (예: 2025.01 — 비우면 숨김)">
              <TextInput value={w.date} onChange={(x) => setItem(i, { date: x })} />
            </Field>

            <Field label="포스터 이미지 (선택)" hint="3:4 세로 비율 권장 — 다른 비율도 표시되지만 그리드에서 잘릴 수 있습니다.">
              <ImageUpload
                value={w.image}
                onChange={(x) => setItem(i, { image: x })}
              />
            </Field>

            <Field label="설명 (모달에 노출)" hint="썸네일 클릭 시 열리는 상세 모달에 표시됩니다. 줄바꿈은 Enter.">
              <TextArea
                rows={4}
                value={w.description}
                onChange={(x) => setItem(i, { description: x })}
              />
            </Field>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactEditor({ value, onChange }) {
  const v = value || {};
  const set = (patch) => onChange({ ...v, ...patch });
  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Contact</h2>
      <Field label="헤드라인" hint="강조는 <em>텍스트</em>. 줄바꿈은 Enter.">
        <TextArea rows={3} value={v.headline} onChange={(x) => set({ headline: x })} />
      </Field>
      <Field label="서브 카피">
        <TextArea rows={3} value={v.sub} onChange={(x) => set({ sub: x })} />
      </Field>
      <Field label="이메일">
        <TextInput value={v.email} onChange={(x) => set({ email: x })} />
      </Field>
      <Field label="대표번호 (Tel.)" hint="비우면 숨겨집니다.">
        <TextInput value={v.tel} onChange={(x) => set({ tel: x })} />
      </Field>
      <Field label="주소 (Address)" hint="줄바꿈 Enter. 비우면 숨겨집니다.">
        <TextArea rows={2} value={v.address} onChange={(x) => set({ address: x })} />
      </Field>

      <h3 className="admin-subtitle" style={{ marginTop: 24 }}>SNS 링크 (비우면 버튼 숨김)</h3>
      <Field label="Instagram URL">
        <TextInput value={v.instagram} onChange={(x) => set({ instagram: x })} />
      </Field>
      <Field label="YouTube URL">
        <TextInput value={v.youtube} onChange={(x) => set({ youtube: x })} />
      </Field>
      <Field label="X (Twitter) URL">
        <TextInput value={v.x} onChange={(x) => set({ x: x })} />
      </Field>
    </section>
  );
}

function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: form });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || "업로드 실패");
      onChange(d.url);
    } catch (err) {
      setError(String(err?.message || err));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="admin-upload">
      {value ? (
        <div className="admin-upload-preview">
          <img src={value} alt="" />
          <button type="button" className="admin-btn" onClick={() => onChange("")}>
            이미지 제거
          </button>
        </div>
      ) : null}
      <label className="admin-btn admin-upload-btn">
        {uploading ? "업로드 중..." : value ? "다른 이미지로 교체" : "이미지 업로드"}
        <input
          type="file"
          accept="image/*"
          onChange={onPick}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </label>
      {error && <span className="admin-error-inline">{error}</span>}
    </div>
  );
}
