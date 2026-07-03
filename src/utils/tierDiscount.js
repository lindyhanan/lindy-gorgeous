/**
 * Tier Discount Utility — Dogee Coffee CRM
 *
 * Menghitung harga final berdasarkan tier member.
 * SILVER: 0% diskon
 * GOLD:   10% diskon
 * PLATINUM: 20% diskon
 */

const TIER_DISCOUNTS = {
  SILVER: 0,
  GOLD: 0.1,
  PLATINUM: 0.2,
};

const TIER_POINTS_MULTIPLIER = {
  SILVER: 1,
  GOLD: 1.5,
  PLATINUM: 2,
};

/**
 * Calculate final price after tier discount
 * @param {number} basePrice - Harga dasar produk
 * @param {string} tier - Tier member ('SILVER', 'GOLD', 'PLATINUM')
 * @returns {{ discountPercent: number, discountAmount: number, finalPrice: number }}
 */
export function calculateTierPrice(basePrice, tier = "SILVER") {
  const discountRate = TIER_DISCOUNTS[tier] || 0;
  const discountAmount = Math.round(basePrice * discountRate);
  const finalPrice = basePrice - discountAmount;

  return {
    discountPercent: discountRate * 100,
    discountAmount,
    finalPrice,
  };
}

/**
 * Calculate points earned from a purchase
 * @param {number} totalPrice - Total harga setelah diskon
 * @param {string} tier - Tier member
 * @returns {number} points earned
 */
export function calculatePoints(totalPrice, tier = "SILVER") {
  const multiplier = TIER_POINTS_MULTIPLIER[tier] || 1;
  // 1 poin per Rp 1.000, dikali multiplier tier
  return Math.floor((totalPrice / 1000) * multiplier);
}

/**
 * Get tier display info
 * @param {string} tier
 * @returns {{ label: string, color: string, icon: string }}
 */
export function getTierInfo(tier = "SILVER") {
  const tiers = {
    SILVER: { label: "Silver Member", color: "#c0c0c0", icon: "🥈" },
    GOLD: { label: "Gold Member", color: "#ffd700", icon: "🥇" },
    PLATINUM: { label: "Platinum Member", color: "#e5e4e2", icon: "💎" },
  };
  return tiers[tier] || tiers.SILVER;
}
