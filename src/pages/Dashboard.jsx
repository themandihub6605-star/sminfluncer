import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import ZoomMeetingEmbed from "../components/ZoomMeetingEmbed";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [meetingConfig, setMeetingConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/influencer/me");
      setProfile(res.data.data);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleGoLive = async () => {
    setError("");
    setActionLoading(true);
    try {
      const res = await api.post("/live/go-live");
      setMeetingConfig(res.data.data);
      await fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to go live. Try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEndLive = async () => {
    setActionLoading(true);
    try {
      await api.patch("/live/end-live");
      setMeetingConfig(null);
      await fetchProfile();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to end live session.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <p className="text-muted text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  if (profile?.status === "pending") {
    return (
      <div className="min-h-screen bg-base">
        <TopBar />
        <div className="max-w-lg mx-auto mt-24 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-warn/10 flex items-center justify-center mx-auto mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-warn" />
          </div>
          <h1 className="font-display text-xl font-bold text-white mb-2">
            Waiting for approval
          </h1>
          <p className="text-muted text-sm">
            Your account is under review by the Super Admin. You'll be able to
            go live once approved — check back soon.
          </p>
        </div>
      </div>
    );
  }

  if (profile?.status === "rejected") {
    return (
      <div className="min-h-screen bg-base">
        <TopBar />
        <div className="max-w-lg mx-auto mt-24 text-center px-4">
          <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-danger" />
          </div>
          <h1 className="font-display text-xl font-bold text-white mb-2">
            Registration rejected
          </h1>
          <p className="text-muted text-sm">
            {profile.rejectionReason || "No reason was provided."}
          </p>
        </div>
      </div>
    );
  }

  // While live, Zoom's Client View takes over the FULL page (injected into
  // #zmmtg-root), so we hide our own dashboard chrome underneath it.
  if (profile?.isLive && meetingConfig) {
    return <ZoomMeetingEmbed meetingConfig={meetingConfig} userName={profile.name} />;
  }

  return (
    <div className="min-h-screen bg-base">
      <TopBar />

      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Welcome, {profile?.name}
            </h1>
            <p className="text-muted text-sm">
              You're approved. Go live whenever you're ready.
            </p>
          </div>

          <button
            onClick={handleGoLive}
            disabled={actionLoading}
            className="bg-signal text-base font-semibold text-sm rounded-lg px-5 py-2.5 hover:brightness-110 transition disabled:opacity-50 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-base" />
            {actionLoading ? "Starting..." : "Go Live"}
          </button>
        </div>

        {error && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="border border-dashed border-line rounded-2xl py-20 text-center bg-surface">
          <p className="text-muted text-sm">
            Click "Go Live" to launch the full native Zoom experience right here on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;