// SearchBox.tsx
import React, { useState, useEffect } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 300); // Debounce time of 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query, onSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs"
      />
    </div>
  );
};

export default SearchBox;
