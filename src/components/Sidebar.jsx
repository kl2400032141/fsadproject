import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LogOut,
  ShieldCheck,
  UserX,
  PlusCircle,
  Wallet,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  FileText,
  CheckSquare,
  BarChart3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Sidebar = () => {
  const { authState, logout } = useApp();
  const user = authState.user;

const localUser = JSON.parse(localStorage.getItem("user"));
const currentUser = user || localUser;
const navigate = useNavigate();
if (!currentUser) return null;
  const navItems = {
    ADMIN: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/admin' },
      { label: 'Verify Users', icon: ShieldCheck, path: '/admin/verify' },
      { label: 'Fake Accounts', icon: UserX, path: '/admin/fake-accounts' },
    ],
    CITIZEN: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/citizen' },
      { label: 'Raise Issue', icon: AlertCircle, path: '/citizen/raise-issue' },
      { label: 'View Issues', icon: FileText, path: '/citizen/issues' },
      { label: 'View Projects', icon: CheckSquare, path: '/citizen/projects' },
    ],
    POLITICIAN: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/politician' },
      { label: 'All Projects', icon: ClipboardList, path: '/politician/projects' },
      { label: 'Allocate Budget', icon: Wallet, path: '/politician/budget' },
      { label: 'Start Project', icon: PlusCircle, path: '/politician/new-project' },
      { label: 'View Issues', icon: AlertCircle, path: '/politician/issues' },
    ],
    MODERATOR: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/moderator' },
      { label: 'Suggest Projects', icon: CheckSquare, path: '/moderator/suggest' },
      { label: 'Prioritize', icon: BarChart3, path: '/moderator/prioritize' },
      { label: 'Monitor Issues', icon: AlertCircle, path: '/moderator/monitor' },
    ],
  };

const items = navItems[currentUser.role] || [];
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen sticky top-0 flex flex-col border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">CivicConnect</h1>
        </div>

        <nav className="space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-6 px-4">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
            {currentUser.name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser.role.toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={() => {
  logout();
  localStorage.removeItem("user"); // optional but recommended
  navigate("/login");
}}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
