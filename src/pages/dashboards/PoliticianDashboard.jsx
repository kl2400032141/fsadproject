import React from "react";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../../components/StatCard";
import {
  Wallet,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const PoliticianDashboard = () => {
  const { authState, issues, projects } = useApp();
  const user = authState.user;

  const myProjects = projects.filter(
    (p) => p.politicianId === user?.id
  );

  const totalBudget = myProjects.reduce(
    (acc, curr) => acc + curr.budget,
    0
  );

  const totalAllocated = myProjects.reduce(
    (acc, curr) => acc + curr.allocatedBudget,
    0
  );

  const stats = [
    {
      title: "My Projects",
      value: myProjects.length,
      icon: ClipboardList,
    },
    {
      title: "Total Budget",
      value: `₹${(totalBudget / 10000000000000000).toFixed(1)} Lakh`,
      icon: Wallet,
    },
    {
      title: "Allocated",
      value: `₹${(totalAllocated / 1000).toFixed(1)}k`,
      icon: TrendingUp,
    },
    {
      title: "Citizen Issues",
      value: issues.filter(
        (i) => i.status === "Pending"
      ).length,
      icon: AlertCircle,
    },
  ];

  const chartData = [
    {
      name: "Roads",
      budget: 500000,
      allocated: 320000,
    },
    {
      name: "Water",
      budget: 400000,
      allocated: 260000,
    },
    {
      name: "Health",
      budget: 450000,
      allocated: 380000,
    },
  ];

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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <p className="text-blue-600 font-semibold mb-2">
                Politician Portal
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Welcome, {user?.name}
              </h1>

              <p className="text-slate-500 mt-2">
                Manage constituency projects, budgets and public issues.
              </p>
            </div>

            <Link
              to="/politician/new-project"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-xl hover:shadow-blue-300 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Propose Project
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Chart */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Budget Allocation Overview
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Compare planned vs allocated funds.
              </p>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#64748b",
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "#64748b",
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "#f8fafc",
                    }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow:
                        "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />

                  <Bar
                    dataKey="budget"
                    fill="#cbd5e1"
                    radius={[6, 6, 0, 0]}
                  />

                  <Bar
                    dataKey="allocated"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Citizen Issues */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Recent Citizen Issues
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Priority complaints needing attention.
                </p>
              </div>

              <Link
                to="/politician/issues"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {issues
                .filter(
                  (i) => i.status === "Pending"
                )
                .slice(0, 5)
                .map((issue) => (
                  <div
                    key={issue.id}
                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between gap-4">

                      <div>
                        <h4 className="font-bold text-slate-900">
                          {issue.title}
                        </h4>

                        <p className="text-sm text-slate-500 mt-1">
                          By {issue.citizenName}
                        </p>

                        <p className="text-xs text-blue-600 font-semibold mt-2">
                          {issue.upvotes} Upvotes
                        </p>
                      </div>

                      <Link
                        to="/politician/issues"
                        className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline"
                      >
                        Respond
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                    </div>
                  </div>
                ))}

              {issues.filter(
                (i) => i.status === "Pending"
              ).length === 0 && (
                <p className="text-sm text-slate-500">
                  No pending issues right now.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};