export default function About() {
  return (
    <>
      <style>{`
        .about-section {
          position: relative;
          padding: 100px 24px;
          overflow: hidden;
          background: linear-gradient(to bottom, #0b0806, #0e0a08, #0b0806);
        }
        .about-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 64px;
          flex-direction: column;
        }
        .about-img-wrap {
          flex: 1;
          width: 100%;
        }
        .about-img-frame {
          position: relative;
          border-radius: 16px;
        }
        .about-img-glow {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: rgba(179, 139, 83, 0.1);
          border-radius: 24px;
          filter: blur(4px);
        }
        .about-img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(179, 139, 83, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          position: relative;
        }
        .about-content {
          flex: 1;
          max-width: 560px;
        }
        .about-label {
          color: #b38b53;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0 0 16px 0;
        }
        .about-title {
          font-size: 30px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0 0 24px 0;
          line-height: 1.2;
        }
        .about-divider {
          width: 64px;
          height: 2px;
          background: #b38b53;
          margin: 0 0 24px 0;
        }
        .about-text {
          color: #c7c7cc;
          font-size: 15px;
          line-height: 1.8;
          margin: 0 0 20px 0;
        }
        @media (min-width: 768px) {
          .about-section { padding: 128px 64px; }
          .about-inner { flex-direction: row; }
          .about-title { font-size: 36px; }
          .about-img { height: 420px; }
        }
      `}</style>

      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-img-wrap">
            <div className="about-img-frame">
              <div className="about-img-glow" />
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80"
                alt="Brewing Process"
                className="about-img"
              />
            </div>
          </div>

          <div className="about-content">
            <p className="about-label">Our Journey</p>
            <h2 className="about-title">Kisah Di Balik Rasa Premium</h2>
            <div className="about-divider" />
            <p className="about-text">
              Berdiri sejak tahun 2021, kami percaya bahwa secangkir kopi yang
              sempurna bermula dari integritas proses. Kami bekerja sama langsung
              dengan para petani lokal dari lereng Gayo hingga pegunungan Toraja
              demi memastikan keadilan ekosistem dan kualitas ceri kopi terbaik.
            </p>
            <p className="about-text">
              Setiap batch biji kopi dipanggang menggunakan mesin berteknologi
              mutakhir terkontrol, melahirkan konsistensi aroma signature yang
              tidak akan Anda temukan di tempat lain.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
