import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export const SuggestProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: "PRJ201",
      title: "Drainage System Upgrade",
      description: "Improve drainage to prevent flooding.",
      status: "Pending",
      priority: "HIGH",
      author: "Citizen A",
    },
    {
      id: "PRJ202",
      title: "Village Road Expansion",
      description: "Widen roads for better transport.",
      status: "Pending",
      priority: "MEDIUM",
      author: "Citizen B",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      )
    );
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-600";
      case "MEDIUM":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Project Approval Queue
        </h1>
        <p className="text-slate-500 text-sm">
          Review and take action on proposed projects
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
className="bg-white p-5 rounded-2xl shadow-md"          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Proposed by {p.author}
                </p>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityStyle(
                  p.priority
                )}`}
              >
                {p.priority} PRIORITY
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 mb-4">
              {p.description}
            </p>

            {/* Buttons */}
            {p.status === "Pending" ? (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(p.id, "Suggested")}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Suggest
                </button>

                <button
                  onClick={() => updateStatus(p.id, "Rejected")}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            ) : (
              <div className="text-sm text-slate-500 font-medium">
                Status:{" "}
                <span
                  className={`${
                    p.status === "Approved"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};