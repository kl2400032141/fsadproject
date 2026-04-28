import React from "react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

export const MonitorIssues = () => {
  const { issues, setIssues } =
    useApp();

  const navigate =
    useNavigate();

  const resolveIssue = (
    id
  ) => {
    setIssues((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              status:
                "Resolved",
            }
          : i
      )
    );
  };

  const suggestProject = (
    issue
  ) => {
    navigate(
      "/moderator/suggest",
      {
        state: {
          title:
            issue.title,
          description:
            issue.description,
        },
      }
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
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm p-6 md:p-8">

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8 mb-8">
          <p className="text-indigo-600 font-semibold mb-2">
            Moderator Portal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Monitor Issues
          </h1>

          <p className="text-slate-500 mt-2">
            Track citizen complaints, resolve them and convert into projects.
          </p>
        </div>

        {/* Cards */}
        {issues.length ===
        0 ? (
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
            <AlertCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Issues Found
            </h3>

            <p className="text-slate-500">
              Citizen complaints will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {issues.map(
              (
                issue
              ) => (
                <div
                  key={
                    issue.id
                  }
                  className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 hover:-translate-y-1 hover:shadow-indigo-200 transition-all"
                >
                  {/* Top */}
                  <div className="flex justify-between items-start gap-4 mb-5">

                    <div className="flex gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-700">
                        <ClipboardList className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {
                            issue.title
                          }
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          ID:{" "}
                          {
                            issue.id
                          }
                        </p>
                      </div>
                    </div>

                    {issue.status ===
                      "Resolved" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        Resolved
                      </span>
                    )}

                  </div>

                  {/* Description */}
                  {issue.description && (
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {
                        issue.description
                      }
                    </p>
                  )}

                  {/* Actions */}
                  {issue.status ===
                  "Resolved" ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      Issue Successfully Resolved
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          resolveIssue(
                            issue.id
                          )
                        }
                        className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Resolve
                      </button>

                      <button
                        onClick={() =>
                          suggestProject(
                            issue
                          )
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        Suggest
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </div>
                  )}

                </div>
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
};