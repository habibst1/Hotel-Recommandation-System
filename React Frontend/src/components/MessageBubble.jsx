import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MessageBubble({ message, isUser, isRecommendation, isStreaming }) {
  const getRecommendationBadge = () => {
    if (isRecommendation === true) {
      return (
        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Recommended
        </div>
      );
    } else if (isRecommendation === false) {
      return (
        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Not Recommended
        </div>
      );
    }
    return null;
  };

  const getTypeWriterEffect = () => {
    if (isStreaming) {
      return (
        <span className="inline-block w-2 h-4 bg-orange-500 ml-1 animate-pulse"></span>
      );
    }
    return null;
  };

  // Preprocess the message to handle line breaks properly
  const preprocessMessage = (text) => {
    if (!text) return '';
    
    // Replace standalone <br> tags with actual line breaks
    // This handles both <br> and <br/> formats
    return text
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\\n/g, '\n'); // Handle escaped newlines
  };

  // Custom components for ReactMarkdown
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
    // Handle line breaks properly
    br: ({node, ...props}) => <br {...props} />
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="text-sm whitespace-pre-wrap">
            {message}
          </div>
        </div>
      </div>
    );
  }

  // Preprocess the message before rendering
  const processedMessage = preprocessMessage(message);

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-800 shadow-sm">
        {getRecommendationBadge()}
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={markdownComponents}
            unwrapDisallowed={true}
          >
            {processedMessage}
          </ReactMarkdown>
          {getTypeWriterEffect()}
        </div>
      </div>
    </div>
  );
}