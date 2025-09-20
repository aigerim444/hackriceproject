import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VideoModules.css';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  hasQuiz: boolean;
  quizComplete: boolean;
  watched: boolean;
  description: string;
}

const VideoModules: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const videos: Video[] = [
    {
      id: '1',
      title: 'Module 1: Introduction to Community Health',
      thumbnail: '🎬',
      duration: '12:30',
      category: 'basics',
      hasQuiz: true,
      quizComplete: true,
      watched: true,
      description: 'Learn the fundamentals of community health work'
    },
    {
      id: '2',
      title: 'Module 2: Water Sanitation Practices',
      thumbnail: '💧',
      duration: '15:45',
      category: 'sanitation',
      hasQuiz: true,
      quizComplete: false,
      watched: true,
      description: 'Understanding water treatment and safe storage'
    },
    {
      id: '3',
      title: 'Module 3: Maternal and Child Health',
      thumbnail: '👶',
      duration: '20:15',
      category: 'maternal',
      hasQuiz: true,
      quizComplete: false,
      watched: false,
      description: 'Essential care for mothers and children'
    },
    {
      id: '4',
      title: 'Module 4: Vaccination Programs',
      thumbnail: '💉',
      duration: '18:00',
      category: 'immunization',
      hasQuiz: true,
      quizComplete: false,
      watched: false,
      description: 'Understanding vaccination schedules and importance'
    },
    {
      id: '5',
      title: 'Module 5: Disease Outbreak Response',
      thumbnail: '🚨',
      duration: '22:30',
      category: 'emergency',
      hasQuiz: true,
      quizComplete: false,
      watched: false,
      description: 'How to respond during disease outbreaks'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'basics', name: 'Basics' },
    { id: 'sanitation', name: 'Sanitation' },
    { id: 'maternal', name: 'Maternal Health' },
    { id: 'immunization', name: 'Immunization' },
    { id: 'emergency', name: 'Emergency' }
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const handleVideoClick = (video: Video) => {
    console.log('Playing video:', video.id);
    // In a real app, this would open a video player
  };

  const handleQuizClick = (video: Video) => {
    console.log('Starting quiz for:', video.id);
    // Navigate to quiz page
  };

  return (
    <div className="video-modules">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>Video Modules and Lessons</h1>
      </header>

      <div className="module-stats">
        <div className="stat">
          <span className="stat-value">2/5</span>
          <span className="stat-label">Videos Watched</span>
        </div>
        <div className="stat">
          <span className="stat-value">1/5</span>
          <span className="stat-label">Quizzes Complete</span>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div key={video.id} className="video-card">
            <div 
              className="video-thumbnail"
              onClick={() => handleVideoClick(video)}
            >
              <div className="thumbnail-icon">{video.thumbnail}</div>
              <div className="duration">{video.duration}</div>
              {video.watched && (
                <div className="watched-badge">✓ Watched</div>
              )}
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              {video.hasQuiz && (
                <div className="quiz-section">
                  {video.quizComplete ? (
                    <span className="quiz-status complete">✅ Quiz Complete</span>
                  ) : (
                    <button 
                      className="quiz-btn"
                      onClick={() => handleQuizClick(video)}
                      disabled={!video.watched}
                    >
                      {video.watched ? 'Take Quiz' : 'Watch Video First'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="learning-path">
        <h2>Your Learning Path</h2>
        <div className="path-progress">
          <div className="path-line">
            <div className="path-fill" style={{ width: '40%' }}></div>
          </div>
          <p>40% Complete - Keep going!</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModules;