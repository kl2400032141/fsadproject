import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ClipboardList,
  Wallet,
  Layers3,
  ChevronRight,
} from "lucide-react";

export const SuggestProjects = () => {
  const location =
    useLocation();

  const issueData =
    location.state || {};

  const [title, setTitle] =
    useState(
      issueData.title || ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    issueData.description ||
      ""
  );

  const [budget, setBudget] =
    useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const handleSuggest =
    () => {
      if (
        !title ||
        !description ||
        !budget
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      const newProject = {
        id:
          "PRJ" +
          Date.now(),
        title,
        description,
        budget:
          Number(
            budget
          ),
        allocatedBudget: 0,
        priority,
        status:
          "Suggested",
      };

      const oldProjects =
        JSON.parse(
          localStorage.getItem(
            "allocatedProjects"
          )
        ) || [];

      localStorage.setItem(
        "allocatedProjects",
        JSON.stringify([
          ...oldProjects,
          newProject,
        ])
      );

      alert(
        "Project Suggested Successfully"
      );

      setTitle("");
      setDescription("");
      setBudget("");
      setPriority(
        "MEDIUM"
      );
    };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm px-6 py-10">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Side */}
          <div className="hidden lg:block text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 shadow-xl mb-6">
              <ClipboardList className="w-8 h-8" />
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-5">
              Suggest Smart <br />
              Public Projects
            </h1>

            <p className="text-slate-200 text-lg leading-relaxed max-w-lg">
              Convert citizen issues into impactful projects and send them directly to the politician dashboard.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <h3 className="text-2xl font-bold">
                  Fast
                </h3>

                <p className="text-sm text-slate-300">
                  Submission
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
                <p className="text-emerald-600 font-semibold mb-2">
                  Moderator Portal
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Suggest New Project
                </h1>

                <p className="text-slate-500 mt-2">
                  Submit approved ideas to the politician dashboard.
                </p>
              </div>

              <div className="space-y-6">

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Name
                  </label>

                  <input
                    type="text"
                    value={
                      title
                    }
                    onChange={(
                      e
                    ) =>
                      setTitle(
                        e.target
                          .value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    value={
                      description
                    }
                    onChange={(
                      e
                    ) =>
                      setDescription(
                        e.target
                          .value
                      )
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                {/* Budget + Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Budget
                    </label>

                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <input
                        type="number"
                        value={
                          budget
                        }
                        onChange={(
                          e
                        ) =>
                          setBudget(
                            e.target
                              .value
                          )
                        }
                        placeholder="Enter budget"
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Priority
                    </label>

                    <div className="relative">
                      <Layers3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                      <select
                        value={
                          priority
                        }
                        onChange={(
                          e
                        ) =>
                          setPriority(
                            e.target
                              .value
                          )
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option>
                          HIGH
                        </option>
                        <option>
                          MEDIUM
                        </option>
                        <option>
                          LOW
                        </option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Button */}
                <button
                  onClick={
                    handleSuggest
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-emerald-300 transition-all"
                >
                  Suggest Project
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};