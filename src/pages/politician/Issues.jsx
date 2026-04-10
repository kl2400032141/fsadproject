import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, ThumbsUp, MessageSquare, AlertCircle } from 'lucide-react';

export const Issues = () => {
  const { issues, setIssues } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleUpvote = (id) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i));
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || issue.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community Issues</h1>
          <p className="text-slate-500">View and support issues raised by fellow citizens.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search issues..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
            >
              <option value="All">All Categories</option>
              <option value="Road">Road</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation">Sanitation</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIssues.map((issue) => (
          <div key={issue.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {issue.category}
              </span>
              <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                issue.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' :
                issue.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {issue.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{issue.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-3 mb-6">{issue.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {issue.citizenName.charAt(0)}
                </div>
                <span className="text-xs text-slate-500 font-medium">{issue.citizenName}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleUpvote(issue.id)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors group"
                >
                  <ThumbsUp className="w-4 h-4 group-active:scale-125 transition-transform" />
                  <span className="text-xs font-bold">{issue.upvotes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold">Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
