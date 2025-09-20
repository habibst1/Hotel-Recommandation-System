// src/components/TechnicalDemo.jsx
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TechnicalDemo = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // --- Helper function to clean hotel name ---
  const cleanHotelName = (fullName) => {
    if (!fullName) return 'Not Found';
    // Remove the "Hotel Name: " prefix if it exists
    return fullName.replace(/^Hotel Name:\s*/i, '').trim();
  };
  // --- End Helper Function ---

  // Define markdown components (same as before)
  const markdownComponents = {
    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-orange-700 mt-5 mb-3 border-b border-orange-200 pb-2" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />,
    h4: ({node, ...props}) => <h4 className="text-base font-semibold text-gray-700 mt-3 mb-2" {...props} />,
    p: ({node, ...props}) => <p className="text-sm text-gray-700 leading-relaxed mb-3" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 mb-4 pl-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 mb-4 pl-4" {...props} />,
    li: ({node, ...props}) => <li className="text-sm text-gray-700 ml-2" {...props} />,
    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
    em: ({node, ...props}) => <em className="italic" {...props} />,
    code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
    pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-4" {...props} />,
    table: ({node, ...props}) => <table className="min-w-full divide-y divide-gray-200 mb-4" {...props} />,
    thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
    tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
    tr: ({node, ...props}) => <tr {...props} />,
    th: ({node, ...props}) => <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
    td: ({node, ...props}) => <td className="px-4 py-2 text-sm text-gray-700" {...props} />,
    hr: ({node, ...props}) => <hr className="my-6 border-gray-200" {...props} />,
    a: ({node, ...props}) => <a className="text-orange-600 hover:text-orange-800 underline" {...props} />,
    br: ({node, ...props}) => <br {...props} />
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/recommend-hotel-technical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching technical demo:', err);
      setError(err.message || 'An error occurred while fetching the data.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepDetails = (details) => {
    if (!details) return null;
    if (typeof details === 'string') return <p className="text-gray-700">{details}</p>;
    if (typeof details === 'object') {
      return (
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {Object.entries(details).map(([key, value]) => (
            // --- Also clean hotel name in step details if present ---
            <li key={key}>
              <span className="font-medium">{key}:</span> {key === 'hotel_name' ? cleanHotelName(value) : String(value)}
            </li>
            // --- End modification ---
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700">{String(details)}</p>;
  };

  const renderPrompt = (prompt) => {
    if (!prompt) return null;
    return (
      <div className="mt-2 p-3 bg-gray-100 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-1">Prompt Sent:</h4>
        <pre className="whitespace-pre-wrap text-xs bg-gray-200 p-2 rounded overflow-x-auto">{prompt}</pre>
      </div>
    );
  };

  const renderRawResponse = (rawResponse) => {
    if (!rawResponse) return null;
    return (
      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">Raw LLM Response:</h4>
        <pre className="whitespace-pre-wrap text-xs bg-blue-100 p-2 rounded overflow-x-auto">{rawResponse}</pre>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Technical Demo</h1>
        <p className="text-lg text-gray-600">
          See the internal steps of the hotel recommendation pipeline
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about a hotel (e.g., 'Is Nour Palace Mahdia good for a quiet family vacation?')"
            className="flex-1 border border-orange-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-medium">Error:</span> {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">
            <h2 className="text-xl font-bold">User Query</h2>
            <p className="mt-1">{result.user_query}</p>
          </div>

          {/* --- Update the Found Hotel section --- */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-bold text-blue-800">Found Hotel</h2>
            {/* Use the cleanHotelName function here */}
            <p className="mt-1 text-blue-700">{cleanHotelName(result.hotel_name)}</p>
            <p className="mt-2 text-sm text-blue-600">
              Context Chunks: {result.context_chunks_count} | Review Chunks: {result.review_chunks_count}
            </p>
          </div>
          {/* --- End update --- */}

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pipeline Steps</h2>
          <div className="space-y-6">
            {result.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <span className="text-orange-800 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{step.step}</h3>
                    {renderStepDetails(step.details)} {/* renderStepDetails now handles cleaning too */}
                    {renderPrompt(step.prompt)}
                    {renderRawResponse(step.raw_response)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Answer</h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  components={markdownComponents}
                  unwrapDisallowed={true}
                >
                  {result.final_answer}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <details className="mt-6 p-4 bg-gray-50 rounded-lg">
            <summary className="cursor-pointer font-medium text-gray-700">Show Full Pipeline Log</summary>
            <div className="mt-2 p-3 bg-white border rounded">
              <pre className="whitespace-pre-wrap text-xs text-gray-600">
                {result.pipeline_log.join('\n')}
              </pre>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default TechnicalDemo;