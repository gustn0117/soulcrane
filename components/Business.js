import Reveal from "./Reveal";

function textToHtml(s) {
  return (s || "").replace(/\n/g, "<br/>");
}

export default function Business({ data }) {
  const d = data || {};
  const lead = d.lead || "";
  const pillars = d.pillars || [];

  return (
    <section id="business" className="section">
      <div className="section-container">
        <Reveal variant="reveal-blur">
          <div className="section-head">
            <h2 className="section-title">Business</h2>
            <span className="section-bar" />
          </div>
        </Reveal>

        <Reveal variant="reveal">
          <p
            className="biz-lead"
            dangerouslySetInnerHTML={{ __html: textToHtml(lead) }}
          />
        </Reveal>

        <div className="biz-grid">
          {pillars.map((p, i) => (
            <Reveal key={i} variant="reveal" delay={Math.min(i + 1, 3)}>
              <article className="biz-card">
                <span className="biz-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="biz-card-title">{p.title}</h3>
                <p className="biz-card-desc">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
