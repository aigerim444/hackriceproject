import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Initialize lives on app start if needed
    initializeLivesIfNeeded();
  }, []);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
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

        {/* AI Chatbot */}
        <ChatButton 
          isOpen={isChatOpen} 
          onClick={handleChatToggle} 
        />
        <ChatWindow 
          isOpen={isChatOpen} 
          onClose={handleChatClose} 
        />
      </div>
    </Router>
  );
}

export default App;