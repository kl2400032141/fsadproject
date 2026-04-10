import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ChevronRight } from 'lucide-react';
import API from "../../api/api";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {   // ✅ FIXED
        email,
        password
      });

      const user = res.data;

      // save user
      localStorage.setItem("user", JSON.stringify(user));

      // role-based navigation
      const dashboardMap = {
        ADMIN: "/dashboard/admin",
        CITIZEN: "/dashboard/citizen",
        POLITICIAN: "/dashboard/politician",
        MODERATOR: "/dashboard/moderator",
      };

      navigate(dashboardMap[user.role] || "/"); // ✅ safe fallback

    } catch (err) {
      console.error(err); // ✅ better debugging
      alert("Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to CivicConnect</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Sign In
              <ChevronRight className="w-5 h-5" />
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold">
                Register
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};