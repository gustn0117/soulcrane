"use client";

export default function Hero({ data }) {
  const d = data || {};
  const youtubeId = d.youtubeId || "ScMzIvxBSi4";
  const eyebrow = d.eyebrow ?? "SOULCRANE";
  const titleLine1 = d.titleLine1 ?? "경험을 넘어 <em>트렌드</em>를";
  const titleLine2 = d.titleLine2 ?? "트렌드를 넘어 <em>감동</em>을";
  const tagline = d.tagline ?? "Film · Drama · Digital Content";

  return (
    <section id="home" className="hero">
      <div className="hero-video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${youtubeId}&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
          title="SOULCRANE showreel"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content">
        <div className="hero-eyebrow">{eyebrow}</div>
        <h1 className="hero-title">
          <span dangerouslySetInnerHTML={{ __html: titleLine1 }} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: titleLine2 }} />
        </h1>
        <div className="hero-divider" />
        <p className="hero-tagline">{tagline}</p>
      </div>
      <div className="scroll-indicator">
        <span className="label">SCROLL</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
