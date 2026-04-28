import React, {
  useState,
} from "react";

import {
  useApp,
} from "../../context/AppContext";

import {
  UserCheck,
  UserX,
  ShieldCheck,
  Search,
  Users,
} from "lucide-react";

export const VerifyUsers =
  () => {
    const {
      users,
      setUsers,
    } = useApp();

    const [
      searchTerm,
      setSearchTerm,
    ] = useState("");

    const handleVerify =
      (id) => {
        setUsers(
          (prev) =>
            prev.map(
              (u) =>
                u.id ===
                id
                  ? {
                      ...u,
                      isVerified:
                        true,
                    }
                  : u
            )
        );
      };

    const handleBlock =
      (id) => {
        setUsers(
          (prev) =>
            prev.map(
              (u) =>
                u.id ===
                id
                  ? {
                      ...u,
                      isBlocked:
                        !u.isBlocked,
                    }
                  : u
            )
        );
      };

    const pendingUsers =
      users
        .filter(
          (u) =>
            !u.isVerified
        )
        .filter(
          (u) =>
            u.name
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              ) ||
            u.email
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              )
        );

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

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7" />
                </div>

                <div>
                  <p className="text-blue-600 font-semibold">
                    Admin Panel
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    User Verification
                  </h1>

                  <p className="text-slate-500 mt-1">
                    Approve or reject new registration requests.
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={
                    searchTerm
                  }
                  onChange={(
                    e
                  ) =>
                    setSearchTerm(
                      e.target
                        .value
                    )
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full text-left">

                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      User
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Role
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Email
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {pendingUsers.map(
                    (
                      user
                    ) => (
                      <tr
                        key={
                          user.id
                        }
                        className="hover:bg-slate-50 transition-all"
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
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

                              <p className="text-xs text-slate-400">
                                ID:{" "}
                                {
                                  user.id
                                }
                              </p>
                            </div>

                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase">
                            {
                              user.role
                            }
                          </span>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {
                            user.email
                          }
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase">
                            Pending
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() =>
                                handleVerify(
                                  user.id
                                )
                              }
                              className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-all"
                              title="Verify"
                            >
                              <UserCheck className="w-5 h-5" />
                            </button>

                            <button
                              onClick={() =>
                                handleBlock(
                                  user.id
                                )
                              }
                              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-all"
                              title="Block"
                            >
                              <UserX className="w-5 h-5" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    )
                  )}

                  {pendingUsers.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={
                          5
                        }
                        className="px-6 py-14 text-center"
                      >
                        <ShieldCheck className="w-14 h-14 text-emerald-200 mx-auto mb-4" />

                        <h3 className="text-lg font-bold text-slate-800">
                          No Pending Requests
                        </h3>

                        <p className="text-slate-400 mt-1">
                          All users are verified.
                        </p>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    );
  };