import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export const ViewIssues = () => {
  const { issues, setIssues } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const handleUpvote = (id) => {
  const likedIssues =
    JSON.parse(localStorage.getItem("likedIssues")) || [];

  if (likedIssues.includes(id)) {
    return; // already liked
  }

  setIssues((prev) =>
    prev.map((i) =>
      i.id === id
        ? { ...i, upvotes: i.upvotes + 1 }
        : i
    )
  );

  localStorage.setItem(
    "likedIssues",
    JSON.stringify([...likedIssues, id])
  );
};
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      issue.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      issue.category === filter;

    return matchesSearch && matchesFilter;
  });

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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <p className="text-blue-600 font-semibold mb-2">
                Community Portal
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Community Issues
              </h1>

              <p className="text-slate-500 mt-2">
                View, support and engage with issues raised by fellow citizens.
              </p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative min-w-[220px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">
                    All Categories
                  </option>
                  <option value="Road">
                    Road
                  </option>
                  <option value="Water">
                    Water
                  </option>
                  <option value="Electricity">
                    Electricity
                  </option>
                  <option value="Sanitation">
                    Sanitation
                  </option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* Cards */}
        {filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 hover:-translate-y-1 hover:shadow-blue-200 transition-all"
              >
                {/* Top */}
                <div className="flex justify-between items-start mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    {issue.category}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      issue.status === "Resolved"
                        ? "bg-emerald-100 text-emerald-700"
                        : issue.status ===
                          "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {issue.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {issue.description}
                </p>

                {/* Bottom */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">

                  {/* User */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                      {issue.citizenName.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {issue.citizenName}
                      </p>

                      <p className="text-xs text-slate-400">
                        Citizen
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleUpvote(issue.id)
                      }
                      className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-xs font-bold">
                        {issue.upvotes}
                      </span>
                    </button>

                    <button className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold">
                        Reply
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-12 text-center">
            <AlertCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Issues Found
            </h3>

            <p className="text-slate-500">
              Try changing search keywords or category filters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};