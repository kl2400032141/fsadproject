import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, KeyRound } from 'lucide-react';
import API from '../../api/api';

export const Otp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get email from register page
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await API.post("/verify", {   // ✅ FIXED URL
        email,
        otp
      });

      alert("OTP Verified ✅");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Verify OTP</h1>
          <p className="text-slate-500 mt-2">
            Enter OTP sent to {email}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border">
          <form onSubmit={handleVerify} className="space-y-6">

            {/* OTP INPUT */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl text-center tracking-widest"
                />
              </div>
            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-xl"
            >
              Verify OTP
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};