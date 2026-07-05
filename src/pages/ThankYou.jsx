import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-6">
          <span className="w-3 h-3 rounded-full bg-signal" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Thanks for going live!
        </h1>
        <p className="text-muted text-sm mb-8">
          Your session has ended. Your viewers appreciate you showing up —
          come back anytime you're ready to go live again.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-signal text-base font-semibold text-sm rounded-lg px-6 py-2.5 hover:brightness-110 transition"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;