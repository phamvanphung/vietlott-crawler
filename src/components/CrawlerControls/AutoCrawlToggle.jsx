// src/components/CrawlerControls/AutoCrawlToggle.jsx
import React, { useEffect } from 'react';
import { useCrawler } from '../../contexts/CrawlerContext';
import { useState } from 'react'; // Added useState import

const AutoCrawlToggle = () => {
  const { isAutoCrawling, startAutoCrawl, stopAutoCrawl } = useCrawler();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = async () => {
    setIsProcessing(true);
    try {
      if (isAutoCrawling) {
        stopAutoCrawl();
      } else {
        await startAutoCrawl();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isProcessing}
      className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
        isAutoCrawling 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-green-600 hover:bg-green-700'
      } ${
        isProcessing ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isProcessing ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            {/* Loading spinner SVG */}
          </svg>
          Processing...
        </span>
      ) : isAutoCrawling ? (
        '🛑 Stop Auto Crawl'
      ) : (
        '🚀 Start Auto Crawl'
      )}
    </button>
  );
};

export default AutoCrawlToggle;