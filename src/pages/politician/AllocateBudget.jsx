import React, { useState } from "react";
import { ClipboardList, Wallet, PlayCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AllocateBudget = () => {
  const { projects, setProjects } = useApp();

  const handleAllocate = (id, value) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, allocatedBudget: Number(value) }
          : p
      )
    );
  };

  const startProject = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "In Progress" }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Allocate Budget
        </h1>
        <p className="text-slate-500">
          Allocate funds and initiate constituency development projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = Math.round(
            (project.allocatedBudget / project.budget) * 100
          );

          return (
            <div
              key={project.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      ID: {project.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    project.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Budget Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Total Budget
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    ₹{project.budget.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Allocated
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    ₹{project.allocatedBudget.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    Allocation Progress
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Allocate Budget */}
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  value={project.allocatedBudget}
                  onChange={(e) =>
                    handleAllocate(project.id, e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              {/* Start Project */}
              <button
                onClick={() => startProject(project.id)}
                disabled={project.status === "In Progress"}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all ${
                  project.status === "In Progress"
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                }`}
              >
                <PlayCircle className="w-5 h-5" />
                Start Project
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};