import React from "react";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../../components/StatCard";
import {
  Users,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AdminDashboard = () => {
  const {
    users,
    issues,
    projects,
  } = useApp();

  const stats = [
    {
      title:
        "Total Users",
      value:
        users.length,
      icon: Users,
      trend: {
        value: 12,
        isPositive:
          true,
      },
    },
    {
      title:
        "Active Projects",
      value:
        projects.filter(
          (p) =>
            p.status ===
            "In Progress"
        ).length,
      icon:
        ClipboardList,
    },
    {
      title:
        "Pending Issues",
      value:
        issues.filter(
          (i) =>
            i.status ===
            "Pending"
        ).length,
      icon:
        AlertCircle,
      trend: {
        value: 5,
        isPositive:
          false,
      },
    },
    {
      title:
        "Verified Users",
      value:
        users.filter(
          (u) =>
            u.isVerified
        ).length,
      icon:
        UserCheck,
    },
  ];

  const chartData = [
    {
      name:
        "Citizens",
      value:
        users.filter(
          (u) =>
            u.role ===
            "CITIZEN"
        ).length,
    },
    {
      name:
        "Politicians",
      value:
        users.filter(
          (u) =>
            u.role ===
            "POLITICIAN"
        ).length,
    },
    {
      name:
        "Moderators",
      value:
        users.filter(
          (u) =>
            u.role ===
            "MODERATOR"
        ).length,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
  ];

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
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <p className="text-blue-600 font-semibold">
                Admin Panel
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Platform Overview
              </h1>

              <p className="text-slate-500 mt-1">
                Manage users, projects and civic activity across the platform.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(
            (
              stat,
              idx
            ) => (
              <StatCard
                key={
                  idx
                }
                {...stat}
              />
            )
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* User Distribution */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              User Distribution
            </h3>

            <div className="h-[320px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={
                      chartData
                    }
                    cx="50%"
                    cy="50%"
                    innerRadius={
                      65
                    }
                    outerRadius={
                      95
                    }
                    paddingAngle={
                      5
                    }
                    dataKey="value"
                  >
                    {chartData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-5 mt-4">
              {chartData.map(
                (
                  item,
                  idx
                ) => (
                  <div
                    key={
                      idx
                    }
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[
                            idx
                          ],
                      }}
                    ></div>

                    <span className="text-sm font-medium text-slate-600">
                      {
                        item.name
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Pending Users */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Recent Unverified Users
            </h3>

            <div className="space-y-4">
              {users
                .filter(
                  (
                    u
                  ) =>
                    !u.isVerified
                )
                .slice(
                  0,
                  5
                )
                .map(
                  (
                    user
                  ) => (
                    <div
                      key={
                        user.id
                      }
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                          {user.name.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {
                              user.name
                            }
                          </p>

                          <p className="text-xs text-slate-500 uppercase">
                            {
                              user.role
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-all">
                          <UserCheck className="w-5 h-5" />
                        </button>

                        <button className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-all">
                          <UserX className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                )}

              {users.filter(
                (
                  u
                ) =>
                  !u.isVerified
              ).length ===
                0 && (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-14 h-14 text-emerald-200 mx-auto mb-3" />

                  <p className="text-slate-400 font-medium">
                    All users verified!
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};