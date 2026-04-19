import Reveal from "./Reveal";

// Edit dates here. Leave `date` empty/null to hide it.
const WORKS = [
  {
    no: "01",
    type: "Film",
    title: "작품 1",
    date: "2025.01",
    status: "준비중",
  },
  {
    no: "02",
    type: "Drama",
    title: "작품 2",
    date: "",
    status: "준비중",
  },
  {
    no: "03",
    type: "Digital Content",
    title: "작품 3",
    date: "",
    status: "준비중",
  },
];

export default function Work() {
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
          {WORKS.map((w, i) => (
            <Reveal key={w.no} variant="reveal" delay={Math.min(i + 1, 3)}>
              <div className="work-item">
                <span className="work-num">{w.no}</span>
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
