import React, { createContext, useState, useContext } from 'react';

interface SearchResultContextType {
  searchResults: any[]; // Change 'any[]' to your actual search results type
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>; // Change 'any[]' to your actual search results type
}

// Define props interface with children property
interface SearchResultProviderProps {
  children: React.ReactNode;
}

const SearchResultContext = createContext<SearchResultContextType>({
  searchResults: [],
  setSearchResults: () => {} // Initial value for setSearchResults
});

export const useSearchResult = () => useContext(SearchResultContext);

export const SearchResultProvider: React.FC<SearchResultProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
      {children} {/* This is where the children prop is used */}
    </SearchResultContext.Provider>
  );
};

export default SearchResultContext;
