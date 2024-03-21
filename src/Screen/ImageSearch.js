import React, { useState, useEffect } from 'react';
import './ImageSearch.css'

const UnsplashImageSearch = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    searchImages(query, 1);
  };

  const handleShowMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    searchImages(query, currentPage + 1);
  };

  useEffect(() => {
    setShowMoreButton(false);
    if (query !== '') {
      searchImages(query, currentPage);
    }
  }, [query, currentPage]);

  const searchImages = async (query, page) => {
    const accessKey = "wqs0t_nyXJ26sPT3A0s3WoT1mkobhYRTtrfyHT4YLBA";
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${page}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results.length === 0) {
        setShowMoreButton(false);
        setSearchResults([]);
        return;
      }

      if (page === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prevResults => [...prevResults, ...data.results]);
      }

      setShowMoreButton(true);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim())}
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div className="result-item" key={index}>
              <a href={result.urls.full} target="_blank" rel="noopener noreferrer">
                <img src={result.urls.small} alt={result.alt_description} />
              </a>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

      {showMoreButton && (
        <button id="show-more-button" onClick={handleShowMoreClick}>
          Show More
        </button>
      )}
    </div>
  );
};

export default UnsplashImageSearch;
