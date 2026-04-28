import React, {
  useState,
} from "react";

import {
  ShieldAlert,
  Ban,
  CheckCircle,
  Search,
  UserX,
} from "lucide-react";

export const FakeUser =
  () => {
    const [
      users,
      setUsers,
    ] = useState([
      {
        id: "USR1023",
        name:
          "Ravi Kumar",
        status:
          "active",
      },
      {
        id: "USR1048",
        name:
          "Anita Sharma",
        status:
          "active",
      },
      {
        id: "USR1091",
        name:
          "Suresh Naidu",
        status:
          "active",
      },
      {
        id: "USR1134",
        name:
          "Fake Account",
        status:
          "blocked",
      },
    ]);

    const [
      searchTerm,
      setSearchTerm,
    ] = useState("");

    const blockUser =
      (id) => {
        setUsers(
          (prev) =>
            prev.map(
              (u) =>
                u.id ===
                id
                  ? {
                      ...u,
                      status:
                        "blocked",
                    }
                  : u
            )
        );
      };

    const unblockUser =
      (id) => {
        setUsers(
          (prev) =>
            prev.filter(
              (u) =>
                u.id !==
                id
            )
        );
      };

    const filteredUsers =
      users.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          user.id
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
                <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg">
                  <ShieldAlert className="w-7 h-7" />
                </div>

                <div>
                  <p className="text-rose-600 font-semibold">
                    Admin Security
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Fake / Suspicious Users
                  </h1>

                  <p className="text-slate-500 mt-1">
                    Review and manage suspicious or fake user accounts.
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
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

            </div>
          </div>

          {/* Cards */}
          {filteredUsers.length >
          0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {filteredUsers.map(
                (
                  user
                ) => (
                  <div
                    key={
                      user.id
                    }
                    className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 hover:-translate-y-1 hover:shadow-rose-200 transition-all"
                  >
                    {/* Top */}
                    <div className="flex justify-between items-start gap-4 mb-6">

                      <div className="flex gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            user.status ===
                            "blocked"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <UserX className="w-7 h-7" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {
                              user.name
                            }
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            User ID:{" "}
                            {
                              user.id
                            }
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          user.status ===
                          "blocked"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {
                          user.status
                        }
                      </span>

                    </div>

                    {/* Action */}
                    {user.status ===
                    "active" ? (
                      <button
                        onClick={() =>
                          blockUser(
                            user.id
                          )
                        }
                        className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <Ban className="w-5 h-5" />
                        Block User
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          unblockUser(
                            user.id
                          )
                        }
                        className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition-all"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Unblock User
                      </button>
                    )}

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-14 text-center">

              <CheckCircle className="w-16 h-16 text-emerald-300 mx-auto mb-4" />

              <h3 className="text-xl font-bold text-slate-900">
                No Suspicious Users
              </h3>

              <p className="text-slate-500 mt-2">
                All accounts are currently safe and verified.
              </p>

            </div>
          )}

        </div>
      </div>
    );
  };