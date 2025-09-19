import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  userType: 'user' | 'admin';
  isLoggedIn: boolean;
  lastLogin: string;
}

interface PendingFormData {
  destination: string;
  seats: number;
  dateTime: string;
  navigateTo: string;
}

interface AuthContextType {
  user: User | null;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  handleLogin: (userType: 'user' | 'admin', userData?: any) => void;
  handleLogout: () => void;
  pendingFormData: PendingFormData | null;
  setPendingFormData: (data: PendingFormData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [pendingFormData, setPendingFormData] = useState<PendingFormData | null>(null);

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userType: 'user' | 'admin', userData?: any) => {
    setUser({ ...userData, userType });
    // Pending form data will be handled by the components that use the hook
  };

  const handleLogout = () => {
    setUser(null);
    setPendingFormData(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      showLogin,
      setShowLogin,
      handleLogin,
      handleLogout,
      pendingFormData,
      setPendingFormData
    }}>
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
