// app/(marketing)/page.tsx

import Faq from "@/components/marketing/faq-section";
import Features from "@/components/marketing/features-section";
import Footer from "@/components/marketing/footer-section";
import Header from "@/components/marketing/header-section";
import HeroSection from "@/components/marketing/hero-section";
import Pricing from "@/components/marketing/pricing-section";
import Testimonials from "@/components/marketing/testimonials-section";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-nunito">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      
    </div>
  );
}