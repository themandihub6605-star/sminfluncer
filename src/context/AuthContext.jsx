import React, { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("influencer_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const res = await api.post("/auth/influencer/login", { email, password });
    const { token, influencer } = res.data.data;

    localStorage.setItem("influencer_token", token);
    localStorage.setItem("influencer_user", JSON.stringify(influencer));
    setUser(influencer);
  };

  const register = async (payload) => {
    const res = await api.post("/auth/influencer/register", payload);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("influencer_token");
    localStorage.removeItem("influencer_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
