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

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    const storedRole = localStorage.getItem("userRole");
    const storedUser = localStorage.getItem("userInfo");

    if (jwt) setToken(jwt);
    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    await initCsrf();

    const res = await apiClient.post("/auth/login", {
      email,
      password,
    });

    const jwt = res.data.token;
    const userRole = res.data.role;

    const userData = res.data.user; // your backend should return full user
    console.log(userData);

    setToken(jwt);
    setRole(userRole);
    setUser(userData);

    localStorage.setItem("jwtToken", jwt);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userInfo", JSON.stringify(userData));

    router.push("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.clear();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
