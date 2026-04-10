import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, Wallet, Calendar } from 'lucide-react';

export const AllProjects = () => {
  const { projects } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Constituency Projects</h1>
        <p className="text-slate-500">Overview of all development initiatives in your area.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  project.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                  project.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                  'bg-slate-50 text-slate-600'
                }`}>
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{project.title}</h3>
                  <p className="text-xs text-slate-500">ID: {project.id.toUpperCase()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                project.status === 'Proposed' ? 'bg-amber-100 text-amber-700' :
                'bg-rose-100 text-rose-700'
              }`}>
                {project.status}
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-6 line-clamp-2">{project.description || "No description available."}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Wallet className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase">Budget</span>
                </div>
                <p className="text-sm font-bold text-slate-900">${project.budget.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase">Started</span>
                </div>
                <p className="text-sm font-bold text-slate-900">{project.createdAt}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Allocation Progress</span>
                <span className="text-xs font-bold text-blue-600">
                  {Math.round((project.allocatedBudget / project.budget) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(project.allocatedBudget / project.budget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                  {project.politicianName?.charAt(0) || "?"}
                </div>
                <span className="text-xs text-slate-500 font-medium">{project.politicianName}</span>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
