import React, { createContext, useContext, useState, useEffect } from "react";
import { hashPassword, MASTER_HASH } from "@/lib/crypto";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Checa a sessão ao carregar a página
    const sessionAuth = sessionStorage.getItem("sonus_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Fallback de Desenvolvimento: Celular via HTTP não possui crypto.subtle
    if (!window.crypto || !window.crypto.subtle) {
      console.warn("Modo HTTP detectado: usando validação de fallback.");
      if (password === "P@iefilho2!") {
        setIsAuthenticated(true);
        sessionStorage.setItem("sonus_admin_auth", "true");
        return true;
      }
      return false;
    }

    const hash = await hashPassword(password);
    
    if (hash === MASTER_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem("sonus_admin_auth", "true");
      return true;
    }
    
    return false; // Hash não bateu com a Master Password
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("sonus_admin_auth");
  };

  // Se ainda estiver validando a sessão no load inicial, não renderiza as rotas protegidas ainda
  if (isLoading) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
