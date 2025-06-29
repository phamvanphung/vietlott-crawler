import React, { useState } from 'react';
import { useCrawler } from '../../contexts/CrawlerContext';
import ManualCrawlForm from './ManualCrawlForm';
import AutoCrawlToggle from './AutoCrawlToggle';

const CrawlerControls = () => {
  const { status, error } = useCrawler();
  const [notification, setNotification] = useState('');

  return (
    <div className="crawler-controls bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Crawler Controls</h2>
        
        <ManualCrawlForm 
          onNotification={setNotification}
        />
        
        <AutoCrawlToggle />
      </div>
      
      <div className="status-container">
        {notification && (
          <div className="notification bg-blue-100 text-blue-800 p-3 rounded mb-2">
            {notification}
          </div>
        )}
        
        {status && (
          <div className="status bg-gray-100 p-3 rounded mb-2">
            {status}
          </div>
        )}
        
        {error && (
          <div className="error bg-red-100 text-red-800 p-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrawlerControls;