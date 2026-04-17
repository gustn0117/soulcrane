import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Business from "@/components/Business";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Business />
        <div className="section-divider" />
        <Work />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
