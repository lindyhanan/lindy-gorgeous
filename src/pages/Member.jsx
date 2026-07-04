import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getTierInfo } from "../utils/tierDiscount";
import MemberNavbar from "../components/MemberNavbar";
import Modal from "../components/Modal";

function formatPrice(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", text: "#4ade80", icon: "✅" },
    error: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", text: "#fca5a5", icon: "❌" },
    info: { bg: "rgba(179,139,83,0.12)", border: "rgba(179,139,83,0.3)", text: "#b38b53", icon: "ℹ️" },
  };

  const c = colors[type] || colors.success;

  return (
    <div style={{
      position: "fixed",
      top: "80px",
      right: "24px",
      zIndex: 9999,
      background: c.bg,
      border: `1px solid ${c.border}`,
      backdropFilter: "blur(16px)",
      borderRadius: "14px",
      padding: "14px 24px",
      color: c.text,
      fontSize: "14px",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      animation: "toastSlide 0.3s ease-out",
      maxWidth: "400px",
    }}>
      <span>{c.icon}</span>
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: "none", border: "none", color: c.text, cursor: "pointer",
        fontSize: "16px", padding: "0 0 0 8px", opacity: 0.6,
      }}>✕</button>
    </div>
  );
}

const PROMO_DUMMY = [
  { title: "Buy 1 Get 1 Monday", desc: "Berlaku setiap hari Senin khusus untuk seluruh produk kopi susu.", icon: "☕" },
  { title: "Birthday Sweet Discount", desc: "Nikmati potongan harga spesial sebesar 20% pada bulan ulang tahun Anda.", icon: "🎂" },
  { title: "Gratis Topping Jelly", desc: "Tambahkan topping boba / jelly premium gratis untuk semua varian matcha.", icon: "🍵" },
];

const VOUCHER_DUMMY = [
  { title: "Diskon Member Baru", code: "WELCOME10", expired: "31 Des 2026", benefit: "Potongan Rp 5.000" },
  { title: "Free Ongkir Drive-Thru", code: "DRIVEFREE", expired: "30 Nov 2026", benefit: "Minimal Beli 2 Cup" },
];

function getTierGradient(tier) {
  const map = {
    SILVER: "linear-gradient(135deg, #808080, #c0c0c0)",
    GOLD: "linear-gradient(135deg, #b8860b, #ffd700)",
    PLATINUM: "linear-gradient(135deg, #71706e, #e5e4e2)",
  };
  return map[tier] || map.SILVER;
}

function getTierBadgeColor(tier) {
  const map = {
    SILVER: { bg: "rgba(192,192,192,0.12)", text: "#c0c0c0" },
    GOLD: { bg: "rgba(255,215,0,0.12)", text: "#ffd700" },
    PLATINUM: { bg: "rgba(229,228,226,0.12)", text: "#e5e4e2" },
  };
  return map[tier] || map.SILVER;
}

export default function Member() {
  const { profile, isLoading: authLoading } = useAuth();
  const [query, setQuery] = useState("");

  // Fix white margins: set body background saat mount, cleanup saat unmount
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevMargin = document.body.style.margin;
    document.body.style.background = "#0b0806";
    document.body.style.margin = "0";
    return () => {
      document.body.style.background = prevBg;
      document.body.style.margin = prevMargin;
    };
  }, []);

  // Data from Supabase
  const [products, setProducts] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Local state
  const [points, setPoints] = useState(0);
  const [exchangeTab, setExchangeTab] = useState("menu");

  // Phone number (from profile, set saat registrasi)
  const [phoneNumber, setPhoneNumber] = useState("");

  // Set phone from profile
  useEffect(() => {
    if (profile?.phone_number) {
      setPhoneNumber(profile.phone_number);
    }
  }, [profile?.phone_number]);

  // Modal & Toast
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [toast, setToast] = useState(null);

  // Set points from profile
  useEffect(() => {
    if (profile) {
      setPoints(profile.total_points || 0);
    }
  }, [profile]);

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products
        const { data: prodData } = await supabase
          .from("products")
          .select("*")
          .order("id");
        if (prodData) setProducts(prodData);

        // Fetch rewards
        const { data: rewData } = await supabase
          .from("rewards")
          .select("*")
          .eq("is_active", true)
          .order("id");
        if (rewData) setRewards(rewData);

        // Fetch promotions
        const { data: promData } = await supabase
          .from("promotions")
          .select("*")
          .eq("is_active", true);
        if (promData && promData.length > 0) setPromotions(promData);

        // Fetch redemptions
        if (profile?.id) {
          const { data: redData } = await supabase
            .from("redemptions")
            .select("*")
            .eq("member_id", profile.id)
            .order("created_at", { ascending: false });
          if (redData) setRedemptions(redData);
        }
      } catch (err) {
        console.error("Error fetching member data:", err.message);
      } finally {
        setLoadingData(false);
      }
    }
    fetchData();
  }, [profile?.id]);

  const tier = profile?.tier || "SILVER";
  const tierInfo = getTierInfo(tier);
  const tierBadge = getTierBadgeColor(tier);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  // Filter rewards by search query
  const filteredRewards = rewards.filter((r) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return r.name.toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q);
  });

  const menuRewards = filteredRewards.filter((r) => r.type === "MENU");
  const voucherRewards = filteredRewards.filter((r) => r.type === "VOUCHER");

  // Handle redeem - open modal
  const handleRedeemClick = (reward) => {
    if (points < reward.points_cost) {
      showToast(`Poin tidak mencukupi! Dibutuhkan ${reward.points_cost} pts`, "error");
      return;
    }
    setSelectedReward(reward);
    setModalOpen(true);
  };

  // Confirm redemption
  const confirmRedeem = async () => {
    if (!selectedReward || !profile?.id) return;

    try {
      // Deduct points in DB
      const newPoints = points - selectedReward.points_cost;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ total_points: newPoints })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      // Insert redemption record
      const voucherCode = selectedReward.type === "VOUCHER"
        ? `SR${Date.now().toString(36).toUpperCase()}`
        : null;

      const { error: redeemError } = await supabase
        .from("redemptions")
        .insert({
          member_id: profile.id,
          reward_id: selectedReward.id,
          points_spent: selectedReward.points_cost,
          voucher_code: voucherCode,
        });

      if (redeemError) throw redeemError;

      // Update local state
      setPoints(newPoints);
      setRedemptions((prev) => [
        {
          id: Date.now(),
          member_id: profile.id,
          reward_id: selectedReward.id,
          points_spent: selectedReward.points_cost,
          voucher_code: voucherCode,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);

      setModalOpen(false);
      setSelectedReward(null);
      showToast(`🎉 Sukses! ${selectedReward.name} berhasil ditukarkan!${voucherCode ? ` Kode: ${voucherCode}` : ""}`, "success");
    } catch (err) {
      showToast(`Gagal: ${err.message}`, "error");
    }
  };

  // Bestseller: take first 4 products as bestseller
  const bestsellerData = products.slice(0, 4);

  // Show empty state if no data
  const displayPromos = promotions.length > 0 ? promotions : PROMO_DUMMY;
  const displayVouchers = redemptions.filter((r) => r.voucher_code).length > 0
    ? redemptions.filter((r) => r.voucher_code).map((r) => ({
        title: rewards.find((rw) => rw.id === r.reward_id)?.name || "Voucher",
        code: r.voucher_code,
        expired: "3 bulan sejak diterbitkan",
        benefit: `${r.points_spent} pts`,
        icon: "🎟️",
      }))
    : VOUCHER_DUMMY;

  if (authLoading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0b0806", display: "flex",
        alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{ textAlign: "center", color: "#b38b53" }}>
          <div style={{
            width: 40, height: 40, border: "3px solid rgba(179,139,83,0.2)",
            borderTopColor: "#b38b53", borderRadius: "50%", animation: "spin 0.8s linear infinite",
            margin: "0 auto 16px",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: 14, fontWeight: 500 }}>Memuat profil member...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .member-page-body {
          background: #0b0806;
          margin: 0;
          min-height: 100vh;
        }

        .member-page {
          min-height: 100vh;
          background: #0b0806;
          color: #f5f5f4;
          font-family: 'Poppins', sans-serif;
          padding-top: 68px;
        }

        .member-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 32px 32px 60px;
        }

        @keyframes toastSlide {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .member-section {
          animation: fadeUp 0.5s ease-out;
        }

        .member-redeem-btn {
          background: linear-gradient(135deg, #b38b53, #967241);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }

        .member-redeem-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(179, 139, 83, 0.3);
        }

        .member-redeem-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }

        .member-card {
          background: rgba(15, 12, 10, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(179, 139, 83, 0.08);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .member-card:hover {
          border-color: rgba(179, 139, 83, 0.2);
        }

        .member-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }

        .member-search-empty {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255,255,255,0.3);
        }

        .member-search-empty span {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }

        .member-page-body ::-webkit-scrollbar { width: 6px; }
        .member-page-body ::-webkit-scrollbar-track { background: #0b0806; }
        .member-page-body ::-webkit-scrollbar-thumb { background: rgba(179, 139, 83, 0.2); border-radius: 3px; }
        .member-page-body ::-webkit-scrollbar-thumb:hover { background: rgba(179, 139, 83, 0.4); }

        .member-page-body .member-img-zoom { overflow: hidden; }
        .member-page-body .member-img-zoom:hover .member-img-zoom-target { transform: scale(1.08) !important; }
        .member-page-body .member-voucher-card:hover { border-color: rgba(179,139,83,0.25) !important; }
      `}</style>

      <div className="member-page-body">
        {toast && (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <Modal
          title={selectedReward ? `🔁 Konfirmasi Penukaran` : ""}
          open={modalOpen}
          onClose={() => { setModalOpen(false); setSelectedReward(null); }}
        >
          {selectedReward && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                background: "rgba(179,139,83,0.06)", borderRadius: "14px", padding: "16px",
              }}>
                {selectedReward.image_url ? (
                  <img src={selectedReward.image_url} alt={selectedReward.name}
                    style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                ) : (
                  <div style={{
                    width: 64, height: 64, borderRadius: 12,
                    background: "rgba(179,139,83,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 28,
                  }}>
                    {selectedReward.type === "VOUCHER" ? "🎟️" : "☕"}
                  </div>
                )}
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: 16, fontWeight: 700, color: "#ffffff" }}>
                    {selectedReward.name}
                  </h4>
                  {selectedReward.description && (
                    <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                      {selectedReward.description}
                    </p>
                  )}
                </div>
              </div>

              <div style={{
                background: "rgba(179,139,83,0.08)", borderRadius: "10px",
                padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Poin yang dibutuhkan</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#b38b53" }}>
                  {selectedReward.points_cost} pts
                </span>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.03)", borderRadius: "10px",
                padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Sisa poin Anda</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#ffffff" }}>
                  {points - selectedReward.points_cost} pts
                </span>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: 8 }}>
                <button onClick={() => { setModalOpen(false); setSelectedReward(null); }}
                  style={{
                    flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid rgba(179,139,83,0.2)",
                    background: "transparent", color: "rgba(255,255,255,0.7)", fontWeight: 600,
                    fontSize: 13, cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                  }}>
                  Batal
                </button>
                <button onClick={confirmRedeem}
                  style={{
                    flex: 1, padding: "12px", borderRadius: "12px", border: "none",
                    background: "linear-gradient(135deg, #b38b53, #967241)", color: "#ffffff",
                    fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                  }}>
                  ✅ Konfirmasi Tukar
                </button>
              </div>
            </div>
          )}
        </Modal>

        <MemberNavbar query={query} setQuery={setQuery} />

        <div className="member-page">
          <div className="member-container">
            {/* ======================== SECTION 1: DASHBOARD/BANNER ======================== */}
            <section id="dashboard" className="member-section" style={{ marginBottom: "40px" }}>
              <div className="member-card" style={{
                padding: "32px 36px", position: "relative", overflow: "hidden",
              }}>
                <div className="member-glow" style={{
                  top: "-50%", right: "-10%", width: 400, height: 400,
                  background: "rgba(179, 139, 83, 0.04)",
                }} />
                <div style={{ position: "relative", zIndex: 2 }}>

                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", flexWrap: "wrap", gap: "24px", marginBottom: "24px",
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <h1 style={{
                          fontSize: "1.8rem", fontWeight: 700, margin: 0,
                          color: "#ffffff", letterSpacing: "-0.3px",
                        }}>
                          ☕ Selamat Datang, {profile?.full_name || "Member"}!
                        </h1>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0 }}>
                        Kumpulkan poin dari setiap transaksi dan tukarkan dengan rewards eksklusif.
                      </p>
                    </div>

                    <div style={{
                      background: tierBadge.bg,
                      padding: "6px 20px", borderRadius: "999px",
                      border: `1px solid ${tierBadge.text}33`,
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <span style={{ fontSize: 16 }}>{tierInfo.icon}</span>
                      <span style={{ color: tierBadge.text, fontWeight: 700, fontSize: 13 }}>
                        {tierInfo.label}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: "flex", gap: "20px", flexWrap: "wrap",
                  }}>
                    {/* Points Card */}
                    <div style={{
                      flex: "1 1 280px",
                      background: "linear-gradient(135deg, rgba(179,139,83,0.12), rgba(179,139,83,0.04))",
                      borderRadius: "18px", padding: "20px 24px",
                      border: "1px solid rgba(179,139,83,0.1)",
                    }}>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>
                        Total Poin Anda
                      </p>
                      <h2 style={{
                        color: "#b38b53", fontSize: "2.8rem", fontWeight: 800,
                        margin: "0 0 4px 0", lineHeight: 1,
                      }}>
                        {points.toLocaleString("id-ID")}
                        <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginLeft: 8 }}>
                          Pts
                        </span>
                      </h2>
                      <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", margin: 0 }}>
                            {rewards.filter((r) => r.type === "MENU").length}
                          </p>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>
                            Menu Rewards
                          </p>
                        </div>
                        <div style={{ width: 1, background: "rgba(179,139,83,0.15)" }} />
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", margin: 0 }}>
                            {rewards.filter((r) => r.type === "VOUCHER").length}
                          </p>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>
                            Voucher Rewards
                          </p>
                        </div>
                        <div style={{ width: 1, background: "rgba(179,139,83,0.15)" }} />
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#ffffff", margin: 0 }}>
                            {redemptions.length}
                          </p>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>
                            Ditukarkan
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tier Progress Card */}
                    <div style={{
                      flex: "1 1 200px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "18px", padding: "20px 24px",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px 0" }}>
                        Tier Progress
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%",
                          background: getTierGradient(tier),
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18, boxShadow: `0 0 20px ${tierBadge.text}22`,
                        }}>
                          {tierInfo.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", margin: 0 }}>
                            {tierInfo.label}
                          </p>
                          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>
                            {tier === "SILVER" ? "0% diskon" : tier === "GOLD" ? "10% diskon" : "20% diskon"}
                          </p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{
                        width: "100%", height: 4, background: "rgba(255,255,255,0.06)",
                        borderRadius: 2, overflow: "hidden",
                      }}>
                        <div style={{
                          width: tier === "SILVER" ? `${Math.min((points / 500) * 100, 100)}%` :
                                 tier === "GOLD" ? `${Math.min(((points - 500) / 1000) * 100, 100)}%` :
                                 "100%",
                          height: "100%", background: `linear-gradient(90deg, ${tierBadge.text}, ${tierBadge.text}88)`,
                          borderRadius: 2, transition: "width 0.6s ease",
                        }} />
                      </div>
                      {tier === "SILVER" && (
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", margin: "8px 0 0 0" }}>
                          {Math.max(0, 500 - points)} pts lagi menuju Gold
                        </p>
                      )}
                      {tier === "GOLD" && (
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", margin: "8px 0 0 0" }}>
                          {Math.max(0, 1500 - points)} pts lagi menuju Platinum
                        </p>
                      )}
                      {tier === "PLATINUM" && (
                        <p style={{ fontSize: 10, color: tierBadge.text, margin: "8px 0 0 0" }}>
                          💎 Tier tertinggi — nikmati benefit maksimal!
                        </p>
                      )}
                    </div>

                  {/* Phone Number Card */}
                  <div style={{
                    flex: "1 1 280px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "18px", padding: "20px 24px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex", flexDirection: "column", gap: "12px",
                  }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                      📞 Nomor HP (untuk transaksi)
                    </p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", margin: 0 }}>
                      Berikan nomor HP ke kasir agar poin otomatis tercatat saat pembelian.
                    </p>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "12px 16px", borderRadius: "12px",
                      background: "rgba(179,139,83,0.06)",
                      border: "1px solid rgba(179,139,83,0.1)",
                    }}>
                      <span style={{ fontSize: 20 }}>📱</span>
                      {phoneNumber ? (
                        <span style={{
                          fontSize: 16, fontWeight: 700, color: "#ffffff",
                          letterSpacing: "1px",
                        }}>
                          {phoneNumber}
                        </span>
                      ) : (
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                          Belum didaftarkan — isi saat registrasi
                        </span>
                      )}
                    </div>
                    {phoneNumber ? (
                      <p style={{ fontSize: 10, color: "rgba(179,139,83,0.5)", margin: 0 }}>
                        ✅ Nomor terdaftar — gunakan di kasir untuk kumpulkan poin
                      </p>
                    ) : (
                      <p style={{ fontSize: 10, color: "rgba(239,68,68,0.5)", margin: 0 }}>
                        ⚠️ Nomor HP belum didaftarkan. Hubungi admin untuk mengisi nomor.
                      </p>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div style={{
                    flex: "1 1 200px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "18px", padding: "20px 24px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex", flexDirection: "column", gap: "10px",
                  }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
                      Quick Actions
                    </p>
                    <button onClick={() => { const el = document.getElementById("redeem"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                      style={{
                        padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(179,139,83,0.15)",
                        background: "rgba(179,139,83,0.06)", color: "#ffffff", fontWeight: 500,
                        fontSize: 12, cursor: "pointer", textAlign: "left",
                        fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
                      }}>
                      🎁 Tukar Poin Sekarang
                    </button>
                    <button onClick={() => { const el = document.getElementById("promos"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                      style={{
                        padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.7)", fontWeight: 500,
                        fontSize: 12, cursor: "pointer", textAlign: "left",
                        fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
                      }}>
                      📅 Lihat Promo Bulan Ini
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ======================== SECTION 2: REDEEM ======================== */}
            <section id="redeem" className="member-section" style={{ marginBottom: "40px" }}>
              <div className="member-card" style={{ padding: "28px 32px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px",
                }}>
                  <div>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                      🎁 Penukaran Poin
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "4px 0 0 0" }}>
                      Tukarkan poin Anda dengan menu gratis atau voucher diskon
                    </p>
                  </div>

                  {/* Tab switcher */}
                  <div style={{
                    display: "flex", gap: "6px",
                    background: "rgba(255,255,255,0.04)", padding: "4px",
                    borderRadius: "12px",
                  }}>
                    <button onClick={() => setExchangeTab("menu")}
                      style={{
                        padding: "8px 20px", fontSize: 12, fontWeight: 600, border: "none",
                        borderRadius: "10px", cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                        background: exchangeTab === "menu" ? "linear-gradient(135deg, #b38b53, #967241)" : "transparent",
                        color: exchangeTab === "menu" ? "#ffffff" : "rgba(255,255,255,0.5)",
                        transition: "all 0.2s",
                      }}>
                      ☕ Menu Gratis
                    </button>
                    <button onClick={() => setExchangeTab("voucher")}
                      style={{
                        padding: "8px 20px", fontSize: 12, fontWeight: 600, border: "none",
                        borderRadius: "10px", cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                        background: exchangeTab === "voucher" ? "linear-gradient(135deg, #b38b53, #967241)" : "transparent",
                        color: exchangeTab === "voucher" ? "#ffffff" : "rgba(255,255,255,0.5)",
                        transition: "all 0.2s",
                      }}>
                      🎟️ Voucher Belanja
                    </button>
                  </div>
                </div>

                {loadingData ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)" }}>
                    Memuat rewards...
                  </div>
                ) : exchangeTab === "menu" ? (
                  <>
                    {menuRewards.length === 0 ? (
                      <div className="member-search-empty">
                        <span>☕</span>
                        <p>{query ? `Tidak ada menu rewards untuk "${query}"` : "Belum ada menu rewards tersedia"}</p>
                      </div>
                    ) : (
                      <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px",
                      }}>
                        {menuRewards.map((reward) => (
                          <div key={reward.id} className="member-card" style={{
                            overflow: "hidden", display: "flex", flexDirection: "column",
                            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(179,139,83,0.06)",
                          }}>
                            {reward.image_url ? (
                              <div style={{ width: "100%", height: 160, overflow: "hidden" }}
                                className="member-img-zoom">
                                <img src={reward.image_url} alt={reward.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover",
                                    transition: "transform 0.5s ease" }}
                                  className="member-img-zoom-target" />
                              </div>
                            ) : (
                              <div style={{
                                height: 120, background: "rgba(179,139,83,0.04)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                              }}>
                                ☕
                              </div>
                            )}
                            <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1 }}>
                              <div>
                                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>
                                  {reward.name}
                                </h4>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#b38b53" }}>
                                  {reward.points_cost} Pts
                                </span>
                              </div>
                              <button onClick={() => handleRedeemClick(reward)}
                                disabled={points < reward.points_cost}
                                className="member-redeem-btn">
                                {points < reward.points_cost ? "Kurang Poin" : "Tukar"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {voucherRewards.length === 0 ? (
                      <div className="member-search-empty">
                        <span>🎟️</span>
                        <p>{query ? `Tidak ada voucher untuk "${query}"` : "Belum ada voucher rewards tersedia"}</p>
                      </div>
                    ) : (
                      <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px",
                      }}>
                        {voucherRewards.map((reward) => (
                          <div key={reward.id} className="member-voucher-card"
                            style={{
                              background: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(179,139,83,0.08)",
                              borderRadius: "16px", padding: "20px 24px",
                              display: "flex", alignItems: "center", gap: "16px",
                              transition: "all 0.3s ease",
                            }}>
                            <div style={{
                              width: 48, height: 48, borderRadius: "14px",
                              background: "rgba(179,139,83,0.08)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 24, flexShrink: 0,
                            }}>
                              🎟️
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>
                                {reward.name}
                              </h4>
                              {reward.description && (
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                                  {reward.description}
                                </p>
                              )}
                            </div>
                            <div style={{ textAlign: "center", flexShrink: 0 }}>
                              <span style={{ fontSize: 13, fontWeight: 800, color: "#b38b53", display: "block", marginBottom: 6 }}>
                                {reward.points_cost} Pts
                              </span>
                              <button onClick={() => handleRedeemClick(reward)}
                                disabled={points < reward.points_cost}
                                className="member-redeem-btn" style={{ padding: "6px 14px", fontSize: 11 }}>
                                {points < reward.points_cost ? "Kurang" : "Tukar"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* ======================== SECTION 3: VOUCHERS ======================== */}
            <section id="vouchers" className="member-section" style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 20px 0", color: "#ffffff" }}>
                🎟️ Voucher Milik Anda
              </h2>

              {displayVouchers.length === 0 ? (
                <div className="member-card" style={{ padding: "40px", textAlign: "center" }}>
                  <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🎟️</span>
                  <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: 14 }}>
                    Belum ada voucher. Tukarkan poin Anda untuk mendapatkan voucher!
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {displayVouchers.map((v, i) => (
                    <div key={i} className="member-card" style={{
                      padding: "20px 28px", display: "flex", alignItems: "center",
                      justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
                      position: "relative",
                      borderLeft: `3px solid ${tierBadge.text}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: "#ffffff",
                          background: "linear-gradient(135deg, #b38b53, #967241)",
                          padding: "4px 12px", borderRadius: "999px", whiteSpace: "nowrap",
                        }}>
                          {v.benefit}
                        </span>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>
                            {v.title}
                          </h4>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                            ⏱️ Berlaku sampai: {v.expired}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 4 }}>
                          KODE KUPON
                        </span>
                        <code style={{
                          fontSize: 13, fontWeight: 700, color: "#b38b53",
                          background: "rgba(179,139,83,0.08)",
                          padding: "6px 14px", borderRadius: "8px",
                          border: "1px dashed rgba(179,139,83,0.2)",
                          letterSpacing: "0.5px",
                        }}>
                          {v.code}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ======================== SECTION 4: PROMOS ======================== */}
            <section id="promos" className="member-section" style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 20px 0", color: "#ffffff" }}>
                📅 Promo Bulan Ini
              </h2>

              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px",
              }}>
                {displayPromos.map((promo, idx) => (
                  <div key={idx} className="member-card" style={{
                    padding: "24px", display: "flex", gap: "16px", alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "14px",
                      background: "rgba(179,139,83,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                    }}>
                      {promo.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#b38b53", margin: "0 0 6px 0" }}>
                        {promo.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                        {promo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ======================== SECTION 5: BESTSELLER ======================== */}
            <section id="bestseller" className="member-section" style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 20px 0", color: "#ffffff" }}>
                ⭐ Menu Best Seller
              </h2>

              {loadingData ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.3)" }}>
                  Memuat menu...
                </div>
              ) : bestsellerData.length === 0 ? (
                <div className="member-card" style={{ padding: "40px", textAlign: "center" }}>
                  <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>☕</span>
                  <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: 14 }}>
                    Belum ada menu tersedia.
                  </p>
                </div>
              ) : (
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px",
                }}>
                  {bestsellerData.map((menu) => (
                    <div key={menu.id} className="member-card" style={{
                      overflow: "hidden", display: "flex", flexDirection: "column",
                    }}>
                      <div style={{ width: "100%", height: 200, overflow: "hidden" }}
                        className="member-img-zoom">
                        <img src={menu.image_url} alt={menu.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover",
                            transition: "transform 0.5s ease" }}
                          className="member-img-zoom-target" />
                      </div>
                      <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", margin: 0 }}>
                            {menu.name}
                          </h3>
                          <span style={{
                            fontSize: 10, color: "rgba(255,255,255,0.3)",
                            background: "rgba(179,139,83,0.08)",
                            padding: "2px 10px", borderRadius: "999px",
                            textTransform: "uppercase", letterSpacing: "0.5px",
                          }}>
                            {menu.category}
                          </span>
                        </div>
                        {menu.description && (
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6, margin: "0 0 16px 0", flex: 1 }}>
                            {menu.description}
                          </p>
                        )}
                        <div style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          borderTop: "1px solid rgba(179,139,83,0.08)",
                          paddingTop: "14px",
                        }}>
                          <div>
                            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", display: "block" }}>
                              Harga
                            </span>
                            <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 700 }}>
                              {formatPrice(menu.price_base)}
                            </span>
                          </div>
                          <button onClick={() => showToast(`🍽️ ${menu.name} — Silakan kunjungi outlet terdekat!`, "info")}
                            className="member-redeem-btn"
                            style={{ padding: "8px 18px", fontSize: 12 }}>
                            Pesan Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>


    </>
  );
}
