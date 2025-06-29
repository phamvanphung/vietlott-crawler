// src/components/CrawlerControls/ManualCrawlForm.jsx
import React, { useState } from 'react';
import { useCrawler } from '../../contexts/CrawlerContext';

const ManualCrawlForm = () => {
  const [vietlotId, setVietlotId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { manualCrawl, setStatus } = useCrawler(); // Make sure setStatus is destructured from context

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate input
  const idStr = vietlotId.trim();
  if (!idStr) {
    alert('Please enter an ID');
    return;
  }

  if (!/^\d+$/.test(idStr)) {
    alert('ID must contain only numbers');
    return;
  }

  setIsLoading(true);
  try {
    const result = await manualCrawl(idStr);
    if (result.error) {
      alert(result.error);
    } else {
      setVietlotId('');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="vietlotId" className="block text-sm font-medium text-gray-700">
          Vietlott ID
        </label>
        <input
  type="number"
  value={vietlotId}
  onChange={(e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 7 digits
    setVietlotId(value.slice(0, 7));
  }}
  placeholder="Enter 7-digit ID"
  min="1"
  required
/>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : 'Manual Crawl'}
      </button>
    </form>
  );
};

export default ManualCrawlForm;