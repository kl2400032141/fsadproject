import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Issues = () => {
  const { issues, setIssues } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const handleUpvote = (id) => {
    const likedIssues =
      JSON.parse(
        localStorage.getItem(
          "likedIssues"
        )
      ) || [];

    if (
      likedIssues.includes(id)
    )
      return;

    setIssues((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              upvotes:
                i.upvotes + 1,
            }
          : i
      )
    );

    localStorage.setItem(
      "likedIssues",
      JSON.stringify([
        ...likedIssues,
        id,
      ])
    );
  };

  const startProject = (
    issue
  ) => {
    navigate(
      "/politician/new-project",
      {
        state: {
          title:
            issue.title,
          description:
            issue.description,
          category:
            issue.category,
        },
      }
    );
  };

  const getPriorityStyle = (
    priority
  ) => {
    switch (
      priority
    ) {
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

  const filteredIssues =
    issues.filter((issue) => {
      const matchesSearch =
        issue.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        issue.description
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =
        filter === "All" ||
        issue.category ===
          filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <p className="text-blue-600 font-semibold mb-2">
                Politician Portal
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Community Issues
              </h1>

              <p className="text-slate-500 mt-2">
                Review citizen complaints and convert them into projects.
              </p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search issues..."
                  value={
                    searchTerm
                  }
                  onChange={(e) =>
                    setSearchTerm(
                      e.target
                        .value
                    )
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="relative min-w-[220px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(
                      e.target
                        .value
                    )
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 appearance-none"
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
        {filteredIssues.length >
        0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredIssues.map(
              (issue) => {
                const liked =
                  JSON.parse(
                    localStorage.getItem(
                      "likedIssues"
                    ) ||
                      "[]"
                  ).includes(
                    issue.id
                  );

                return (
                  <div
                    key={
                      issue.id
                    }
                    className="bg-white rounded-3xl shadow-2xl p-6"
                  >
                    {/* Top */}
                    <div className="mb-5 flex justify-between items-center gap-3">

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {
                          issue.category
                        }
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityStyle(
                          issue.priority ||
                            "Low"
                        )}`}
                      >
                        {(
                          issue.priority ||
                          "Low"
                        ).toUpperCase()}
                      </span>

                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {
                        issue.title
                      }
                    </h3>

                    {/* Desc */}
                    <p className="text-sm text-slate-600 mb-6 line-clamp-3">
                      {
                        issue.description
                      }
                    </p>

                    {/* Start Project */}
                    <button
                      onClick={() =>
                        startProject(
                          issue
                        )
                      }
                      className="w-full mb-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
                    >
                      Start Project
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Footer */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {issue.citizenName.charAt(
                            0
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {
                              issue.citizenName
                            }
                          </p>

                          <p className="text-xs text-slate-400">
                            Citizen
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">

                        {/* Like */}
                        <button
                          onClick={() =>
                            handleUpvote(
                              issue.id
                            )
                          }
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp
                            className={`w-4 h-4 ${
                              liked
                                ? "text-blue-600 fill-blue-600"
                                : "text-slate-400"
                            }`}
                          />

                          <span
                            className={`text-xs font-bold ${
                              liked
                                ? "text-blue-600"
                                : "text-slate-500"
                            }`}
                          >
                            {
                              issue.upvotes
                            }
                          </span>
                        </button>

                        {/* Reply */}
                        <button className="flex items-center gap-1 text-slate-400 hover:text-slate-700">
                          <MessageSquare className="w-4 h-4" />

                          <span className="text-xs font-bold">
                            Reply
                          </span>
                        </button>

                      </div>
                    </div>
                  </div>
                );
              }
            )}

          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <AlertCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              No Issues Found
            </h3>

            <p className="text-slate-500">
              Try changing search keywords or category filter.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};