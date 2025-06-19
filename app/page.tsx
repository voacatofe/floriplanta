import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ValuesSection from "@/components/sections/ValuesSection";
import FeaturedSections from "@/components/sections/FeaturedSections";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogHighlightSection from "@/components/sections/BlogHighlightSection";
import CtaNewsletterSection from "@/components/sections/CtaNewsletterSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <HeroSection />
      <MissionSection />
      <BenefitsSection />
      <ValuesSection />
      <FeaturedSections />
      <TestimonialsSection />
      <BlogHighlightSection />
      <CtaNewsletterSection />
      <Footer />
    </main>
  );
} 