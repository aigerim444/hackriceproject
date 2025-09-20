import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DailyQuestions from './pages/DailyQuestions';
import DailyReport from './pages/DailyReport';
import Itinerary from './pages/Itinerary';
import InteractiveLearning from './pages/InteractiveLearning';
import VideoModules from './pages/VideoModules';
import Profile from './pages/Profile';
import MapView from './pages/MapView';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';
import { initializeLivesIfNeeded } from './utils/xpManager';
import './styles/App.css';

// Component to handle chatbot visibility based on authentication
function ChatbotWrapper() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      
      // User is authenticated if they have both token and user data, and are not on login page or root
      const authenticated = !!(authToken && user && location.pathname !== '/login' && location.pathname !== '/');
      setIsAuthenticated(authenticated);
    };
    
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [location.pathname]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  // Only show Steve if user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <ChatButton 
        isOpen={isChatOpen} 
        onClick={handleChatToggle} 
      />
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={handleChatClose} 
      />
    </>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Initialize lives on app start if needed
    initializeLivesIfNeeded();
    
    // Add body class for bottom navigation spacing
    document.body.classList.add('has-bottom-nav');
    
    return () => {
      document.body.classList.remove('has-bottom-nav');
    };
  }, []);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interactive-learning" element={<InteractiveLearning />} />
          <Route path="/video-modules" element={<VideoModules />} />
          <Route path="/daily-questions" element={<DailyQuestions />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-report" element={<DailyReport />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>

        {/* Steve - AI Chatbot (only shows when logged in) */}
        <ChatbotWrapper />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
