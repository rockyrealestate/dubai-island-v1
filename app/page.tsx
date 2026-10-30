import { AboutSection } from "@/components/AboutSection";
import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden font-sans perspective-1000">
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
