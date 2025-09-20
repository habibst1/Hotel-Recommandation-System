import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/recommend-hotel-stream';

export default function useHotelRecommendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendationStream = async (query, onChunkReceived, onComplete) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullResponse = '';
      let logData = [];

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            onComplete(fullResponse, logData);
            break;
          }

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.error) {
                  setError(data.error);
                  break;
                }
                
                if (data.text) {
                  fullResponse += data.text;
                  onChunkReceived(data.text);
                }
                
                if (data.completed) {
                  logData = data.log || [];
                  onComplete(fullResponse, logData);
                  break;
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (err) {
      setError('Failed to get recommendation. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getRecommendationStream, isLoading, error };
}