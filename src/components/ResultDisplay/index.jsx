import React, { useState, useEffect } from 'react';
import ResultsGrid from './ResultsGrid';
import { getRecentResults } from '../../services/supabaseService';

const ResultDisplay = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await getRecentResults();
        setResults(data);
      } catch (err) {
        setError('Failed to load results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
    
    // Refresh results every 60 seconds
    const interval = setInterval(fetchResults, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center py-8">Loading results...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!results.length) return <div className="text-center py-8">No results found</div>;

  return (
    <div className="result-display mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Lottery Results</h2>
      <ResultsGrid results={results} />
    </div>
  );
};

export default ResultDisplay;