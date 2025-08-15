import React, { useState, useEffect } from 'react';
import { Heart, BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('bookshelf-favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (book) => {
    const bookId = book.key;
    const updatedFavorites = favorites.filter(fav => fav.key !== bookId);
    setFavorites(updatedFavorites);
    localStorage.setItem('bookshelf-favorites', JSON.stringify(updatedFavorites));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('bookshelf-favorites');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12 fade-in">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight flex items-center justify-center">
          <Heart className="mr-4 text-red-300 fill-current" size={48} />
          My Favorites
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal collection of beloved books
        </p>
      </div>

      {/* Favorites Content */}
      <div className="slide-in">
        {favorites.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <BookOpen className="mr-3 text-purple-200" size={28} />
                My Collection
                <span className="ml-3 text-lg font-normal text-white/70">
                  ({favorites.length} book{favorites.length !== 1 ? 's' : ''})
                </span>
              </h2>
              
              {favorites.length > 1 && (
                <button
                  onClick={clearAllFavorites}
                  className="btn-danger"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="books-grid">
              {favorites.map((book) => (
                <div key={book.key} className="fade-in">
                  <BookCard
                    book={book}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <Heart className="mx-auto mb-4 text-white/60" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h3>
              <p className="text-white/80 mb-6">
                Start exploring books and add your favorites to see them here.
              </p>
              <a
                href="/"
                className="btn-primary inline-block"
              >
                Discover Books
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;