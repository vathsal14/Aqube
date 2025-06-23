import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  display_name: string;
  points: number;
  spins: number;
  last_login_bonus: string | null;
  referral_code: string;
  referred_by: string | null;
  login_streak: number;
  last_login_date: string | null;
  created_at: string;
  updated_at: string;
}

interface StreakResponse {
  streak_count: number;
  streak_reward: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  userProfile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, referralCode?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  giveDailyBonus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const checkLoginStreak = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('check_login_streak', {
        user_id: userId
      });

      if (!error && data) {
        await fetchProfile(userId);
        const streakData = data as unknown as StreakResponse;
        if (streakData.streak_reward && streakData.streak_reward !== '') {
          toast.success(`🔥 ${streakData.streak_count} day streak! ${streakData.streak_reward}`);
        }
      }
    } catch (error) {
      console.error('Error checking login streak:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
          
          // Check login streak and give daily bonus on login (but not on signup)
          if (event === 'SIGNED_IN') {
            setTimeout(async () => {
              await checkLoginStreak(session.user.id);
              
              const { data, error } = await supabase.rpc('give_daily_bonus', {
                user_id: session.user.id
              });
              
              if (data && !error) {
                toast.success('Daily login bonus: +100 points!');
                await fetchProfile(session.user.id);
              }
            }, 1000);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, referralCode?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            display_name: name
          }
        }
      });

      if (error) return { error };

      // If signup successful and user is created, process referral
      if (data.user && referralCode) {
        setTimeout(async () => {
          try {
            await supabase.rpc('process_referral', {
              referred_user_id: data.user!.id,
              referral_code: referralCode
            });
          } catch (error) {
            console.error('Error processing referral:', error);
          }
        }, 2000);
      }

      // Auto-login after successful signup
      if (data.user && !error) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          console.error('Auto-login failed:', signInError);
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      await fetchProfile(user.id);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const giveDailyBonus = async () => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.rpc('give_daily_bonus', {
        user_id: user.id
      });
      
      if (!error && data) {
        await fetchProfile(user.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error giving daily bonus:', error);
      return false;
    }
  };

  const value = {
    user,
    profile,
    userProfile: profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
    giveDailyBonus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
