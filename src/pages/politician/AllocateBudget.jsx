import React, { useEffect } from "react";
import {
  ClipboardList,
  Wallet,
  PlayCircle,
  Building2,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AllocateBudget = () => {
  const { projects, setProjects } = useApp();

  useEffect(() => {
    const suggestedProjects =
      JSON.parse(
        localStorage.getItem(
          "allocatedProjects"
        )
      ) || [];

    if (suggestedProjects.length > 0) {
      setProjects((prev) => {
        const merged = [...prev];

        suggestedProjects.forEach(
          (item) => {
            const exists =
              merged.some(
                (p) =>
                  p.id === item.id
              );

            if (!exists) {
              merged.push({
                ...item,
                allocatedBudget:
                  item.allocatedBudget ||
                  0,
                status:
                  item.status ||
                  "Pending",
              });
            }
          }
        );

        return merged;
      });
    }
  }, [setProjects]);

  const handleAllocate = (
    id,
    value
  ) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              allocatedBudget:
                Number(value),
            }
          : p
      )
    );
  };

  const startProject = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status:
                "In Progress",
            }
          : p
      )
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
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm p-6 md:p-8">

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8">
          <p className="text-blue-600 font-semibold mb-2">
            Politician Portal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Allocate Budget
          </h1>

          <p className="text-slate-500 mt-2">
            Allocate funds and launch development projects.
          </p>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
            <Building2 className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Projects Available
            </h3>

            <p className="text-slate-500">
              Suggested or approved projects will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => {
              const budget =
                project.budget || 0;

              const allocated =
                project.allocatedBudget ||
                0;

              const progress =
                budget > 0
                  ? Math.round(
                      (allocated /
                        budget) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={project.id}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 hover:-translate-y-1 hover:shadow-blue-200 transition-all"
                >
                  {/* Top */}
                  <div className="flex justify-between items-start gap-4 mb-6">

                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
                        <ClipboardList className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {project.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          ID:{" "}
                          {project.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.status ===
                        "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>

                  {/* Budget Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-bold uppercase text-slate-400 mb-1">
                        Total Budget
                      </p>

                      <p className="font-bold text-slate-900">
                        ₹
                        {budget.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-bold uppercase text-slate-400 mb-1">
                        Allocated
                      </p>

                      <p className="font-bold text-slate-900">
                        ₹
                        {allocated.toLocaleString()}
                      </p>
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2 text-xs font-semibold">
                      <span className="text-slate-400 uppercase">
                        Allocation Progress
                      </span>

                      <span className="text-blue-600">
                        {progress}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <Wallet className="w-5 h-5 text-slate-400" />

                    <input
                      type="number"
                      value={
                        allocated
                      }
                      onChange={(e) =>
                        handleAllocate(
                          project.id,
                          e.target
                            .value
                        )
                      }
                      placeholder="Enter budget"
                      className="flex-1 bg-transparent outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      startProject(
                        project.id
                      )
                    }
                    disabled={
                      project.status ===
                      "In Progress"
                    }
                    className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      project.status ===
                      "In Progress"
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-300"
                    }`}
                  >
                    <PlayCircle className="w-5 h-5" />

                    {project.status ===
                    "In Progress"
                      ? "Project Started"
                      : "Start Project"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};