import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Get user type from metadata
        if (session?.user) {
          const type = session.user.user_metadata?.user_type as 'passenger' | 'driver';
          setUserType(type || 'passenger');
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Get user type from metadata
      if (session?.user) {
        const type = session.user.user_metadata?.user_type as 'passenger' | 'driver';
        setUserType(type || 'passenger');
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userTypeChoice: 'passenger' | 'driver' = 'passenger') => {
    const redirectUrl = `${window.location.origin}/`;
    const result = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          user_type: userTypeChoice
        }
      }
    });
    setUserType(userTypeChoice);
    return result;
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return { user, session, loading, signOut, signUp, signIn, userType };
};
