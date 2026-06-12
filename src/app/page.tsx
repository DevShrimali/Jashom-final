import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Services from "@/components/sections/Services";
import TrustStats from "@/components/sections/TrustStats";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import WhyJashom from "@/components/sections/WhyJashom";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <Services />
        <TrustStats />
        <CaseStudies />
        <Testimonials />
        <WhyJashom />
        <Blog />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
