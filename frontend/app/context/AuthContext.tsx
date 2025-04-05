"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { initCsrf } from "@/lib/initCsrf";

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    const storedRole = localStorage.getItem("userRole");
    if (jwt) setToken(jwt);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = async (email: string, password: string) => {
    // Step 1: Make sure CSRF token is available
    await initCsrf();

    // Step 2: Now you can send the login request safely
    const res = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const jwt = res.data.token;
    const userRole = res.data.role;

    setToken(jwt);
    setRole(userRole);

    localStorage.setItem("jwtToken", jwt);
    localStorage.setItem("userRole", userRole);

    router.push("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.clear();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
