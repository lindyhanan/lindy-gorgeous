import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import Benefit from "../components/landing/Benefit";
import Services from "../components/landing/Services";
import MenuPreview from "../components/landing/MenuPreview";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import Contact from "../components/landing/Contact";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function GuestHome() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Page-scoped styles: loaded only while this component is mounted */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        /* Reset #root to block layout for this page only */
        #root {
          display: block !important;
          width: 100% !important;
          min-height: 100vh !important;
          height: auto !important;
        }

        body {
          margin: 0 !important;
          padding: 0 !important;
          background-color: #0b0806 !important;
        }

        html {
          scroll-behavior: smooth;
        }

        .guest-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          background-color: #0b0806;
          color: #f5f5f4;
          overflow-x: hidden;
        }

        /* Scroll-reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0b0806; }
        ::-webkit-scrollbar-thumb { background: rgba(179, 139, 83, 0.3); border-radius: 3px; }
      `}</style>

      <div className="guest-page">
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Benefit />
        <Services />
        <MenuPreview />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
