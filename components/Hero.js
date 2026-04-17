"use client";

// Replace this with the company's actual showreel YouTube ID
const YOUTUBE_ID = "ScMzIvxBSi4";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${YOUTUBE_ID}&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1`}
          title="SOULCRANE showreel"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content">
        <div className="hero-eyebrow">SOULCRANE</div>
        <h1 className="hero-title">
          경험을 넘어 <em>트렌드</em>를
          <br />
          트렌드를 넘어 <em>감동</em>을
        </h1>
        <div className="hero-divider" />
        <p className="hero-tagline">Film · Drama · Digital Content</p>
      </div>
      <div className="scroll-indicator">
        <span className="label">SCROLL</span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
