import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { CheckSquare, AlertCircle, MessageSquare, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export const ModeratorDashboard = () => {
  const { issues, projects } = useApp();

  const stats = [
    { title: 'Pending Approvals', value: projects.filter(p => p.status === 'Proposed').length, icon: CheckSquare },
    { title: 'Reported Issues', value: issues.length, icon: AlertCircle },
    { title: 'Active Monitoring', value: issues.filter(i => i.status === 'In Progress').length, icon: MessageSquare },
    { title: 'Safety Alerts', value: 0, icon: ShieldAlert },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Moderator Control</h1>
        <p className="text-slate-500">Review projects, monitor content, and ensure platform integrity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Project Approval Queue</h3>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'Proposed').map((project) => (
              <div key={project.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{project.title}</h4>
                    <p className="text-xs text-slate-500">Proposed by {project.politicianName}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase">
                    {project.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{project.description}</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
            {projects.filter(p => p.status === 'Proposed').length === 0 && (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
                <p className="text-slate-400">No projects pending approval.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Content Monitoring</h3>
          <div className="space-y-4">
            {issues.slice(0, 5).map((issue) => (
              <div key={issue.id} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{issue.title}</p>
                    <p className="text-xs text-slate-400">By {issue.citizenName}</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors">Flag</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
