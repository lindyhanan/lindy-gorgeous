import { useState } from "react";
import { supabase } from "../../lib/supabase";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.email.trim()) errs.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Format email tidak valid";
    if (!form.subject.trim()) errs.subject = "Subjek wajib diisi";
    if (!form.message.trim()) errs.message = "Pesan wajib diisi";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setSubmitting(true);

      // Insert ke tabel contacts
      const { error } = await supabase.from("contacts").insert({
        name: form.name,
        email: form.email,
        message: `${form.subject}: ${form.message}`,
      });

      if (error) throw error;

      // Also subscribe to newsletter
      await supabase.from("newsletters").upsert(
        { email: form.email, is_active: true },
        { onConflict: "email" }
      );

      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0d0a08, #0b0806);
        }
        .contact-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(179, 139, 83, 0.04);
          filter: blur(120px);
          pointer-events: none;
        }
        .contact-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
        }
        .contact-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .contact-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 12px 0;
        }
        .contact-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
        }
        .contact-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 20px auto 0;
        }
        .contact-desc {
          color: #a1a1aa;
          font-size: 14px;
          line-height: 1.6;
          text-align: center;
          max-width: 480px;
          margin: 20px auto 0;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-label-field {
          font-size: 12px;
          font-weight: 600;
          color: #a1a1aa;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .contact-input,
        .contact-textarea {
          background: rgba(15, 12, 10, 0.6);
          border: 1px solid rgba(179, 139, 83, 0.15);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          color: #ffffff;
          transition: border-color 0.3s ease;
          outline: none;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: #555;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-color: #b38b53;
        }
        .contact-input.error,
        .contact-textarea.error {
          border-color: #ef4444;
        }
        .contact-textarea {
          resize: vertical;
          min-height: 140px;
        }
        .contact-error {
          font-size: 11px;
          color: #ef4444;
          margin: 0;
        }
        .contact-submit {
          background: #b38b53;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 16px 40px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          align-self: center;
          margin-top: 8px;
        }
        .contact-submit:hover {
          background: #967241;
          box-shadow: 0 10px 25px rgba(179, 139, 83, 0.4);
          transform: scale(1.03);
        }
        .contact-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }
        .contact-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 12px;
          padding: 16px 24px;
          text-align: center;
          color: #4ade80;
          font-size: 14px;
          font-weight: 500;
          margin-top: 16px;
        }
        @media (min-width: 768px) {
          .contact-section { padding: 128px 64px; }
          .contact-title { font-size: 36px; }
          .contact-row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />

        <div className="contact-inner">
          <div className="contact-header">
            <p className="contact-label">Contact</p>
            <h2 className="contact-title">Hubungi Kami</h2>
            <div className="contact-divider" />
            <p className="contact-desc">
              Punya pertanyaan, saran, atau ingin kerja sama? Jangan ragu untuk
              menghubungi tim kami.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="contact-field">
                <label className="contact-label-field">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap"
                  className={`contact-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && <p className="contact-error">{errors.name}</p>}
              </div>

              <div className="contact-field">
                <label className="contact-label-field">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@contoh.com"
                  className={`contact-input ${errors.email ? "error" : ""}`}
                />
                {errors.email && <p className="contact-error">{errors.email}</p>}
              </div>
            </div>

            <div className="contact-field">
              <label className="contact-label-field">Subjek</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subjek pesan"
                className={`contact-input ${errors.subject ? "error" : ""}`}
              />
              {errors.subject && <p className="contact-error">{errors.subject}</p>}
            </div>

            <div className="contact-field">
              <label className="contact-label-field">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesan Anda di sini..."
                className={`contact-textarea ${errors.message ? "error" : ""}`}
              />
              {errors.message && <p className="contact-error">{errors.message}</p>}
            </div>

            <button type="submit" className="contact-submit" disabled={submitting}>
              {submitting ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {submitted && (
              <div className="contact-success">
                ✓ Pesan berhasil dikirim! Tim kami akan menghubungi Anda segera.
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
