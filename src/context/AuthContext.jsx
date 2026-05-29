/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if user has an active persistent session synchronously on initialization
    const savedUser = localStorage.getItem("temi_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem("temi_user");
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    if (!password) {
      throw new Error("Password is required");
    }
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role (mocking system)
    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
    
    const loggedUser = {
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      bio: "Managing premium beauty technology services & salon software automation.",
      notifications: { email: true, push: false }
    };

    setUser(loggedUser);
    localStorage.setItem("temi_user", JSON.stringify(loggedUser));
    setLoading(false);
    return loggedUser;
  };

  const register = async (name, email, password) => {
    if (!password) {
      throw new Error("Password is required");
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    const registeredUser = {
      name,
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
      bio: "Beauty enthusiast & salon operations lead.",
      notifications: { email: true, push: true }
    };

    setUser(registeredUser);
    localStorage.setItem("temi_user", JSON.stringify(registeredUser));
    setLoading(false);
    return registeredUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("temi_user");
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem("temi_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

