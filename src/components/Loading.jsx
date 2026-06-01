import './Loading.css'

export default function Loading() {
  return (
    <div className="loading-wrap" role="status" aria-label="Memuat halaman">

      <div className="loading-brand">
        <p className="brand-label">Lindy Coffee</p>
        <p className="sub-label">CRM Platform</p>
      </div>

      <svg className="cup-svg" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="steam s1">
          <path d="M24 20 Q21 16 24 12 Q27 8 24 4" stroke="#C8956A" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g className="steam s2">
          <path d="M36 20 Q33 16 36 12 Q39 8 36 4" stroke="#C8956A" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g className="steam s3">
          <path d="M48 20 Q45 16 48 12 Q51 8 48 4" stroke="#C8956A" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <path d="M14 26 L58 26 L52 58 H20 L14 26Z" fill="#3A2214" stroke="#C8956A" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 26 H58" stroke="#C8956A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M52 36 Q62 36 62 44 Q62 52 52 52" stroke="#C8956A" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <ellipse cx="36" cy="35" rx="12" ry="3.5" fill="#C8956A" opacity="0.25"/>
      </svg>

      <div className="loading-progress">
        <div className="brew-bar-track">
          <div className="brew-bar-fill" />
        </div>
        <p className="loading-text">Menyeduh data…</p>
      </div>

    </div>
  )
}