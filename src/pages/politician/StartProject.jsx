import React, { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  ChevronRight,
  Wallet,
  ClipboardList,
  Layers3,
} from "lucide-react";

export const StartProject = () => {
  const { authState, setProjects } =
    useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const issueData =
    location.state || {};

  const [formData, setFormData] =
    useState({
      title:
        issueData.title || "",
      description:
        issueData.description ||
        "",
      budget: 0,
      priority: "Medium",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id:
        "p" +
        Math.random()
          .toString(36)
          .substr(2, 9),

      ...formData,
      status: "Proposed",
      allocatedBudget: 0,
      politicianId:
        authState.user?.id || "",
      politicianName:
        authState.user?.name ||
        "",
      feedback: [],
      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    setProjects((prev) => [
      newProject,
      ...prev,
    ]);

    navigate(
      "/dashboard/politician"
    );
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

          {/* Left Side */}
          <div className="hidden lg:block text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-xl mb-6">
              <ClipboardList className="w-8 h-8" />
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-5">
              Start a New <br />
              Development Project
            </h1>

            <p className="text-slate-200 text-lg leading-relaxed max-w-lg">
              Convert public issues into actionable projects and improve your constituency with transparency.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold">
                  Fast
                </h3>

                <p className="text-sm text-slate-300">
                  Proposal Creation
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold">
                  Smart
                </h3>

                <p className="text-sm text-slate-300">
                  Budget Planning
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">

              <div className="mb-8">
                <p className="text-blue-600 font-semibold mb-2">
                  Politician Portal
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Start New Project
                </h1>

                <p className="text-slate-500 mt-2">
                  Convert citizen issue into a real project proposal.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Title
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      formData.title
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title:
                          e.target
                            .value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Budget + Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Estimated Budget
                    </label>

                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <input
                        type="number"
                        required
                        value={
                          formData.budget
                        }
                        onChange={(
                          e
                        ) =>
                          setFormData(
                            {
                              ...formData,
                              budget:
                                Number(
                                  e
                                    .target
                                    .value
                                ),
                            }
                          )
                        }
                        placeholder="Enter budget"
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Priority Level
                    </label>

                    <div className="relative">
                      <Layers3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <select
                        value={
                          formData.priority
                        }
                        onChange={(
                          e
                        ) =>
                          setFormData(
                            {
                              ...formData,
                              priority:
                                e
                                  .target
                                  .value,
                            }
                          )
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="Low">
                          Low
                        </option>

                        <option value="Medium">
                          Medium
                        </option>

                        <option value="High">
                          High
                        </option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Description
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={
                      formData.description
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target
                            .value,
                      })
                    }
                    placeholder="Explain goals, benefits and implementation..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(-1)
                    }
                    className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-300 transition-all"
                  >
                    Submit Proposal
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