import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TaxCategories } from './components/TaxCategories';
import { CategoryVideos } from './components/CategoryVideos';
import { AuthProvider } from './contexts/AuthContext';
import { taxVideos } from './data/taxVideos';

function AppContent() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleBack = () => {
    setSelectedCategoryId(null);
  };

  if (selectedCategoryId !== null) {
    const categoryVideos = taxVideos.filter(v => v.categoryId === selectedCategoryId);
    return (
      <CategoryVideos
        categoryId={selectedCategoryId}
        videos={categoryVideos}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black">
      <Hero />
      <TaxCategories onCategoryClick={handleCategoryClick} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
