import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AIProjectNamer from './components/AIProjectNamer';
import MultiLogoGenerator from './components/MultiLogoGenerator';
import LogoEditor from './components/LogoEditor';
import Footer from './components/Footer';
import { loadAllGoogleFonts } from './utils/googleFonts';

export type Page = 'namer' | 'generator' | 'editor';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('namer');

  useEffect(() => {
    // Load all Google Fonts when app starts
    loadAllGoogleFonts();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'namer':
        return <AIProjectNamer />;
      case 'generator':
        return <MultiLogoGenerator />;
      case 'editor':
        return <LogoEditor />;
      default:
        return <AIProjectNamer />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
