import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShieldCheck,
  KeyRound,
  ChevronRight,
  MailCheck,
} from "lucide-react";
import API from "../../api/api";

export const Otp = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your email";

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await API.post("/verify", {
        email,
        otp,
      });

      alert("OTP Verified ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        {/* Left Content */}
        <div className="hidden lg:block text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6 shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-5">
            Secure <br />
            Verification
          </h1>

          <p className="text-slate-200 text-lg leading-relaxed max-w-lg">
            Confirm your identity using the one-time password sent to your
            registered email and continue to CivicConnect.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">Fast</h3>
              <p className="text-sm text-slate-300">
                Email Verification
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <h3 className="text-2xl font-bold">Safe</h3>
              <p className="text-sm text-slate-300">
                Secure OTP Access
              </p>
            </div>
          </div>
        </div>

        {/* OTP Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl mb-4 shadow-lg">
                <MailCheck className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Verify OTP
              </h2>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Enter the verification code sent to
                <br />
                <span className="font-semibold text-slate-700">
                  {email}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  One-Time Password
                </label>

                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-center tracking-[0.4em] text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Verify */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-300"
              >
                Verify OTP
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            {/* Back */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-slate-600 hover:text-green-600 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};