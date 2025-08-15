import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-white hover:text-purple-200 transition-colors duration-300"
          >
            <BookOpen size={32} className="text-purple-200" />
            <h1 className="text-2xl font-bold tracking-tight">BookShelfX</h1>
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen size={20} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === '/favorites'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;