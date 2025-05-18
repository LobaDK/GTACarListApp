import React, { createContext, useContext, useEffect, useState } from "react";
import { clearToken, getToken } from "../services/authStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  refreshAuth: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuth = async () => {
    const token = await getToken();
    setIsAuthenticated(!!token);
  };

  const signOut = async () => {
    await clearToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);