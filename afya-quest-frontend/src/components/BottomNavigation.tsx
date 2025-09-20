import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BottomNavigation.css';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      path: '/dashboard',
      icon: '🏠',
      label: 'Home'
    },
    {
      id: 'questions',
      path: '/daily-questions',
      icon: '📈',
      label: 'Daily Questions'
    },
    {
      id: 'learning',
      path: '/interactive-learning',
      icon: '📚',
      label: 'Learning'
    },
    {
      id: 'map',
      path: '/map',
      icon: '📍',
      label: 'Map'
    },
    {
      id: 'profile',
      path: '/profile',
      icon: '👤',
      label: 'Profile'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;