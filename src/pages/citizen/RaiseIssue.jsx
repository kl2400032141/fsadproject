import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  AlertCircle,
  ChevronRight,
  Image as ImageIcon,
  UploadCloud,
  MapPin,
} from "lucide-react";

export const RaiseIssue = () => {
  const { authState, setIssues } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIssue = {
      id: "i" + Math.random().toString(36).substr(2, 9),
      ...formData,
      status: "Pending",
      citizenId: authState.user?.id || "",
      citizenName: authState.user?.name || "",
      upvotes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setIssues((prev) => [newIssue, ...prev]);

    navigate("/dashboard/citizen");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm px-6 py-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="hidden lg:block text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-xl mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-5">
              Raise Local <br />
              Community Issues
            </h1>

            <p className="text-slate-200 text-lg leading-relaxed max-w-lg">
              Report road damage, sanitation problems, water shortages,
              electricity issues and more directly to the authorities.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold">Fast</h3>
                <p className="text-sm text-slate-300">
                  Issue Reporting
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold">Smart</h3>
                <p className="text-sm text-slate-300">
                  Real-Time Tracking
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">

              <div className="mb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  Citizen Portal
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Raise a New Issue
                </h1>

                <p className="text-slate-500 mt-2">
                  Report problems in your locality to the authorities.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Issue Title
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Street light not working in Sector 5"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Road">
                      Road & Infrastructure
                    </option>
                    <option value="Water">
                      Water Supply
                    </option>
                    <option value="Electricity">
                      Electricity
                    </option>
                    <option value="Sanitation">
                      Sanitation & Waste
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Provide detailed information about the issue..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                

                {/* Buttons */}
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl shadow-xl hover:shadow-blue-300 flex items-center justify-center gap-2 transition-all"
                  >
                    Submit Issue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};