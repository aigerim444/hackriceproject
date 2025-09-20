import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InteractiveLearning from './pages/InteractiveLearning';
import VideoModules from './pages/VideoModules';
import DailyQuestions from './pages/DailyQuestions';
import MapView from './pages/MapView';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/App.css';

function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;