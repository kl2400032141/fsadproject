import React from "react";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../../components/StatCard";
import {
  CheckSquare,
  AlertCircle,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";

export const ModeratorDashboard = () => {
  const { issues, projects } = useApp();

  const pendingProjects = projects.filter(
    (p) => p.status === "Proposed"
  );

  const stats = [
    {
      title: "Pending Approvals",
      value: pendingProjects.length,
      icon: CheckSquare,
    },
    {
      title: "Reported Issues",
      value: issues.length,
      icon: AlertCircle,
    },
    {
      title: "Active Monitoring",
      value: issues.filter(
        (i) => i.status === "In Progress"
      ).length,
      icon: MessageSquare,
    },
    {
      title: "Safety Alerts",
      value: 0,
      icon: ShieldAlert,
    },
  ];

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
            Moderator Control
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor issues and maintain platform integrity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-3xl shadow-xl p-2"
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Issues Section */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Current Issues
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current reported issues by citizens.
            </p>
          </div>

          <div className="space-y-4">
            {issues.slice(0, 8).map((issue) => (
              <div
                key={issue.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {issue.title}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      {issue.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {issues.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />

                <h4 className="text-lg font-bold text-slate-800">
                  No Reports Found
                </h4>

                <p className="text-slate-400 text-sm mt-1">
                  No citizen issues available right now.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};