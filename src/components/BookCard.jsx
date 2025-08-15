import React from 'react';
import { Heart, User, Calendar } from 'lucide-react';

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/300x450/667eea/ffffff?text=No+Cover';

  const authors = book.author_name ? book.author_name.slice(0, 2).join(', ') : 'Unknown Author';
  const publishYear = book.first_publish_year || 'Unknown';
  const title = book.title || 'Untitled';

  return (
    <div className="card group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/667eea/ffffff?text=No+Cover';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600">
          <User size={16} className="mr-2 text-purple-500" />
          <span className="truncate">{authors}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-purple-500" />
          <span>{publishYear}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => onToggleFavorite(book)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isFavorite
                ? 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700'
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700'
            }`}
          >
            <Heart 
              size={18} 
              className={isFavorite ? 'fill-current' : ''} 
            />
            <span>{isFavorite ? 'Remove' : 'Add to Favorites'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;