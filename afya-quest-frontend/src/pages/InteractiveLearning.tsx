import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InteractiveLearning.css';

interface Lesson {
  id: string;
  title: string;
  titleSwahili: string;
  description: string;
  descriptionSwahili: string;
  category: string;
  progress: number;
  isLocked: boolean;
  points: number;
}

const InteractiveLearning: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Basic Hygiene',
      titleSwahili: 'Usafi wa Msingi',
      description: 'Learn about proper handwashing and sanitation practices',
      descriptionSwahili: 'Jifunze kuhusu kunawa mikono vizuri na njia za usafi',
      category: 'hygiene',
      progress: 100,
      isLocked: false,
      points: 50
    },
    {
      id: '2',
      title: 'Nutrition Basics',
      titleSwahili: 'Misingi ya Lishe',
      description: 'Understanding balanced diet and nutrition requirements',
      descriptionSwahili: 'Kuelewa mlo kamili na mahitaji ya lishe',
      category: 'nutrition',
      progress: 60,
      isLocked: false,
      points: 75
    },
    {
      id: '3',
      title: 'First Aid',
      titleSwahili: 'Huduma ya Kwanza',
      description: 'Basic first aid procedures for common injuries',
      descriptionSwahili: 'Taratibu za msingi za huduma ya kwanza kwa majeraha ya kawaida',
      category: 'emergency',
      progress: 0,
      isLocked: false,
      points: 100
    },
    {
      id: '4',
      title: 'Disease Prevention',
      titleSwahili: 'Kuzuia Magonjwa',
      description: 'Preventive measures for common diseases',
      descriptionSwahili: 'Hatua za kuzuia magonjwa ya kawaida',
      category: 'prevention',
      progress: 0,
      isLocked: true,
      points: 100
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', nameSwahili: 'Mada Zote' },
    { id: 'hygiene', name: 'Hygiene', nameSwahili: 'Usafi' },
    { id: 'nutrition', name: 'Nutrition', nameSwahili: 'Lishe' },
    { id: 'emergency', name: 'Emergency Care', nameSwahili: 'Huduma ya Dharura' },
    { id: 'prevention', name: 'Prevention', nameSwahili: 'Kuzuia' }
  ];

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      // Navigate to lesson detail (to be implemented)
      console.log('Opening lesson:', lesson.id);
    }
  };

  return (
    <div className="interactive-learning">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>{language === 'en' ? 'Interactive Learning' : 'Kujifunza kwa Njia ya Mwingiliano'}</h1>
        <button 
          className="language-toggle"
          onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
        >
          {language === 'en' ? 'SW' : 'EN'}
        </button>
      </header>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {language === 'en' ? category.name : category.nameSwahili}
          </button>
        ))}
      </div>

      <div className="progress-overview">
        <div className="progress-stat">
          <span className="stat-label">
            {language === 'en' ? 'Completed' : 'Zilizokamilika'}
          </span>
          <span className="stat-value">1/4</span>
        </div>
        <div className="progress-stat">
          <span className="stat-label">
            {language === 'en' ? 'Points Earned' : 'Pointi Zilizopatikana'}
          </span>
          <span className="stat-value">50</span>
        </div>
      </div>

      <div className="lessons-list">
        {filteredLessons.map(lesson => (
          <div
            key={lesson.id}
            className={`lesson-card ${lesson.isLocked ? 'locked' : ''}`}
            onClick={() => handleLessonClick(lesson)}
          >
            <div className="lesson-icon">
              {lesson.isLocked ? '🔒' : lesson.progress === 100 ? '✅' : '📖'}
            </div>
            <div className="lesson-content">
              <h3>{language === 'en' ? lesson.title : lesson.titleSwahili}</h3>
              <p>{language === 'en' ? lesson.description : lesson.descriptionSwahili}</p>
              <div className="lesson-meta">
                <span className="points">+{lesson.points} pts</span>
                {!lesson.isLocked && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="gamification-banner">
        <h3>{language === 'en' ? '🏆 Level Up!' : '🏆 Panda Kiwango!'}</h3>
        <p>
          {language === 'en' 
            ? 'Complete 2 more lessons to unlock Disease Prevention module'
            : 'Kamilisha masomo 2 zaidi ili kufungua moduli ya Kuzuia Magonjwa'
          }
        </p>
      </div>
    </div>
  );
};

export default InteractiveLearning;