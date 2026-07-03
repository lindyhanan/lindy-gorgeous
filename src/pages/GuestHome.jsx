import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
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
  const { profile, isAdmin } = useAuth();

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
        {/* Alert bar for admin */}
        {isAdmin && (
          <div style={{
            background: "linear-gradient(90deg, #991b1b, #b91c1c)",
            color: "#fff",
            textAlign: "center",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            zIndex: 60,
            position: "relative",
          }}>
            🛡️ Mode Admin Aktif — Anda login sebagai Admin
            <Link to="/" style={{
              color: "#fff",
              background: "rgba(255,255,255,0.2)",
              padding: "4px 16px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
            }}>
              Buka Dashboard
            </Link>
          </div>
        )}

        {/* Member greeting banner */}
        {profile && profile.role === "MEMBER" && (
          <div style={{
            background: "linear-gradient(90deg, rgba(179,139,83,0.15), rgba(179,139,83,0.05))",
            color: "#d4d4d4",
            textAlign: "center",
            padding: "6px 16px",
            fontSize: "12px",
            fontWeight: 500,
            zIndex: 60,
            position: "relative",
            borderBottom: "1px solid rgba(179,139,83,0.1)",
          }}>
            ☕ Selamat datang kembali, {profile.full_name}! Poin Anda: <strong style={{color: "#b38b53"}}>{profile.total_points || 0}</strong> pts
          </div>
        )}

        <Navbar />
        <Hero />
        <div className="reveal"><About /></div>
        <div className="reveal"><Features /></div>
        <div className="reveal"><Benefit /></div>
        <div className="reveal reveal-delay-1"><Services /></div>
        <div className="reveal reveal-delay-1"><MenuPreview /></div>
        <div className="reveal reveal-delay-2"><Testimonials /></div>
        <div className="reveal reveal-delay-2"><FAQ /></div>
        <div className="reveal reveal-delay-3"><Contact /></div>
        <div className="reveal"><CTA /></div>
        <Footer />
      </div>
    </>
  );
}
