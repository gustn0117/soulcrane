import Reveal from "./Reveal";

const PILLARS = [
  {
    num: "01",
    title: "Film",
    desc: "장편 · 단편 영화 기획부터 제작까지, 스크린에 새로운 감각을 새깁니다.",
  },
  {
    num: "02",
    title: "Drama",
    desc: "장르를 넘나드는 드라마 시리즈로 시대의 정서를 담아냅니다.",
  },
  {
    num: "03",
    title: "Digital Content",
    desc: "디지털 환경에 최적화된 콘텐츠로 새로운 관객과 만납니다.",
  },
];

export default function Business() {
  return (
    <section id="business" className="section">
      <div className="section-container">
        <Reveal variant="reveal-blur">
          <div className="section-head">
            <span className="section-num">01</span>
            <h2 className="section-title">Business</h2>
            <span className="section-bar" />
          </div>
        </Reveal>

        <Reveal variant="reveal">
          <p className="biz-lead">
            소울크레인은 <span className="accent">영상 콘텐츠</span>를 기반으로
            <br />
            세대를 아우르는 감동을 선사하는 전문 영상 제작사입니다.
          </p>
        </Reveal>

        <div className="biz-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} variant="reveal" delay={i + 1}>
              <article className="biz-card">
                <span className="biz-card-num">{p.num}</span>
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
