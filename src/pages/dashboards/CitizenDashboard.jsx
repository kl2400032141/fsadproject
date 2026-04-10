import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { AlertCircle, CheckCircle2, ClipboardList, MessageSquare, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Sidebar } from '../../components/Sidebar';

export const CitizenDashboard = () => {
  const { authState, issues, projects } = useApp();
  const user = authState.user;

  const myIssues = issues.filter(i => i.citizenId === user?.id);
  const navigate = useNavigate();
  const stats = [
    { title: 'My Issues', value: myIssues.length, icon: AlertCircle },
    { title: 'Resolved', value: myIssues.filter(i => i.status === 'Resolved').length, icon: CheckCircle2 },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length, icon: ClipboardList },
    { title: 'Total Upvotes', value: myIssues.reduce((acc, curr) => acc + curr.upvotes, 0), icon: MessageSquare },
  ];

 return (
  <div className="space-y-8">

    

      {/* 🔴 YOUR ORIGINAL CODE STARTS HERE */}
      <div className="p-6 bg-slate-50 min-h-screen space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {user?.name}
            </h1>
            <p className="text-slate-500">
              Track your reported issues and local projects.
            </p>
          </div>

          <Link 
            to="/citizen/raise-issue"   // (kept SAME as you said)
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            Raise New Issue
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Recent Issues
              </h3>

              <div className="space-y-4">
                {myIssues.slice(0, 5).map((issue) => (
                  <div key={issue.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{issue.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Category: {issue.category} • {issue.createdAt}
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                      issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                ))}

                {myIssues.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-400">
                      You haven't raised any issues yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Local Projects
                </h3>

                <button
                  onClick={() => navigate("/projects")}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="p-4 border border-slate-100 rounded-xl">
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {project.title}
                    </h4>

                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${(project.allocatedBudget / project.budget) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Progress
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">
                        {Math.round((project.allocatedBudget / project.budget) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
      {/* 🔴 YOUR ORIGINAL CODE ENDS HERE */}

    </div>
);
};