import React from 'react';
import { Sparkles, Image, Edit3 } from 'lucide-react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">LogoSpark</h1>
          </div>
          <nav className="flex gap-2">
            <button
              onClick={() => setCurrentPage('namer')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                currentPage === 'namer'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Project Namer
            </button>
            <button
              onClick={() => setCurrentPage('generator')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                currentPage === 'generator'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Image className="w-4 h-4" />
              Logo Generator
            </button>
            <button
              onClick={() => setCurrentPage('editor')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                currentPage === 'editor'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              Editor
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
