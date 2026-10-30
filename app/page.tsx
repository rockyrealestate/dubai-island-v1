import Header from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white font-sans text-black">
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
