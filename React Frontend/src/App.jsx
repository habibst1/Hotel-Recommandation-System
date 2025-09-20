// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import routing components
import HotelEvaluator from './components/HotelEvaluator';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import ExamplesSection from './components/ExamplesSection';
import Footer from './components/Footer';
import TechnicalDemo from './components/TechnicalDemo'; // Import the new component

function App() {
  return (
    <Router> {/* Wrap the app in Router */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-blue-50">
        {/* Navigation - Add Link to Technical Demo */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  HotelMatch Tunisia
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</Link>
                <Link to="/technical-demo" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Technical Demo</Link> {/* Add Link */}
                <a href="#how-it-works" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">How It Works</a>
                <a href="#examples" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Examples</a>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <Routes> {/* Define routes */}
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <HeroSection />
                {/* How It Works */}
                <HowItWorks />
                {/* Main Evaluation Interface */}
                <section className="py-20 bg-white" id="evaluator">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Evaluate Your Hotel Choice</h2>
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ask our AI whether a specific hotel matches your preferences
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
                      <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Hotel Recommendation Evaluator
                        </h3>
                      </div>
                      <HotelEvaluator />
                    </div>
                  </div>
                </section>
                {/* Examples */}
                <ExamplesSection />
                {/* Tunisian Hotels Showcase */}
                <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Hotels in Tunisia</h2>
                      <p className="text-lg text-gray-600">Get instant evaluations for these top destinations</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { name: "TUI Blue Manar Hammamet", type: "Family Resort", rating: "4.5", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/9e/2b/7a/holiday-village-manar.jpg?w=900&h=500&s=1" },
                        { name: "La Cigale Tabarka", type: "Luxury Resort", rating: "4.7", image: " https://cf.bstatic.com/xdata/images/hotel/max1024x768/80457331.jpg?k=b19f0b4dac160f9a2f912ab37672de51e7b6b92b389d11dfe565b2c25114c678&o=&hp=1" },
                        { name: "Kuriat Palace Monastir", type: "All-Inclusive", rating: "4.3", image: " https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/37/4f/e8/terraza.jpg?w=1400&h=-1&s=1" },
                        { name: "Sentido Marillia Hammamet", type: "Family Hotel", rating: "4.2", image: " https://mondialtourisme.fr/sites/default/files/visuels-produit/2024-02/_sfi5539-panorama.jpg " },
                        { name: "TUI Blue Scheherazade Sousse", type: "Couples Hotel", rating: "4.6", image: "https://content.tui.co.uk/adamtui/2023_8/24_12/b86106ec-14a4-4f7a-ad06-b06800cb6e61/ACC_005786_AC1112693191_TB-SCHEHERAZADE-POOL-60WebOriginalCompressed.jpg?i10c=img.resize(width:470);img.crop(width:470%2Cheight:265)" },
                        { name: "Iberostar Royal El Mansour", type: "Luxury Beach", rating: "4.8", image: " https://admin.tunisiepromo.tn/file_manager/source/iberostar%20royal%20el%20mansour/27609644.webp " }
                      ].map((hotel, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                          <div className="h-32 bg-gray-200 overflow-hidden">
                            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900">{hotel.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-600">{hotel.type}</span>
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                <span className="text-sm font-medium">{hotel.rating}</span>
                              </div>
                            </div>
                            <button className="mt-3 w-full bg-orange-100 text-orange-700 py-1 px-3 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors">
                              Evaluate This Hotel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            } />
            {/* New Route for Technical Demo */}
            <Route path="/technical-demo" element={<TechnicalDemo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;