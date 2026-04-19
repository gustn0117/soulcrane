"use client";

export default function Hero({ data }) {
  const d = data || {};
  const youtubeId = (d.youtubeId || "").trim();
  const eyebrow = d.eyebrow ?? "SOULCRANE";
  const titleLine1 = d.titleLine1 ?? "경험을 넘어 <em>트렌드</em>를";
  const titleLine2 = d.titleLine2 ?? "트렌드를 넘어 <em>감동</em>을";
  const tagline = d.tagline ?? "Film · Drama · Digital Content";

  return (
    <section id="home" className="hero">
      <div className="hero-backdrop">
        {youtubeId ? (
          <iframe
            className="hero-video"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${youtubeId}&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
            title="SOULCRANE showreel"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : null}
        <div className="hero-scrim" />
        <div className="hero-scanline" />
        <div className="hero-grain" />
      </div>

      <header className="hero-bar">
        <span className="hero-mark">{eyebrow}</span>
        <span className="hero-bar-line" />
        <span className="hero-bar-caption">Showreel</span>
      </header>

      <div className="hero-stage">
        <div className="hero-stage-rule" />
        {tagline ? <span className="hero-kicker">{tagline}</span> : null}
        <h1 className="hero-headline">
          <span className="hero-headline-line">
            <span dangerouslySetInnerHTML={{ __html: titleLine1 }} />
          </span>
          <span className="hero-headline-line">
            <span dangerouslySetInnerHTML={{ __html: titleLine2 }} />
          </span>
        </h1>
      </div>

      <footer className="hero-footer">
        <span className="hero-scroll-label">Scroll</span>
        <span className="hero-scroll-line" />
      </footer>
    </section>
  );
}
