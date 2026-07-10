import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  isAdmin: false,
  isMember: false,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from profiles table after auth state change
  // Auto-create profile as fallback if trigger fails
  const fetchProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Profile might not exist yet (trigger hasn't fired)
        if (error.code === "PGRST116") {
          // Fallback: buat profile dari client jika trigger gagal
          await createProfileFallback(userId);
        } else {
          console.error("Error fetching profile:", error.message);
        }
        return;
      }
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // Client-side fallback: create profile if trigger failed
  const createProfileFallback = async (userId) => {
    try {
      // Get user metadata from auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
      const phoneNumber = user.user_metadata?.phone_number || null;

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          full_name: fullName,
          role: "MEMBER",
          tier: "SILVER",
          phone_number: phoneNumber,
        }, { onConflict: "id", ignoreDuplicates: false })
        .select()
        .single();

      if (error) {
        console.error("Fallback create profile gagal:", error.message);
        return;
      }

      setProfile(data);
      console.log("✅ Profile berhasil dibuat via client fallback");
    } catch (err) {
      console.error("Fallback create profile error:", err);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    isAdmin: profile?.role === "ADMIN",
    isMember: profile?.role === "MEMBER",
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
