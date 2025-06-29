// src/App.js
import React from 'react';
import { CrawlerProvider } from './contexts/CrawlerContext';
import CrawlerControls from './components/CrawlerControls';
import ResultDisplay from './components/ResultDisplay';
import NotificationSystem from './components/NotificationSystem';
import './index.css';

function App() {
  return (
    <CrawlerProvider>
      <div className="app-container">
        {/* Header Section */}
        <header className="app-header">
          <h1 className="app-title">Vietlott Bingo 18 Results Crawler</h1>
          <p className="app-subtitle">Automatically fetch and monitor lottery results</p>
        </header>

        {/* Main Content */}
        <main className="app-main">
          <div className="controls-section">
            <CrawlerControls />
          </div>
          
          <div className="results-section">
            <ResultDisplay />
          </div>
        </main>

        {/* Notification System (fixed position) */}
        <NotificationSystem />

        {/* Footer */}
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Vietlott Crawler System - phamvanphung</p>
        </footer>
      </div>
    </CrawlerProvider>
  );
}

export default App;