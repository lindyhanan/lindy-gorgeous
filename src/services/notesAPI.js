import axios from 'axios'

// 💡 PERBAIKAN: API_URL dipotong sampai /v1 saja agar dinamis dan tidak dobel path
const API_URL = "https://hzriuohldmptcxfoiwhj.supabase.co/rest/v1"
const API_KEY = "sb_publishable_bC2LfoEv_wyp11uaQM1S0A_33LLG9au"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
  // 1. Tambahkan fungsi untuk Register (POST)
  registerUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, { // Sekarang path-nya pas menunjuk ke /v1/users
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal melakukan registrasi");
    }

    return response.status === 201 ? { success: true } : await response.json();
  },

  // 2. Tambahkan fungsi untuk Get User Berdasarkan Email (GET dengan query filter)
  getUserByEmail: async (email) => {
    const response = await fetch(`${API_URL}/users?email=eq.${encodeURIComponent(email)}`, { // Sekarang path-nya pas menunjuk ke /v1/users?...
      method: "GET",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil data user");
    }

    return await response.json(); // Mengembalikan array data user
  }
};