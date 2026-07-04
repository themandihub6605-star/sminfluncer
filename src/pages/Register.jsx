import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base px-4">
        <div className="bg-surface border border-line rounded-2xl p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-full bg-warn/10 flex items-center justify-center mx-auto mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-warn" />
          </div>
          <h1 className="font-display text-xl font-bold text-white mb-2">
            Registration received
          </h1>
          <p className="text-muted text-sm mb-6">
            Your account is waiting for Super Admin approval. Try logging in once
            you've been accepted.
          </p>
          <Link
            to="/login"
            className="inline-block w-full bg-signal text-base font-semibold text-sm rounded-lg py-2.5 hover:brightness-110 transition"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Become a creator
          </h1>
          <p className="text-muted text-sm mb-6">
            Register to go live once approved.
          </p>

          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Full name</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-muted/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-muted/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9999999999"
                className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-muted/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-muted/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-base font-semibold text-sm rounded-lg py-2.5 hover:brightness-110 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Register"}
          </button>

          <p className="text-center text-muted text-sm mt-5">
            Already approved?{" "}
            <Link to="/login" className="text-signal hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
