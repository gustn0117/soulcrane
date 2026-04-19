import Reveal from "./Reveal";

export default function Work({ data }) {
  const list = Array.isArray(data) ? data : [];

  return (
    <section id="work" className="section alt">
      <div className="section-container">
        <Reveal variant="reveal-blur">
          <div className="section-head">
            <h2 className="section-title">Work</h2>
            <span className="section-bar" />
          </div>
        </Reveal>

        <div className="work-list">
          {list.map((w, i) => (
            <Reveal key={i} variant="reveal" delay={Math.min(i + 1, 3)}>
              <div className="work-item">
                <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
                {w.image ? (
                  <div className="work-thumb">
                    <img src={w.image} alt={w.title || ""} />
                  </div>
                ) : null}
                <span className="work-tag">{w.type}</span>
                <h3 className="work-title">{w.title}</h3>
                <span className="work-meta">
                  {[w.date, w.status].filter(Boolean).join(" · ")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
