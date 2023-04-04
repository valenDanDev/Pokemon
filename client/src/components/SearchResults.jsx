import React from 'react';

const SearchResults = ({ results, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;