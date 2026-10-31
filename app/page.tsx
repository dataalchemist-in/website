import { Contact, Footer } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowWeBuild } from "@/components/HowWeBuild";
import { MotionRoot } from "@/components/motion";
import { Products } from "@/components/Products";

export default function Home() {
  return (
    <MotionRoot>
      <Header />
      <main>
        <Hero />
        <Products />
        <HowWeBuild />
        <Contact />
      </main>
      <Footer />
    </MotionRoot>
  );
}
