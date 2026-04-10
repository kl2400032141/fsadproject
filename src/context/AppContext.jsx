import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Mock Data
const initialUsers = [
  { id: '1', name: 'Admin User', email: 'admin@civic.gov', role: 'ADMIN', isVerified: true, isBlocked: false },
  { id: '2', name: 'John Citizen', email: 'john@citizen.com', role: 'CITIZEN', isVerified: true, isBlocked: false },
  { id: '3', name: 'Jane Politician', email: 'jane@gov.in', role: 'POLITICIAN', isVerified: true, isBlocked: false },
  { id: '4', name: 'Mark Moderator', email: 'mark@mod.com', role: 'MODERATOR', isVerified: true, isBlocked: false },
];

const initialIssues = [
  { id: 'i1', title: 'Potholes on Main St', description: 'Large potholes causing accidents.', category: 'Road', status: 'Pending', citizenId: '2', citizenName: 'John Citizen', upvotes: 15, createdAt: '2024-02-20' },
  { id: 'i2', title: 'Water Leakage', description: 'Pipe burst in Sector 4.', category: 'Water', status: 'In Progress', citizenId: '2', citizenName: 'John Citizen', upvotes: 8, createdAt: '2024-02-21' },
];

const initialProjects = [
  { id: 'p1', title: 'Solar Street Lights', description: 'Installing solar lights in public parks.', status: 'In Progress', budget: 50000, allocatedBudget: 45000, politicianId: '3', politicianName: 'Jane Politician', priority: 'High', feedback: [], createdAt: '2024-01-15' },
  { id: 'p2', title: 'New Community Center', description: 'Building a space for local events.', status: 'Proposed', budget: 200000, allocatedBudget: 0, politicianId: '3', politicianName: 'Jane Politician', priority: 'Medium', feedback: [], createdAt: '2024-02-10' },
];

export const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('civic_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('civic_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('civic_issues');
    return saved ? JSON.parse(saved) : initialIssues;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('civic_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  useEffect(() => {
    localStorage.setItem('civic_auth', JSON.stringify(authState));
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('civic_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('civic_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('civic_projects', JSON.stringify(projects));
  }, [projects]);

  const login = (email, role) => {
    const user = users.find(u => u.email === email && u.role === role);
    if (user) {
      if (user.isBlocked) {
        alert('Your account is blocked.');
        return;
      }
      setAuthState({ user, isAuthenticated: true });
    } else {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        isVerified: role === 'CITIZEN',
        isBlocked: false
      };
      setUsers(prev => [...prev, newUser]);
      setAuthState({ user: newUser, isAuthenticated: true });
    }
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
  };

  return (
    <AppContext.Provider value={{ authState, login, logout, users, issues, projects, setUsers, setIssues, setProjects }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
