import React, { useState } from 'react';
import './MovieSearch.css';
import { Link } from 'react-router-dom';
import { useSearchResult } from './SearchResultContext';

interface MovieSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function MovieSearch({ searchQuery, setSearchQuery }: MovieSearchProps) {
  const { searchResults, setSearchResults } = useSearchResult();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  
  const handleSearch = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.Search || []);
      setCurrentPage(1); // Reset current page to 1 after each search
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="movie-searches">
      <div className="search-input-container">
        <label htmlFor="">Movie Search:</label>
        <input
          type="text"
          placeholder="Search Movie"
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
        />
        <button className="submit-button" onClick={handleSearch}>Submit Search</button>
      </div>
      <div className="movie-results">
        {currentResults.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="movie-card">
            <div>
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastResult >= searchResults.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovieSearch;
