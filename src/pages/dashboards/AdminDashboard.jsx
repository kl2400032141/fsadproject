import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { Users, ClipboardList, AlertCircle, CheckCircle2, UserCheck, UserX } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard = () => {
  const { users, issues, projects } = useApp();

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, trend: { value: 12, isPositive: true } },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length, icon: ClipboardList },
    { title: 'Pending Issues', value: issues.filter(i => i.status === 'Pending').length, icon: AlertCircle, trend: { value: 5, isPositive: false } },
    { title: 'Verified Users', value: users.filter(u => u.isVerified).length, icon: UserCheck },
  ];

  const chartData = [
    { name: 'Citizens', value: users.filter(u => u.role === 'CITIZEN').length },
    { name: 'Politicians', value: users.filter(u => u.role === 'POLITICIAN').length },
    { name: 'Moderators', value: users.filter(u => u.role === 'MODERATOR').length },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500">Platform statistics and management summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">User Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="text-sm text-slate-600 font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Unverified Users</h3>
          <div className="space-y-4">
            {users.filter(u => !u.isVerified).slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role.toLowerCase()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <UserCheck className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <UserX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {users.filter(u => !u.isVerified).length === 0 && (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
                <p className="text-slate-400">All users verified!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
