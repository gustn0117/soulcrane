"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

export default function Work({ data }) {
  const list = Array.isArray(data) ? data : [];
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  const open = openIndex !== null ? list[openIndex] : null;

  return (
    <section id="work" className="section alt">
      <div className="section-container">
        <Reveal variant="reveal-blur">
          <div className="section-head">
            <h2 className="section-title">Work</h2>
            <span className="section-bar" />
          </div>
        </Reveal>

        <div className="work-grid">
          {list.map((w, i) => (
            <Reveal key={i} variant="reveal" delay={Math.min(i + 1, 3)}>
              <button
                type="button"
                className="work-card"
                onClick={() => setOpenIndex(i)}
              >
                <div className="work-poster">
                  {w.image ? (
                    <img src={w.image} alt={w.title || ""} loading="lazy" />
                  ) : (
                    <div className="work-poster-empty">
                      <span>{w.type}</span>
                    </div>
                  )}
                  <div className="work-poster-veil" />
                  <div className="work-poster-cta">View ↗</div>
                </div>
                <div className="work-card-meta">
                  <span className="work-card-tag">{w.type}</span>
                  <h3 className="work-card-title">{w.title}</h3>
                  <span className="work-card-sub">
                    {[w.date, w.status].filter(Boolean).join(" · ")}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open ? <WorkModal item={open} onClose={() => setOpenIndex(null)} /> : null}
    </section>
  );
}

function WorkModal({ item, onClose }) {
  return (
    <div className="work-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="work-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="work-modal-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
        <div className="work-modal-grid">
          <div className="work-modal-img">
            {item.image ? (
              <img src={item.image} alt={item.title || ""} />
            ) : (
              <div className="work-modal-empty">
                <span>{item.type}</span>
              </div>
            )}
          </div>
          <div className="work-modal-text">
            <span className="work-modal-tag">{item.type}</span>
            <h2 className="work-modal-title">{item.title}</h2>
            {(item.date || item.status) && (
              <div className="work-modal-meta">
                {[item.date, item.status].filter(Boolean).join(" · ")}
              </div>
            )}
            {item.description ? (
              <p className="work-modal-desc">{item.description}</p>
            ) : (
              <p className="work-modal-desc work-modal-desc-empty">
                상세 설명이 곧 업데이트됩니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
