import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }) => {

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const dashboardMap = {
      ADMIN: '/dashboard/admin',
      CITIZEN: '/dashboard/citizen',
      POLITICIAN: '/dashboard/politician',
      MODERATOR: '/dashboard/moderator',
    };

    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return children;
};