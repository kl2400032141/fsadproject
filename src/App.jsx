import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Otp } from './pages/auth/Otp';
// Dashboards
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { CitizenDashboard } from './pages/dashboards/CitizenDashboard';
import { PoliticianDashboard } from './pages/dashboards/PoliticianDashboard';
import { ModeratorDashboard } from './pages/dashboards/ModeratorDashboard';

// Admin Pages
import { VerifyUsers } from './pages/admin/VerifyUsers';
import { FakeUser } from './pages/admin/FakeUser';
// Citizen Pages
import { RaiseIssue } from './pages/citizen/RaiseIssue';
import { ViewIssues } from './pages/citizen/ViewIssues';
import { ViewProjects } from './pages/citizen/ViewProjects';
// Politician Pages
import { StartProject } from './pages/politician/StartProject';
import { AllProjects } from './pages/politician/AllProjects';
import { AllocateBudget } from './pages/politician/AllocateBudget';
import { Issues } from './pages/politician/Issues';
// Moderator Pages
import { SuggestProjects } from './pages/moderator/SuggestProjects';
import { MonitorIssues } from './pages/moderator/MonitorIssues';
import { Prioritize } from './pages/moderator/Prioritize';
const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Admin Routes */}
            <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/verify" element={<ProtectedRoute allowedRoles={['ADMIN']}><VerifyUsers /></ProtectedRoute>} />
            <Route path="/admin/fake-accounts" element={<ProtectedRoute allowedRoles={['ADMIN']}><FakeUser /></ProtectedRoute>} />
            {/* Citizen Routes */}
            <Route path="/dashboard/citizen" element={<ProtectedRoute allowedRoles={['CITIZEN']}><CitizenDashboard /></ProtectedRoute>} />
            <Route path="/citizen/raise-issue" element={<ProtectedRoute allowedRoles={['CITIZEN']}><RaiseIssue /></ProtectedRoute>} />
            <Route path="/citizen/issues" element={<ProtectedRoute allowedRoles={['CITIZEN']}><ViewIssues /></ProtectedRoute>} />
            <Route path="/projects" element={ <ProtectedRoute allowedRoles={["citizen", "politician"]}> <DashboardLayout /> </ProtectedRoute> } />
            <Route path="/citizen/projects" element={<ProtectedRoute allowedRoles={['CITIZEN']}><ViewProjects /></ProtectedRoute>} />
            {/* Politician Routes */}
            <Route path="/dashboard/politician" element={<ProtectedRoute allowedRoles={['POLITICIAN']}><PoliticianDashboard /></ProtectedRoute>} />
            <Route path="/politician/new-project" element={<ProtectedRoute allowedRoles={['POLITICIAN']}><StartProject /></ProtectedRoute>} />
            <Route path="/politician/budget" element={<ProtectedRoute allowedRoles={['POLITICIAN']}><AllocateBudget /></ProtectedRoute>} />
            <Route path="/politician/projects" element={<ProtectedRoute allowedRoles={['POLITICIAN']}><AllProjects /></ProtectedRoute>} />
            <Route path="/politician/issues" element={<ProtectedRoute allowedRoles={['POLITICIAN']}><Issues /></ProtectedRoute>} />
            {/* Moderator Routes */}
            <Route path="/dashboard/moderator" element={<ProtectedRoute allowedRoles={['MODERATOR']}><ModeratorDashboard /></ProtectedRoute>} />
            <Route path="/moderator/suggest" element={<ProtectedRoute allowedRoles={['MODERATOR']}><SuggestProjects /></ProtectedRoute>} />
            <Route path="/moderator/monitor" element={<ProtectedRoute allowedRoles={['MODERATOR']}><MonitorIssues /></ProtectedRoute>} />
            <Route path="/moderator/prioritize" element={<ProtectedRoute allowedRoles={['MODERATOR']}><Prioritize /></ProtectedRoute>} />

          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}