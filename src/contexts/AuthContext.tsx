import { createContext, useContext, useEffect, useState } from 'react';
import { Profile } from '../lib/supabase';

interface MockUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: MockUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  { email: 'free@taxtalkpro.com', password: 'password123', id: 'user-1', fullName: 'Free User', subscriptionStatus: 'free' as const },
  { email: 'payper@taxtalkpro.com', password: 'password123', id: 'user-2', fullName: 'Pay-Per-View User', subscriptionStatus: 'free' as const },
  { email: 'subscriber@taxtalkpro.com', password: 'password123', id: 'user-3', fullName: 'Subscriber', subscriptionStatus: 'active' as const },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      const mockUserData = mockUsers.find(u => u.email === userData.email);
      if (mockUserData) {
        setProfile({
          id: mockUserData.id,
          email: mockUserData.email,
          full_name: mockUserData.fullName,
          subscription_status: mockUserData.subscriptionStatus,
          is_admin: false,
        });
      }
    }
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return { error: { message: 'User already exists' } };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email,
      };

      const newProfile: Profile = {
        id: newUser.id,
        email,
        full_name: fullName,
        subscription_status: 'free',
        is_admin: false,
      };

      setUser(newUser);
      setProfile(newProfile);
      localStorage.setItem('mockUser', JSON.stringify(newUser));

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockUser = mockUsers.find(u => u.email === email && u.password === password);

      if (!mockUser) {
        return { error: { message: 'Invalid email or password' } };
      }

      const userData = {
        id: mockUser.id,
        email: mockUser.email,
      };

      const profileData: Profile = {
        id: mockUser.id,
        email: mockUser.email,
        full_name: mockUser.fullName,
        subscription_status: mockUser.subscriptionStatus,
        is_admin: false,
      };

      setUser(userData);
      setProfile(profileData);
      localStorage.setItem('mockUser', JSON.stringify(userData));

      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
