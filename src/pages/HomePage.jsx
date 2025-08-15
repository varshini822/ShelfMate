import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('bookshelf-favorites') || '[]');
    setFavorites(storedFavorites);
    
    // Load popular books on initial load
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://openlibrary.org/search.json?q=bestseller&limit=12');
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error('Error fetching popular books:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (query) => {
    if (!query.trim()) {
      fetchPopularBooks();
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error('Error searching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchBooks(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const toggleFavorite = (book) => {
    const bookId = book.key;
    const isFavorite = favorites.some(fav => fav.key === bookId);
    
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.key !== bookId);
    } else {
      updatedFavorites = [...favorites, book];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('bookshelf-favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (book) => {
    return favorites.some(fav => fav.key === book.key);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 fade-in">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Discover Amazing Books
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Search through millions of books and build your perfect digital library
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search for books, authors, or topics..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input pl-16 pr-6"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="slide-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {hasSearched ? (
              <>
                <Search className="mr-3 text-purple-200" size={28} />
                Search Results
                {books.length > 0 && (
                  <span className="ml-3 text-lg font-normal text-white/70">
                    ({books.length} found)
                  </span>
                )}
              </>
            ) : (
              <>
                <Sparkles className="mr-3 text-purple-200" size={28} />
                Popular Books
              </>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : books.length > 0 ? (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.key} className="fade-in">
                <BookCard
                  book={book}
                  isFavorite={isFavorite(book)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <Search className="mx-auto mb-4 text-white/60" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
              <p className="text-white/80">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;