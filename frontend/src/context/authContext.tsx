// src/context/authContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";

interface User {
  id?: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean; 
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true, 
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUserStr = localStorage.getItem("user");

      if (storedToken && storedUserStr) {
        const parsedUser: User = JSON.parse(storedUserStr);
        if (parsedUser?.name && parsedUser?.email) {
          setToken(storedToken);
          setUser(parsedUser);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      console.warn("Error restoring auth from localStorage:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false); 
    }
  }, []);

  // Sync to localStorage whenever token/user changes
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = (newToken: string, newUser: User) => {
    if (!newUser?.name || !newUser?.email) {
      console.error("Invalid user data on login", newUser);
      return;
    }
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
