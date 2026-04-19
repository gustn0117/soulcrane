import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Business from "@/components/Business";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await readContent();
  return (
    <>
      <Nav />
      <main>
        <Hero data={content.hero} />
        <Business data={content.business} />
        <div className="section-divider" />
        <Work data={content.work} />
        <div className="section-divider" />
        <Contact data={content.contact} />
      </main>
      <Footer />
    </>
  );
}
