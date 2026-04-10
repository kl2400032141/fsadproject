import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle } from "lucide-react";

export const MonitorIssues = () => {
  const { issues, setIssues, projects, setProjects } = useApp();

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [budget, setBudget] = useState("");

  const resolveIssue = (id) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "Resolved" } : i
      )
    );
  };

  const suggestProject = (issue) => {
    setSelectedIssue(issue);
  };

  const confirmSuggestion = () => {
    if (!budget) return;

    const newProject = {
      id: "PRJ" + Date.now(),
      title: selectedIssue.title,
      description: selectedIssue.description || "Suggested by moderator",
      budget: Number(budget),
      allocatedBudget: 0,
      status: "Proposed",
      politicianId: "3",
      politicianName: "Assigned Later",
      priority: "Medium",
      feedback: [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjects((prev) => [...prev, newProject]);
    setSelectedIssue(null);
    setBudget("");
  };

  const getStatusStyle = (status) => {
    return status === "Resolved"
      ? "bg-emerald-100 text-emerald-600"
      : "bg-amber-100 text-amber-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Monitor Issues
        </h1>
        <p className="text-sm text-slate-500">
          Track, resolve and convert issues into projects
        </p>
      </div>

      {/* Issue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  {issue.title}
                </h3>
                <p className="text-xs text-slate-500">
                  ID: {issue.id}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusStyle(
                  issue.status
                )}`}
              >
                {issue.status || "Pending"}
              </span>
            </div>

            {/* Description */}
            {issue.description && (
              <p className="text-sm text-slate-600 mb-4">
                {issue.description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              {issue.status !== "Resolved" && (
                <button
                  onClick={() => resolveIssue(issue.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Resolve
                </button>
              )}

              <button
                onClick={() => suggestProject(issue)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
              >
                Suggest Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 space-y-4 shadow-lg">
            <h3 className="font-bold text-lg text-slate-800">
              Suggest Project
            </h3>

            <p className="text-sm text-slate-500">
              {selectedIssue.title}
            </p>

            <input
              type="number"
              placeholder="Enter Expected Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-3 pt-2">
              <button
                onClick={confirmSuggestion}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedIssue(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 py-2 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};