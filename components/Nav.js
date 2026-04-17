"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { id: "home", label: "HOME" },
  { id: "business", label: "BUSINESS" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section detection
      const offsets = LINKS.map((l) => {
        const el = document.getElementById(l.id);
        return el ? { id: l.id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const current = offsets
        .filter((o) => o.top <= 120)
        .sort((a, b) => b.top - a.top)[0];
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`nav-fixed ${scrolled ? "scrolled" : ""}`}>
      <div className="section-container">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => go("home")} aria-label="SOULCRANE home">
            <Image
              src="/soulcrane-horizontal.png"
              alt="SOULCRANE"
              width={502}
              height={137}
              priority
            />
          </button>
          <div className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`nav-link ${active === l.id ? "active" : ""}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
