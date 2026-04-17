import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-inner">
          <div className="footer-logo">
            <Image
              src="/soulcrane-horizontal.png"
              alt="SOULCRANE"
              width={502}
              height={137}
            />
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} SOULCRANE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
