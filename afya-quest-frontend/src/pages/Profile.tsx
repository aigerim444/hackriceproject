import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'settings'>('overview');

  const userInfo = {
    name: 'Mary Wanjiku',
    role: 'Community Health Assistant',
    email: 'mary.wanjiku@afyaquest.com',
    phone: '+254 712 345 678',
    location: 'Kibera, Nairobi',
    joinDate: 'January 2024',
    supervisor: 'Dr. John Kamau',
    level: 5,
    totalPoints: 1250,
    rank: 'Silver CHA'
  };

  const achievements = [
    { id: '1', title: 'First Lesson Complete', icon: '🎓', date: '2024-01-15' },
    { id: '2', title: 'Week Streak', icon: '🔥', date: '2024-01-22' },
    { id: '3', title: 'Quiz Master', icon: '🏆', date: '2024-01-25' },
    { id: '4', title: '10 Videos Watched', icon: '📹', date: '2024-02-01' },
    { id: '5', title: 'Community Helper', icon: '🤝', date: '2024-02-05' },
  ];

  const stats = [
    { label: 'Lessons Completed', value: 15 },
    { label: 'Videos Watched', value: 12 },
    { label: 'Quizzes Passed', value: 8 },
    { label: 'Current Streak', value: '7 days' },
    { label: 'Certificates Earned', value: 2 },
    { label: 'Community Visits', value: 45 }
  ];

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>My Profile</h1>
        <button className="logout-btn" onClick={() => navigate('/login')}>
          Logout
        </button>
      </header>

      <div className="profile-info">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userInfo.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <h2>{userInfo.name}</h2>
        <p className="role">{userInfo.role}</p>
        <div className="level-badge">
          Level {userInfo.level} - {userInfo.rank}
        </div>
        <div className="points-display">
          {userInfo.totalPoints} Points
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{userInfo.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{userInfo.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location:</span>
                  <span className="value">{userInfo.location}</span>
                </div>
                <div className="info-item">
                  <span className="label">Supervisor:</span>
                  <span className="value">{userInfo.supervisor}</span>
                </div>
                <div className="info-item">
                  <span className="label">Member Since:</span>
                  <span className="value">{userInfo.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="performance-stats">
              <h3>Performance Statistics</h3>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h3>Your Achievements</h3>
            <div className="achievements-list">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>Earned on {achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="locked-achievements">
              <h3>Locked Achievements</h3>
              <div className="achievement-card locked">
                <div className="achievement-icon">🔒</div>
                <div className="achievement-info">
                  <h4>Master Educator</h4>
                  <p>Complete 50 lessons to unlock</p>
                </div>
              </div>
              <div className="achievement-card locked">
                <div className="achievement-icon">🔒</div>
                <div className="achievement-info">
                  <h4>Video Expert</h4>
                  <p>Watch all video modules to unlock</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h3>Settings</h3>
            <div className="settings-list">
              <div className="setting-item">
                <span>Language Preference</span>
                <select>
                  <option>English</option>
                  <option>Swahili</option>
                </select>
              </div>
              <div className="setting-item">
                <span>Notifications</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <span>Offline Mode</span>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <span>Daily Reminders</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="settings-actions">
              <button className="btn-secondary">Change Password</button>
              <button className="btn-primary">Download Certificate</button>
              <button className="btn-danger">Delete Account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;