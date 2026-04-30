import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import API from "../../api/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  /* Manual Fixed Logins */

  // Citizen
  if (
    email === "vidyajagabattula@gmail.com" &&
    password === "1234"
  ) {
    const user = {
      email,
      role: "CITIZEN",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard/citizen");
    return;
  }

  // Politician
  if (
    email === "thotadeepamrutha@gmail.com" &&
    password === "1234"
  ) {
    const user = {
      email,
      role: "POLITICIAN",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard/politician");
    return;
  }

  // Moderator
  if (
    email === "2400032141@kluniversity.in" &&
    password === "1234"
  ) {
    const user = {
      email,
      role: "MODERATOR",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard/moderator");
    return;
  }

  // Admin
  if (
    email === "2400031965@kluniversity.in" &&
    password === "1234"
  ) {
    const user = {
      email,
      role: "ADMIN",
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard/admin");
    return;
  }

  /* Existing Backend Login Logic */
  try {
    const res = await API.post("/login", {
      email,
      password,
    });

    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));

    const dashboardMap = {
      ADMIN: "/dashboard/admin",
      CITIZEN: "/dashboard/citizen",
      POLITICIAN: "/dashboard/politician",
      MODERATOR: "/dashboard/moderator",
    };

    navigate(dashboardMap[user.role] || "/");
  } catch (err) {
    console.error(err);
    alert("Login failed ❌");
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-6 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        <div className="hidden lg:block text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-6 shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-5">
            Welcome to <br />
            CivicConnect
          </h1>

          <p className="text-slate-200 text-lg leading-relaxed max-w-lg">
            Smart governance platform connecting citizens, moderators and
            leaders to solve issues, manage projects and build better
            communities.
          </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4 shadow-lg">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>

              <p className="text-slate-500 mt-2">
                Sign in to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPass ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Sign In
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};