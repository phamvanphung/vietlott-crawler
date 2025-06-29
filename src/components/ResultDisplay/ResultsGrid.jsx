import React from 'react';
import ResultCard from './ResultCard';

const ResultsGrid = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map(result => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default ResultsGrid;