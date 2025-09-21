import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

const ChatbotWrapper: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      const authenticated = !!(authToken && user && location.pathname !== '/login');
      setIsAuthenticated(authenticated);
    };

    // Initial check
    checkAuth();

    // Listen for storage changes (login/logout)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab changes)
    window.addEventListener('authChanged', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChanged', handleStorageChange);
    };
  }, [location.pathname]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Debug: Always show chatbot for now
  console.log('ChatbotWrapper - isAuthenticated:', isAuthenticated, 'location:', location.pathname);
  
  // TEMPORARY: Always show chatbot for debugging
  // Don't render anything if not authenticated
  // if (!isAuthenticated) {
  //   console.log('ChatbotWrapper - Not authenticated, not rendering');
  //   return null;
  // }

  return (
    <>
      <ChatButton 
        isOpen={isChatOpen} 
        onClick={handleChatToggle} 
      />
      <ChatWindow 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default ChatbotWrapper;
