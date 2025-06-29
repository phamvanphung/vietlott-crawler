import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const ResultCard = ({ result }) => {
  return (
    <div className="result-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-bold text-lg">#{result.vietlot_id.toString().padStart(7, '0')}</h3>
        <p className="text-sm opacity-90">
          {format(new Date(result.result_date), 'dd MMMM yyyy', { locale: vi })}
        </p>
      </div>
      
      <div className="p-4">
        <div className="result-total mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Total Result</h4>
          <div className="text-3xl font-bold text-center text-blue-700">
            {result.result_total}
          </div>
        </div>
        
        <div className="crawl-info text-sm text-gray-500 border-t border-gray-100 pt-2">
          <p>Crawled at: {new Date(result.crawled_at).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;