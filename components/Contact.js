import Reveal from "./Reveal";

const EMAIL = "contact@soulcrane.com";

// Set to "" to hide an SNS button automatically
const SNS = {
  instagram: "",
  youtube: "",
  x: "",
};

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Contact() {
  const snsItems = [
    { key: "instagram", url: SNS.instagram, label: "Instagram", Icon: InstagramIcon },
    { key: "youtube", url: SNS.youtube, label: "YouTube", Icon: YoutubeIcon },
    { key: "x", url: SNS.x, label: "X", Icon: XIcon },
  ].filter((s) => s.url);

  return (
    <section id="contact" className="section">
      <div className="section-container">
        <Reveal variant="reveal-blur">
          <div className="section-head">
            <span className="section-num">03</span>
            <h2 className="section-title">Contact</h2>
            <span className="section-bar" />
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="reveal">
            <div>
              <h3 className="contact-headline">
                다음 작품을<br />
                <span className="accent">함께</span> 만들어 보세요.
              </h3>
              <p className="contact-sub">
                기획, 제작, 협업 문의는 언제든 환영합니다.<br />
                아래 메일로 연락 주시면 빠르게 회신 드리겠습니다.
              </p>
              <a className="contact-cta" href={`mailto:${EMAIL}`}>
                CONTACT US
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal variant="reveal" delay={1}>
            <div className="contact-info">
              <div className="contact-row">
                <div className="contact-label">Company</div>
                <div className="contact-value">SOULCRANE</div>
              </div>
              <div className="contact-row">
                <div className="contact-label">Email</div>
                <div className="contact-value">
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-label">Field</div>
                <div className="contact-value">Film · Drama · Digital Content</div>
              </div>
              {snsItems.length > 0 && (
                <div className="contact-row">
                  <div className="contact-label">Follow</div>
                  <div className="sns-row">
                    {snsItems.map(({ key, url, label, Icon }) => (
                      <a
                        key={key}
                        className="sns-link"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
