import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalXP, getStreak, getLives, initializeLivesIfNeeded } from '../utils/xpManager';
import '../styles/Dashboard.css';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  isRequired: boolean;
  isCompleted: boolean;
  path: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [streakCount, setStreakCount] = useState(getStreak());
  const [xpPoints, setXpPoints] = useState(getTotalXP());
  const [lives, setLives] = useState(getLives());
  
  useEffect(() => {
    // Initialize lives if needed
    initializeLivesIfNeeded();
    
    // Update XP, streak and lives from localStorage
    const updateStats = () => {
      setXpPoints(getTotalXP());
      setStreakCount(getStreak());
      setLives(getLives());
    };
    
    // Initial update
    updateStats();
    
    // Listen for XP updates
    const handleXPUpdate = (event: CustomEvent) => {
      const data = event.detail;
      setXpPoints(data.totalXP);
      setStreakCount(data.streak);
      setLives(data.lives);
    };
    
    window.addEventListener('xpUpdated', handleXPUpdate as EventListener);
    
    // Update on focus (when user returns to tab)
    window.addEventListener('focus', updateStats);
    
    return () => {
      window.removeEventListener('xpUpdated', handleXPUpdate as EventListener);
      window.removeEventListener('focus', updateStats);
    };
  }, []);

  const dailyTasks: DailyTask[] = [
    {
      id: 'itinerary',
      title: 'Daily Itinerary',
      description: 'Find your scheduled locations and patients here!',
      icon: '📍',
      isRequired: true,
      isCompleted: false,
      path: '/itinerary'
    },
    {
      id: 'questions',
      title: 'Daily Questions!',
      description: 'Answer your three daily questions to collect your daily XP!',
      icon: '📈',
      isRequired: true,
      isCompleted: false,
      path: '/daily-questions'
    },
    {
      id: 'report',
      title: 'Daily Report',
      description: 'Fill out the report at the end of the day.',
      icon: '📝',
      isRequired: true,
      isCompleted: false,
      path: '/daily-report'
    }
  ];

  const learningCenter = [
    {
      id: 'review',
      title: 'Review Modules',
      description: 'Modules to review based on your mistakes!',
      icon: '📖',
      path: '/interactive-learning'
    }
  ];

  return (
    <div className="dashboard">
      {/* Top Stats Bar */}
      <header className="stats-header">
        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{streakCount}</span>
        </div>
        <div className="stat-item xp">
          <span className="stat-icon">💎</span>
          <span className="stat-value">{xpPoints} XP</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">❤️</span>
          <span className="stat-value">{lives}</span>
        </div>
      </header>

      {/* Daily To-Do Section */}
      <section className="daily-todo-section">
        <h2 className="section-title">Daily To-Do</h2>
        <div className="task-list">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.isCompleted ? 'completed' : ''}`}
              onClick={() => navigate(task.path)}
            >
              <div className="task-icon-container">
                <span className="task-icon">{task.icon}</span>
              </div>
              <div className="task-content">
                <div className="task-header">
                  <h3 className="task-title">
                    {task.title}
                    {task.isRequired && <span className="required-indicator"> *</span>}
                  </h3>
                </div>
                <p className="task-description">{task.description}</p>
              </div>
              {task.isCompleted && (
                <div className="task-check">
                  <span>✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Learning Center Section */}
      <section className="learning-center-section">
        <h2 className="section-title">Learning Center</h2>
        <div className="task-list">
          {learningCenter.map((item) => (
            <div
              key={item.id}
              className="task-card"
              onClick={() => navigate(item.path)}
            >
              <div className="task-icon-container">
                <span className="task-icon">{item.icon}</span>
              </div>
              <div className="task-content">
                <h3 className="task-title">{item.title}</h3>
                <p className="task-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="nav-item active" onClick={() => navigate('/dashboard')}>
          <span className="nav-icon">🏠</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/map')}>
          <span className="nav-icon">📍</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/daily-report')}>
          <span className="nav-icon">📋</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/interactive-learning')}>
          <span className="nav-icon">📚</span>
        </button>
        <button className="nav-item" onClick={() => navigate('/profile')}>
          <span className="nav-icon">👤</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;