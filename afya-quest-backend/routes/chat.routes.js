const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authMiddleware = require('../middleware/auth.middleware');

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' });

// Generate response using Google Gemini AI - Steve the Health Assistant
async function generateGeminiResponse(message, conversationHistory = []) {
  const systemPrompt = `You are Steve, a friendly and knowledgeable AI health assistant for Afya Quest, a gamified learning platform for Community Health Assistants (CHAs). 
  
  Your personality:
  - Name: Steve
  - Friendly, approachable, and encouraging
  - Enthusiastic about health education
  - Patient and understanding
  - Uses casual but professional language
  - Occasionally uses light humor when appropriate
  
  Your expertise includes:
  - Health education and medical knowledge
  - Learning support and study tips
  - Platform navigation and features
  - Motivation and encouragement for learning
  - General health and wellness advice
  
  Always:
  - Introduce yourself as Steve when greeting new users
  - Keep responses helpful, encouraging, and educational
  - Remind users to consult qualified healthcare professionals for serious medical conditions
  - Keep responses concise and engaging (under 500 characters when possible)
  - Be supportive of their learning journey`;

  // Build conversation context
  const conversationContext = conversationHistory
    .slice(-5) // Keep last 5 messages for context
    .map(msg => `${msg.role === 'user' ? 'User' : 'Steve'}: ${msg.content}`)
    .join('\n');

  const fullPrompt = `${systemPrompt}

${conversationContext ? `Previous conversation:\n${conversationContext}\n\n` : ''}Current user message: ${message}

Please provide a helpful response as Steve:`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
}

// Chat endpoint
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API key not configured. Please set GEMINI_API_KEY in environment variables.' 
      });
    }

    // Generate AI response using Gemini
    const aiResponse = await generateGeminiResponse(message, conversationHistory);

    res.json({
      success: true,
      response: aiResponse,
      provider: 'gemini',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Gemini AI error:', error);
    
    // Handle Gemini-specific errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return res.status(500).json({ 
        error: 'Invalid Gemini API key. Please check your configuration.' 
      });
    } else if (error.message?.includes('QUOTA_EXCEEDED')) {
      return res.status(429).json({ 
        error: 'Gemini API quota exceeded. Please try again later.' 
      });
    } else if (error.message?.includes('SAFETY')) {
      return res.status(400).json({ 
        error: 'Message blocked by safety filters. Please rephrase your question.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to process chat message. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get chat history (if you want to implement persistent chat history)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    // This would require a Chat model to store conversation history
    // For now, return empty array as history is managed client-side
    res.json({ history: [] });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to get chat history' });
  }
});

module.exports = router;
