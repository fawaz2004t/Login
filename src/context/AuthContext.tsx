import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type ProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedAuth === "true" && savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
