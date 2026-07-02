import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Features from "../components/landing/Features";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function GuestHome() {
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

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0b0806; }
        ::-webkit-scrollbar-thumb { background: rgba(179, 139, 83, 0.3); border-radius: 3px; }
      `}</style>

      <div className="guest-page">
        <Navbar />
        <Hero />
        <About />
        <Features />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
