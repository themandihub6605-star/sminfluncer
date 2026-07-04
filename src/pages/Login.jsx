import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            Creator Studio
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-line rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="font-display text-2xl font-bold text-white mb-1">Sign in</h1>
          <p className="text-muted text-sm mb-6">Log in to your creator dashboard.</p>

          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white mb-4 placeholder:text-muted/50"
          />

          <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white mb-6 placeholder:text-muted/50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-base font-semibold text-sm rounded-lg py-2.5 hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-muted text-sm mt-5">
            New here?{" "}
            <Link to="/register" className="text-signal hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
