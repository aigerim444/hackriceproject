import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'interactive-learning',
      title: 'Interactive Learning',
      description: 'Swahili & English content with gamified curriculum',
      icon: '📚',
      path: '/interactive-learning'
    },
    {
      id: 'video-modules',
      title: 'Video Modules and Lessons',
      description: 'Content-based informational videos with quizzes',
      icon: '🎥',
      path: '/video-modules'
    },
    {
      id: 'daily-questions',
      title: 'Daily Questions',
      description: 'Daily questions during and after learning process',
      icon: '❓',
      path: '/daily-questions'
    },
    {
      id: 'map',
      title: 'Map-Based UI',
      description: 'Location-based view for easier navigation',
      icon: '🗺️',
      path: '/map'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Afya Quest</h1>
        <p className="tagline">A gamified curriculum to empower CHAs</p>
      </header>
      
      <div className="user-stats">
        <div className="stat-card">
          <span className="stat-number">0</span>
          <span className="stat-label">Lessons Complete</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">0</span>
          <span className="stat-label">Points Earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">0</span>
          <span className="stat-label">Day Streak</span>
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="feature-card"
            onClick={() => navigate(feature.path)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <button className="primary-btn" onClick={() => navigate('/interactive-learning')}>
          Continue Learning
        </button>
        <button className="secondary-btn" onClick={() => navigate('/profile')}>
          My Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;