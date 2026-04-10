import React, { useState } from "react";
import { ShieldAlert, Ban, CheckCircle } from "lucide-react";

export const FakeUser = () => {
  const [users, setUsers] = useState([
    { id: "USR1023", name: "Ravi Kumar", status: "active" },
    { id: "USR1048", name: "Anita Sharma", status: "active" },
    { id: "USR1091", name: "Suresh Naidu", status: "active" },
    { id: "USR1134", name: "Fake Account", status: "blocked" },
  ]);

  const blockUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "blocked" } : u
      )
    );
  };

  const unblockUser = (id) => {
    // when unblocked → remove from list
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Fake / Suspicious Users
        </h1>
        <p className="text-slate-500">
          Review and manage suspicious or fake user accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    user.status === "blocked"
                      ? "bg-rose-50 text-rose-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-500">
                    User ID: {user.id}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  user.status === "blocked"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {user.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {user.status === "active" ? (
                <button
                  onClick={() => blockUser(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 transition-all"
                >
                  <Ban className="w-5 h-5" />
                  Block
                </button>
              ) : (
                <button
                  onClick={() => unblockUser(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  Unblock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-20">
          <CheckCircle className="w-14 h-14 text-emerald-200 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">
            No suspicious users remaining 🎉
          </p>
        </div>
      )}
    </div>
  );
};