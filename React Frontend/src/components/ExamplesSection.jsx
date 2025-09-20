export default function ExamplesSection() {
  const examples = [
    {
      question: "Is Nour Palace Mahdia a good fit for a quiet family vacation without animation?",
      category: "Family Travel",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      question: "Is Marhaba Beach Sousse a good fit for a romantic couples getaway?",
      category: "Romantic Travel",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      question: "Does Royal Mansour Mahdia have good facilities for kids aged 5-10?",
      category: "Kids Activities",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Is Skanes Family Monastir quiet enough for relaxation?",
      category: "Relaxation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      question: "Is Dar El Jeld Tunis a good fit for budget-conscious travelers?",
      category: "Budget Travel",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: "Does Radisson Blu Palace Djerba have evening entertainment for adults?",
      category: "Entertainment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white" id="examples">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Try These Example Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click any example to try it out, or write your own question about any Tunisian hotel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <div className="flex items-start mb-4">
                <div className="mr-3 mt-1">
                  {example.icon}
                </div>
                <div>
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    {example.category}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 font-medium group-hover:text-orange-700 transition-colors">
                "{example.question}"
              </p>
              <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                <span>Try this example</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">💡 Pro Tip</h3>
            <p className="mb-4">
              Be specific about your needs! The more details you provide about your preferences, 
              the more accurate our recommendations will be.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Specific dates</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Age of children</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Budget range</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Special requirements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}