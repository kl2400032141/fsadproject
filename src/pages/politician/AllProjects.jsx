import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  ClipboardList,
  Wallet,
  Calendar,
  ArrowRight,
  Building2,
  X,
} from "lucide-react";

export const AllProjects = () => {
  const { projects } = useApp();

  const safeProjects = Array.isArray(projects)
    ? projects
    : [];

  const [selectedProject, setSelectedProject] =
    useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm p-6 md:p-8">

        {/* Header */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          <p className="text-blue-600 font-semibold mb-2">
            Politician Portal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Constituency Projects
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor all development initiatives across your constituency.
          </p>
        </div>

        {/* Empty */}
        {safeProjects.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <Building2 className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Projects Available
            </h3>

            <p className="text-slate-500">
              Projects will appear here after approval or creation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {safeProjects.map((project) => {
              const budget =
                project?.budget || 0;

              const allocated =
                project?.allocatedBudget || 0;

              const progress =
                budget > 0
                  ? (allocated / budget) * 100
                  : 0;

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl shadow-2xl p-6"
                >
                  {/* Top */}
                  <div className="flex justify-between mb-5">

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ID: {project.id}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center justify-center min-w-[130px] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                        project.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "Proposed"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {project.status}
                    </span>

                  </div>

                  {/* Desc */}
                  <p className="text-slate-600 mb-5">
                    {project.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>

                      <span className="font-bold text-blue-600">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">

                    <p className="text-sm text-slate-500">
                      ₹{budget.toLocaleString()}
                    </p>

                    <button
                      onClick={() =>
                        setSelectedProject(project)
                      }
                      className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* Popup Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-7 relative">

              {/* Close */}
              <button
                onClick={() =>
                  setSelectedProject(null)
                }
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-slate-600 mb-5">
                {selectedProject.description}
              </p>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Project ID
                  </span>
                  <span className="font-semibold">
                    {selectedProject.id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Budget
                  </span>
                  <span className="font-semibold">
                    ₹{selectedProject.budget.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Allocated
                  </span>
                  <span className="font-semibold">
                    ₹{(
                      selectedProject.allocatedBudget ||
                      0
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Status
                  </span>
                  <span className="font-semibold text-blue-600">
                    {selectedProject.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Owner
                  </span>
                  <span className="font-semibold">
                    {selectedProject.politicianName ||
                      "Unknown"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Started
                  </span>
                  <span className="font-semibold">
                    {selectedProject.createdAt}
                  </span>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};