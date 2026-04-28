import React from "react";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../../components/StatCard";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  MessageSquare,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const CitizenDashboard = () => {
  const { authState, issues, projects } = useApp();
  const navigate = useNavigate();

  const user = authState.user;

  const myIssues = issues.filter(
    (i) => i.citizenId === user?.id
  );

  const stats = [
    {
      title: "My Issues",
      value: myIssues.length,
      icon: AlertCircle,
    },
    {
      title: "Resolved",
      value: myIssues.filter(
        (i) => i.status === "Resolved"
      ).length,
      icon: CheckCircle2,
    },
    {
      title: "Active Projects",
      value: projects.filter(
        (p) => p.status === "In Progress"
      ).length,
      icon: ClipboardList,
    },
    {
      title: "Total Upvotes",
      value: myIssues.reduce(
        (acc, curr) => acc + curr.upvotes,
        0
      ),
      icon: MessageSquare,
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="min-h-screen bg-slate-950/75 backdrop-blur-sm p-6 md:p-8">

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <p className="text-blue-600 font-semibold mb-2">
                Citizen Portal
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Welcome, {user?.name}
              </h1>

              <p className="text-slate-500 mt-2">
                Track your issues, monitor projects and improve your community.
              </p>
            </div>

            <Link
              to="/citizen/raise-issue"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-400 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Raise New Issue
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-2"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Recent Issues */}
          <div className="xl:col-span-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Recent Issues
                </h3>

                <span className="text-sm text-slate-500">
                  Last reports
                </span>
              </div>

              <div className="space-y-4">
                {myIssues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {issue.title}
                        </h4>

                        <p className="text-sm text-slate-500 mt-1">
                          {issue.category} • {issue.createdAt}
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold ${
                          issue.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : issue.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}

                {myIssues.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />

                    <p className="text-slate-500 font-medium">
                      You haven't raised any issues yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Local Projects */}
          <div>
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Local Projects
                </h3>

                <button
                  onClick={() =>
                    navigate("/citizen/projects")
                  }
                  className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-5">
                {projects.slice(0, 3).map((project) => {
                  const progress = Math.round(
                    (project.allocatedBudget /
                      project.budget) *
                      100
                  );

                  return (
                    <div
                      key={project.id}
                      className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
                    >
                      <h4 className="font-bold text-slate-900 text-sm">
                        {project.title}
                      </h4>

                      <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${progress}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between mt-2 text-xs font-semibold">
                        <span className="text-slate-400">
                          Progress
                        </span>

                        <span className="text-blue-600">
                          {progress}%
                        </span>
                      </div>
                    </div>
                  );
                })}

                {projects.length === 0 && (
                  <p className="text-sm text-slate-500">
                    No active projects available.
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};