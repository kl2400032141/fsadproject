import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, Phone, ChevronRight } from 'lucide-react';
import API from "../../api/api";

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('CITIZEN');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
// ✅ EMAIL VALIDATION
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  alert("Enter valid email address ❌");
  return;
}
  // ✅ PHONE VALIDATION (ADD THIS)
  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits ❌");
    return;
  }

  try {
    const res = await API.post("/register", {
      name,
      email,
      password,
      role,
      phone
    });

    if (res.data === "User already exists") {
      alert("User already exists ❌");
      navigate("/login");
      return;
    }

    alert("Registered! Check your email for OTP 📩");
    navigate("/otp", { state: { email } });

  } catch (err) {
    console.error(err);

    // ✅ HANDLE BACKEND VALIDATION ERROR (ADD THIS)
    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Registration failed ❌");
    }
  }
};
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border rounded-xl"
                />
              </div>
            </div>

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

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
  type="tel"
  required
  value={phone}
  maxLength={10}   // ✅ limit to 10 digits
  onChange={(e) => {
    const value = e.target.value;

    // allow only numbers
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  }}
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

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold mb-2">Register As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="CITIZEN">Citizen</option>
                <option value="POLITICIAN">Politician</option>
                <option value="MODERATOR">Moderator</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Create Account
              <ChevronRight className="w-5 h-5" />
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};