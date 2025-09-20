export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="home">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-blue-500/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-800 text-sm font-medium mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Smart Hotel Matching
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Know If Your Hotel
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Matches </span>
              Your Needs
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Ask our AI specific questions about Tunisian hotels and get instant, data-driven recommendations based on real guest reviews and hotel features.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="text-sm text-gray-600 mb-2">Example question:</div>
              <div className="text-gray-900 font-medium">
                "Is Nour Palace Mahdia a good fit for a quiet family vacation without animation?"
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Try It Now
              </button>
              <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors duration-200">
                See Examples
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900">User:</div>
                  <div className="text-gray-700">"Is Nour Palace Mahdia a good fit for a quiet family vacation without animation?"</div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
                  <div className="text-sm font-medium">AI Response:</div>
                  <div className="text-sm">
                    "Based on our analysis, Nour Palace Mahdia may not be ideal for a quiet vacation as it's a family resort with active animation programs..."
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">95%</div>
                <div className="text-xs text-gray-600">Accuracy Rate</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">2K+</div>
                <div className="text-xs text-gray-600">Hotels Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}