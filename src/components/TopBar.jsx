import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-line">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse" />
        <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
          Creator Studio
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-white font-medium">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-muted hover:text-danger transition"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default TopBar;
