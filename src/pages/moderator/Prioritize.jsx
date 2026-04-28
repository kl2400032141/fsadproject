import React from "react";
import { useApp } from "../../context/AppContext";
import {
  AlertTriangle,
  Layers3,
  ArrowUpDown,
  ShieldCheck,
} from "lucide-react";

export const Prioritize = () => {
  const { issues, setIssues } = useApp();

  const pendingIssues = issues.filter(
    (item) => item.status !== "Resolved"
  );

  const updatePriority = (id, value) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, priority: value }
          : i
      )
    );
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-blue-100 text-blue-700";
      case "Low":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm p-6 md:p-8">

        {/* Header */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 md:p-8 mb-8">
          <p className="text-blue-600 font-semibold mb-2">
            Moderator Portal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Prioritize Issues
          </h1>

          <p className="text-slate-500 mt-2">
            Review unresolved complaints and assign urgency levels.
          </p>
        </div>

        {/* Empty */}
        {pendingIssues.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <ShieldCheck className="w-14 h-14 text-emerald-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              All Issues Resolved
            </h3>

            <p className="text-slate-500">
              No pending issues left for prioritization.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {pendingIssues.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 hover:shadow-blue-200 transition-all"
              >
                {/* Top */}
                <div className="flex justify-between gap-4 mb-5">

                  <div className="flex gap-4">
                    <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">
                      <AlertTriangle className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Reported by {item.citizenName}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        ID: {item.id}
                      </p>
                    </div>
                  </div>

                  {/* Badge */}
                  <span
                    className={`inline-flex items-center justify-center min-w-[95px] h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap ${getPriorityStyle(
                      item.priority || "Low"
                    )}`}
                  >
                    {(item.priority || "Low").toUpperCase()}
                  </span>

                </div>

                {/* Desc */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Select Box */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div className="flex items-center gap-2 text-slate-500">
                      <Layers3 className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Set Priority
                      </span>
                    </div>

                    <div className="relative w-full sm:w-[180px]">
                      <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                      <select
                        value={item.priority || "Low"}
                        onChange={(e) =>
                          updatePriority(
                            item.id,
                            e.target.value
                          )
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};