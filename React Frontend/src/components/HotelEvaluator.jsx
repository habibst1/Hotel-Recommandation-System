import { useState } from 'react';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';
import useHotelRecommendation from '../hooks/useHotelRecommendation';

export default function HotelEvaluator() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your hotel evaluation assistant. Ask me specific questions about Tunisian hotels!\n\nExample: 'Is Nour Palace Mahdia a good fit for a quiet family vacation without animation?'",
      isUser: false,
      isRecommendation: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState(null);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const { getRecommendationStream, isLoading, error } = useHotelRecommendation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      isRecommendation: null
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Create streaming message placeholder
    const streamingId = Date.now() + 1;
    const streamingMessage = {
      id: streamingId,
      text: "",
      isUser: false,
      isRecommendation: null,
      isStreaming: true
    };
    setMessages(prev => [...prev, streamingMessage]);
    setCurrentStreamingMessage("");
    setStreamingMessageId(streamingId);
    
    setInputValue('');

    // Handle streaming response
    const handleChunk = (chunk) => {
      setCurrentStreamingMessage(prev => prev + chunk);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingId 
            ? { ...msg, text: msg.text + chunk }
            : msg
        )
      );
    };

    const handleComplete = (fullResponse, logData) => {
      // Determine recommendation
      const lowerAnswer = fullResponse.toLowerCase();
      let isRecommended = null;
      if (lowerAnswer.includes('yes') || lowerAnswer.includes('good fit') || lowerAnswer.includes('recommended')) {
        isRecommended = true;
      } else if (lowerAnswer.includes('no') || lowerAnswer.includes('not recommended') || lowerAnswer.includes('may not be')) {
        isRecommended = false;
      }

      // Update final message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === streamingId 
            ? { 
                ...msg, 
                text: fullResponse,
                isStreaming: false,
                isRecommendation: isRecommended
              }
            : msg
        )
      );
      
      setCurrentStreamingMessage(null);
      setStreamingMessageId(null);
    };

    // Start streaming
    await getRecommendationStream(inputValue, handleChunk, handleComplete);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            isRecommendation={message.isRecommendation}
            isStreaming={message.isStreaming}
          />
        ))}
        
        {isLoading && !currentStreamingMessage && (
          <div className="flex justify-start mb-4">
            <div className="bg-orange-50 border border-orange-100 px-4 py-3 rounded-lg">
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-orange-100 p-4 bg-orange-50">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about a hotel."
            className="flex-1 border border-orange-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-xs bg-white px-2 py-1 rounded-full text-orange-700">Family Friendly</span>
          <span className="text-xs bg-white px-2 py-1 rounded-full text-orange-700">Quiet Resort</span>
          <span className="text-xs bg-white px-2 py-1 rounded-full text-orange-700">Romantic Getaway</span>
          <span className="text-xs bg-white px-2 py-1 rounded-full text-orange-700">Budget Hotel</span>
        </div>
      </form>
    </div>
  );
}