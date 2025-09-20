import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportAPI } from '../services/api';
import '../styles/Profile.css';

interface DailyReport {
  id: string;
  date: string;
  patientsVisited: number;
  vaccinationsGiven: number;
  healthEducation: string;
  challenges?: string;
  notes?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'reports' | 'settings'>('overview');
  const [pastReports, setPastReports] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(false);

  const userInfo = {
    name: 'Steve Zhang',
    role: 'Community Health Assistant',
    email: 'steve.zhang@afyaquest.com',
    phone: '+254 712 345 678',
    location: 'Kajiado Town, Kajiado',
    joinDate: 'January 2024',
    supervisor: 'Dr. John Kamau',
    level: 5,
    totalPoints: 1250,
    rank: 'Silver CHA'
  };

  useEffect(() => {
    if (activeTab === 'reports') {
      fetchPastReports();
    }
  }, [activeTab]);

  const fetchPastReports = async () => {
    setLoading(true);
    try {
      // First try to get from backend
      const response = await reportAPI.getAllReports();
      if (response?.data && response.data.length > 0) {
        setPastReports(response.data);
      } else {
        // If no backend data, get from localStorage
        const localReports = JSON.parse(localStorage.getItem('dailyReports') || '[]');
        setPastReports(localReports);
      }
    } catch (error) {
      console.error('Error fetching reports from backend:', error);
      // Fallback to localStorage
      const localReports = JSON.parse(localStorage.getItem('dailyReports') || '[]');
      
      // Sort reports by date (most recent first)
      const sortedReports = localReports.sort((a: DailyReport, b: DailyReport) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      setPastReports(sortedReports);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        // Try to delete from backend
        await reportAPI.deleteReport(reportId);
        
        // Update state
        const updatedReports = pastReports.filter(report => report.id !== reportId);
        setPastReports(updatedReports);
        
        // Also update localStorage
        const localReports = JSON.parse(localStorage.getItem('dailyReports') || '[]');
        const updatedLocalReports = localReports.filter((report: DailyReport) => report.id !== reportId);
        localStorage.setItem('dailyReports', JSON.stringify(updatedLocalReports));
        
        alert('Report deleted successfully');
      } catch (error) {
        console.error('Error deleting from backend:', error);
        
        // Still delete from localStorage even if backend fails
        const updatedReports = pastReports.filter(report => report.id !== reportId);
        setPastReports(updatedReports);
        
        const localReports = JSON.parse(localStorage.getItem('dailyReports') || '[]');
        const updatedLocalReports = localReports.filter((report: DailyReport) => report.id !== reportId);
        localStorage.setItem('dailyReports', JSON.stringify(updatedLocalReports));
        
        alert('Report deleted successfully');
      }
    }
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
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          Past Reports
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

        {activeTab === 'reports' && (
          <div className="reports-tab">
            <h3>Past Daily Reports</h3>
            {loading ? (
              <div className="loading-message">Loading reports...</div>
            ) : pastReports.length === 0 ? (
              <div className="no-reports">
                <p>No reports found. Start submitting daily reports to see them here!</p>
                <button className="btn-primary" onClick={() => navigate('/daily-report')}>
                  Create Your First Report
                </button>
              </div>
            ) : (
              <div className="reports-list">
                {pastReports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <h4>{new Date(report.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</h4>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteReport(report.id)}
                        title="Delete report"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="report-details">
                      <div className="report-stat">
                        <span className="stat-icon">👥</span>
                        <span className="stat-value">{report.patientsVisited}</span>
                        <span className="stat-label">Patients</span>
                      </div>
                      <div className="report-stat">
                        <span className="stat-icon">💉</span>
                        <span className="stat-value">{report.vaccinationsGiven}</span>
                        <span className="stat-label">Vaccinations</span>
                      </div>
                      <div className="report-stat">
                        <span className="stat-icon">📚</span>
                        <span className="stat-value">{report.healthEducation}</span>
                        <span className="stat-label">Education Topic</span>
                      </div>
                    </div>
                    {(report.challenges || report.notes) && (
                      <div className="report-extra">
                        {report.challenges && (
                          <div className="report-field">
                            <strong>Challenges:</strong> {report.challenges}
                          </div>
                        )}
                        {report.notes && (
                          <div className="report-field">
                            <strong>Notes:</strong> {report.notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="reports-actions">
              <button className="btn-primary" onClick={() => navigate('/daily-report')}>
                Create New Report
              </button>
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