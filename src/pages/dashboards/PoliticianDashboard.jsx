import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { Wallet, ClipboardList, AlertCircle, TrendingUp, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const PoliticianDashboard = () => {
  const { authState, issues, projects } = useApp();
  const user = authState.user;

  const myProjects = projects.filter(p => p.politicianId === user?.id);
  const totalBudget = myProjects.reduce((acc, curr) => acc + curr.budget, 0);
  const totalAllocated = myProjects.reduce((acc, curr) => acc + curr.allocatedBudget, 0);

  const stats = [
    { title: 'My Projects', value: myProjects.length, icon: ClipboardList },
    { title: 'Total Budget', value: `$${(totalBudget / 1000).toFixed(1)}k`, icon: Wallet },
    { title: 'Allocated', value: `$${(totalAllocated / 1000).toFixed(1)}k`, icon: TrendingUp },
    { title: 'Citizen Issues', value: issues.filter(i => i.status === 'Pending').length, icon: AlertCircle },
  ];

  const chartData = [
  { name: "Roads", budget: 500000, allocated: 320000 },
  { name: "Water", budget: 400000, allocated: 260000 },
  { name: "Health", budget: 450000, allocated: 380000 }
];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Politician Portal</h1>
          <p className="text-slate-500">Manage your constituency projects and budgets.</p>
        </div>
        <Link 
          to="/politician/new-project"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Propose Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Budget Allocation Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="allocated" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Citizen Issues</h3>
          <div className="space-y-4">
            {issues.filter(i => i.status === 'Pending').slice(0, 5).map((issue) => (
              <div key={issue.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-900">{issue.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">By {issue.citizenName} • {issue.upvotes} upvotes</p>
                  </div>
                  <Link to="/politician/issues" className="text-xs font-bold text-blue-600 hover:underline">Respond</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
