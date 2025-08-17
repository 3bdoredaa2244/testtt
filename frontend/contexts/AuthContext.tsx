import React, { createContext, useContext, useEffect, useState } from 'react';
import { icpService } from '@/lib/icp';
import type { UserProfile } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await icpService.init();
      const authenticated = await icpService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        await loadUserProfile();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to initialize authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const response = await icpService.getUserProfile();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        // User is authenticated but not registered
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(null);
    }
  };

  const login = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const success = await icpService.login();
      if (success) {
        setIsAuthenticated(true);
        await loadUserProfile();
        toast({
          title: "Login Successful",
          description: "Welcome to the platform!",
        });
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Failed to authenticate with Internet Identity",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await icpService.logout();
      setIsAuthenticated(false);
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (isAuthenticated) {
      await loadUserProfile();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        refreshProfile,
      }}
    >
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