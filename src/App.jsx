import React, { useEffect } from 'react';
import { CrawlerProvider } from './contexts/CrawlerContext';
import CrawlerControls from './components/CrawlerControls';
import ResultDisplay from './components/ResultDisplay';
import NotificationSystem from './components/NotificationSystem';
import './index.css';

function App() {
  return (
    <CrawlerProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-800">
              Vietlott Bingo 18 Results Crawler
            </h1>
            <p className="text-gray-600 mt-2">
              Automatically fetch and monitor lottery results
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <CrawlerControls />
              <NotificationSystem />
            </div>
            
            <div className="lg:col-span-2">
              <ResultDisplay />
            </div>
          </div>
          
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Vietlott Crawler System</p>
          </footer>
        </div>
      </div>
    </CrawlerProvider>
  );
}

export default App;