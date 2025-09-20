import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DailyQuestions.css';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const DailyQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const dailyQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the recommended duration for proper handwashing?',
      options: [
        '5 seconds',
        '10 seconds',
        '20 seconds',
        '30 seconds'
      ],
      correctAnswer: 2,
      explanation: 'The WHO recommends washing hands for at least 20 seconds with soap and water to effectively remove germs.',
      category: 'hygiene',
      difficulty: 'easy',
      points: 10
    },
    {
      id: '2',
      question: 'Which vitamin deficiency causes night blindness?',
      options: [
        'Vitamin A',
        'Vitamin B12',
        'Vitamin C',
        'Vitamin D'
      ],
      correctAnswer: 0,
      explanation: 'Vitamin A deficiency is a leading cause of night blindness, especially in children.',
      category: 'nutrition',
      difficulty: 'medium',
      points: 15
    },
    {
      id: '3',
      question: 'What is the first step in the chain of survival for cardiac arrest?',
      options: [
        'Start CPR',
        'Call for emergency help',
        'Check for breathing',
        'Use an AED'
      ],
      correctAnswer: 1,
      explanation: 'Calling for emergency help immediately ensures professional medical assistance is on the way while you provide initial care.',
      category: 'emergency',
      difficulty: 'hard',
      points: 20
    }
  ];

  const currentQuestion = dailyQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === dailyQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions.has(currentQuestion.id)) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
    }
    
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion.id]));
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <div className="daily-questions">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ←
        </button>
        <h1>Daily Questions</h1>
        <div className="score-display">
          Score: {score}
        </div>
      </header>

      <div className="question-progress">
        <div className="progress-info">
          Question {currentQuestionIndex + 1} of {dailyQuestions.length}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / dailyQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="question-card">
        <div className="question-meta">
          <span 
            className="difficulty-badge" 
            style={{ backgroundColor: getDifficultyColor(currentQuestion.difficulty) }}
          >
            {currentQuestion.difficulty.toUpperCase()}
          </span>
          <span className="points-badge">
            {currentQuestion.points} points
          </span>
          <span className="category-badge">
            {currentQuestion.category}
          </span>
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-list">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswer;
            const isSelected = index === selectedAnswer;
            const showResult = showExplanation;
            
            return (
              <button
                key={index}
                className={`option-btn ${
                  showResult
                    ? isCorrect
                      ? 'correct'
                      : isSelected
                      ? 'incorrect'
                      : ''
                    : ''
                } ${isSelected && !showResult ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={answeredQuestions.has(currentQuestion.id)}
              >
                <span className="option-label">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
                {showResult && isCorrect && <span className="result-icon">✓</span>}
                {showResult && isSelected && !isCorrect && <span className="result-icon">✗</span>}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="explanation-box">
            <h3>Explanation:</h3>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <div className="action-buttons">
            {!isLastQuestion ? (
              <button className="next-btn" onClick={handleNextQuestion}>
                Next Question →
              </button>
            ) : (
              <button className="finish-btn" onClick={handleFinish}>
                Finish Quiz
              </button>
            )}
          </div>
        )}
      </div>

      <div className="daily-streak">
        <h3>🔥 Daily Streak: 7 days</h3>
        <p>Keep answering daily questions to maintain your streak!</p>
        <div className="streak-calendar">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`day ${i < 7 ? 'completed' : ''}`}>
              {i < 7 ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyQuestions;