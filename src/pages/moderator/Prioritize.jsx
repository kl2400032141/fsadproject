import React, { useState } from "react";

export const Prioritize = () => {
  const [items, setItems] = useState([
    {
      id: "ISS301",
      title: "Road Damage",
      description: "Potholes causing traffic issues",
      priority: "Medium",
      reportedBy: "Citizen A",
    },
    {
      id: "ISS302",
      title: "Street Lights Not Working",
      description: "Lights not functioning in main road",
      priority: "Low",
      reportedBy: "Citizen B",
    },
  ]);

  const updatePriority = (id, value) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, priority: value } : i
      )
    );
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-blue-100 text-blue-600";
      case "Low":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Prioritize Issues
        </h1>
        <p className="text-sm text-slate-500">
          Adjust priority levels for reported issues
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
className="bg-white p-5 rounded-2xl shadow-md"          >
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Reported by {item.reportedBy}
                </p>
              </div>

              {/* Priority Badge */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityStyle(
                  item.priority
                )}`}
              >
                {item.priority.toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 mb-4">
              {item.description}
            </p>

            {/* Dropdown */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">Set Priority:</p>

              <select
                value={item.priority}
                onChange={(e) =>
                  updatePriority(item.id, e.target.value)
                }
className="bg-white p-5 rounded-2xl shadow-md"              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};