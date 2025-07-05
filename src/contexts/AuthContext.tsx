
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: any | null;
  signUp: (email: string, password: string, displayName?: string, referralCode?: string) => Promise<{ error: any; data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile after auth state change
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        console.log('Profile fetched:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string, referralCode?: string) => {
    try {
      console.log('Signing up user:', email, 'with referral:', referralCode);
      
      // Normalize referral code to uppercase if provided
      const normalizedReferralCode = referralCode?.trim().toUpperCase();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            referral_code: normalizedReferralCode
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data);

      // Process referral after successful signup if referral code was provided
      if (normalizedReferralCode && data?.user) {
        console.log('Processing referral for new user:', data.user.id);
        
        // Use a shorter delay and better error handling
        setTimeout(async () => {
          await processReferral(data.user.id, normalizedReferralCode);
        }, 2000); // Reduced to 2 seconds
      }

      return { error: null, data };
    } catch (error) {
      console.error('Sign up catch error:', error);
      return { error };
    }
  };

  const processReferral = async (newUserId: string, referralCode: string) => {
    try {
      console.log('Processing referral:', { newUserId, referralCode });
      
      // Find the referrer by their referral code (case-insensitive search)
      const { data: referrerData, error: referrerError } = await supabase
        .from('profiles')
        .select('id, referral_code, spins')
        .ilike('referral_code', referralCode)
        .maybeSingle();

      if (referrerError) {
        console.error('Error finding referrer:', referrerError);
        return;
      }

      if (!referrerData) {
        console.error('No referrer found with code:', referralCode);
        return;
      }

      console.log('Found referrer:', referrerData);

      // Check if this referral already exists to avoid duplicates
      const { data: existingReferral } = await supabase
        .from('referrals')
        .select('id')
        .eq('referrer_id', referrerData.id)
        .eq('referred_id', newUserId)
        .maybeSingle();

      if (existingReferral) {
        console.log('Referral already exists, skipping');
        return;
      }

      // Check how many referrals this referrer already has
      const { data: referralCount, error: countError } = await supabase
        .from('referrals')
        .select('id')
        .eq('referrer_id', referrerData.id);

      if (countError) {
        console.error('Error checking referral count:', countError);
        return;
      }

      if (referralCount && referralCount.length >= 3) {
        console.log('Referrer has reached maximum referrals (3)');
        return;
      }

      // Add entry to referrals table
      const { error: referralInsertError } = await supabase
        .from('referrals')
        .insert({
          referrer_id: referrerData.id,
          referred_id: newUserId,
          referral_code: referralCode.toUpperCase()
        });

      if (referralInsertError) {
        console.error('Error inserting referral:', referralInsertError);
        return;
      }

      console.log('Referral record created successfully');

      // Award spin to referrer - ensure we properly increment the spin count
      const currentSpins = referrerData.spins || 0;
      const newSpinCount = currentSpins + 1;
      
      console.log('Awarding spin to referrer:', { 
        referrerId: referrerData.id, 
        currentSpins, 
        newSpinCount 
      });
      
      const { data: updateData, error: spinUpdateError } = await supabase
        .from('profiles')
        .update({ 
          spins: newSpinCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', referrerData.id)
        .select('spins');

      if (spinUpdateError) {
        console.error('Error awarding spin:', spinUpdateError);
      } else {
        console.log('Successfully awarded spin to referrer. Update result:', updateData);
        console.log('New spin count should be:', newSpinCount);
      }

    } catch (error) {
      console.error('Error processing referral:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    profile,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
